<template>
  <div class="companyInfo">
    <div class="companyCode">
      <img
        @click="markHandle('imgPreview', companyInfo.companyCode)"
        :src="companyInfo.companyCode"
        alt=""
      />
      <p>
        企业名称：<span>{{ companyInfo.name }}</span>
      </p>
      <p>
        餐饮服务食品安全等级：<span>{{ companyInfo.level }}</span>
      </p>
      <p>
        企业其它信息：<span>{{ companyInfo.exit }}</span>
      </p>
      <el-button
        @click="markHandle('infoEdit', companyInfo)"
        class="infoEdit"
        type="primary"
        size="mini"
        >编辑</el-button
      >
    </div>
    <div class="licence">
      <div class="licenceEditBtn">
        <el-button
          @click="markHandle('licenceEdit', companyInfo.licenceList)"
          type="primary"
          size="mini"
          >编辑</el-button
        >
        <el-button
          @click="markHandle('licenceUpload')"
          type="primary"
          size="mini"
          >上传</el-button
        >
      </div>
      <ul>
        <li v-for="(item, index) in companyInfo.licenceList" :key="index">
          <img @click="markHandle('imgPreview', item.url)" :src="item.url" />
          <p>
            所属企业：<span>{{
              item.name.length > 9 ? item.name.slice(0, 9) + "..." : item.name
            }}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="mark" :style="`display:${this.markShow ? 'block' : 'none'}`">
      <div v-if="markType == 'imgPreview'" class="preview">
        <img :src="markShowImg" alt="" />
      </div>
      <div v-else-if="markType == 'infoEdit'" class="infoEdit">
        <el-form
          :model="infoEditFormData"
          ref="infoEditForm"
          label-width="160px"
          label-position="left"
          class="infoEditForm"
        >
          <el-form-item label="企业码" prop="companyCode">
            <el-upload
              action=""
              list-type="picture-card"
              :on-remove="companyCodeRemove"
              :on-change="companyCodeChange"
              :auto-upload="false"
              :file-list="fileList"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="infoEditFormData.name"></el-input>
          </el-form-item>
          <el-form-item label="餐饮服务食品安全等级" prop="level">
            <el-input v-model="infoEditFormData.level"></el-input>
          </el-form-item>
          <el-form-item label="其它信息" prop="exit">
            <el-input v-model="infoEditFormData.exit"></el-input>
          </el-form-item>
        </el-form>
        <div class="infoEditHandle">
          <el-button size="mini" type="primary" @click="infoEdit"
            >修改</el-button
          >
          <el-button size="mini" type="primary" @click="editCancel"
            >取消</el-button
          >
        </div>
      </div>
      <div v-else-if="markType == 'licenceEdit'" class="licenceEdit">
        <el-button @click="licenceEdit" size="mini" type="primary"
          >确认修改</el-button
        >
        <el-button @click="editCancel" size="mini" type="primary"
          >取消</el-button
        >
        <el-upload
          action=""
          :on-remove="licenceRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <div v-else class="licenceUpload">
        <el-form
          :model="licenceFormData"
          ref="licenceForm"
          label-width="160px"
          label-position="left"
          class="licenceForm"
        >
          <el-form-item label="许可证" prop="licenceImg">
            <el-upload
              action=""
              list-type="picture-card"
              :on-change="licenceImgChange"
              :auto-upload="false"
              :file-list="fileList"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="licenceFormData.name"></el-input>
          </el-form-item>
        </el-form>
        <div class="licenceUploadHandle">
          <el-button size="mini" type="primary" @click="licenceUploadHandle"
            >修改</el-button
          >
          <el-button size="mini" type="primary" @click="editCancel"
            >取消</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markShow: false, // 弹框显示/隐藏
      markType: "", //弹框类型=> imgPreview：图片预览  infoEdit：企业信息修改 licenceEdit：许可证编辑修改 licenceUpload：许可证上传
      markShowImg: "", //图片预览url地址
      // 企业信息
      companyInfo: {
        companyCode: require("../assets/companyCode.jpg"),
        name: "高新区中心食堂",
        level: "特级",
        exit: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, velit?",
        licenceList: [
          {
            name: "高新区中心食堂1高新区中心食堂1",
            url: require("../assets/foodex1.jpeg"),
          },
          { name: "高新区中心食堂2", url: require("../assets/foodex2.jpeg") },
          { name: "高新区中心食堂3", url: require("../assets/foodex3.jpeg") },
          {
            name: "高新区中心食堂1高新区中心食堂1",
            url: require("../assets/foodex1.jpeg"),
          },
          { name: "高新区中心食堂2", url: require("../assets/foodex2.jpeg") },
          { name: "高新区中心食堂3", url: require("../assets/foodex3.jpeg") },
        ],
      },
      // 企业信息表单
      infoEditFormData: {},
      // 企业许可证表单
      licenceFormData: {
        name: "",
        url: "",
      },
      fileList: [],
    };
  },
  mounted() {
    document.querySelector(".mark").addEventListener("click", (e) => {
      if (this.markShow && e.target.classList[0] == "mark") {
        this.markShow = false;
        this.fileList = [];
      }
    });
  },
  methods: {
    // 弹框内容
    markHandle(type, params) {
      switch (type) {
        case "imgPreview":
          this.markShowImg = params;
          break;
        case "infoEdit":
          this.infoEditFormData = { ...this.companyInfo };
          if (this.infoEditFormData.companyCode) {
            this.fileList.push({
              name: "code",
              url: this.infoEditFormData.companyCode,
            });
          }
          break;
        case "licenceEdit":
          this.fileList = params;
          break;
        case "licenceUpload":
          break;
      }
      this.markType = type;
      this.markShow = true;
    },
    // 左侧企业信息修改操作
    infoEdit() {
      this.$confirm("是否修改企业信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Object.assign(this.companyInfo, this.infoEditFormData);
          this.fileList = [];
          this.markShow = false;
          this.$message({
            type: "success",
            message: "企业信息修改成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 左侧企业信息取消操作
    editCancel() {
      this.fileList = [];
      this.markShow = false;
    },
    // 左侧企业信息企业码图片修改
    companyCodeChange(file, fileList) {
      console.log(file, fileList);
      this.infoEditFormData.companyCode = file.url;
    },
    // 左侧企业信息企业码图片删除
    companyCodeRemove(file, fileList) {
      console.log(file, fileList);
      this.infoEditFormData.companyCode = "";
    },

    // 许可证编辑修改
    licenceEdit() {
      this.$confirm("是否修改许可证书", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.companyInfo.licenceList = this.fileList;
          this.fileList = [];
          this.markShow = false;
          this.$message({
            type: "success",
            message: "修改许可证书成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除许可证
    licenceRemove(file, fileList) {
      this.fileList = fileList;
    },
    // 上传许可证图片改变
    licenceImgChange(file) {
      this.licenceFormData.url = file.url;
    },
    // 上传许可证操作
    licenceUploadHandle() {
      if (this.licenceFormData.url && this.licenceFormData.name) {
        this.$confirm("是否上传许可证书", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.companyInfo.licenceList.push(this.licenceFormData);
            this.markShow = false;
            this.$message({
              type: "success",
              message: "修改许可证书成功!",
            });
            this.licenceFormData = {};
            this.fileList = [];
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$alert("请完善表单", "提示", {
          confirmButtonText: "确定",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.companyInfo {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  .companyCode {
    width: 20%;
    height: 100%;
    background-color: rgba(11, 71, 113, 0.6);
    padding: 20px;
    position: relative;
    img {
      width: 100px;
      height: 100px;
    }
    p {
      margin-top: 10px;
      color: #72d8f7;
      line-height: 24px;
      span {
        color: #fff;
      }
    }
    .infoEdit {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
  .licence {
    width: 78%;
    height: 100%;
    // padding: 10px;
    background-color: rgba(11, 71, 113, 0.4);
    position: relative;
    .licenceEditBtn {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    ul {
      width: 100%;
      height: 100%;
      li {
        display: inline-block;
        margin: 10px 0 0 10px;
        width: 220px;
        img {
          width: 100%;
          height: 130px;
        }
        p {
          font-size: 14px;
          color: #53d1f7;
          width: 100%;
          span {
            color: #fff;
          }
        }
      }
    }
  }
  .mark {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(11, 71, 113, 0.9);
    & > div {
      padding: 20px;
      border: 2px solid #53d1f7;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .preview {
      display: inline-block;
      font-size: 0;
      img {
        max-width: 50vw;
        height: auto;
      }
    }
    .infoEdit {
      width: 50vw;
      background-color: #fff;
      .infoEditHandle {
        text-align: right;
      }
    }
    .licenceEdit {
      width: 50vw;
      height: 60vh;
      background-color: #fff;
      overflow-y: auto;
    }
    .licenceUpload {
      width: 50vw;
      // height: 60vh;
      background-color: #fff;
      .licenceUploadHandle {
        text-align: right;
      }
    }
  }
}
</style>