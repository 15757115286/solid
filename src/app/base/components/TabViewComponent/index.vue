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
            <div class="view-container" ref="container">
                <transition v-if="needCache"
                    @beforeEnter="beforeEnter"
                    @enter="enter"
                    @afterEnter="afterEnter"
                    @beforeLeave="beforeLeave"
                    @leave="leave"
                    @afterLeave="afterLeave"
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
      if (this.needAnimation) {
        if(this.isAnimation || this.index == index) return;
        this.isAnimation = true;
        this.lastIndex = this.index;
        this.index = index;
      }
      this.currentComponent = componentObj.component;
    },
    beforeEnter(el) {
      if (this.needAnimation && this.lastIndex > this.index) {
        this.container.classList.add("view-animation");
        this.container.classList.add("go-front-animation");
        el.classList.add("go-front");
      }
    },
    enter(el, done) {
      let duration = this.getDuration();
      setTimeout(done, duration);
    },
    afterEnter(el) {
      if (this.needAnimation && this.lastIndex > this.index) {
        this.container.classList.remove("view-animation");
        this.container.classList.remove("go-front-animation");
        el.classList.remove("go-front");
        this.isAnimation = false;
      }
    },
    beforeLeave(el) {
      if (this.needAnimation && this.lastIndex < this.index) {
        this.container.classList.add("view-animation");
        this.container.classList.add("go-back-animation");
      }
    },
    leave(el, done) {
      let duration = this.getDuration();
      setTimeout(done, duration);
    },
    afterLeave(el) {
      if (this.needAnimation && this.lastIndex < this.index) {
        this.container.classList.remove("view-animation");
        this.container.classList.remove("go-back-animation");
        this.isAnimation = false;
      }
    },
    getDuration() {
      let computedStyle = getComputedStyle(this.container);
      let transitionDelay = parseFloat(computedStyle["transitionDuration"]);
      let animationDelay = parseFloat(computedStyle["animationDuration"]);
      let duration = transitionDelay || animationDelay || 0;
      return duration * 1000;
    }
  },
  created() {
    let currentComponentObj = this.tabComponents[0] || null;
    currentComponentObj &&
      (this.currentComponent = currentComponentObj.component);
  },
  mounted(){
    this.container = this.$refs.container; 
  },
  props: {
    tabComponents: {
      type: Array,
      default: []
    },
    needCache: {
      type: Boolean,
      default: true
    },
    needAnimation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentComponent: null,
      index: 0,
      lastIndex: -1,
      isAnimation: false,
      container:null
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

