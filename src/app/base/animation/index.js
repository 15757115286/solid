import * as utils from './util';
//anmation动画
function animation(elem,props,duration,delay,tween){
    this.elem = elem;
    this.props = props;
    this.duration = duration;
    this.tween = tween || utils.tween.Linear;
    this.delay = delay;
    this.createTime = utils.now();//动画创建的时间
    animation.timer(this);
}

animation.fps = 60;

animation.running = false;

animation.setFps = function(fps){
    if(utils.isNumber(fps) && fps > 0){
        animation.fps = fps;
    }
}

animation.queue = {
    def:[]
}

animation.timerId = null;

animation.timer = function(animaObj ,queueName){
    let elem = animaObj.elem;
    let props = animaObj.props;
    let createTime = animaObj.createTime;
    let duration = animaObj.duration;
    let style = utils.getStyle(elem,props);
    let from = style.from;
    let to = style.to;
    let tween = animaObj.tween;
    let queue = animation.queue[utils.isString(queueName) ? queueName : 'def'];
    queue.push(function(){
        let dataNow = utils.now();
        let passTime = dataNow - createTime;
        passTime = passTime >= duration ? duration : passTime;
        utils.setStyle(elem, passTime, from, to, duration, tween);
        return passTime < duration;
    });
}

animation.tick = function(){
    let queue = animation.queue['def'];
    for(let i=0;i<queue.length;i++){
        let task = queue[i];
        let isContinue = task();
        if(!isContinue){
            queue.splice(i--,1);
        }
    }
    
    queue.length == 0 && animation.stop();
}

animation.start = function(){
    if(animation.timerId == null){
        animation.timerId = setInterval(animation.tick, 1000 / animation.fps);
    }
}

animation.stop = function(){
    animation.running = false;
    if(animation.timerId){
        clearInterval(animation.timerId);
        animation.timerId = null;
    }
}

export default animation;

