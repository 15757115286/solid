<template>
    <div>
        <div class="tb-container">
            <tab-view-component :tabComponents="components" :needCache="true" :needAnimation="true"></tab-view-component>
        </div>
    </div>
</template>
<script>
import component1 from "./TestComponents/component1";
import component2 from "./TestComponents/component2";
import component3 from "./TestComponents/component3";
import tabViewComponent from "app/base/components/TabViewComponent";
export default {
  name: "keepAliveComponentTest",
  created() {
    console.log("parent -> created");
  },
  destroyed() {
    console.log(this);
    console.log("parent -> destroyed");
  },
  data() {
    return {
      current: "component1",
      include: ["component1", "component2", "component3"],
      components: [
        {
          name: "组件1",
          component: component1
        },
        {
          name: "组件2",
          component: component2
        },
        {
          name: "组件3",
          component: component3
        }
      ]
    };
  },
  components: {
    component1,
    component2,
    component3,
    tabViewComponent
  },
  computed: {
    _include() {
      return this.include.join(",");
    }
  },
  methods: {
    addCache(componentName) {
      if (this.include.indexOf(componentName) < 0) {
        this.include.push(componentName);
      }
      this.current = componentName;
    },
    pruneCache(componentName) {
      let pos = this.include.indexOf(componentName);
      if (pos >= 0) {
        this.include.splice(pos, 1);
      }
    }
  }
};
</script>
<style scoped>
  .tb-container{
    padding: 10px;
    width: 200px;
    height: 250px;
    border:1px solid black;
    margin-left: 10px;
    margin-top: 10px;
  }
</style>


