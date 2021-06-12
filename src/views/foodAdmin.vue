<template>
    <div class="foodAdmin">
     <el-row :gutter="20">
  <el-col :span="6">
      <left></left><div >
      
      </div></el-col>
 
  <el-col :span="12"><div >
      <RealTHList></RealTHList></div></el-col>
      <el-col :span="6"><div >
      <right></right>
      </div></el-col>
</el-row>
    </div>
</template>

<script>
import RealTHList from "../components/foodAdmin/realTHList"; //温度湿度检测列表
import left from "../components/foodAdmin/left"; //温度湿度检测列表
import right from "../components/foodAdmin/right"; //温度湿度检测列表
export default {
  components:{
      RealTHList,
      left,
      right
  }
}
</script>

<style lang="less" scoped>
.foodAdmin{
      margin: 10px;
       height: calc(100vh - 100px);
    // height: calc(100vh - 10px);
    //   height: 80%;
    //   max-height:calc(100vh - 10px);
     min-height: 300px;
     .el-row{
         height: 100%;
     }
     .el-col{
          height: 100%;
           &:nth-child(2)>div{
        background-color: rgba(16, 32, 49, 0.4);
         height: 640px;
     }
     }
    
}
</style>