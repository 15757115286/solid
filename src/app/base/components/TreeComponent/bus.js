import Vue from 'vue';
function createBus() {
    let bus = new Vue();
    return bus;
}
export default createBus;