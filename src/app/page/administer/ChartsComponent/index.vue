<template>
    <div>
        <chart class="charts" :options="option"></chart>
    </div>
</template>
<script>
import getOption, { getLineOption, getGuageOption } from './data'
import 'app/base/components/EchartComponent'
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


