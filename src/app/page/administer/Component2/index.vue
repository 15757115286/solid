<template>
    <div>
        <div>这个是测试组件2</div>
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
    </div>
</template>
<script>
export default {
    name:'animationComponent',
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
            let size = this.$A.getSize(this.$refs.div1);
            console.log(size);
        },
        toggle(){
            this.$A(this.$refs.div).toggle(400);
        },
        get(){
            let style = getComputedStyle(this.$refs.test);
            console.log(style.width,style.height);
            this.$refs.test.style.height = '100px';
            console.log(style.width,style.height);
            this.$refs.test.style.height = '60px';
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
</style>


