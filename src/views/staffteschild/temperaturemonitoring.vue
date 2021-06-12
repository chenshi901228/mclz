<template>
    <div class="temperaturemonitoring" >
      <div v-if="shows" class="titletext">区域：{{texts}}</div>
      <div class="boxtop">
          <div>
             <dv-border-box-8 class="boxtop-lefttop"><div style="color:#16d0ff" >今日检测</div></dv-border-box-8>
             <div class="boxtop-bottoms">
                 <div class="bits">
                     <div class="nums">0</div>
                     <div class="todaynums">今日检测人数</div>
                 </div>
                 <div class="bits">
                     <div class="nums" style="color:orange">1</div>
                     <div class="todaynums">体温异常</div>
                 </div>
                 <div class="bits">
                     <div class="nums" style="color:red">4</div>
                     <div class="todaynums">未戴口罩</div>
                 </div>
             </div>
          </div>
                    <div style="margin-left:3rem">
             <dv-border-box-8 class="boxtop-lefttop"><div style="color:#16d0ff;">今日检测</div></dv-border-box-8>
             <div class="boxtop-bottoms">
                 <div class="bits">
                     <div class="nums">0</div>
                     <div class="todaynums">今日检测人数</div>
                 </div>
                 <div class="bits">
                     <div class="nums" style="color:orange">1</div>
                     <div class="todaynums">体温异常</div>
                 </div>
                 <div class="bits">
                     <div class="nums" style="color:red">4</div>
                     <div class="todaynums">未戴口罩</div>
                 </div>
             </div>
          </div>
          <div>

          </div>
      </div>
      <div v-if="!shows">
            <dv-border-box-8 class="boxtop-lefttop"><div style="color:#16d0ff" >本月检测统计</div></dv-border-box-8>
            <div >
                 <div id="myChart" :style="{width: '1200px', height: '350px'}"></div>
            </div>
      </div>
       <div v-else>
            <dv-border-box-8 class="boxtop-lefttop"><div style="color:#16d0ff" >异常记录</div></dv-border-box-8>
       </div>
    </div>
</template>

<script>
import bus from '../../components/temperatureHumidity/bus'
    export default {
        data(){
         return{
             texts:"",
             shows:false
         }
        },
        created(){
              bus.$on('label',(value)=>{
                  console.log(value)
                  this.texts=value
                  if(value=='区域列表'){
                      this.shows=false
                  }else{
                      this.shows=true
                  }
              })
        },
               mounted() {
    this.drawLine();
  },
        methods:{
                  drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
 
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        // left: '3%',
        // right: '4%',
        // bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    textStyle:{
                fontSize:15,
                color:'#fff'
            },
series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
                    label: {
                show: true,
                position: 'top'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        }
    ]
      });
    },
        }
    }
</script>

<style lang="less" scoped>
#myChart{
     background-color:rgba(16, 32, 49, 0.5);
     margin-top: 1rem;
}
.titletext{
    font-size: 1.5rem;
   color:#16d0ff;
   margin-top: 1rem;
}
.boxtop{
    display:flex;
    font-size: .8rem;
    margin-top: 1rem;


    &-lefttop{
        width: 34.5rem;
        height: 3rem;
        margin-left: .5rem;
        line-height: 3rem;
        padding-left: 1rem;
        background-color:rgba(16, 32, 49, 0.5);
    }
    &-bottoms{
        display: flex;
       justify-content: space-around;
       padding: 1.5rem 0;
        .nums{
         color:#16d0ff;
         text-align: center;
         font-size: 2rem;
         margin-top: .5rem;
        }
        .todaynums{
            text-align: center;
           color: #fff;
        }
        .bits{
 width: 11.5rem;
 height: 5rem;
 background-color:rgba(16, 32, 49, 0.5);

        }
    }
}
</style>