import * as utils from './util';
//anmation动画
function animation(elem, props, duration, delay, tween) {
    this.elem = elem;
    this.props = props;
    this.duration = duration;
    this.tween = tween || utils.tween.Linear;
    this.delay = delay;
    let queueName = 'def';
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
        fn.$style = utils.getStyle(elem,fn.$props);
        //放在下次渲染时机
        setTimeout(()=>{
            animation.queue['def'].push(fn);
            animation.start();
        })
    }
}

function isInDef(elem){
    return animation.queue['def'].some(fn=>{
        return fn.$elem === elem;
    })
}

animation.setFps = function (fps) {
    if (utils.isNumber(fps) && fps > 0) {
        animation.fps = fps;
    }
}

animation.isRunning = function(){
    return animation.running;
}

animation.queue = {
    def: []
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

animation.timer = function (animaObj, queueName) {
    let elem = animaObj.elem;
    let props = animaObj.props;
    let duration = animaObj.duration;
    let tween = animaObj.tween;
    let queue = animation.queue[utils.isString(queueName) ? queueName : 'def'];
    let fn = function () {
        let dataNow = utils.now();
        let passTime = dataNow - fn.$startTime;
        let isContinue = passTime < fn.$duration;
        passTime = passTime >= fn.$duration ? fn.$duration : passTime;
        utils.setStyle(elem, passTime, fn.$style.from, fn.$style.to, fn.$duration, tween, cantAnimationCallback);
        return isContinue;
    }
    if(queue === animation.queue['def']){
        fn.$startTime = utils.now();
        fn.$style = utils.getStyle(elem, props);
    }
    fn.$props = props;
    fn.$elem = elem;
    fn.$duration = duration;
    queue.push(fn);
    doCheck(elem);
}

animation.tick = function () {
    let queue = animation.queue['def'];
    for (let i = 0; i < queue.length; i++) {
        let task = queue[i];
        let isContinue = task();
        if (!isContinue) {
            queue.splice(i--, 1);
            doCheck(task.$elem);
        }
    }

    queue.length == 0 && animation.stop();
}

animation.start = function () {
    if (animation.timerId == null) {
        animation.running = true;
        let _now = utils.now();
        animation.queue['def'].forEach(fn=>{
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
        animation.queue['def'].forEach(fn=>{
            fn.$duration = fn.$duration - (_now - fn.$startTime);
            fn.$style = utils.getStyle(fn.$elem,fn.$props);
        })
    }
}

export default animation;