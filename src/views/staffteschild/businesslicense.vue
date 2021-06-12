<template>
 <div class="businesslicense">
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
            所属企业：<span style="color: rgb(255, 255, 255)">{{
              item.dept
            }}</span>
          </p>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          url: "http://219.139.195.18:7000/mnt/rec/image_2020-04-13/1d61aa3f-5c34-482a-8b85-55e8cae1e415.jpg",
          srcList: [
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-13/1d61aa3f-5c34-482a-8b85-55e8cae1e415.jpg",
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-13/1d61aa3f-5c34-482a-8b85-55e8cae1e415.jpg",
          ],
          dept: "华中师范大学",
        },
         {
          url: "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          srcList: [
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          ],
          dept: "华中师范大学",
        },
         {
          url: "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          srcList: [
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
            "http://219.139.195.18:7000/mnt/rec/image_2020-04-15/c0abf19b-2070-4518-85de-503a6bb22112.JPG",
          ],
          dept: "华中师范大学",
        }
         
      ],
    };
  },
   methods: {
    },
};
</script>

<style lang="less" scoped>
 .businesslicense{
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
 }
</style>