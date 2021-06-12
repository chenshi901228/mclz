<!--温度湿度图表 -->
<template>
  <div class="realChart">
    <div class="title">
      <p>{{ title }}</p>
    </div>
    <div style="width:100%;height:calc(100% - 30px)">
      <dv-charts style="width:100%;height:100%" :option="option" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "option"],
};
</script>
<style lang="less" scoped>
.realChart {
  width: 49%;
  height: 100%;
  background-color: rgba(16, 32, 49, 0.5);
  .title {
    text-align: center;
    background: linear-gradient(#49537a,#3d8eda);
    p {
      line-height: 30px;
      font-size: 18px;
      color: #16d0ff;
      font-weight: 700;
    }
  }
}
</style>