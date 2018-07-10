<template>
    <div>
        <p v-for="(item,index) in array">hello world ! this is the first test vue component（{{ index }}）</p>
    </div>
</template>
<script>
export default {
    name:'helloWorldComponent',
    data(){
        return {
            array:Array(100).fill(1)
        }
    }
}
</script>

