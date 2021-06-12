<!--温度湿度折线图 -->
<template>
  <div id="realListChart"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      dom: null,
    };
  },
  props: ["option"],
  watch: {
    option: {
      handler(value) {
        this.setOption(value);
      },
      deep: true,
    },
  },
  mounted() {
    // echart初始化
    this.init();
  },
  methods: {
    // 图表绘制更新
    setOption(value) {
      this.dom.setOption(value);
    },
    // echart初始化
    init() {
      let myChartDom = document.querySelector("#realListChart");
      this.dom = echarts.init(myChartDom);
      this.dom.setOption(this.option);
    },
  },
};
</script>
<style lang="less" scoped>
#realListChart {
  width: 100%;
  height: 100%;
}
</style>