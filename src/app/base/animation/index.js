import * as utils from './util';
//anmation动画
const mainQueueName = 'def';
let FPS = 60;

//关于delay的一些说明：这里默认是相同元素同时执行的只有1个动画（可以执行多个属性）
//如果是有多个动画，那么则进行排队（不同元素不用排队），所以如果第一个动画有delay属性
//那么会先执行第二个动画，如果第二个动画的执行总时间比第一个动画的delay长的话，那么
//接下来会直接运行第一个动画，所以说delay在new Animation()的时候就已经在计算时间了，且
//这个时间不会受到stop等影响，一直会减少
//不支持合并属性，比如 padding:0，要写成padding-left ... 这样子的。
function Animation(elem, props, duration, delay, callback, tween) {
    this.elem = elem;
    this.props = props;
    this.duration = duration;
    this.tween = utils.getTween(tween);
    this.delay = delay || 0;
    this.callback = callback;
    let queueName = mainQueueName;
    setTimeout(() => {
        let $id = findId(elem);
        if ($id > 0) {
            queueName = 'queue_' + $id;
            Animation.queue[queueName] = Animation.queue[queueName] || [];
        } else {
            Animation.$elems.push({
                el: elem,
                id: Animation.$elemId++
            });
        }
        Animation.timer(this, queueName);
    }, delay);
}

Animation.$elemId = 1;

Animation.$elems = [];

Animation.running = false;

function findId(elem) {
    let id = 0;
    Animation.$elems.some((_elem) => {
        if (_elem.el === elem) {
            id = _elem.id;
            return true;
        }
        return false;
    })
    return id;
}

function deleteElem(elem) {
    let length = Animation.$elems.length;
    for (let i = 0; i < length; i++) {
        if (Animation.$elems[i].el === elem) {
            Animation.$elems.splice(i, 1);
            return false;
        }
    }
}

function isInDef(elem) {
    return Animation.queue[mainQueueName].some(fn => {
        return fn.$elem === elem;
    })
}

Animation.setFps = function (fps) {
    if (utils.isNumber(fps) && fps > 0) {
        FPS = fps;
    }
}

Animation.isRunning = function () {
    return Animation.running;
}

//动画的队列，def为主队列。其他队列会在特定时间后被调往主队列执行动画任务
Animation.queue = {
    [mainQueueName]: []
}

Animation.timerId = null;

function deleteProps(from, to, prop) {
    Reflect.deleteProperty(from, prop);
    Reflect.deleteProperty(to, prop);
}

function cantAnimationCallback(elem, prop, from, to, passTime, duration) {
    let finalValue = to[prop].trim();
    switch (prop) {
        case 'display':
            if ((finalValue == 'none' && passTime == duration) ||
                finalValue != 'none') {
                elem.style[prop] = finalValue;
                deleteProps(from, to, prop);
            }
            break;
        case 'overflow':
            elem.style[prop] = finalValue;
            deleteProps(from, to, prop);
            break;
        default:
            break;
    }
}

//只有在新增一个动画或者一个动画结束以后才会查询
function doCheck(elem ,isComplete = false) {
    let $id = findId(elem);
    let $queueName = 'queue_' + $id;
    let $queue = Animation.queue[$queueName];
    let isArray = Array.isArray($queue);
    //isComplete代表了动画的结束，如果此时还是没有队列那么可以删除
    //否则的话第一次肯定会被删除，因为$queueName == mainQueueName != realQueueName
    if(isComplete && utils.isUndefined($queue)){
        deleteElem(elem);
    }
    if ( isArray && $queue.length == 0) {
        deleteElem(elem);
        Reflect.deleteProperty(Animation.queue, $queueName);
    } else if (isArray && $queue.length > 0 && !isInDef(elem)) {
        let fn = $queue.shift();
        fn.$startTime = utils.now();
        fn.$style = utils.getStyle(elem, fn.$props);//进入主队列才算动画开始（添加开始时间）
        Animation.queue[mainQueueName].push(fn);
    }
    Animation.start();
}

//前往任务队列执行的动画函数，会在每一帧中计算出元素的样式
//并在一个动画结束的时候回去查找在别的队列是否有该元素的动画
//如果有就调度过来执行
Animation.timer = function (animaObj, queueName) {
    let elem = animaObj.elem;
    let props = animaObj.props;
    let duration = animaObj.duration;
    let tween = animaObj.tween;
    let queue = Animation.queue[utils.isString(queueName) ? queueName : mainQueueName];
    let fn = function () {
        let dataNow = utils.now();
        let passTime = dataNow - fn.$startTime;
        let isContinue = passTime < fn.$duration;
        passTime = passTime >= fn.$duration ? fn.$duration : passTime;
        utils.setStyle(elem, passTime, fn.$style.from, fn.$style.to, fn.$duration, tween, cantAnimationCallback);
        return isContinue;
    }
    if (queue === Animation.queue[mainQueueName]) {
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
Animation.tick = function () {
    let queue = Animation.queue[mainQueueName];
    for (let i = 0; i < queue.length; i++) {
        let task = queue[i];
        let isContinue = task();
        task.$times++;
        if (!isContinue) {
            queue.splice(i--, 1);
            if (utils.isFunction(task.$callback)) {
                task.$callback.call(task.$elem);
            }
            doCheck(task.$elem ,true);
        }
    }

    queue.length == 0 && Animation.stop();
}

Animation.start = function () {
    if (Animation.timerId == null) {
        Animation.running = true;
        let _now = utils.now();
        Animation.queue[mainQueueName].forEach(fn => {
            fn.$startTime = _now;
        })
        Animation.timerId = setInterval(Animation.tick, 1000 / FPS);
    }
    return this;
}

Animation.stop = function () {
    Animation.running = false;
    if (Animation.timerId) {
        clearInterval(Animation.timerId);
        Animation.timerId = null;
        let _now = utils.now();
        Animation.queue[mainQueueName].forEach(fn => {
            fn.$duration = Math.max(fn.$duration - (_now - fn.$startTime), 0);
            fn.$style = utils.getStyle(fn.$elem, fn.$props);
        })
    }
    return this;
}

Animation.durations = {
    fast: 100,
    slow: 500,
    _default: 300
}

Animation.option = {
    delay: 0,
    tween: 'linear',
    callback: null
}

//-------------------------------封装animation-----------------------------

function cssAnimation(elem) {
    if (this instanceof cssAnimation) {
        this.elem = elem;
    } else {
        return new cssAnimation(elem);
    }
}

const numTest = /^\d+(\.\d+)?$|^\.\d+$/;

cssAnimation.prototype.animation = function (props, duration = '_default', option = {}) {
    option = utils.isObject(option) ? option : {};
    let mergeOption = Object.assign({}, Animation.option, option);
    if (utils.isNumber(duration) || numTest.test(duration)) {
        duration = parseFloat(duration);
        duration = duration >= 0 ? duration : 0;
    } else {
        let key = duration in Animation.durations ? duration : '_default';
        duration = Animation.durations[key]
    }
    new Animation(this.elem, props, duration, mergeOption.delay, mergeOption.callback, mergeOption.tween);
    return this;
}

cssAnimation.prototype.getSize = cssAnimation.getSize = function (el) {
    let getStyle = utils.getStyles,
        setStyle = utils.setStyles;
    let elem = el || this.elem;
    let style = getComputedStyle(elem);
    if (style.display != 'none') {
        return {
            width: style.width,
            height: style.height
        };
    } else {
        let hideStyle = {
            display: utils.isBlock(elem) ? 'block' : 'inline-block',
            visibility: 'hidden',
            position: 'absoulte'
        }
        let oldStyle = getStyle(elem, hideStyle);
        setStyle(elem, hideStyle);
        let result = {
            width: style.width,
            height: style.height
        }
        setStyle(elem, oldStyle);
        return result;
    }
}

//toggle hidden show 是否改变宽度
let changeWidth = false;

Animation.setChangeWidth = function(isChange){
    changeWidth = isChange;
}

function show(elem, duration,showCallback,force) {
    let style = getComputedStyle(elem);
    if(style.display != 'none' && !force) return void doNext(elem);
    let that = cssAnimation(elem);
    let oldStyle = null;
    let display = utils.isBlock(elem) ? 'block' : 'inline-block';

    let size = that.getSize(elem);
    let showCss = {
        display: display,
        height: size.height,
        opacity: 1,
        overflow: 'hidden'
    }
    changeWidth && (showCss.width = size.width);
    oldStyle = utils.getStyles(elem, showCss);
    elem.style.opacity = 0;
    elem.style.height = '0px';
    changeWidth && (elem.style.width = '0px')
    that.animation(showCss, duration, {
        callback: () => {
            utils.setStyles(elem, oldStyle);
            elem.style.display = display;
            if(utils.isFunction(showCallback)){
                showCallback.call(elem);
            }
            doNext(elem);
        }
    })
}

function hidden(elem ,duration,hiddenCallback,force) {
    let style = getComputedStyle(elem);
    if(style.display == 'none' && !force) return void doNext(elem);
    let that = cssAnimation(elem);
    let oldStyle = null;
    let display = utils.isBlock(elem) ? 'block' : 'inline-block';
    let direction = ['top','right','bottom','left']
    let hiddenCss = {
        overflow: 'hidden',
        height: '0px',
        opacity: '0'
    }
    changeWidth && (hiddenCss.width = '0px');
    direction.forEach(dir=>{
        hiddenCss['padding-' + dir] = '0px';
        hiddenCss['margin-' + dir] = '0px';
    })
    oldStyle = utils.getStyles(elem, hiddenCss);
    elem.style.display = display;
    elem.style.overflow = hiddenCss.overflow;
    that.animation(hiddenCss, duration, {
        callback: () => {
            utils.setStyles(elem, oldStyle);
            elem.style.display = 'none';
            if(utils.isFunction(hiddenCallback)){
                hiddenCallback.call(elem);
            }
            doNext(elem);
        }
    })
}

function toggle(elem, duration,showCallback,hiddenCallback,force) {
    let style = getComputedStyle(elem);
    if (style.display == 'none') {
        show(elem ,duration,showCallback,force);
    } else {
        hidden(elem , duration,hiddenCallback,force);
    }
}

function doNext(elem) {
    let mapName = elem.$cacheId;
    let queue = cacheMap[mapName];
    let hasNext = Array.isArray(queue) && queue.length > 0;
    if (hasNext) {
        queue.shift()();
    } else {
        elem.$cacheId && Reflect.deleteProperty(cacheMap, elem.$cacheId);
        Reflect.deleteProperty(elem, '$cacheId');
    }
}

let cacheMap = {};
let cacheId = 1;

function doQueue(elem,fn){
    if (utils.isUndefined(elem.$cacheId)) {
        elem.$cacheId = 'cacheId' + cacheId++;
        fn();
    } else {
        let mapName = elem.$cacheId;
        let queue = cacheMap[mapName] || (cacheMap[mapName] = []);
        queue.push(fn);
    }
}

//1先检查有没有相同的元素在执行toggle动画2如果没有就执行运行3如果有，则进行缓存函数
//4等到上个动画结束时候从缓存中取出函数运行（在这之前同步执行上个函数的回调）5检查该元素是否还有动画
//没有则删除$cacheId标志
cssAnimation.toggle = function (elem, duration,showCallback,hiddenCallback,force = false) {
    doQueue(elem,toggle.bind(elem,elem,duration,showCallback,hiddenCallback,force));
}
cssAnimation.show = function(elem ,duration,callback,force = false){
    doQueue(elem,show.bind(elem,elem,duration,callback,force));
}
cssAnimation.hidden = function(elem ,duration,callback ,force = false){
    doQueue(elem,hidden.bind(elem,elem,duration,callback,force));
}

cssAnimation.prototype.start = cssAnimation.start = Animation.start;

cssAnimation.prototype.stop = cssAnimation.stop = Animation.stop;

cssAnimation.prototype.setChangeWidth = cssAnimation.setChangeWidth = Animation.setChangeWidth;

cssAnimation.prototype.Animation = cssAnimation.Animation = Animation;

cssAnimation.prototype.show = function (duration,callback,force = false) {
    cssAnimation.show(this.elem,duration,callback,force);
}
cssAnimation.prototype.hidden = function(duration,callback,force = false){
    cssAnimation.hidden(this.elem,duration,callback,force);
}
cssAnimation.prototype.toggle = function (duration,showCallback,hiddenCallback,force = false) {
    cssAnimation.toggle(this.elem, duration,showCallback,hiddenCallback,force);
}

export default cssAnimation;