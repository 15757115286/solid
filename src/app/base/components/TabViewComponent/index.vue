<template>
    <div class="tabview wrapper">
        <div class="tabview tab" 
          @mouseenter="showScrollBtn = true"
          @mouseleave="showScrollBtn = false"
          @mousewheel="mousewheel($event)">
          <i class="fa fa-chevron-left tabview-scroll scroll-left" aria-hidden="true" 
            v-if="showScrollBtn"
            @click="scrollLeft"></i>
          <i class="fa fa-chevron-right tabview-scroll scroll-right" aria-hidden="true" 
            v-if="showScrollBtn"
            @click="scrollRight"></i>
          <div class="tabview-scroll-container"
            ref="scroll">
            <ul class="tabview-ul"
              ref="tabs"
              :style="scrollStyle">
              <li class="tabview-li" 
                  v-for="(componentObj,index) in tabComponents"
                  :class="{'tabview-selected':componentObj.component == currentComponent}"
                  ref="tabsList">
                  <a class="tabview-a" href="#" @click.prevent="tabClick(componentObj,index)">{{ componentObj.name }}</a>
              </li>
            </ul>
          </div>
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
/* 还有resize事件没有写，到时候有空再写 */
import "./tabView.scss";
export default {
  methods: {
    scrollLeft() {
      let offset = this.getOffset();
      const { scroll } = this;
      let scrollWidth = scroll.offsetWidth;
      let nextOffset = offset - scrollWidth;
      this.setOffset(nextOffset > 0 ? nextOffset : 0)
    },
    scrollRight() {
      let offset = this.getOffset();
      const { tabs, scroll } = this;
      let scrollWidth = scroll.offsetWidth;
      let tabsWidth = tabs.offsetWidth;
      if (scrollWidth > tabsWidth) return;
      else {
        //此时不需要滚动
        if (scrollWidth + offset >= tabsWidth) return;
        else if (tabsWidth - offset >= scrollWidth * 2) {
          this.setOffset(scrollWidth + offset);
        } else {
          this.setOffset(tabsWidth - scrollWidth);
        }
      }
    },
    mousewheel(event){
      let direction = event.wheelDelta > 0 ?'left' : 'right';
      if(direction == 'left') this.scrollLeft();
      else this.scrollRight();
    },
    getTabStyle() {
      return getComputedStyle(this.$refs.scroll);
    },
    tabClick(componentObj, index) {
      if (this.needAnimation) {
        if (this.isAnimation || this.index == index) return;
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
      let duration = this.getDuration(this.container);
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
      let duration = this.getDuration(this.container);
      setTimeout(done, duration);
    },
    afterLeave(el) {
      if (this.needAnimation && this.lastIndex < this.index) {
        this.container.classList.remove("view-animation");
        this.container.classList.remove("go-back-animation");
        this.isAnimation = false;
      }
    },
    getDuration(el) {
      let computedStyle = getComputedStyle(el);
      let transitionDelay = parseFloat(computedStyle["transitionDuration"]);
      let animationDelay = parseFloat(computedStyle["animationDuration"]);
      let duration = transitionDelay || animationDelay || 0;
      return duration * 1000;
    },
    setOffset(val) {
      this.scrollStyle.transform = `translateX(${-val}px)`;
    },
    getOffset() {
      let reg = /translateX\(-?(\d+(?:.\d+)?)px\)/;
      let match = this.scrollStyle.transform.match(reg);
      return match ? Number(match[1]) : 0;
    },
    activeTab(index){
      let activeTab = this.tabsList[index];
      let tabBound = activeTab.getBoundingClientRect();
      let scrollBound = this.scroll.getBoundingClientRect();
      let offset = this.getOffset();
      if(tabBound.left < scrollBound.left){
        let val = scrollBound.left - tabBound.left;
        this.setOffset(offset - val);
      }else if(tabBound.right > scrollBound.right){
        let val = tabBound.right - scrollBound.right;
        this.setOffset(offset + val);
      }
    }
  },
  created() {
    let currentComponentObj = this.tabComponents[0] || null;
    currentComponentObj &&
      (this.currentComponent = currentComponentObj.component);
  },
  mounted() {
    this.container = this.$refs.container;
    this.tabs = this.$refs.tabs;
    this.tabsList = this.$refs.tabsList;
    this.scroll = this.$refs.scroll;
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
      container: null,
      tabs: null,
      scroll: null,
      showScrollBtn: false,
      offsetLeft: 0,
      tabsList: null,
      scrollStyle: {
        transform: "translateX(0px)"
      }
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
  },
  watch:{
    index(value){
      this.activeTab(value);
    }
  }
};
</script>

