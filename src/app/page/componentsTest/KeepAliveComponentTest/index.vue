<template>
    <div>
        <button @click="addCache('component1')">component1</button>
        <button @click="addCache('component2')">component2</button>
        <button @click="addCache('component3')">component3</button>
        <keep-alive :include="_include">
            <component :is="current"></component>
        </keep-alive>
        <button @click="pruneCache('component1')">删除组件1cache</button>
        <button @click="pruneCache('component2')">删除组件2cache</button>
        <button @click="pruneCache('component3')">删除组件3cache</button>
        <div style="margin-top:30px;">
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
   /*  console.log("before invoke async function");
    let test = this.testAsync(123);
    console.log(test);
    test.then(p => console.log(p));
    console.log("after invoke async function"); */
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
    async testAsync(param) {
      console.log("begin async function");
      try {
        console.log("before await");
        let s = await ((console.log(123) || true) &&
          (function() {
            console.log(111);
            setTimeout(() => {
              return "xwtnzz3cccc";
            }, 3000);
            console.log(333);
          })());
        console.log(s);
        let j = await new Promise((res, rej) => {
          console.log("jjj invoke");
          setTimeout(() => {
            console.log("jjj resolve");
            //rej('xwtnzz3zz')
          }, 3000);
        });
        console.log(j);
      } catch (e) {
        console.log(e, e.message);
      }
      console.log("before ccc");
      let c = await param;
      console.log("c is ---------------", c);
      console.log("async function end");
      //return 1;
    },
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
</style>


