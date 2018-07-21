<template>
    <div>
        <h4>test</h4>
        <tree-component ref="tree" :data="data" :option="option" 
            @selected="selected($event)" @expand="expand($event)" 
            @check="check($event)"
            style="width:400px;height:500px;"></tree-component>
        <div>
            <button @click="deleteChecks()">删除勾选节点</button>
            <button @click="addNode()">新增节点</button>
        </div>
    </div>
</template>
<script>
import TreeComponent from "app/base/components/TreeComponent";
import getData from "./data";
import refersh from "@/assets/img/refresh.png";
let num = 100;
export default {
  name: "treeTestComponent",
  data() {
    return {
      data: getData(),
      option: {
        key: "id",
        value: "name",
        showIcon: true,
        showCheckBox: true,
        needAnimation: false,
        needChangeIcon: false,
        isAsync: true,
        needLink:false,
        transImgPath(child) {
          if(child.level == 3) return refersh;
        },
        changeImgPath(child) {
          if (child.expand == true) {
            return require("../../../base/components/TreeComponent/icon/dir_open.png");
          } else {
            return require("../../../base/components/TreeComponent/icon/dir_close.png");
          }
        },
        beforeRender(elem){
          if(elem.level == 3){
            elem.noData = true;
            console.log(this.option);
          }
        },
        loadData(child, callback) {
          setTimeout(() => {
            callback([
              {
                id: num++,
                name: "异步加载节点1",
                expand: false,
                selected: false
              },
              {
                id: num++,
                name: "异步加载节点2",
                expand: false,
                selected: false
              }
            ]);
          }, 300);
        }
      }
    };
  },
  components: {
    TreeComponent
  },
  methods: {
    selected(event) {
      console.log("selected", event);
      
    },
    expand(event) {
      console.log("expand", event);
    },
    check(event) {
      let checks = this.$refs.tree.getCheckedNodes();
      console.log("check", checks);
    },
    deleteChecks(){
        let checks = this.$refs.tree.getCheckedNodes();
        this.$refs.tree.deleteNodes(checks);
    },
    addNode(){
        let tree = this.$refs.tree;
        let selected = tree.getSelectedNode();
        if(selected){
            tree.addNodes(selected,{
                id: num++,
                name: "异步加载节点1",
            })
        }
    }
  }
};
</script>

