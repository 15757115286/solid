<template>
    <div class="imgbox-container" ref="container">
        <slot name="title">
            <div class="imgbox-title">
                <i class="fa fa-list" aria-hidden="true"></i>
                <span>{{ title }}</span>
            </div>
        </slot>
        <div class="imgbox-content">
            <slot>
                <div>
                    <span>ImgBox容器中没有任何项目</span>
                </div>
            </slot>
        </div>
    </div>
</template>
<script>
import "./container.scss";
import { ListenSizeChange } from "./listenSizeChange";
export default {
  name: "ImgBoxContainer",
  props: {
    title: {
      type: String,
      default: "图片容器"
    }
  },
  created() {
    let items = this.$slots.default;
    console.log(this.$slots);
    if (Array.isArray(items)) {
      items.forEach(item => {
        if (!/-ImgBoxItem$/.test(item.tag)) {
          throw new TypeError(`
          <ImgBoxContainer>组件内只能使用<ImgBoxItem>组件:
          当前slot中存在组件/元素有<${item.tag.match(/-?(.+)$/)[1]}>`);
          this.checked = false;
        }
      });
    }
  },
  /*activated 和 deactivated也需要监听/取消监听，防止在keep-alive的时候浪费性能*/
  mounted() {
    if (this.checked) {
      this.listenInstance = new ListenSizeChange(
        this.$refs.container,
        function() {
          this.circulate();
        }.bind(this),
        50
      );
      this.listenInstance.startListen();
      this.circulate();
    }
  },
  activated() {
    this.checked && this.listenInstance.startListen();
  },
  deactivated() {
    this.checked && this.listenInstance.stopListen();
  },
  destroyed() {
    this.checked && this.listenInstance.stopListen();
  },
  data() {
    return {
      listenInstance: null,
      checked: true,
      currentClass: ""
    };
  },
  methods: {
    /*该函数必须等到组件mounted的时候在调用 */
    circulate() {
      if (this.checked) {
        let items = this.$slots.default;
        let styleContainer = getComputedStyle(this.$refs.container);
        let widthContaienr = parseInt(styleContainer.width);
        let clazz = "";
        if (widthContaienr >= 500 && widthContaienr < 750) {
          clazz = "imgbox-half";
        } else if (widthContaienr >= 750 && widthContaienr < 1000) {
          clazz = "imgbox-third";
        } else if (widthContaienr >= 1000) {
          clazz = "imgbox-quarter";
        }
        if (Array.isArray(items)) {
          items.forEach(item => {
            this.currentClass && item.elm.classList.remove(this.currentClass);
            clazz && item.elm.classList.add(clazz);
          });
          this.currentClass = clazz;
        }
      }
    },
    /*该函数必须等到组件mounted的时候在调用 */
    circulateWidth() {
      if (this.checked) {
        let items = this.$slots.default;
        if (Array.isArray(items)) {
          let pattern = items[0];
          let styleItem = getComputedStyle(pattern.elm);
          let styleContainer = getComputedStyle(this.$refs.container);
          let heightItem = parseInt(styleItem.height);
          let widthContaienr = parseInt(styleContainer.width);
          let magnitude = (widthContaienr / heightItem) >> 0 || 1;
          let percent = (100 / magnitude).toFixed(2) + "%";
          items.forEach(item => {
            item.elm.style.width = percent;
          });
        }
      }
    }
  }
};
</script>

