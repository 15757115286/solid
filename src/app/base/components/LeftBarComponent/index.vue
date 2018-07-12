<template>
    <div class="left-bar">
        <ul class="first-menu-ul">
            <li v-for="menu in menus" class="first-menu-li">
                <a v-if="menu.hasChildren" @click.prevent="toggle(menu,$event)" :class="{open:menu.open}">
                    <i class="fa" :class = "menu.icon || defaultIcon" aria-hidden="true"></i>
                    <span class="menu-name">{{ menu.name }}</span>
                    <i class="fa fa-angle-right pull-right" aria-hidden="true"></i>
                </a>
                <router-link v-else :to="menu.path" >
                    <i class="fa" :class = "menu.icon || defaultIcon" aria-hidden="true"></i>
                    <span class="menu-name">{{ menu.name }}</span>
                </router-link>
                <ul v-if="menu.hasChildren" class="second-menu-ul"  
                 :style="{height:menu.open ? menu.children.length * height + 'px' : '0px' }">
                    <li v-for="menu2 in menu.children" class="second-menu-li">
                        <router-link :to="menu2.path">
                            <i class="fa" :class = "menu.icon || defaultIcon" aria-hidden="true"></i>
                            <span class="menu-name">{{ menu2.name }}</span>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
import menus , { height , defaultIcon } from "@/assets/source/menu";
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
    this.menus = menus;
  },
  methods: {
    toggle(menu, event) {
      menu && (menu.open = !menu.open);
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
.second-menu-ul {
  overflow: hidden;
  transition: height 0.3s;
}
.left-bar i + span{
  margin-left: 10px;
}
.pull-right{
  float: right;
  margin-right: 15px;
  transition: transform 0.3s;
}
.open .pull-right{
  transform:rotate(90deg)
}
</style>


