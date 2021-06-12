<template>
  <div class="healthCards">
    <div class="showList">
      <ul>
        <li v-for="(item, index) in currentData" :key="index">
          <div class="edhandle">
            <el-button
              @click="editHandle('edit', item)"
              size="mini"
              type="primary"
              >编辑</el-button
            >
            <el-button @click="deleteHandle(item)" size="mini" type="primary"
              >删除</el-button
            >
          </div>
          <img :src="item.imgUrl" alt="" />
          <p>
            姓名：<span>{{ item.name }}</span>
          </p>
          <p>
            所属企业：<span :title="item.company">{{
              item.company.length > 9
                ? item.company.slice(0, 9) + "..."
                : item.company
            }}</span>
          </p>
          <p>
            有效期至：<span>{{ item.validDate }}</span>
          </p>
        </li>
        <li v-for="item in 10 - currentData.length" :key="-item"></li>
      </ul>
      <div class="handle">
        <el-button
          @click="editHandle('upload', null)"
          class="uploadBtn"
          size="mini"
          type="primary"
          >上传</el-button
        >
        <el-pagination
          @current-change="showListHandleCurrentChange"
          :current-page="healthCardsData.currentPage"
          :page-size="healthCardsData.pageSize"
          :background="false"
          layout="total, prev, pager, next"
          :total="healthCardsData.total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="mark" :style="`display:${markShow ? 'block' : 'none'}`">
      <div class="healthCardEdit">
        <el-form
          :model="healthCardFormData"
          ref="healthCardForm"
          label-width="160px"
          label-position="left"
          class="healthCardForm"
        >
          <el-form-item label="健康证" prop="companyCode">
            <el-upload
              action=""
              list-type="picture-card"
              :on-remove="healthCardRemove"
              :on-change="healthCardChange"
              :auto-upload="false"
              :file-list="fileList"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="healthCardFormData.name"></el-input>
          </el-form-item>
          <el-form-item label="所属企业" prop="company">
            <el-input v-model="healthCardFormData.company"></el-input>
          </el-form-item>
          <el-form-item label="有效期" prop="validDate">
            <el-input v-model="healthCardFormData.validDate"></el-input>
          </el-form-item>
        </el-form>
        <div class="healthCardEditHandle">
          <el-button size="mini" type="primary" @click="healthCardEditUpload">{{
            markType == "upload" ? "上传" : "修改"
          }}</el-button>
          <el-button size="mini" type="primary" @click="editCancel"
            >取消</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapGetters } =
  createNamespacedHelpers("healthCards");
export default {
  data() {
    return {
      markShow: false, // 弹框显示/隐藏
      markType: "",
      fileList: [],
      healthCardFormData: {},
    };
  },
  computed: {
    ...mapState(["healthCardsData"]),
    ...mapGetters(["currentData"]),
  },
  mounted() {
    this.randomData();
  },
  methods: {
    ...mapMutations([
      "randomData",
      "showListPageChange",
      "edit",
      "delete",
      "healthCardUpload",
    ]),
    // 翻页
    showListHandleCurrentChange(value) {
      this.showListPageChange(value);
    },
    // 编辑上传操作
    editHandle(type, value) {
      this.markShow = true;
      console.log(value);
      this.markType = type;
      if (value) {
        this.healthCardFormData = { ...value };
        this.fileList.push({
          name: "",
          url: this.healthCardFormData.imgUrl,
        });
      }
    },
    // 取消修改或上传
    editCancel() {
      this.fileList = [];
      this.healthCardFormData = {};
      this.markShow = false;
    },
    // 健康证图片修改
    healthCardChange(file, fileList) {
      console.log(file, fileList);
      this.healthCardFormData.imgUrl = file.url;
    },
    // 健康证图片删除
    healthCardRemove(file, fileList) {
      console.log(file, fileList);
      this.healthCardFormData.imgUrl = "";
    },
    // 健康证信息编辑修改
    healthCardEditUpload() {
      if (this.markType == "edit") {
        this.$confirm("是否修改人员健康证", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.edit(this.healthCardFormData);
            this.fileList = [];
            this.healthCardFormData = {};
            this.markShow = false;
            this.$message({
              type: "success",
              message: "人员健康证信息修改成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$confirm("是否上传人员健康证", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.healthCardUpload(this.healthCardFormData);
            this.fileList = [];
            this.healthCardFormData = {};
            this.markShow = false;
            this.$message({
              type: "success",
              message: "人员健康证信息修改成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    // 健康证信息删除
    deleteHandle(value) {
      this.$confirm("是否删除人员健康证", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delete(value);
          this.markShow = false;
          this.$message({
            type: "success",
            message: "人员健康证信息删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.healthCards {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: rgba(11, 71, 113, 0.6);
  .showList {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
      height: 86%;
    }
    li {
      width: 18%;
      height: 46%;
      position: relative;
      &:hover {
        .edhandle {
          display: block;
        }
      }
      .edhandle {
        position: absolute;
        z-index: 10;
        right: 0;
        top: 0;
        display: none;
      }
      img {
        width: 100%;
        height: calc(100% - 60px);
      }
      p {
        line-height: 20px;
        color: #53d1f7;
        font-size: 14px;
        span {
          color: #fff;
        }
      }
    }
    .handle {
      text-align: center;
      position: relative;
      /deep/.el-pagination {
        // margin-top: 10px;
        button,
        li {
          background-color: transparent;
          color: #fff;
        }
        .active {
          color: #4cc6d5;
          transform: scale(1.3);
        }
        span {
          color: #fff;
        }
      }
      .uploadBtn {
        // margin-bottom: 10px;
        position: absolute;
        right: 26%;
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
    .healthCardEdit {
      width: 50vw;
      background-color: #fff;
      .healthCardEditHandle {
        text-align: right;
      }
    }
  }
}
</style>