<template>
  <div class="right">
    <div
      style="background: rgba(16, 32, 49, 0.4); margin: 0 0 10px; height: 310px"
    >
      <dv-border-box-8 :reverse="true">
      <div class="title title2">
        <span>近十天检测数量</span>
      </div>
      <div id="mumChart" style="width: 100%; height: 320px"></div>
      </dv-border-box-8>
    </div>
    <div style="background: rgba(16, 32, 49, 0.4); margin: 0; height: 320px">
          <dv-border-box-8 :reverse="true">
      <div class="title title2">
        <span>近十天检测合格率</span>
      </div>
      <div id="passChart" style="width: 100%; height: 320px"></div>
          </dv-border-box-8>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mumChart: null,
      passChart: null,
    };
  },
  methods: {
    Chart1() {
      this.mumChart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
                        itemStyle: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
          },
        ],
      });
    },
    Chart2() {
      this.passChart.setOption({
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "category",
          // type: 'value'
          boundaryGap: false,
          data: [0, 20, 40, 60, 80, 100],
        },
        series: [
          {
            data: [
              ["Mon", 100],
              ["Tue", 100],
              ["Wed", 100],
              ["Thu", 100],
              ["Fri", 100],
              ["Sun", 100],
            ],
            type: "line",
            areaStyle: {},
            itemStyle: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
          },
        ],
      });
    },
  },
  mounted() {
    this.mumChart = this.$echarts.init(document.getElementById("mumChart"));
    this.passChart = this.$echarts.init(document.getElementById("passChart"));
    this.Chart1();
    this.Chart2();
  },
};
</script>

<style lang="less" scoped>
.title {
  padding: 0 10px;
  font-weight: 700;
  color: #16d0ff;
  font-size: 14px;
  line-height: 28px;
  //   justify-content: center;
  justify-items: center;
  display: flex;
  &::before {
    content: "";
    width: 6px;
    height: 6px;
    display: inline-block;
    margin-right: 4px;
    background-color: #16d0ff;
    position: relative;
    top: 100%;
    transform: translateY(200%);
  }
}
</style>