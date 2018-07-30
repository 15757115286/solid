<template>
    <ul class="tree-children" :id="transId">
      <transition-group :name="option.needAnimation ? 'fade' : 'none' ">
        <li v-for="child in data" :key="child[option.key]">
            <div class="tree-label">
                <span class="tree-font tree-direction" @click="toggle(child,$event)" 
                    v-if="!option.isAsync && child[option.children]">
                    <i class="fa fa-caret-right" aria-hidden="true" :class="{'tree-rotate': child[option.expand]}"></i>
                </span>
                <!-- 异步组件 -->
                <span class="tree-font tree-direction" v-if="option.isAsync && !child[option.noData]" @click="toggle(child,$event)">
                    <i class="fa fa-caret-right" aria-hidden="true" v-if="child.status != 'loading'"
                        :class="{'tree-rotate': child[option.expand]}"></i>
                    <i class="fa fa-spinner tree-loading" aria-hidden="true" v-else></i>
                </span>
                <span class="tree-checkbox" v-if="option.showCheckBox">
                    <input type="checkbox" v-model="child[option.checked]" @click="check(child,true,true)">
                </span>
                <span class="tree-font tree-title" @click="selected(child)" 
                      :class="{'tree-selected':child[option.selected],
                      'tree-matched':child[option.matched]}">
                    <img :src="child.imgPath" class="tree-icon" v-if="option.showIcon">
                    <span>{{ child[option.value] }}</span>
                </span>
            </div>
            <recursive-component :data="child[option.children]" :option="option" :parent="child" 
                v-if="hasChildren(child) && ((!option.isAsync) || (option.isAsync && child.status == 'loaded'))"
                :level="level + 1" :class="{'tree-hidden':!child[option.expand]}"
                :treeId="child[option.key]">
            </recursive-component>
        </li>
      </transition-group>
    </ul>
</template>
<script>
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
    },
    level: {
      type: Number,
      required: true
    },
    treeId:{
      default:'root'
    }
  },
  data() {
    return {
      copyOfData: this.data,
      copyOfParent: this.parent
    };
  },
  computed:{
    transId(){
      return `tree${this.treeOrder}-ul-${this.treeId}`;
    }
  },
  created() {
    //数据扁平化
    this.plainData.push(...this.copyOfData);
    //节点默认参数补齐
    let beforeRender = this.option.beforeRender;
    this.copyOfData.forEach(elem => {
      if (this.option.isAsync) {
        this.$set(elem, "status", "beforeLoad");
        this.$set(elem, this.option.children, []);
      }
      if (elem[this.option.parent] === undefined) {
        this.$set(elem, this.option.parent, this.copyOfParent);
      }
      if (
        elem[this.option.children] &&
        elem[this.option.expand] === undefined
      ) {
        this.$set(elem, this.option.expand, false);
      }
      if (elem[this.option.checked] === undefined) {
        this.$set(elem, this.option.checked, false);
      }
      if (elem[this.option.level] === undefined) {
        this.$set(elem, this.option.level, this.level);
      }
      if (this.option.needSearch && elem[this.option.matched] === undefined) {
        this.$set(elem, this.option.matched, false);
      }
      typeof beforeRender == "function" && beforeRender.call(this, elem);
      if (this.option.showIcon && elem.imgPath === undefined) {
        this.$set(elem, "imgPath", this.findPath(elem));
      }
    });
  },
  inject: ["findPath", "plainData","treeOrder","bus"],
  methods: {
    hasChildren(child) {
      return (
        child[this.option.children] && child[this.option.children].length > 0
      );
    },
    toggle(child, event) {
      if (this.option.isAsync && child.status != "loaded") {
        if (child.status == "loading") return;
        child.status = "loading";
        let loadData = this.option.loadData;
        if (typeof loadData == "function") {
          loadData(
            child,
            function(res) {
              if (Array.isArray(res)) {
                child[this.option.children].push(...res);
              }
              child[this.option.expand] = !child[this.option.expand];
              child.status = "loaded";
              child.imgPath = this.findPath(child, true);
              this.$nextTick(() => {
                this.bus.$emit("expand", child, true);
              });
            }.bind(this)
          );
        }
      } else {
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
            : child[this.option.dirCloseIcon] ||
              this.option.defaultDirCloseIcon;
        }
        path && (child.imgPath = path);
        this.bus.$emit("expand", child);
      }
    },
    check(child, checkChildren, checkParent) {
      this.$nextTick(() => {
        this.option.needLink &&
          this.recursiveCheck(child, checkChildren, checkParent);
        this.bus.$emit("check", child);
      });
    },
    recursiveCheck(child, checkChildren, checkParent) {
      let children = child[this.option.children];
      let parent = child[this.option.parent];
      if (checkChildren && children) {
        children.forEach(elem => {
          elem[this.option.checked] = child[this.option.checked];
          this.recursiveCheck(elem, true, false);
        });
      }
      if (checkParent && parent) {
        let checkedNum = 0;
        parent[this.option.children].forEach(elem => {
          if (elem[this.option.checked]) checkedNum++;
        });
        if (checkedNum === 0) {
          parent[this.option.checked] = false;
        } else {
          parent[this.option.checked] = true;
        }
        this.recursiveCheck(parent, false, true);
      }
    },
    selected(child) {
      this.bus.$emit("selected", child);
    }
  }
};
</script>
