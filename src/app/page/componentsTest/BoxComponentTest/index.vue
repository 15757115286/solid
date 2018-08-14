<template>
    <div style="padding:10px;">
        <h2 style="margin:20px 0;">组件测试</h2>
        <box-component 
            title="测试组件"
            iconClass="fa fa-bar-chart"
            :showIcon="true"
            :showFooter="showFooter">
            <Table :columns="columns1" :data="data1"></Table>
            <Button slot="footer" style="margin-right:10px;" @click="getData()">底部按钮1</Button>
            <Button slot="footer">底部按钮2</Button>
        </box-component>
        <button @click="showFooter = !showFooter">显示/隐藏底部</button>
    </div>
</template>
<script>
import BoxComponent from "app/base/components/BoxComponent";
export default {
  name: "boxTestComponent",
  components: {
    BoxComponent
  },
  data() {
    return {
      showFooter: true,
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  },
  methods:{
    getData(){
      this.$http.$post('mock/test').then(data=>{
        console.log(data);
      })
    }
  }
};
</script>




