<template>
    <div class="tree-root">
        <recursive-component :data="data" :option="mergeOption" :findPath="findPath"></recursive-component>
    </div>
</template>
<script>
import defaultOption from "./defaultOption";
import RecursiveComponent from "./recursive";
import bus from "./bus";
import "./tree.scss";
export default {
  name: "treeComponent",
  props: {
    data: {
      type: Array,
      required: true
    },
    option: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      mergeOption: {},
      selected: null,
      expand: null,
      selected: null,
      check: null
    };
  },
  components: {
    RecursiveComponent
  },
  methods: {
    getSelectedNode() {
      return this.selected;
    },
    getCheckedNodes() {
      let checks = [];
      this.data.forEach(elem => {
        this.recursiveGet(elem, checks);
      });
      return checks;
    },
    deleteNodes(nodes) {
      nodes = Array.isArray(nodes) ? nodes : [nodes];
      nodes.forEach(node => {
        let parent = node[this.mergeOption.parent];
        let children = parent ? parent[this.mergeOption.children] : this.data;
        if (node === this.selected) this.selected = null;
        children.splice(children.indexOf(node), 1);
      });
    },
    addNodes(parent, nodes) {
        if(!parent || !nodes) return false;
        //异步节点为加载前不能新增节点
        if(this.mergeOption.isAsync && parent.status != 'loaded') return false;
        nodes = Array.isArray(nodes) ? nodes : [nodes];
        if(parent[this.mergeOption.children] == undefined){
            this.$set(parent,this.mergeOption.children,[]);
            if(parent[this.mergeOption.expand] === undefined){
                this.$set(parent,this.mergeOption.expand,true);
            }else{
                parent[this.mergeOption.expand] = true;
            }
        }
        nodes.forEach(node=>{
            this.checkNode(node);
            this.$set(node,this.mergeOption.parent,parent);
            node.imgPath === undefined && (node.imgPath = null);
            parent[this.mergeOption.children].push(node);
            node.imgPath = this.findPath(node);
        })
        if(this.mergeOption.showIcon){
            let path = this.findPath(parent ,true);
            if(parent.imgPath === undefined){
                this.$set(parent,this.mergeOption.imgPath,path);
            }else{
                parent.imgPath = path;
            }
           
        }
        return true;
    },
    checkNode(node){
        if(node[this.mergeOption.checked] === undefined){
            this.$set(node,this.mergeOption.checked,false);
        }
        if(node[this.mergeOption.selected] === undefined){
            this.$set(node,this.mergeOption.selected,false);
        }else if(node[this.mergeOption.selected] === true){
            this.selected[this.mergeOption.selected] = false;
            this.selected = node;
        }
    }
    ,
    recursiveGet(elem, checks) {
      if (elem[this.mergeOption.checked]) {
        checks.push(elem);
      }
      let children = elem[this.mergeOption.children];
      if (children) {
        children.forEach(child => {
          this.recursiveGet(child, checks);
        });
      }
    },
    findPath(child ,skip = false) {
      //imgPath为最终路径，如果有就直接返回
      if (child.imgPath && !skip) {
        return child.imgPath;
      }
      let transImgPath = this.mergeOption.transImgPath;
      let path =
        (typeof transImgPath == "function" && transImgPath(child)) || null;
      if (path) return path;
      //看是否有icon
      let hasChildren = child[this.mergeOption.children];
      if (hasChildren) {
        if (child[this.mergeOption.expand]) {
          return (
            child[this.mergeOption.dirOpenIcon] || this.mergeOption.defaultDirOpenIcon
          );
        } else {
          return (
            child[this.mergeOption.dirCloseIcon] || this.mergeOption.defaultDirCloseIcon
          );
        }
      } else {
        return child[this.mergeOption.fileIcon] || this.mergeOption.defaultFileIcon;
      }
    }
  },
  created() {
    this.selected = function(child) {
      if (this.selected) {
        this.selected[this.mergeOption.selected] = false;
      }
      this.selected = child;
      child[this.mergeOption.selected] = true;
      this.$emit("selected", child);
    }.bind(this);
    this.expand = function(child, event, isAsync = false) {
      if (this.mergeOption.needAnimation) {
        let target = event.target;
        let targetName = target.tagName.toLowerCase();
        let ul =
          targetName == "i"
            ? target.parentElement.parentElement.nextElementSibling
            : target.parentElement.nextElementSibling;
        ul && isAsync && (ul.style.display = "none"); //为了让第一次都动画的hack
        let animation = ul ? this.$A(ul) : null;
        if (child.expand) {
          animation && animation.show(150);
        } else {
          animation && animation.hidden(150);
        }
      }
      this.$emit("expand", child);
    }.bind(this);
    this.check = function(child) {
      this.$emit("check", child);
    }.bind(this);
    Object.assign(this.mergeOption, defaultOption, this.option);
    bus.$on("selected", this.selected);
    bus.$on("expand", this.expand);
    bus.$on("check", this.check);
  },
  destroyed() {
    bus.$off("selected", this.selected);
    bus.$off("expand", this.expand);
    bus.$off("check", this.check);
  }
};
</script>

