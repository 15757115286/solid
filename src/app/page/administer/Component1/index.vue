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
    </div>
</template>
<script>
export default {
    name:'component1',
    data(){
        return {
            show:true,
            show2:true,
            name:'xwt'
        }
    }
}
</script>

