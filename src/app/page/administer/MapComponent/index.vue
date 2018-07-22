<template>
    <div class="map">
        <div class="map-container" id="container"></div>
    </div>
</template>
<script>
export default {
    name:'mapComponent',
    data(){
        return {
            ak:'75Z8M6ZCl8KBwaitW9XByp4XAE8O6i9P'
        }
    },
    mounted(){
        let map = new BMap.Map("container"); 
        let point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
    }
}
</script>
<style scoped>
.map{
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
    min-width: 400px;
    min-height: 400px;
    background-color: aqua;
}
.map-container{
    width: 100%;
    height: 100%;
}
</style>


