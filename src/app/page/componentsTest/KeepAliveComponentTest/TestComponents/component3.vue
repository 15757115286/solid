<template>
    <div>
        <span>测试组件3,点击次数：{{ count }}</span>
        <button  @click="add()">点击</button>
    </div>
</template>
<script>
export default {
    name:'component3',
    created(){
        console.log('component3 created');
    },
    destroyed(){
        console.log('component3 destory');
    },
    activated(){
        console.log('component3 activated');
    },
    deactivated(){
        console.log('component3 deactivated');
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
