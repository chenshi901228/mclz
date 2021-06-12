<!--左侧监控列表头部搜索框 -->
<template>
  <div class="leftSerchInput">
    <el-input
      placeholder="请输入搜索内容"
      suffix-icon="el-icon-search"
      v-model="inputData"
      @change="inputChange"
    >
    </el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputData: "",
    };
  },
  props: ["serchInput"],
  methods: {
    //失焦或enter触发
    inputChange(value) {
      this.serchInput(value);
    },
  },
};
</script>
<style lang="less" scoped>
.leftSerchInput {
  width: 100%;
  // margin: 10px auto;
  border-radius: 4px;
  /deep/.el-input {
    .el-input__inner {
      border: none;
      color: #3abee9;
      &::placeholder {
        color: #fff;
      }
      background-color: rgba(12, 33, 88, 0.3);
    }
  }
}
</style>