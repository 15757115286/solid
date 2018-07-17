import * as utils from './util';
//anmation动画
const mainQueueName = 'def';
function animation(elem, props, duration, delay, callback, tween) {
    this.elem = elem;
    this.props = props;
    this.duration = duration;
    this.tween = tween || utils.tween.Linear;
    this.delay = delay || 0;
    this.callback = callback;
    let queueName = mainQueueName;
    setTimeout(() => {
        let $id = findId(elem);
        if ($id > 0) {
            queueName = 'queue_' + $id;
            animation.queue[queueName] = animation.queue[queueName] || [];
        } else {
            animation.$elems.push({
                el: elem,
                id: animation.$elemId++
            });
        }
        animation.timer(this, queueName);
    }, delay);
}

animation.$elemId = 1;

animation.$elems = [];

animation.fps = 60;

animation.running = false;

function findId(elem) {
    let id = 0;
    animation.$elems.some((_elem) => {
        if (_elem.el === elem) {
            id = _elem.id;
            return true;
        }
        return false;
    })
    return id;
}

function deleteElem(elem) {
    let length = animation.$elems.length;
    for (let i = 0; i < length; i++) {
        if (animation.$elems[i].el === elem) {
            animation.$elems.splice(i, 1);
            return false;
        }
    }
}

function doCheck(elem) {
    let $id = findId(elem);
    let $queueName = 'queue_' + $id;
    let $queue = animation.queue[$queueName];
    let isArray = Array.isArray($queue);
    if (isArray && $queue.length == 0) {
        deleteElem(elem);
        Reflect.deleteProperty(animation.queue, $queueName);
    } else if (isArray && $queue.length > 0 && !isInDef(elem)) {
        let fn = $queue.shift();
        fn.$startTime = utils.now();
        fn.$style = utils.getStyle(elem, fn.$props);
        animation.queue[mainQueueName].push(fn);
    }
    animation.start();
}

function isInDef(elem) {
    return animation.queue[mainQueueName].some(fn => {
        return fn.$elem === elem;
    })
}

animation.setFps = function (fps) {
    if (utils.isNumber(fps) && fps > 0) {
        animation.fps = fps;
    }
}

animation.isRunning = function () {
    return animation.running;
}

//动画的队列，def为主队列。其他队列会在特定时间后被调往主队列执行动画任务
animation.queue = {
    [mainQueueName]: []
}

animation.timerId = null;

function cantAnimationCallback(elem, prop, from, to, passTime, duration) {
    switch (prop) {
        case 'display':
            let finalValue = to[prop].trim();
            if ((finalValue == 'none' && passTime == duration) ||
                finalValue != 'none') {
                elem.style[prop] = finalValue;
                Reflect.deleteProperty(from, prop);
                Reflect.deleteProperty(to, prop);
            }
            break;
        default:
            break;
    }
}

//前往任务队列执行的动画函数，会在每一帧中计算出元素的样式
//并在一个动画结束的时候回去查找在别的队列是否有该元素的动画
//如果有就调度过来执行
animation.timer = function (animaObj, queueName) {
    let elem = animaObj.elem;
    let props = animaObj.props;
    let duration = animaObj.duration;
    let tween = animaObj.tween;
    let queue = animation.queue[utils.isString(queueName) ? queueName : mainQueueName];
    let fn = function () {
        let dataNow = utils.now();
        let passTime = dataNow - fn.$startTime;
        let isContinue = passTime < fn.$duration;
        passTime = passTime >= fn.$duration ? fn.$duration : passTime;
        utils.setStyle(elem, passTime, fn.$style.from, fn.$style.to, fn.$duration, tween, cantAnimationCallback);
        return isContinue;
    }
    if (queue === animation.queue[mainQueueName]) {
        fn.$startTime = utils.now();
        fn.$style = utils.getStyle(elem, props);
    }
    fn.$props = props;
    fn.$elem = elem;
    fn.$duration = duration;
    fn.$times = 0;
    fn.$callback = animaObj.callback;
    queue.push(fn);
    doCheck(elem);
}
let i = 0;

//唯一执行的定时器任务，会去调度主队列中的timer函数
animation.tick = function () {
    let queue = animation.queue[mainQueueName];
    for (let i = 0; i < queue.length; i++) {
        let task = queue[i];
        let isContinue = task();
        task.$times++;
        if (!isContinue) {
            queue.splice(i--, 1);
            if (utils.isFunction(task.callback)) {
                task.callback.call(fn.$elem);
            }
            doCheck(task.$elem);
        }
    }

    queue.length == 0 && animation.stop();
}

animation.start = function () {
    if (animation.timerId == null) {
        animation.running = true;
        let _now = utils.now();
        animation.queue[mainQueueName].forEach(fn => {
            fn.$startTime = _now;
        })
        animation.timerId = setInterval(animation.tick, 1000 / animation.fps);
    }
}

animation.stop = function () {
    animation.running = false;
    if (animation.timerId) {
        clearInterval(animation.timerId);
        animation.timerId = null;
        let _now = utils.now();
        animation.queue[mainQueueName].forEach(fn => {
            fn.$duration = Math.max(fn.$duration - (_now - fn.$startTime), 0);
            fn.$style = utils.getStyle(fn.$elem, fn.$props);
        })
    }
}

animation.durations = {
    fast: 100,
    slow: 500,
    default: 300
}

export default animation;