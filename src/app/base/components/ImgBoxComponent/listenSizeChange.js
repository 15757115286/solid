export class ListenSizeChange {
    constructor(element,fn,throttle = 100) {
        this.element = element;//需要监听的html element对象
        this.cssStyle = null;//计算完成的样式 默认由 getComputedStyle计算得出，compat(>=ie9)
        this.listenId = null;//这里的原理相当于轮询处理
        this.oldWidth = null;//原先的高
        this.oldHeight = null;//原先的宽
        this.callback = fn;//如果宽高发生变化后的回调
        this.throttle = throttle;//函数节流，如果在默认时间内发生多次尺寸变化，默认只执行1次回调
        /* 如果游览器支持requestAnimationFrame 那么默认调用该函数，否则 fall back setTimeout 默认为60帧 */
        this.frameFn = requestAnimationFrame.bind(window) || function (fn) {
            return setTimeout(fn, 1000 / 60)
        }
        this.throttleId = null;
        try{
            this.cssStyle = getComputedStyle(element);
            this.oldWidth = this.cssStyle.width;
            this.oldHeight = this.cssStyle.height;
        }catch(e){
            console.error(e);
        }
    }

    startListen() {
        if(this.listenId != null) return;
        this.cycle();
    }

    cycle() {
        this.diff();
        this.listenId =  this.frameFn(this.cycle.bind(this));
    }

    diff(){
        if(this.cssStyle == null) return;
        let width = this.cssStyle.width;
        let height = this.cssStyle.height;
        if(width != this.oldWidth || height != this.oldHeight){
            if(typeof this.callback == 'function'){
                if(this.throttleId !== null) clearTimeout(this.throttleId);
                this.throttleId = setTimeout(()=>{
                    this.callback();
                    this.throttleId = null;
                },this.throttle)
            }
            this.oldHeight = height;
            this.oldWidth = width;
        }
    }

    stopListen() {
        if(this.listenId == null) return;
        if(requestAnimationFrame){
            cancelAnimationFrame(this.listenId);
        }else{
            clearTimeout(this.listenId);
        }
        this.listenId = null;
    }

}