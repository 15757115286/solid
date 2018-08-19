<template>
    <div id="imgBox">
        <h2>imgBox测试</h2>
        <img-box-container class="imgbox">
            <img-box-item v-for="(item,index) in items" :key="index">
                fdsfsdfds{{ index }}
            </img-box-item>
        </img-box-container>
    </div>
</template>
<script>
import { ImgBoxContainer, ImgBoxItem } from 'app/base/components/ImgBoxComponent'
export default {
    components:{
        ImgBoxContainer,
        ImgBoxItem
    },
    data(){
        return {
            items:Array(7)
        }
    }
}
</script>
<style scoped>
    #imgBox{
        padding: 10px;
    }
    .imgbox{
        margin-top: 10px;
    }
</style>


