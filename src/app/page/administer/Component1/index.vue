<template>
    <div>
        <span>这个是测试组件1</span>
        <Modal
            title="Title"
            v-model="show"
            :mask-closable="false">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <input type="text" v-model="name">
            <p>{{ name }}</p>
        </Modal>
         <Modal
            title="Title"
            v-model="show2"
            :mask-closable="false">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <input type="text" v-model="name">
            <p>{{ name }}</p>
        </Modal>
        <test-component myname="cm + xwt"></test-component>
    </div>
</template>
<script>
import TestComponent from './testComponent'
export default {
    name:'component1',
    components:{
        TestComponent
    },
    data(){
        return {
            show:true,
            show2:true,
            name:'xwt'
        }
    }
}
</script>

