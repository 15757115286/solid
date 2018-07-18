<template>
    <div>
        <div>这个是测试组件2</div>
        <span ref="span0"  style="background-color:red;display:none;">fdsfsdfsdfsd111111</span>
        <div id="block1" ref="div">
            <p>fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</p>
            <p>fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</p>
            <p>fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</p>
            <p>fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</p>
            <p>fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</p>
            <p>fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</p>
            <p>fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</p>
            <p>fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</p>
            <p>fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</p>
        </div>
        <div id="test" ref="test"> 
        </div>
        <div ref="div1" id="hid">
            <div id="block2" ></div>
            <div id="block2" ></div><p>fdsffsdf</p>
        </div>
        <button @click="test01()">测试</button>
        <button @click="test02()">停止</button>
        <button @click="test04()">开始</button>
        <button @click="test03()">测试03</button>
        <button @click="test05()">获取隐藏元素宽高</button>
        <button @click="toggle()">toggle测试</button>
        <button @click="get()">get测试</button>
        <div>
            <h4>动画模式测试（宽度测试）</h4>
            <div class="test-model" ref="testModel"></div>
            <div>
                <h5>时间</h5>
                <input type="text" v-model="time">
            </div>
            <div>
                <h5>模式选择</h5>
                <div style="display:inline-block;margin-left:10px;" v-for="m in mode">
                    <label>{{ m }}</label>
                    <input type="radio" v-model="selectMode" :value="m">
                </div>
            </div>
            <div>
                <h5>ease选择</h5>
                <div style="display:inline-block;margin-left:10px;" v-for="e in ease">
                    <label>{{ e }}</label>
                    <input type="radio" v-model="selectEase" :value="e">
                </div>
            </div>
            <div>
                <button @click="test06()">动画</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'animationComponent',
    data(){
        return {
            ease:['easeIn','easeOut','easeInOut'],
            mode:['linear','quad','cubic','quart','quint','sine','expo','circ','elastic','back','bounce'],
            selectMode:'linear',
            selectEase:'easeIn',
            time:1000
        }
    },
    methods:{
        test01(){
            this.$A(this.$refs.div).animation({'margin-left':'200px',display:'none'},200)
                .animation({'margin-left':'100px',display:'block'})
                .animation({'width':'300px'},1500,)
                .animation({'opacity':0},500,{delay:5000})
            //this.$A(this.$refs.div1).animation({'margin-left':'200px',display:'none'},1000);
        },
        test02(){
            this.$A.stop();
        },
        test03(){
            this.$A(this.$refs.div).animation({'margin-left':'0px','width':'100px',display:'block'},1000);
            this.$A(this.$refs.div1).animation({'margin-left':'0px','width':'100px',display:'block'},300);
        },
        test04(){
            this.$A.start();
        },
        test05(){
            let size = this.$A.getSize(this.$refs.div);
            console.log(size);
        },
        toggle(){
            this.$A(this.$refs.div).toggle(400);
            this.$A(this.$refs.span0).toggle(400);
             this.$A(this.$refs.div).toggle(400);
            this.$A(this.$refs.span0).toggle(400);
        },
        get(){
            let style = getComputedStyle(this.$refs.test);
            console.log(style.width,style.height);
            this.$refs.test.style.height = '100px';
            console.log(style.width,style.height);
            this.$refs.test.style.height = '60px';
        },
        test06(){
            let tween = '';
            if(this.selectMode == 'linear') tween = 'linear';
            else tween = this.selectMode + '.' + this.selectEase;
            this.$A(this.$refs.testModel).animation({width:'200px'},this.time,{tween,callback:()=>{
                this.$refs.testModel.style.width = '100px';
            }});
        }
    }
}
</script>
<style scoped>
    #block1{
        background-color: aqua;
    }
     #block2{
        width: 100px;
        height: 100px;
        background-color: blue;
    }
    #hid{
        display: none;
    }
    #test{
        width: 50px;
        height: 50px;
        background-color: brown;
    }
    .test-model{
        width: 100px;
        height: 100px;
        background-color: aqua;
    }
</style>


