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
        if(!parent) return;
        if(this.mergeOption.isArray){
        }
    },
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
    findPath(child) {
      //imgPath为最终路径，如果有就直接返回
      if (child[this.mergeOption.imgPath]) {
        return child[this.mergeOption.imgPath];
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

