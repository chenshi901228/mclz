<template>
  <div class="left">
    <div style="background: rgba(16, 32, 49, 0.3); margin-bottom: 10px">
      <div class="title" style="line-height: 2.5">
        <span>检测合格率</span>
        <div>
          <el-radio-group v-model="radio1" size="mini" @change="change" style="margin: 0">
            <el-radio-button label="今日"></el-radio-button>
            <el-radio-button label="周"></el-radio-button>
            <el-radio-button label="月"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div style="margin: 10px 0; height: 60px">
      <div class="num-boxs">
        <div v-for="item in List" :key="item.title" style="">
          <dv-border-box-8>
            <p class="num">{{ item.number }}</p>
            <p class="text">{{ item.title }}</p>
          </dv-border-box-8>
        </div>
      </div>
    </div>
    <div
      style="background: rgba(16, 32, 49, 0.3); margin: 10px 0; height: 260px"
    >
      <div class="title title2">
        <span>检测合格率</span>
        <div>
          <el-radio-group v-model="radio2" size="mini" style="margin: 0">
            <el-radio-button label="今日"></el-radio-button>
            <el-radio-button label="周"></el-radio-button>
            <el-radio-button label="月"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <el-select
        size="mini"
        style="float: right; width: 150px; margin-right: 20px; z-index: 999"
        @change="serchFuc"
        v-model="warningTypedata"
        :label="warningType"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
        <div></div>
      </el-select>
      <div id="chart" style="height: 260px; width: 100%"></div>
    </div>
    <div style="background: rgba(16, 32, 49, 0.4); margin: 0; height: 260px">
      <div class="title title2">
        <span>检测统计</span>
        <div>
          <el-radio-group v-model="radio3" size="mini" style="margin: 0">
            <el-radio-button label="今日"></el-radio-button>
            <el-radio-button label="周"></el-radio-button>
            <el-radio-button label="月"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <el-select
        size="mini"
        style="float: right; width: 150px; margin-right: 20px; z-index: 999"
        @change="serchFuc2"
        v-model="warningType1data"
        :label="warningType1"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div id="myChart2" style="width: 100%; height: 260px"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio1: "今日",
       radio2: "今日",
        radio3: "今日",
        warningType1data:'1',
         warningTypedata:'1',
    warningType1:"全部市场",
    warningType:"全部市场",
       options: [
        {
          value: "1",
          label: "全部市场",
        },
        {
          value: "2",
          label: "东湖开发区公共服务中心1餐厅",
        },
        {
          value: "3",
          label: "东湖开发区公共服务中心2餐厅",
        }
      ],
       List: [
               {
                    title: '检测数',
                    number: '1944',
                },
                {
                    title: '合格数',
                    number: '1666',
                }, {
                    title: '不合格数',
                    number: '200',
                },
        ],
        onchart2Data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.20],
            [11.5, 7.20],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68]
        ],
            mychart2:null,
            warningChart: null,
            myChart:null,
            tempChart: null,
            warningListVal: '0',
            warningData: [92, 34, 105, 42, 43, 110, 91, 27, 19, 3, 5, 22],
            // warningDate: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00', '2:00', '4:00', '6:00'],
            warningDate: ['0', '2',  '4', '6', '8', '11', '13',  '15', '17', '19', '21', '23'],
            myChartData:[ {value: 1048, name: '检测不合格'},
                {value: 735, name: '检测合格'},
            ]
    };
  },
methods:{
  change(tab){
      if(tab=='今日'){
        this.List=[ {
                    title: '检测数',
                    number: '200',
                },
                {
                    title: '合格数',
                    number: '166',
                }, {
                    title: '不合格数',
                    number: '34',
                },]
      }else if(tab=='周'){
  this.List=[ {
                    title: '检测数',
                    number: '4004',
                },
                {
                    title: '合格数',
                    number: '2004',
                }, {
                    title: '不合格数',
                    number: '2000',
                },]
      }else{
  this.List=[ {
                    title: '检测数',
                    number: '5555',
                },
                {
                    title: '合格数',
                    number: '3333',
                }, {
                    title: '不合格数',
                    number: '2222',
                },]
      }
  },
    onchart(){
        let titletext=this.warningType
 this.myChart.setOption({
    title: {
        text: titletext,
        // subtext: ,
        top:'30px',
        left: 'center',
        textStyle:{
              color:"#fff",
              
          },

    },
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: this.myChartData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}) 

    //  option && myChart.setOption(option);
    },
    onchart2(){
        let titletext=this.warningType1
     this.myChart2.setOption({
           title: {
        text: titletext,
        // subtext: ,
        left: 'center',
         top:'30px',
          textStyle:{
              color:"#fff"
          },
        

    },
             xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.warningDate,
                    axisLabel: {//修改坐标系字体颜色
                        show: true,
                        textStyle: {
                            color: "rgb(16, 32, 49)",
                            top:"20px"
                        }
                    },

                },
                yAxis: {
                    title:'次/',
                    type: 'value',
                     nameLocation: 'end',
        nameGap: 20,
        nameTextStyle: {
            fontSize: 16
        },
            tooltip: {
        trigger: 'item'
    },
        splitLine: {
            show: false
        }

                },
    series: [{
        symbolSize: 10,
        data:this.onchart2Data,
        type: 'scatter'
    }]
     })
    },   
      serchFuc(tab) {
       if(tab==1){
          this.myChartData=[ {value: 1048, name: '检测不合格'},
                {value: 735, name: '检测合格'},
            ]
       }else if(tab==2){
          this.myChartData=[ {value: 108, name: '检测不合格'},
                {value: 735, name: '检测合格'},
            ]
       }else{
           this.myChartData=[ {value:77, name: '检测不合格'},
                {value: 235, name: '检测合格'},
            ]
       }
              
       this.onchart()

    },
        serchFuc2(tab) {
        if(tab==3){
      this.onchart2Data=[
            [10.0,0],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 0],
            [12.5, 6.82],
            [9.15, 7.20],
            [11.5, 7.20],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 0],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 0],
            [5.02, 5.68]
        ]
        }else if(tab==2){
        this.onchart2Data=[
             [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 0],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.20],
            [11.5, 7.20],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 0],
            [4.05, 4.96],
            [6.03, 0],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68]
        ]
        }else{
           this.onchart2Data=[
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.20],
            [11.5, 7.20],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68]
        ]
        }
       
    this.onchart2()
        },
    warningChartChange(tab) {
            switch (tab.index) {
                case '0':
                    this.warningData = [92, 34, 105, 42, 43, 110, 91, 27, 19, 3, 5, 22];
                    this.warningDate = ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00', '2:00', '4:00', '6:00'];
                    break;
                case '1':
                    this.warningData = [631, 542, 572, 391, 611, 702, 558];
                    this.warningDate = ['周一', '周二', '周三', '周四', '周五', '周六', '周末'];
                    break;
                case '2':
                    this.warningData = [1733, 1212, 1655, 1492, 1573, 1406, 1544, 1308, 1489, 1420, 1542, 1612];
                    this.warningDate = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
                    break;
            }
            this.warningChartRender()
        },
        warningChartRender() {
            this.warningChart.setOption({
                tooltip: {
                    trigger: 'axis',

                },
                title: {
                    left: 'center',
                    text: '预警统计',
                    textStyle: {
                        color: '#fff',
                        top:"20px"
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.warningDate,
                    axisLabel: {//修改坐标系字体颜色
                        show: true,
                        textStyle: {
                            color: "rgb(16, 32, 49)"
                        }
                    },

                },
                yAxis: {
                    type: 'value',
                    axisLabel: {//修改坐标系字体颜色
                        show: true,
                        textStyle: {
                            color: "rgb(16, 32, 49)"
                        }
                    },

                },
                series: [
                    {
                        type: 'line',
                        symbol: 'none',
                        sampling: 'lttb',
                        itemStyle: {
                            color: 'rgb(255, 70, 131)'
                        },

                        areaStyle: {
                            color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        },
                        data: this.warningData
                    }
                ]
            })
        },
},
     
  mounted(){
        // this.warningChart = this.$echarts.init(document.getElementById('main_waring_chart'))
        this.myChart = this.$echarts.init(document.getElementById('chart'));
        this.myChart2=this.$echarts.init(document.getElementById('myChart2'))
        // this.warningChartRender()
        this.onchart()
        this.onchart2()
  }
};
</script>

<style lang="less" scoped>
.left {
  // border: 1px solid #f00;
  width: 100%;
  height: 100%;

  & > div {
    .title {
      padding: 0 10px;

      font-weight: 700;
      color: #16d0ff;
      font-size: 14px;
      line-height: 28px;
      justify-content: center;
      justify-items: center;
      display: flex;
      & > div {
      }
      & > span {
        display: block;
        flex: 1;
      }
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
      /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
        color: #4cc6d5;
        background-color: transparent;
        border-color: transparent;
        box-shadow: 0 0 0 0 #4cc6d5;
      }
      /deep/.el-radio-button__inner {
        background: transparent;
        color: #fff;
        border: 0;
      }
      /deep/.el-radio-button--mini /deep/.el-radio-button__inner {
        padding: 0px;
      }
      /deep/.el-input {
        .el-input__inner {
          background-color: transparent;
          border-color: transparent;
          color: #fff;
          font-size: 14px;
        }
        .el-input__prefix {
          color: #fff;
        }
      }
    }
    .title2::before {
      top: 0;
      margin-bottom: 5px;
    }
  }
  .num-boxs {
    width: 100%;
    height: 100%;
    margin-top: 0.23rem;
    // line-height: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & > div {
      // border: 1px solid #ccc;
      width: 30%;
      height: 100%;
      text-align: center;
      background: rgba(16, 32, 49, 0.2);
      .num {
        color: #16d0ff;
        font-size: 24px;
      }
      .text {
        color: #fff;
      }
    }
  }
  .warning_table {
    position: absolute;
    right: 5%;
  }
  /deep/.el-tabs--border-card {
    // margin-top: -40px;
    background: none;
    border: none;
    box-shadow: none;
    padding-left: 20px;
    .el-tabs__header {
      background: none;
      border: none;
    }
    .el-tabs__content {
      padding: 0;
    }
    .el-tabs__item {
      padding: 0 8px !important;
      color: #f5f5f5;
      text-align: center;
      &.is-active {
        background-color: rgba(16, 32, 49, 0.5);
        border-color: #4cc6d5;
      }
    }
  }
  .main_chart {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px 6px 0;
    box-sizing: border-box;
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
  .dv-border-box-8 /deep/.border-box-content {
    justify-content: center;
    flex-flow: column;
    display: flex;
  }
}
</style>