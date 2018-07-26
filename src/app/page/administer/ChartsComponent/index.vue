<template>
    <div>
        <chart class="charts" :options="option"></chart>
    </div>
</template>
<script>
import getOption, { getLineOption, getGuageOption } from './data'
export default {
    data(){
        return {
            option:getLineOption()
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


