<!--温度湿度检测数据列表 -->
<template>
  <div class="realTHList">
    <div class="title">
      <span>食品安全检测数据</span>
          <div>
              
    <el-radio-group v-model="radio1" size="mini" style="margin:0 20px 0 0">
      <el-radio-button label="今日"></el-radio-button>
      <el-radio-button label="历史"></el-radio-button>
    </el-radio-group>
  
            <span style="font-weight:400">筛选：</span>
        <el-select size="mini" @change="serchFuc" v-model="warningType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div style=" height: 580px;">
      <dv-scroll-board :mouseover="mouseover" :config="config" style="width: 100%; height: 100%" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio1:'今日',
      warningType: "",
      options: [
        {
          value: "全部市场",
          label: "全部市场",
        },
        {
          value: "东湖开发区公共服务中心1餐厅",
          label: "东湖开发区公共服务中心1餐厅",
        }
      ],
      config: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let config = {};
      config.header = [
        "检测时间",
        "检测编号",
        "市场名称",
        "被检单位",
        "样品名称",
        "产地",
        "检测项目",
        "检测值",
        "标准结果",
        "检测人"
      ];
      config.data = [];
      config.waitTime = 1500;
      config.labelLineBendGap="10%",
      config.headerHeight = 24;
      config.headerBGC = "#182b5b";
      config.oddRowBGC = "rgba(3, 33, 96, 0.6)";
      config.evenRowBGC = "rgba(10, 26, 70, 0.6)";
      config.columnWidth = [90, 130, 70, 70, 70, 60,70,70,70,60];
      config.align= ['center','center','center','center','center','center','center','center','center','center'];
      config.rowNum=25
       config.columnHeight =24;
       config.carousel=true
      for (let i = 0; i < 100; i++) {
        config.data.push([
          "2021-05-23",
          "12345678912223",
          "和源餐饮",
          i,
          "西兰花",
          "四季山",
          "1.0%",
          "<10.0%",
          "合格",
          "李丽萍",
        ]);
      }
      this.config = config;
    },
    mouseover(  row){
    console.log(row)
    },
    serchFuc() {
      console.log(`
        预警类型：${this.warningType}
      `);
    },
  },
};
</script>
<style lang="less" scoped>
.realTHList {
  // margin: 10px;
  padding: 10px 10px 0;
  box-sizing: border-box;
  height: 100%;
  
  .title {
    margin-bottom: 10px;
    font-weight: 700;
    color: #16d0ff;
    font-size: 14px;
    line-height: 28px;
    justify-content: center;
    justify-items: center;
        display: flex;
        &>div{
          flex: 70%;
        }
        &>span{

          display: block;
          flex: 30%;
        }
    &::before {
      content: "";
      width: 6px;
      height: 6px;
      display: inline-block;
      margin-right: 4px;
      background-color: #16d0ff;
      position: relative;
      top:100%;
      transform: translateY(200%);
    }
  }
  /deep/.el-radio-button  .el-radio-button__inner {
    border-radius:0; 
}
/deep/.el-radio-button__inner {

    background:transparent ;
    border: 0 ;
    color: #fff;

}
/deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
    color: #FFFFFF;
    background-color: #4cc6d5;
    border-color: #4cc6d5;
    box-shadow: 0 0 0 0 #4cc6d5;
}
      /deep/.el-input {
      .el-input__inner {
        background-color: rgba(3, 43, 100, 0.5);
        border-color: grey;
        color: #fff;
      }
      .el-input__prefix {
        color: #fff;
      }
    }
    .el-input--mini {
      width: 100px;
      .el-input__inner {
        padding-right: 2px;
        height: 20px;
        line-height: 20px;
      }
    }
    .el-input--mini .el-input__icon {
      line-height: 20px;
    }
  /deep/.dv-scroll-board {
    .header {
      font-size: 12px;
      color: #247ce1;
    }
    .rows {
      
      .row-item {
        font-size: 12px;
        height: 30px !important;
        line-height: 30px !important;
       &>.ceil{
          color: #f1f1f1 !important;
        text-align: center !important;
       }
      }
    }
  }
}
</style>