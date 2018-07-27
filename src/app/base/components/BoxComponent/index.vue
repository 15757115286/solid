<template>
    <div class="box-wrapper">
        <div class="box-header" :style="headStyle">
            <slot name="header">
                <i v-if="showIcon" class="box-icon" :class="iconClass"></i>
                <h2 class="box-title">{{ title }}</h2>
            </slot>
        </div>
        <div class="box-container" :class="boxRadius" :style="containerStyle">
            <slot>
                <span>{{ content }}</span>
            </slot>
        </div>
        <div class="box-footer" v-if="showFooter" :style="footerStyle">
            <slot name="footer">
            </slot>
        </div>
        
    </div>
</template>
<script>
export default {
  name: "boxComponent",
  props: {
    showFooter: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "标题"
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    iconClass: {
      type: String,
      default: "fa fa-tasks"
    },
    headStyle: {
      type: Object,
      default(){ return {} }
    },
    containerStyle: {
      type: Object,
      default(){ return {} }
    },
    footerStyle: {
      type: Object,
      default(){ return {} }
    }
  },
  data() {
    return {
        content:'内容部分'
    };
  },
  computed: {
    boxRadius() {
      return this.showFooter ? "" : "box-container-radius";
    }
  }
};
</script>
<style scoped>
.box-wrapper {
  position: relative;
  border-radius: 3px;
  background: #ffffff;
  margin-bottom: 15px;
  width: 100%;
  border: 1px solid #d1d7e1;
  box-shadow: none;
}
.box-header {
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #d1d7e1;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.box-icon {
  margin-right: 5px;
}
.box-title {
  display: inline-block;
  font-size: 12px;
  margin: 0;
  line-height: 1;
}
.box-container{
    padding: 10px;
}
.box-container-radius {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.box-footer {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top: 1px solid #d9dee4;
  padding: 15px 10px;
  background-color: #edf3f5;
}
</style>


