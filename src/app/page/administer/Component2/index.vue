<template>
    <div>
        <span>这个是测试组件2</span>
        <div id="block1" ref="div"></div>
        <button @click="test01()">测试</button>
        <button @click="test02()">停止</button>
        <button @click="test04()">开始</button>
        <button @click="test03()">测试03</button>
    </div>
</template>
<script>
import animation from 'app/base/animation'
export default {
    name:'animationComponent',
    methods:{
        test01(){
            let ani = new animation(this.$refs.div,{'margin-left':'200px','width':'200px',display:'none'},1000);
            animation.start();
        },
        test02(){
            animation.stop();
        },
        test03(){
            let ani = new animation(this.$refs.div,{'margin-left':'0px','width':'100px',display:'block'},1000);
            animation.start();
        },
        test04(){
            animation.start();
        },
    }
}
</script>
<style scoped>
    #block1{
        width: 100px;
        height: 100px;
        background-color: aqua;
    }
</style>


