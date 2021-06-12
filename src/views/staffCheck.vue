<template>
  <div class="staffCheck">
    <h1>从业人员晨检记录表:</h1>
    <el-table :data="currentData" height="74%" size="small">
      <el-table-column prop="id" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="员工姓名" width="80" align="center">
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.name"
          ></el-input>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="晨检内容" align="center">
        <el-table-column
          prop="clothing"
          label="衣帽整洁"
          width="80"
          align="center"
        >
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="$index == editIndex"
              v-model="editData.clothing"
            ></el-input>
            <span v-else>{{ row.clothing }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="hygiene"
          label="个人卫生"
          width="120"
          align="center"
        >
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="$index == editIndex"
              v-model="editData.hygiene"
            ></el-input>
            <span v-else>{{ row.hygiene }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="health"
          label="健康状况"
          width="120"
          align="center"
        >
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="$index == editIndex"
              v-model="editData.health"
            ></el-input>
            <span v-else>{{ row.health }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="problem" label="发现问题" align="center">
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="$index == editIndex"
              v-model="editData.problem"
              :autosize="{ minRows: 1 }"
              type="textarea"
            ></el-input>
            <span v-else>{{ row.problem }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="measures" label="整改措施" align="center">
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="$index == editIndex"
              v-model="editData.measures"
              :autosize="{ minRows: 1 }"
              type="textarea"
            ></el-input>
            <span v-else>{{ row.measures }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="detectionDate"
          label="晨检时间"
          width="120"
          align="center"
        >
          <template slot-scope="{ row, $index }">
            <el-date-picker
              v-if="$index == editIndex"
              v-model="editData.detectionDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              class="dateChoose"
            >
            </el-date-picker>
            <span v-else>{{ row.detectionDate }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              editIndex == scope.$index
                ? confirmEdit()
                : handleEdit(scope.$index, scope.row)
            "
            >{{ editIndex == scope.$index ? "修改" : "编辑" }}</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="
              editIndex == scope.$index
                ? cancelEdit()
                : handleDelete(scope.$index, scope.row)
            "
            >{{ editIndex == scope.$index ? "取消" : "删除" }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="newDataBtn" class="newDataBtn" size="mini"
      >+新增</el-button
    >
    <div class="page">
      <el-pagination
        @current-change="pageChange"
        @size-change="sizeChange"
        :current-page="staffCheckData.currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="staffCheckData.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="staffCheckData.total"
      >
      </el-pagination>
    </div>
    <div class="mark" :style="`display:${markShow ? 'block' : 'none'}`">
      <div>
        <el-table :data="[editData]" size="small">
          <el-table-column prop="id" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="员工姓名"
            width="80"
            align="center"
          >
            <el-input v-model="editData.name"></el-input>
          </el-table-column>
          <el-table-column label="晨检内容" align="center">
            <el-table-column
              prop="clothing"
              label="衣帽整洁"
              width="80"
              align="center"
            >
              <el-input v-model="editData.clothing"></el-input>
            </el-table-column>
            <el-table-column
              prop="hygiene"
              label="个人卫生"
              width="120"
              align="center"
            >
              <el-input v-model="editData.hygiene"></el-input>
            </el-table-column>
            <el-table-column
              prop="health"
              label="健康状况"
              width="120"
              align="center"
            >
              <el-input v-model="editData.health"></el-input>
            </el-table-column>
            <el-table-column prop="problem" label="发现问题" align="center">
              <el-input
                v-model="editData.problem"
                :autosize="{ minRows: 1 }"
                type="textarea"
              ></el-input>
            </el-table-column>
            <el-table-column prop="measures" label="整改措施" align="center">
              <el-input
                v-model="editData.measures"
                :autosize="{ minRows: 1 }"
                type="textarea"
              ></el-input>
            </el-table-column>
            <el-table-column
              prop="detectionDate"
              label="晨检时间"
              width="120"
              align="center"
            >
              <el-date-picker
                v-model="editData.detectionDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                class="dateChoose"
              >
              </el-date-picker>
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-button @click="newConfirm" type="primary" size="mini"
          >新增</el-button
        >
        <el-button @click="newCancel" type="primary" size="mini"
          >取消</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapGetters } =
  createNamespacedHelpers("staffCheck");
export default {
  data() {
    return {
      // 当前编辑行index
      editIndex: null,
      // 当前编辑行内容
      editData: {},
      // 新增弹框
      markShow: false,
    };
  },
  computed: {
    ...mapState(["staffCheckData"]),
    ...mapGetters(["currentData"]),
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations(["init", "edit", "addNew", "deleteOne"]),
    // 下拉选项
    selectChange(value) {
      console.log(value);
    },
    confirmFunc(
      { tips = "", confirmMsg = "", cancelMsg = "" },
      confirmCb = () => {},
      cancelCb = () => {}
    ) {
      this.$confirm(tips, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          confirmCb();
          this.$message({
            type: "success",
            message: confirmMsg,
          });
        })
        .catch(() => {
          cancelCb();
          this.$message({
            type: "info",
            message: cancelMsg,
          });
        });
    },
    //编辑行
    handleEdit(index, row) {
      if (JSON.stringify(this.editData) == "{}") {
        this.editData = JSON.parse(JSON.stringify(row)); //深拷贝
        this.editIndex = index;
      } else {
        this.confirmFunc(
          {
            tips: "是否保存并退出当前修改",
            confirmMsg: "保存修改成功",
            cancelMsg:"继续修改"
          },
          () => {
            this.edit(this.editData);
            this.editData = JSON.parse(JSON.stringify(row)); //深拷贝
            this.editIndex = index;
          }
        );
      }
    },
    // 删除行
    handleDelete(index, row) {
      this.$confirm("是否删除晨检记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteOne(row);
          this.$message({
            type: "success",
            message: "晨检记录删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 确认修改
    confirmEdit() {
      this.$confirm("是否修改晨检记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.edit(this.editData);
          this.editData = {};
          this.editIndex = null;
          this.$message({
            type: "success",
            message: "晨检记录修改成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    // 取消修改
    cancelEdit() {
      this.editData = {};
      this.editIndex = null;
    },
    // 新增行
    newDataBtn() {
      this.editData = {};
      this.editIndex = null;
      this.markShow = true;
    },
    // 确认新增
    newConfirm() {
      this.$confirm("是否新增晨检记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.addNew(this.editData);
          this.editData = {};
          this.markShow = false;
          this.$message({
            type: "success",
            message: "晨检记录新增成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消新增",
          });
        });
    },
    // 取消新增
    newCancel() {
      this.markShow = false;
      this.editData = {};
    },
    // 翻页
    pageChange(value) {
      this.staffCheckData.currentPage = value;
    },
    // 每页条数
    sizeChange(value) {
      this.staffCheckData.pageSize = value;
    },
  },
};
</script>

<style lang="less" scoped>
@bgColor: rgba(93, 173, 184, 0.5);
@txColor: #fff;
* {
  box-sizing: border-box;
}
.staffCheck {
  width: 100%;
  height: 100%;
  padding: 20px;
  h1 {
    font-size: 20px;
    color: #fff;
    text-align: center;
    margin-bottom: 10px;
  }

  /deep/.el-table {
    width: 100%;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    background-color: @bgColor;
    .dateChoose {
      width: 100%;
      input {
        padding: 0;
        text-align: center;
      }
      span {
        display: none;
      }
    }
    tbody {
      tr:hover > td {
        background-color: rgba(11, 71, 113, 0.9);
      }
    }
    .cell {
      color: @txColor;
    }
    th,
    tr {
      background-color: @bgColor;
    }
    .el-input__inner {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
    }
  }
  .newDataBtn {
    width: 100%;
    border-radius: 0;
    border-top: 0;
    background-color: @bgColor;
    color: @txColor;
    font-weight: 700;
    &:hover {
      background-color: rgba(11, 71, 113, 0.9);
    }
  }
  /deep/.page {
    width: 100%;
    padding: 10px 0;
    background-color: @bgColor;
    // background-color: rgba(255, 255, 255, 1);
    text-align: center;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    span,
    input,
    button,
    .number {
      color: @txColor;
    }
    .active {
      color: rgba(5, 36, 58, 0.9);
    }
    .el-input__inner,
    button,
    li {
      background-color: @bgColor;
    }
  }
  .mark {
    width: 100%;
    height: 100%;
    z-index: 99;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(11, 71, 113, 0.9);
    & > div {
      width: 90%;
      padding: 20px;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: @bgColor;
      text-align: right;
      border-radius: 4px;
      .el-table {
        border-radius: 4px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>