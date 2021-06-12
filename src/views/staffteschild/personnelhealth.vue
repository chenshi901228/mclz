<template>
  <div class="personnelhealth">
    <div class="main" style="margin-top:20px">
      <div class="list-wrapper">
        <div class="demo-image__preview" v-for="(item, i) in list" :key="i">
          <el-image
            style="width: 250px; height: 150px;margin:0 0 15px 0"
            :src="item.url"
            :preview-src-list="item.srcList"
          >
          </el-image>
          <p style="color: rgb(22, 208, 255);">
            姓名：<span style="color: rgb(255, 255, 255)">{{ item.name }}</span>
          </p>
          <p style="color: rgb(22, 208, 255);">
            所属企业：<span style="color: rgb(255, 255, 255)">{{
              item.dept
            }}</span>
          </p>
          <p style="color: rgb(22, 208, 255);">
            有效期至：<span style="color: rgb(255, 255, 255)">{{
              item.time
            }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="page">
         <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="100">
    </el-pagination>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
          currentPage1: 5,
      list: [
        {
          url: "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          srcList: [
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          ],
          name: "彭氏桃",
          dept: "华中师范大学",
          time: "2022-11-10",
        },
         {
          url: "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          srcList: [
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          ],
          name: "彭氏桃",
          dept: "华中师范大学",
          time: "2022-11-10",
        },
         {
          url: "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          srcList: [
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          ],
          name: "彭氏桃",
          dept: "华中师范大学",
          time: "2022-11-10",
        },
         {
          url: "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          srcList: [
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          ],
          name: "彭氏桃",
          dept: "华中师范大学",
          time: "2022-11-10",
        },
         {
          url: "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          srcList: [
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          ],
          name: "彭氏桃",
          dept: "华中师范大学",
          time: "2022-11-10",
        },
      ],
    };
  },
   methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
};
</script>

<style lang="less" scoped>
.personnelhealth {
  height: 100%;
  // max-height: 550px;
  // min-height: 200px;
  .main {
    min-height: 400px;
    height: 750px;
    height: 90%;
    .list-wrapper{
        display: flex;
        flex-wrap: wrap;

    }
    .demo-image__preview {
      margin: 15px;
    }
  }
  .page {
    min-height: 50px;
    .block{
        margin: 10px auto;
        width: 300px;
        /deep/.el-pagination .btn-prev,/deep/.el-pager li.btn-quickprev,/deep/.el-pager li.btn-quicknext,/deep/.el-pagination__total, /deep/.el-pager,/deep/.el-pagination {
            background: transparent;
            color: #f1f1f1;
        }
        /deep/.el-pager li{
            background: transparent;
        }
        /deep/.el-pagination .btn-next {
            background: transparent;
            color: #f1f1f1;
        }
        /deep/.el-pager /deep/li.active{
            color: rgb(255, 255, 255);
        }
        // /deep/.el-pager li {
        //     background: transparent;
        // }
        // /deep/.el-pagination{
        //     color: #f1f1f1;
        // }
        /deep/.el-pagination button:disabled{
             background: transparent;

        }
    }
  }
}
</style>