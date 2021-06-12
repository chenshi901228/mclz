<!--温度湿度模块 -->
<template>
  <div class="temperatureHumidity">
    <div class="leftList">
      <dv-border-box-1>
        <div style="padding: 10px">
          <leftSerchInput :serchInput="serchInput" />
        </div>
        <div class="wrap">
          <leftList
            :dataList="menu"
            :listItemChange="listItemChange"
            :serchInputText="serchInputText"
          />
        </div>
      </dv-border-box-1>
    </div>
    <div class="chartShow">
      <div class="thItems">
        <realChart title="实时温度" :option="temperature" />
        <realChart title="实时湿度" :option="humidity" />
      </div>
      <div class="realChartWrap">
        <realListChart :option="thOption" />
      </div>
    </div>
    <div class="realTHListWrap">
      <realTHList :thList="thList" />
    </div>
  </div>
</template>
<script>
import LeftList from "../components/temperatureHumidity/leftList"; //左侧监控列表
import LeftSerchInput from "../components/temperatureHumidity/leftSerchInput"; //左侧头部搜索框
import RealChart from "../components/temperatureHumidity/realChart"; //温度湿度图表
import RealListChart from "../components/temperatureHumidity/realListChart"; //温度湿度折线图
import RealTHList from "../components/temperatureHumidity/realTHList"; //温度湿度检测列表
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers(
  "temperatureHumidity"
);
export default {
  components: {
    leftList: LeftList,
    leftSerchInput: LeftSerchInput,
    realChart: RealChart,
    realListChart: RealListChart,
    realTHList: RealTHList,
  },
  data() {
    return {
      serchInputText: "",
      timer: null,
    };
  },
  computed: {
    ...mapState([
      "menu", //左侧列表数据
      "currentData", //左侧列表当前选中项
      "temperature", //温度图表配置项
      "humidity", // 湿度图表配置项
      "thOption", // 温湿度大数据面积图表配置项
      "thList", // 温湿度监控列表数据
    ]),
  },
  mounted() {
    // 温湿度大数据面积图标配置初始化
    this.realListChartDrawLine();
    // 温湿度监控列表数据初始化
    this.realTHListInit();
    // 温湿度实时监控更新
    this.timer = setInterval(this.realTHChart, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null;
  },
  methods: {
    ...mapMutations([
      "dataChange",
      "realListChartDrawLine",
      "realTHListInit",
      "realTHChart",
    ]),
    // 左侧列表选项点击
    listItemChange(t) {
      this.dataChange(t);
    },
    // 搜索内容
    serchInput(t) {
      this.serchInputText = t;
    },
  },
};
</script>
<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.temperatureHumidity {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  .leftList {
    width: 20%;
    height: 100%;
    background-color: rgba(16, 32, 49, 0.5);
    border-radius: 20px;
    .wrap {
      padding: 0 10px;
      height: 84%;
      overflow-y: auto;
      overflow-x: auto;
      scrollbar-color: transparent transparent;
      scrollbar-track-color: transparent;
      -ms-scrollbar-track-color: transparent;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        // height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: #2acaff;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 10px;
        background: rgba(76, 198, 213, 0.3);
      }
    }
  }
  .chartShow {
    width: 36%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .thItems {
      width: initial;
      height: 50%;
      display: flex;
      justify-content: space-between;
    }
    .realChartWrap {
      width: initial;
      height: 48%;
      background-color: rgba(16, 32, 49, 0.5);
    }
  }
  .realTHListWrap {
    width: 42%;
    height: 100%;
    padding: 6px 10px;
    box-sizing: border-box;
    background-color: rgba(11, 71, 113, 0.4);
  }
}
</style>