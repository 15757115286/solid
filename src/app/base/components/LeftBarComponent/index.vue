<template>
    <div class="left-bar">
        <ul class="first-menu-ul">
            <!--一级菜单的循环  -->
            <li v-for="menu in menus" class="first-menu-li">
                <a v-if="menu.hasChildren" @click.prevent="toggle(menu,$event)" 
                class="can-expend" :class="{open:menu.open ,'stop-toggle':menu.stopToggle}">
                    <i class="fa" :class = "menu.icon || defaultIcon" aria-hidden="true"></i>
                    <span class="menu-name">{{ menu.name }}</span>
                    <i class="fa fa-angle-right pull-right" aria-hidden="true"></i>
                </a>
                <router-link v-else :to="menu.path" >
                    <i class="fa" :class = "menu.icon || defaultIcon" aria-hidden="true"></i>
                    <span class="menu-name">{{ menu.name }}</span>
                </router-link>
                <ul v-if="menu.hasChildren" class="second-menu-ul"  
                 :style="{height:getMenuHeight(menu)}">
                    <!--二级菜单的循环  -->
                    <li v-for="menu2 in menu.children" class="second-menu-li">
                        <a v-if=" menu2.hasChildren " @click.prevent="toggle(menu2,$event)" 
                        class="can-expend" :class="{open:menu2.open ,'stop-toggle':menu.stopToggle}">
                          <i class="fa" :class = "menu2.icon || defaultIcon" aria-hidden="true"></i>
                          <span class="menu-name">{{ menu2.name }}</span>
                          <i class="fa fa-angle-right pull-right" aria-hidden="true"></i>
                        </a>
                        <router-link v-else :to="menu2.path">
                            <i class="fa" :class = "menu.icon || defaultIcon" aria-hidden="true"></i>
                            <span class="menu-name">{{ menu2.name }}</span>
                        </router-link>
                        <ul v-if="menu2.hasChildren" class="third-menu-ul"  
                          :style="{height:menu2.open ? menu2.children.length * height + 'px' : '0px' }">
                          <li v-for="menu3 in menu2.children" class="third-menu-li">
                            <router-link  :to="menu3.path">
                              <i class="fa" :class = "menu3.icon || defaultIcon" aria-hidden="true"></i>
                              <span class="menu-name">{{ menu3.name }}</span>
                            </router-link>    
                          </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
import getMenuSoruce, { height, defaultIcon , setObserveMenu } from "@/assets/source/menu";
export default {
  name: "leftBarComponent",
  data() {
    return {
      menus: [],
      height,
      defaultIcon
    };
  },
  created() {
    this.menus = getMenuSoruce();
    setObserveMenu(this.$set,this.menus);
  },
  methods: {
    toggle(menu, event) {
      let elem = event.target;
      if(elem.nodeName == 'A'){
        this.$A.getSize(elem.nextElementSibling);
      }
      if(menu.stopToggle) return;
      menu && (menu.open = !menu.open);
    },
     getMenuHeight(menu){
      if(!menu.open) return '0px';
      let count = menu.children.length;
      for(let m in menu.children){
        if(menu.children[m].open){
          count += menu.children[m].children.length;
        }
      }
      return this.height * count + 'px'; 
    }
  }
};
</script>
<style scoped>
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
.second-menu-ul,
.third-menu-ul {
  overflow: hidden;
  transition: height 0.3s;
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


