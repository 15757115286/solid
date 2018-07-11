<template>
    <div class="left-bar">
        <ul class="first-menu-ul">
            <li v-for="menu in menus" class="first-menu-li">
                <a v-if="menu.hasChildren" @click.prevent="toggle(menu,$event)">
                    <span class="menu-name">{{ menu.name }}</span>
                </a>
                <router-link v-else :to="menu.path">
                    <span class="menu-name">{{ menu.name }}</span>
                </router-link>
                <ul v-if="menu.hasChildren" class="second-menu-ul" :class="{open:menu.open}" 
                 :style="{height:menu.open ? menu.children.length * height + 'px' : '0px' }">
                    <li v-for="menu2 in menu.children" class="second-menu-li">
                        <router-link :to="menu2.path">
                            <span class="menu-name">{{ menu2.name }}</span>
                        </router-link>
                    </li>
                </ul>
            </li>

        </ul>
    </div>
</template>
<script>
import menus from "app/source/menu";
import { height } from "app/source/menu";
export default {
  name: "leftBarComponent",
  data() {
    return {
      menus: [],
      height
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
}
.left-bar a {
  display: block;
  padding: 10px 5px 10px 12px;
}
.second-menu-ul {
  overflow: hidden;
  transition: height 0.3s;
}
/* .second-menu-ul.open{
    height: 82px;
} */
</style>


