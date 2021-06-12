<template>
  <div class="disinfectionCheck">
    <div class="useCheck">
      <div class="title">
        <titleComponent title="消毒设备监控使用" />
        <el-select
          size="mini"
          @change="areaSelectChange(0)"
          v-model="areaSelect"
          placeholder="请选择"
        >
          <el-option
            v-for="item in areaSelectOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="number">
        <div v-for="item in overview" :key="item.lable" class="number-item">
          <dv-digital-flop
            :config="{
              number: [item.value],
              content: '{nt}',
              style: {
                fontSize: 26,
                fill:
                  item.lable == '不在线'
                    ? warningColor
                    : item.lable == '在线'
                    ? successColor
                    : '#53d1f7',
              },
            }"
            style="width: 80%; height: 40px"
          /><span
            :style="`color:${
              item.lable == '不在线'
                ? warningColor
                : item.lable == '在线'
                ? successColor
                : '#53d1f7'
            }`"
            >{{ item.lable }}</span
          >
        </div>
      </div>
      <div class="useCheckChart">
        <dv-charts style="width: 100%; height: 160px" :option="option" />
      </div>
      <div class="useCheckList">
        <dv-scroll-board :config="config" style="width: 100%; height: 100%" />
      </div>
    </div>
    <div class="highDetection">
      <div class="title">
        <titleComponent title="高温检测数据" />
        <div style="width: 60%; display: flex; justify-content: end">
          <span style="width: 60px; color: #53d1f7; font-size: 14px"
            >筛选：</span
          >
          <el-select
            size="mini"
            @change="areaSelectChange(1)"
            v-model="highAreaSelect"
            placeholder="请选择"
          >
            <el-option
              v-for="item in highAreaSelectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="highDetectionList">
        <dv-scroll-board :config="highConfig" style="width: 100%; height: 100%" />
      </div>
    </div>
    <div class="uvcAndRat">
      <div class="uvc">
        <div class="title">
          <titleComponent title="紫外线检测数据" />
          <div style="width: 60%; display: flex; justify-content: end">
            <span style="width: 60px; color: #53d1f7; font-size: 14px"
              >筛选：</span
            >
            <el-select
              size="mini"
              @change="areaSelectChange(2)"
              v-model="uvcAreaSelect"
              placeholder="请选择"
            >
              <el-option
                v-for="item in uvcAreaSelectOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="uvcList">
          <dv-scroll-board
            :config="uvcConfig"
            style="width: 100%; height: 100%"
          />
        </div>
      </div>
      <div class="rat">
        <div class="title">
          <titleComponent title="挡鼠板检测数据" />
          <div style="width: 60%; display: flex; justify-content: end">
            <span style="width: 60px; color: #53d1f7; font-size: 14px"
              >筛选：</span
            >
            <el-select
              size="mini"
              @change="areaSelectChange(3)"
              v-model="ratAreaSelect"
              placeholder="请选择"
            >
              <el-option
                v-for="item in ratAreaSelectOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="ratList">
          <dv-scroll-board
            :config="ratConfig"
            style="width: 100%; height: 100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleComponent from "../components/common/title";
export default {
  components: {
    titleComponent: TitleComponent,
  },
  data() {
    return {
      successColor: "#67C23A", //正常数据颜色
      warningColor: "#F56C6C", //预警数据颜色
      // 左侧监控总览数据
      overview: [
        { lable: "总数", value: 76 },
        { lable: "在线", value: 56 },
        { lable: "不在线", value: 20 },
      ],
      //   左侧图标配置项
      option: {
        color: ["#67C23A", "#F56C6C"],
        series: [
          {
            type: "pie",
            percentToFixed:1,
            data: [
              { name: "在线", value: 93 },
              { name: "不在线", value: 32 },
            ],
            insideLabel: {
              show: true,
              style: {
                fontSize: 14,
              },
            },
            outsideLabel: {
              formatter: "{name}/{value}",
              labelLineEndLength: 30,
              labelLineBendGap: "10%",
              style: {
                fontSize: 16,
              },
            },
          },
        ],
      },
      //   左侧列表数据
      config: {
        header: ["温感设备", "检测时间", "状态"],
        headerBGC: "rgba(11, 71, 113, 0.8)",
        oddRowBGC: "rgba(11, 71, 113, 0.7)",
        evenRowBGC: "rgba(11, 71, 113, 0.4)",
        headerHeight: 20,
        align: ["left", "left", "center"],
      },
      //   左侧消毒设备监控下拉框值
      areaSelect: "全部企业",
      //   左侧消毒设备监控下拉选项
      areaSelectOption: [
        {
          value: "全部企业",
          label: "全部企业",
        },
        {
          value: "东湖开发区公共服务中心1餐厅",
          label: "东湖开发区公共服务中心1餐厅",
        },
        {
          value: "九峰大市场",
          label: "九峰大市场",
        },
        {
          value: "九峰新区生鲜市场",
          label: "九峰新区生鲜市场",
        },
      ],

      // 高温检测数据下拉框值
      highAreaSelect: "全部企业",
      // 高温检测数据下拉选项
      highAreaSelectOption: [
        {
          value: "全部企业",
          label: "全部企业",
        },
        {
          value: "东湖开发区公共服务中心1餐厅",
          label: "东湖开发区公共服务中心1餐厅",
        },
        {
          value: "九峰大市场",
          label: "九峰大市场",
        },
        {
          value: "九峰新区生鲜市场",
          label: "九峰新区生鲜市场",
        },
      ],
      // 高温检测数据列表项配置
      highConfig: {
        header: [
          "温感设备",
          "检测时间",
          "开机时间",
          "关机时间",
          "当天关机时常",
          "状态",
        ],
        headerBGC: "rgba(11, 71, 113, 0.8)",
        oddRowBGC: "rgba(11, 71, 113, 0.7)",
        evenRowBGC: "rgba(11, 71, 113, 0.4)",
        headerHeight: 12,
        columnWidth: [120, 110, 110, 110, 120, 80],
        rowNum: 12,
        align: ["left", "left", "left", "left", "center", "center"],
      },

      // 紫外线数据下拉框值
      uvcAreaSelect: "全部企业",
      // 紫外线数据下拉选项
      uvcAreaSelectOption: [
        {
          value: "全部企业",
          label: "全部企业",
        },
        {
          value: "东湖开发区公共服务中心1餐厅",
          label: "东湖开发区公共服务中心1餐厅",
        },
        {
          value: "九峰大市场",
          label: "九峰大市场",
        },
        {
          value: "九峰新区生鲜市场",
          label: "九峰新区生鲜市场",
        },
      ],
      // 紫外线数据列表项配置
      uvcConfig: {
        header: [
          "感应设备",
          "检测时间",
          `<p style="line-height:10px">强度(J/m<sup>2</sup>)</p>`,
        ],
        headerBGC: "rgba(11, 71, 113, 0.8)",
        oddRowBGC: "rgba(11, 71, 113, 0.7)",
        evenRowBGC: "rgba(11, 71, 113, 0.4)",
        headerHeight: 20,
        columnWidth: [110, 100, 100],
        rowNum: 10,
        align: ["left", "left", "center"],
      },

      // 挡鼠板数据下拉框值
      ratAreaSelect: "全部企业",
      // 挡鼠板数据下拉选项
      ratAreaSelectOption: [
        {
          value: "全部企业",
          label: "全部企业",
        },
        {
          value: "东湖开发区公共服务中心1餐厅",
          label: "东湖开发区公共服务中心1餐厅",
        },
        {
          value: "九峰大市场",
          label: "九峰大市场",
        },
        {
          value: "九峰新区生鲜市场",
          label: "九峰新区生鲜市场",
        },
      ],
      // 挡鼠板数据列表项配置
      ratConfig: {
        header: ["门磁传感器", "检测时间", "状态"],
        headerBGC: "rgba(11, 71, 113, 0.8)",
        oddRowBGC: "rgba(11, 71, 113, 0.7)",
        evenRowBGC: "rgba(11, 71, 113, 0.4)",
        headerHeight: 20,
        columnWidth: [110, 100, 100],
        rowNum: 10,
        align: ["left", "left", "center"],
      },
    };
  },
  mounted() {
    // 4个列表数据初始化
    this.randomList(0);
    this.randomList(1);
    this.randomList(2);
    this.randomList(3);
  },
  methods: {
    // 生成随机列表数据
    randomList(code) {
      // code: 0 左侧消毒设备监控下拉选项  1 高温检测数据下拉选项 2 紫外线数据下拉选项 3 挡鼠板数据下拉选项
      let config = {};
      config.data = [];
      if (code == 0) {
        for (let i = 0; i < 120; i++) {
          config.data.push([
            "摄像头名称" + i,
            "2012-02-21",
            i % 2 == 0
              ? `<span style='color:${this.warningColor}'>不在线</span>`
              : `<span style='color:${this.successColor}'>在线</span>`,
          ]);
        }
        Object.assign(this.config, config);
        this.config = { ...this.config };
      } else if (code == 1) {
        for (let i = 0; i < 120; i++) {
          config.data.push([
            "摄像头名称" + i,
            "2012-02-21",
            "2012-03-11",
            "2012-03-11",
            i,
            i % 2 == 0
              ? `<span style='color:${this.warningColor}'>不在线</span>`
              : `<span style='color:${this.successColor}'>在线</span>`,
          ]);
        }
        Object.assign(this.highConfig, config);
        this.highConfig = { ...this.highConfig };
      } else if (code == 2) {
        for (let i = 0; i < 120; i++) {
          config.data.push(["摄像头名称" + i, "2012-02-21", `${i}`]);
        }
        Object.assign(this.uvcConfig, config);
        this.uvcConfig = { ...this.uvcConfig };
      } else {
        for (let i = 0; i < 120; i++) {
          config.data.push([
            "摄像头名称" + i,
            "2012-02-21",
            i % 2 == 0
              ? `<span style='color:${this.warningColor}'>不在线</span>`
              : `<span style='color:${this.successColor}'>在线</span>`,
          ]);
        }
        Object.assign(this.ratConfig, config);
        this.ratConfig = { ...this.ratConfig };
      }
    },

    //   左侧下拉框选项改变
    areaSelectChange(code) {
      // code: 0 左侧消毒设备监控下拉选项  1 高温检测数据下拉选项 2 紫外线数据下拉选项 3 挡鼠板数据下拉选项
      if (code == 0) {
        console.log(`消毒设备监控区域：${this.areaSelect}`);
        this.overview = [
          { lable: "总数", value: Math.floor(Math.random() * 88 + 12) },
          { lable: "在线", value: Math.floor(Math.random() * 88 + 12) },
          { lable: "不在线", value: Math.floor(Math.random() * 88 + 12) },
        ];
        this.option.series[0].data = [
          { name: "在线", value: Math.floor(Math.random() * 88 + 12) },
          { name: "不在线", value: Math.floor(Math.random() * 88 + 12) },
        ];
        // 图表数据重置
        this.option = { ...this.option };
      } else if (code == 1) {
        console.log(`高温检测数据区域：${this.highAreaSelect}`);
      } else if (code == 2) {
        console.log(`紫外线数据区域：${this.uvcAreaSelect}`);
      } else {
        console.log(`挡鼠板数据区域：${this.ratAreaSelect}`);
      }
      this.randomList(code);
    },
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.disinfectionCheck {
  width: 100%;
  height: calc(100vh - 80px);
  padding: 20px;
  // border: 1px solid pink;
  display: flex;
  justify-content: space-between;
  & > div {
    height: 100%;
    // border: 1px solid red;
  }
  /deep/.title {
    .el-input {
      .el-input__inner {
        background-color: transparent;
        border-color: #53d1f7;
        color: #fff;
      }
      .el-input__prefix {
        color: #fff;
      }
    }
    .el-input--mini {
      width: 120px;
      .el-input__inner {
        padding-right: 2px;
        height: 20px;
        line-height: 20px;
      }
    }
    .el-input--mini .el-input__icon {
      line-height: 20px;
    }
  }
  .useCheck {
    width: 26%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /deep/.title {
      line-height: 30px;
      padding: 0 10px;
      background-color: rgba(11, 71, 113, 0.4);
      box-shadow: 0 0 6px 0px #08406c inset;
      border-radius: 2px;
      display: flex;
      justify-content: space-between;
    }
    .number {
      display: flex;
      justify-content: space-between;
      .number-item {
        width: 30%;
        background: url("~@/assets/textBg.png") no-repeat center / cover;
        padding: 4px 0 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          font-size: 16px;
          color: #fff;
        }
      }
    }
    .useCheckChart {
      background-color: rgba(11, 71, 113, 0.4);
    }
    /deep/.useCheckList {
      width: 100%;
      height: 50%;
      background-color: rgba(11, 71, 113, 0.4);
      .header {
        font-size: 14px;
        color: #53d1f7;
      }
    }
  }
  .highDetection {
    width: 47%;
    padding: 0 10px;
    background-color: rgba(11, 71, 113, 0.6);
    .title {
      display: flex;
      line-height: 30px;
    }
    /deep/.highDetectionList {
      height: calc(100% - 40px);
      .header {
        font-size: 14px;
        color: #53d1f7;
      }
    }
  }
  .uvcAndRat {
    width: 26%;
    padding: 0 10px;
    background-color: rgba(11, 71, 113, 0.6);
    &>div{
      height: 50%;
    }
    .title {
      display: flex;
      line-height: 30px;
    }
    /deep/.uvcList {
      height: calc(100% - 30px);
      .header {
        font-size: 14px;
        color: #53d1f7;
      }
    }
    /deep/.ratList {
      height: calc(100% - 30px);
      .header {
        font-size: 14px;
        color: #53d1f7;
      }
    }
  }
}
</style>