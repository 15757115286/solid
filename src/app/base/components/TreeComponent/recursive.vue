<template>
    <ul class="tree-children">
        <li v-for="child in data">
            <div class="tree-label">
                <span class="tree-font tree-direction" @click="toggle(child,$event)" 
                    v-if="child[option.children]">
                    <i class="fa fa-caret-right" aria-hidden="true" :class="{'tree-rotate': child[option.expand]}"></i>
                </span>
                <span class="tree-checkbox" v-if="option.showCheckBox">
                    <input type="checkbox" v-model="child[option.checked]" @click="check(child,true,true)">
                </span>
                <span class="tree-font tree-title" @click="selected(child)" :class="{'tree-selected':child[option.selected]}">
                    <img :src="child.imgPath" width="14px" v-if="option.showIcon">
                    <span>{{ child[option.value] }}</span>
                </span>
            </div>
            <recursive-component :data="child[option.children]" :option="option" :parent="child" v-if="hasChildren(child)"
                :class="{'tree-hidden':!child[option.expand]}"></recursive-component>
        </li>
    </ul>
</template>
<script>
import bus from "./bus";
export default {
  name: "recursiveComponent",
  props: {
    data: {
      type: Array,
      required: true
    },
    option: {
      type: Object,
      required: true
    },
    parent: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      copyOfData: this.data,
      copyOfParent: this.parent,
      checks:[]
    };
  },
  created() {
    this.copyOfData.forEach(elem => {
      if (!elem[this.option.parent]) {
        this.$set(elem, this.option.parent, this.copyOfParent);
      }
      if (!elem[this.option.checked]) {
        this.$set(elem, this.option.checked, false);
      }
      if (this.option.showIcon && !elem.imgPath) {
        this.$set(elem, "imgPath", this.findPath(elem));
      }
    });
  },
  methods: {
    hasChildren(child) {
      return (
        child[this.option.children] && child[this.option.children].length > 0
      );
    },
    toggle(child, event) {
      child[this.option.expand] = !child[this.option.expand];
      let changeImgPath = this.option.changeImgPath;
      let path = null;
      if (typeof changeImgPath == "function") {
        path = changeImgPath(child);
      }
      if (this.option.needChangeIcon && !path && path !== false) {
        let expand = child[this.option.expand];
        path = expand
          ? child[this.option.dirOpenIcon] || this.option.defaultDirOpenIcon
          : child[this.option.dirCloseIcon] || this.option.defaultDirCloseIcon;
      }
      path && (child.imgPath = path);
      bus.$emit("expand", child, event);
    },
    check(child ,checkChildren ,checkParent) {
      this.$nextTick(()=>{
          this.checks = [];
          this.recursiveCheck(child,checkChildren,checkParent);
          bus.$emit('check',child);
      })
    },
    recursiveCheck(child,checkChildren,checkParent){
        let children = child[this.option.children];
        let parent = child[this.option.parent];
        if (checkChildren && children) {
        children.forEach(elem => {
            elem[this.option.checked] = child[this.option.checked];
            this.recursiveCheck(elem,true,false);
        });
        }
        if(checkParent && parent){
            let checkedNum = 0;
            parent[this.option.children].forEach(elem=>{
                if(elem[this.option.checked]) checkedNum++;
            })
            if(checkedNum === 0){
                parent[this.option.checked] = false;
            }else{
                parent[this.option.checked] = true;
            }
            this.recursiveCheck(parent,false,true);
        }
    },
    selected(child) {
      bus.$emit("selected", child);
    },
    findPath(child) {
      //imgPath为最终路径，如果有就直接返回
      if (child[this.option.imgPath]) {
        return child[this.option.imgPath];
      }
      let transImgPath = this.option.transImgPath;
      let path =
        (typeof transImgPath == "function" && transImgPath(child)) || null;
      if (path) return path;
      //看是否有icon
      let hasChildren = child[this.option.children];
      if (hasChildren) {
        if (child[this.option.expand]) {
          return (
            child[this.option.dirOpenIcon] || this.option.defaultDirOpenIcon
          );
        } else {
          return (
            child[this.option.dirCloseIcon] || this.option.defaultDirCloseIcon
          );
        }
      } else {
        return child[this.option.fileIcon] || this.option.defaultFileIcon;
      }
    }
  }
};
</script>
