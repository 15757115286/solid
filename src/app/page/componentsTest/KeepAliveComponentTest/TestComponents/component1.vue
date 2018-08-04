<template>
    <div>
        <p>测试组件1,点击次数：{{ count }}</p>
        <button @click="add()">点击</button>
    </div>
</template>
<script>
export default {
    name:'component1',
    created(){
        console.log('component1 created');
    },
    destroyed(){
        console.log('component1 destory');
    },
    activated(){
        console.log('component1 activated');
    },
    deactivated(){
        console.log('component1 deactivated');
    },
    data(){
        return {
            count:0
        }
    },
    methods:{
        add(){
            this.count ++;
        }
    }
}
</script>
