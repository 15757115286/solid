<template>
    <div style="background-color:green">
        <span>测试组件2,点击次数：{{ count }}</span>
        <button  @click="add()">点击</button>
    </div>
</template>
<script>
export default {
    name:'component2',
    created(){
        console.log('component2 created');
    },
    destroyed(){
        console.log('component2 destory');
    },
    activated(){
        console.log('component2 activated');
    },
    deactivated(){
        console.log('component2 deactivated');
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
