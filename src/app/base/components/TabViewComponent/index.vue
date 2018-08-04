<template>
    <div class="tabview wrapper">
        <div class="tabview tab">
            <ul class="tabview-ul">
                <li class="tabview-li" 
                    v-for="(componentObj,index) in tabComponents"
                    :class="{'tabview-selected':componentObj.component == currentComponent}">
                    <a class="tabview-a" href="#" @click.prevent="tabClick(componentObj,index)">{{ componentObj.name }}</a>
                </li>
            </ul>
        </div>
        <div class="tabview view">
            <div class="view-container">
                <transition v-if="needCache"
                    @beforeEnter="beforeEnter"
                    @enter="enter"
                    @afterEnter="afterEnter"
                    @enterCancelled="enterCancelled"
                    @beforeLeave="beforeLeave"
                    @leave="leave"
                    @afterLeave="afterLeave"
                    @leaveCancelled="leaveCancelled"
                    :css="false">
                    <keep-alive :include="include">
                        <component :is="currentComponent"></component>
                    </keep-alive>
                </transition>
                <component :is="currentComponent" v-else></component>
            </div>
        </div>
    </div>
</template>
<script>
import "./tabView.scss";
export default {
  methods: {
    tabClick(componentObj, index) {
      if (this.isAnimation || this.index == index) return;
      this.isAnimation = true;
      this.currentComponent = componentObj.component;
      this.lastIndex = this.index;
      this.index = index;
    },
    beforeEnter(el) {
    },
    enter(el, done) {
      let parentNode = el.parentNode;
      if (this.lastIndex > this.index) {
        parentNode.classList.add("view-animation");
        el.classList.add("go-front");
        parentNode.classList.add("go-front-animation");
      }
      setTimeout(() => {
        if (this.lastIndex > this.index) {
          parentNode.classList.remove("view-animation");
          el.classList.remove("go-front");
          parentNode.classList.remove("go-front-animation");
        }
        done();
      }, 300);
    },
    afterEnter(el) {
    },
    enterCancelled(el) {
    },
    beforeLeave(el) {
    },
    leave(el, done) {
      let parentNode = el.parentNode;
      if (this.lastIndex < this.index) {
        parentNode.classList.add("view-animation");
        parentNode.classList.add("go-back-animation");
      }
      setTimeout(() => {
        if (this.lastIndex < this.index) {
          parentNode.classList.remove("view-animation");
          parentNode.classList.remove("go-back-animation");
        }
        this.isAnimation = false;
        done();
      }, 300);
    },
    afterLeave(el) {
    },
    leaveCancelled(el) {
    }
  },
  created() {
    let currentComponentObj = this.tabComponents[0] || null;
    currentComponentObj &&
      (this.currentComponent = currentComponentObj.component);
  },
  props: {
    tabComponents: {
      type: Array,
      default: []
    },
    needCache: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentComponent: null,
      index: 0,
      lastIndex: -1,
      isAnimation: false
    };
  },
  computed: {
    include() {
      return this.tabComponents.map(componentObj => {
        return componentObj.component.name;
      });
    },
    hasComponent() {
      return this.tabComponents.length > 0;
    }
  }
};
</script>

