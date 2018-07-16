<template>
    <div>
        <span>这个是测试组件2</span>
        <div id="block1" ref="div"></div>
        <button @click="test01()">测试</button>
        <button @click="test02()">停止</button>
    </div>
</template>
<script>
import animation from 'app/base/animation'
export default {
    name:'animationComponent',
    methods:{
        test01(){
            
            console.log(getComputedStyle(this.$refs.div));
            let ani = new animation(this.$refs.div,{'margin-left':'200px','width':'200px',display:'none'},1000);
            animation.start();
        },
        test02(){
            animation.stop();
        }
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


