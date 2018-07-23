<template>
    <div>
        <div class="charts" v-echarts="option"></div>
    </div>
</template>
<script>
import getOption from './data'
export default {
    data(){
        return {
            option:getOption()
        }
    }
}
</script>
<style scoped>
    .charts{
        width: 200px;
        height: 200px;
    }
</style>


