<template>
  <div>
    <div class="search-container" ref="input" v-if="mergeOption.needSearch" >
      <div class="icon-wrapper" @click="search($event)">
        <i class="fa fa-search search-icon" aria-hidden="true"></i>
      </div>
      <input 
        @keydown.enter="search($event)"
        class="search-input"
        type='text' 
        v-model="searchText" 
        :placeholder="placeholder">
    </div>
    
    <div class="tree-root" :style="{height:rootHeight}">
        <recursive-component :data="data" :option="mergeOption"  :level="level"></recursive-component>
    </div>
  </div>
</template>
<script>
import defaultOption from "./defaultOption";
import { getTreeOrder } from "./defaultOption";
import RecursiveComponent from "./recursive";
import createBus from "./bus";
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
    },
    placeholder: {
      type: String,
      default: "请输入节点名称"
    }
  },
  mounted() {
    if (this.mergeOption.needSearch) {
      this.height = parseFloat(getComputedStyle(this.$refs.input).height);
    }
  },
  created() {
    //合并默认的选项
    Object.assign(this.mergeOption, defaultOption, this.option);
    this.selected = function(child) {
      this.selectNode(child);
      this.$emit("selected", child);
    }.bind(this);
    this.expand = function(child, isAsync) {
      this.animationExpand(child, isAsync);
      this.$emit("expand", child);
    }.bind(this);
    this.check = function(child) {
      this.$emit("check", child);
    }.bind(this);
    this.bus.$on("selected", this.selected);
    this.bus.$on("expand", this.expand);
    this.bus.$on("check", this.check);
  },
  destroyed() {
    this.bus.$off("selected", this.selected);
    this.bus.$off("expand", this.expand);
    this.bus.$off("check", this.check);
  },
  data() {
    return {
      mergeOption: {},
      selected: null,
      expand: null,
      selected: null,
      check: null,
      level: 1,
      searchText: "",
      height: 0,
      plainData: [],
      matchNodes: [],
      treeOrder: getTreeOrder(),
      bus: createBus()
    };
  },
  computed: {
    rootHeight() {
      return this.height > 0 ? `calc(100% - ${this.height}px)` : false;
    }
  },
  components: {
    RecursiveComponent
  },
  methods: {
    search(event) {
      this.matchNodes.forEach(matchNode => {
        matchNode.matched = false;
      });
      this.matchNodes = []; //清空上次匹配到的内容。
      let searchKey = this.mergeOption.searchKey || this.mergeOption.value;
      let searchText = this.searchText.trim();
      let result = [];
      if (searchText != "") {
        this.plainData.forEach(node => {
          let value = node[searchKey];
          let match = null;
          if (value) {
            switch (typeof value) {
              case "number":
                value = value.toString();
              case "string":
                match = value.toString().match(this.searchText);
                if (match) {
                  node[this.mergeOption.matched] = true;
                  this.matchNodes.push(node);
                  result.push(node);
                }
                break;
              default:
                break;
            }
          }
        });
      }
      this.doExpand(result);
      this.$emit("search", {
        event,
        result
      });
    },
    getUlByNode(node) {
      return document.querySelector(
        `#tree${this.treeOrder}-ul-${node[this.mergeOption.key]}`
      );
    },
    animationExpand(child, isAsync = false) {
      if (this.mergeOption.needAnimation) {
        let ul = this.getUlByNode(child);
        ul && isAsync && (ul.style.display = "none"); //为了让第一次的动画的hack
        let animation = ul ? this.$A(ul) : null;
        if (child.expand) {
          animation && animation.show(150);
        } else {
          animation && animation.hidden(150);
        }
      }
    },
    doExpand(result) {
      let expandRoots = [];
      if (this.mergeOption.needAnimation) {
        result.forEach(node => {
          let parent = node[this.mergeOption.parent];
          let tempNode = null;
          //找到最上面未展开的节点，记录该节点就行，其余节点默认展开
          while (parent) {
            if (!parent[this.mergeOption.expand]) {
              if (tempNode) {
                let ul = this.getUlByNode(tempNode);
                ul && (ul.style.display = "block");
              }
              tempNode = parent;
            }
            parent = parent[this.mergeOption.parent];
          }
          if (tempNode && expandRoots.indexOf(tempNode) < 0) {
            expandRoots.push(tempNode);
          }
        });
      }
      //这个一定要放在后面，不然无法确定节点原本是否展开
      result.forEach(node => {
        this.expandSearchNodes([node]);
      });
      expandRoots.forEach(node => {
        this.animationExpand(node);
      });
    },
    expandSearchNodes(nodes) {
      nodes.forEach(node => {
        if (this.mergeOption.isAsync) {
          if (node.status == "loaded" && !node[this.mergeOption.noData]) {
            node[this.mergeOption.expand] = true;
          }
        } else {
          if (node[this.mergeOption.children]) {
            node[this.mergeOption.expand] = true;
          }
        }
        let parent = node[this.mergeOption.parent];
        if (parent) {
          parent[this.mergeOption.expand] = true;
          this.expandSearchNodes([parent]);
        }
      });
    },
    selectNode(node) {
      if (this.selected) {
        this.selected[this.mergeOption.selected] = false;
      }
      this.selected = node;
      node[this.mergeOption.selected] = true;
    },
    getSelectedNode() {
      return this.selected;
    },
    getCheckedNodes() {
      if (this.mergeOption.showCheckBox == false) return null;
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
        let pos = children.indexOf(node);
        pos >= 0 && children.splice(pos, 1);
        this.recursivePlainDelete(node);
      });
    },
    addNodes(parent, nodes) {
      if (!parent || !nodes) return false;
      //异步节点为加载前不能新增节点
      if (this.mergeOption.isAsync && parent.status != "loaded") return false;
      nodes = Array.isArray(nodes) ? nodes : [nodes];
      if (parent[this.mergeOption.children] == undefined) {
        this.$set(parent, this.mergeOption.children, []);
      }
      let beforeRender = this.mergeOption.beforeRender;
      nodes.forEach(node => {
        this.checkNode(node);
        this.$set(node, this.mergeOption.parent, parent);
        node.imgPath === undefined && (node.imgPath = null); //为了在push的时候自动添加响应
        if (node[this.mergeOption.level] === undefined) {
          this.$set(
            node,
            this.mergeOption.level,
            parent[this.mergeOption.level] + 1
          );
        }
        if (this.mergeOption.isAsync) {
          this.$set(node, "status", "beforeLoad");
          this.$set(node, this.mergeOption.children, []);
        }
        let children = parent[this.mergeOption.children];
        if (children && children.length > 0) {
          this.plainData.push(node); //如果children为0，那么新增节点会调用recursive组件中created中的push。
        }
        children.push(node);
        typeof beforeRender === "function" && beforeRender.call(this, node);
        node.imgPath = this.findPath(node);
      });

      //将父节点打开
      if (parent[this.mergeOption.expand] === undefined) {
        this.$set(parent, this.mergeOption.expand, true);
      } else {
        parent[this.mergeOption.expand] = true;
      }
      this.animationExpand(parent); //如果有动画则动画展开

      if (this.mergeOption.showIcon) {
        let path = this.findPath(parent, true);
        if (parent.imgPath === undefined) {
          this.$set(parent, this.mergeOption.imgPath, path);
        } else {
          parent.imgPath = path;
        }
      }
      return true;
    },
    checkNode(node) {
      if (node[this.mergeOption.checked] === undefined) {
        this.$set(node, this.mergeOption.checked, false);
      }
      if (node[this.mergeOption.selected] === undefined) {
        this.$set(node, this.mergeOption.selected, false);
      } else if (node[this.mergeOption.selected] === true) {
        this.selected[this.mergeOption.selected] = false;
        this.selected = node;
      }
      if (
        this.mergeOption.needSearch &&
        node[this.mergeOption.matched] === undefined
      ) {
        this.$set(node, this.mergeOption.matched, false);
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
    recursivePlainDelete(node) {
      let pos = this.plainData.indexOf(node);
      let children = node[this.mergeOption.children];
      if (Array.isArray(children)) {
        children.forEach(child => this.recursivePlainDelete(child));
      }
      pos >= 0 && this.plainData.splice(pos, 1);
    },
    //1.初始化数据（第一次加载）时候会为每个元素判断路径
    //2.会在新增节点时候为父元素和每个子元素重新判断路径
    //3.异步节点加载完毕的时候会为每个元素添加路径
    findPath(child, skip = false) {
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
      let file =
        child[this.mergeOption.fileIcon] || this.mergeOption.defaultFileIcon;
      let dirOpen =
        child[this.mergeOption.dirOpenIcon] ||
        this.mergeOption.defaultDirOpenIcon;
      let dirClose =
        child[this.mergeOption.dirCloseIcon] ||
        this.mergeOption.defaultDirCloseIcon;
      if (!this.mergeOption.isAsync && hasChildren) {
        if (child[this.mergeOption.expand]) {
          return dirOpen;
        } else {
          return dirClose;
        }
      } else if (!this.mergeOption.isAsync && !hasChildren) {
        return file;
      } else if (this.mergeOption.isAsync) {
        if (child[this.mergeOption.noData]) {
          return file;
        } else {
          if (child[this.mergeOption.expand]) {
            return dirOpen;
          } else {
            return dirClose;
          }
        }
      }
    }
  },
  provide() {
    return {
      findPath: this.findPath,
      plainData: this.plainData,
      treeOrder: this.treeOrder,
      bus: this.bus
    };
  }
};
</script>


