<template>
    <div class="left-bar">
       <item-component :data="items" :level="0"></item-component>
    </div>
</template>
<script>
import ItemComponent from './item'
import getMenuSoruce, { height, defaultIcon , setObserveMenu } from "@/assets/source/menu";
export default {
  name: "leftBarComponent",
  components:{
    ItemComponent
  },
  data() {
    return {
      menus: [],
      height,
      defaultIcon,
      items:null
    };
  },
  created() {
    this.menus = getMenuSoruce();
    setObserveMenu(this.$set,this.menus);
    this.items = {
      open:true,
      children:this.menus
    }
  },
  provide(){
    return {
      toggle:this.toggle,
      transNumToEn:this.transNumToEn,
      defaultIcon
    }
  },
  methods: {
    toggle(menu, event) {
      let elem = event.target;
      if(menu.stopToggle) return;
      menu && (menu.open = !menu.open);
      let ul = this.getMenuUl(elem);
      this.$A(ul).toggle(200);
    },
    recursive(child){
      let count = child.children.length;
      for(let m in child.children){
        if(child.children[m].open){
          count += this.recursive(child.children[m])
        }
      }
      return count;
    },
    getMenuUl(node){
      if(node.tagName.toLowerCase() == 'li'){
        return node.lastElementChild;
      }else{
        return this.getMenuUl(node.parentElement);
      }
    },
    transNumToEn(level){
      let array = ['first','second','third','fourth','fifth','sixth','eighth','ninth','ninth'];
      return array[level] || 'final';
    }
  }
};
</script>
<style>
.left-bar {
  position: fixed;
  left: 0px;
  width: 200px;
  top: 50px;
  bottom: 0px;
  overflow: auto;
}
.left-bar a {
  display: block;
  padding: 10px 5px 10px 12px;
}
.left-bar i + span {
  margin-left: 10px;
}
.pull-right {
  float: right;
  margin-right: 15px;
  transition: transform 0.3s;
}
.open .pull-right {
  transform: rotate(90deg);
}
.left-bar a span{
  user-select: none;
}
a.stop-toggle{
  cursor: not-allowed;
}
</style>


