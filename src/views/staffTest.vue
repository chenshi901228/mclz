<template>
    <div class="stafftest">
     
   <el-row :gutter="20">
      <el-col :span="5"
        ><div class="left-box">
            <dv-border-box-1>
                 <div class="top-search" v-if="shows">
             <LeftSerchInput :serchInput="serchInput" />
          </div>
          <div class="top-radio" v-if="shows">
            <div style="color:#4cc6d5">设备状态 :</div>
            <div>
              <div
                :class="radio == 1 ? 'radio activeRadio' : 'radio'"
                @click="onRadio(1)"
              >
                不限
              </div>
              <div
                :class="radio == 2 ? 'radio activeRadio' : 'radio'"
                @click="onRadio(2)"
              >
                在线
              </div>
              <div
                :class="radio == 3 ? 'radio activeRadio' : 'radio'"
                @click="onRadio(3)"
              >
                离线
              </div>
            </div>
          </div>
        <div class="wrap">
          <LeftList
            :dataList="menu"
            :listItemChange="listItemChange"
            :serchInputText="serchInputText"
          />
        </div>
            </dv-border-box-1>
         
        </div></el-col
      >
  
            
<el-menu :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" @select="handleSelect" router >

     <el-menu-item v-for="item in power" :key="item.url" :index="item.url">
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
</el-menu>
    
          <el-col :span="19"
        >
         <div style="max-height:300px">
            <router-view></router-view>
         </div>
          </el-col>
        
    </el-row>
    </div>
</template>

<script>
import LeftList from "../components/temperatureHumidity/leftList";
import LeftSerchInput from "../components/temperatureHumidity/leftSerchInput";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers(
  "temperatureHumidity"
);
export default {
    data() {
      return {
        activeIndex: '/realtimemonitoring',
             serchInputText: "",
      input3: "",
      radio: 1,
      shows:true,
      power:[
        
                 {
                    title: "实时监控",
                    url: "/realtimemonitoring",
                    roles: ["admin"],
                },
                               {
                    title: "体温监测",
                    url: "/temperaturemonitoring",
                    roles: ["admin"],
                },
                               {
                    title: "人员健康证",
                    url: "/personnelhealth",
                    roles: ["admin"],
                },
                               {
                    title: "企业证照",
                    url: "/businesslicense",
                    roles: ["admin"],
                },
        
      ]
      };
    },
        components: {
 LeftSerchInput,
 LeftList
  },
  created(){

    this.activeIndex=this.$router.path
    this.$router.path='/realtimemonitoring'
    this.$router.push({
      path:'/realtimemonitoring'
    })
  },
     computed: {
    ...mapState(["menu", "currentData"]),
  },
  methods: {
        handleSelect(key, keyPath) {
        console.log(key, keyPath);
        if(keyPath[0]=='/realtimemonitoring'){
          this.shows=true
        }else{
          this.activeIndex=keyPath[0]
        this.$router.push({
      path:keyPath[0]
    })
    this.shows=false
        }
       
        // if(key==1){
        //     this.$router.push({
        //         path:'/staffteschild/realtimemonitoring'
        //     })
        // }
      },
        ...mapMutations(["dataChange"]),
    listItemChange(t) {
      this.dataChange(t);
    },
    onRadio(val) {
      this.radio = val;
    },
     // 搜索内容
    serchInput(t) {
      this.serchInputText = t;
    },
  },
}
</script>

<style lang="less" scoped>
.stafftest{
  margin: 10px 10px 20px ;
    // width: 100%;
   height: calc(100vh - 140px);
  min-height: 300px;
   max-height: 650px;
}
.el-menu-demo{
    display: flex   ;
    margin-top: .5rem;
}
.caidantext{
    
    display: flex;
    justify-content: center;
}
/deep/ .el-menu-item{
    color: #4cc6d5 !important;
       width: 6.41rem;
    height: 1.81rem;
       box-shadow: inset 0 0 9px 1px #2aaef2;
    background-color: #021544 !important;
    transform: skew(
-35deg
);
font-size: 1rem;
text-align: center;
 line-height:1.81rem; ;
    cursor: pointer;
    margin-left: 2.3rem;
}
/deep/.is-active{
        box-shadow: inset 0 0 9px 1px #2aaef2
}
  .left-box {
    width: 100%;
    max-height: 650px;
    min-height: 400px;
    height: 100%;
    margin-top: .5rem;
    margin-bottom: 1rem;
    border-radius: 20px;
     background-color: rgba(16, 32, 49, 0.5);
    // background-image: url(../assets/videoBg.e7297398.png);
    // background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-top: 0.2rem;
    box-sizing: border-box;
    .top-search,
    .top-radio {
      padding: 10px 10px 0;
    }
    .top-radio {
      display: flex;
      line-height: 1.5;
      margin-bottom: 10px;
      & > div:first-child {
        padding: 0 5%;
        box-sizing: border-box;
        // flex: 20%;
      }
      & > div:last-child {
        flex: 1;
        display: flex;
        flex-flow: row;
        .radio {
          width: 30%;
          background: #000;
          color: #fff;
          text-align: center;
          margin: 0 2px;
          border-radius: 3px;
        }
        .activeRadio {
          background: #409eff;
        }
      }
    }
     .wrap {
      padding: 10px 10px;
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
  

.el-row {
  height: 100%;
  margin-bottom: 20px;
}
.el-col {
  height: 100%;
  border-radius: 4px;
}
</style>
<style >
   
</style>