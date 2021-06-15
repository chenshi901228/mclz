<template>
  <div class="foodCompany">
    <div class="title">
      <el-select
        size="mini"
        @change="selectChange"
        v-model="selectValue"
        placeholder="请选择"
      >
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <h1>{{ selectValue }}表</h1>
    </div>
    <el-table
      v-if="selectValue == '食品采购信息'"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
      :data="currentData"
      height="76%"
      size="small"
    >
      <el-table-column prop="id" label="食品编号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="食品名称" width="120" align="center">
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.name"
          ></el-input>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="规格" width="80" align="center">
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.size"
          ></el-input>
          <span v-else>{{ row.size }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="数量" width="100" align="center">
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.number"
          ></el-input>
          <span v-else>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="providerName" label="供方名称" align="center">
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.providerName"
            :autosize="{ minRows: 1 }"
            type="textarea"
          ></el-input>
          <span v-else>{{ row.providerName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="providerAddress" label="供方地址" align="center">
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.providerAddress"
            :autosize="{ minRows: 1 }"
            type="textarea"
          ></el-input>
          <span v-else>{{ row.providerAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="providerPhone"
        label="联系方式"
        width="130"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.providerPhone"
          ></el-input>
          <span v-else>{{ row.providerPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="providerDate"
        label="供货时间"
        width="120"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <el-date-picker
            v-if="$index == editIndex"
            v-model="editData.providerDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            class="dateChoose"
          >
          </el-date-picker>
          <span v-else>{{ row.providerDate }}</span>
        </template>
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
    <el-table
      v-else
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
      :data="currentData"
      height="76%"
      size="small"
    >
      <el-table-column prop="id" label="样品编号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="样品名称" width="120" align="center">
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.name"
          ></el-input>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="样品规格" width="80" align="center">
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.size"
          ></el-input>
          <span v-else>{{ row.size }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="number"
        label="样品数量"
        width="100"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.number"
          ></el-input>
          <span v-else>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="providerName" label="供方名称" align="center">
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.providerName"
            :autosize="{ minRows: 1 }"
            type="textarea"
          ></el-input>
          <span v-else>{{ row.providerName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="providerAddress" label="供方地址" align="center">
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.providerAddress"
            :autosize="{ minRows: 1 }"
            type="textarea"
          ></el-input>
          <span v-else>{{ row.providerAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="providerPhone"
        label="供方联系方式"
        width="130"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.providerPhone"
          ></el-input>
          <span v-else>{{ row.providerPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="samplingDate"
        label="采样日期"
        width="120"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <el-date-picker
            v-if="$index == editIndex"
            v-model="editData.samplingDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            class="dateChoose"
          >
          </el-date-picker>
          <span v-else>{{ row.samplingDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="samplingPeople"
        label="采样人"
        width="130"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <el-input
            v-if="$index == editIndex"
            v-model="editData.samplingPeople"
          ></el-input>
          <span v-else>{{ row.samplingPeople }}</span>
        </template>
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
        :current-page="initData.currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="initData.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="initData.total"
      >
      </el-pagination>
    </div>
    <div class="mark" :style="`display:${markShow ? 'block' : 'none'}`">
      <div>
        <h1>{{ selectValue }}添加</h1>
        <el-table
          v-if="selectValue == '食品采购信息'"
          :data="[editData]"
          size="small"
        >
          <el-table-column prop="id" label="食品编号" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="食品名称"
            width="120"
            align="center"
          >
            <el-input v-model="editData.name"></el-input>
          </el-table-column>
          <el-table-column prop="size" label="规格" width="80" align="center">
            <el-input v-model="editData.size"></el-input>
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量"
            width="100"
            align="center"
          >
            <el-input v-model="editData.number"></el-input>
          </el-table-column>
          <el-table-column prop="providerName" label="供方名称" align="center">
            <el-input
              v-model="editData.providerName"
              :autosize="{ minRows: 1 }"
              type="textarea"
            ></el-input>
          </el-table-column>
          <el-table-column
            prop="providerAddress"
            label="供方地址"
            align="center"
          >
            <el-input
              v-model="editData.providerAddress"
              :autosize="{ minRows: 1 }"
              type="textarea"
            ></el-input>
          </el-table-column>
          <el-table-column
            prop="providerPhone"
            label="联系方式"
            width="130"
            align="center"
          >
            <el-input v-model="editData.providerPhone"></el-input>
          </el-table-column>
          <el-table-column
            prop="providerDate"
            label="供货时间"
            width="120"
            align="center"
          >
            <el-date-picker
              v-model="editData.providerDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              class="dateChoose"
            >
            </el-date-picker>
          </el-table-column>
        </el-table>
        <el-table v-else :data="[editData]" size="small">
          <el-table-column prop="id" label="样品编号" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="样品名称"
            width="120"
            align="center"
          >
            <el-input v-model="editData.name"></el-input>
          </el-table-column>
          <el-table-column
            prop="size"
            label="样品规格"
            width="80"
            align="center"
          >
            <el-input v-model="editData.size"></el-input>
          </el-table-column>
          <el-table-column
            prop="number"
            label="样品数量"
            width="100"
            align="center"
          >
            <el-input v-model="editData.number"></el-input>
          </el-table-column>
          <el-table-column prop="providerName" label="供方名称" align="center">
            <el-input
              v-model="editData.providerName"
              :autosize="{ minRows: 1 }"
              type="textarea"
            ></el-input>
          </el-table-column>
          <el-table-column
            prop="providerAddress"
            label="供方地址"
            align="center"
          >
            <el-input
              v-model="editData.providerAddress"
              :autosize="{ minRows: 1 }"
              type="textarea"
            ></el-input>
          </el-table-column>
          <el-table-column
            prop="providerPhone"
            label="供方联系方式"
            width="130"
            align="center"
          >
            <el-input v-model="editData.providerPhone"></el-input>
          </el-table-column>
          <el-table-column
            prop="samplingDate"
            label="采样日期"
            width="120"
            align="center"
          >
            <el-date-picker
              v-model="editData.samplingDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              class="dateChoose"
            >
            </el-date-picker>
          </el-table-column>
          <el-table-column
            prop="samplingPeople"
            label="采样人"
            width="130"
            align="center"
          >
            <el-input v-model="editData.samplingPeople"></el-input>
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
  createNamespacedHelpers("foodCompany");
export default {
  data() {
    return {
      // 下拉框
      selectValue: "食品采购信息",
      selectOptions: [
        {
          label: "食品采购信息",
          value: "食品采购信息",
        },
        {
          label: "食品留样信息",
          value: "食品留样信息",
        },
      ],
      // 表格加载动画
      loading: true,
      // 当前编辑行index
      editIndex: null,
      // 当前编辑行内容
      editData: {},
      // 新增弹框
      markShow: false,
    };
  },
  computed: {
    ...mapState(["initData"]),
    ...mapGetters(["currentData"]),
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      this.init(this.selectValue);
    }, 1000);
  },
  methods: {
    ...mapMutations(["init", "edit", "addNew", "deleteOne"]),
    // 下拉选项
    selectChange(value) {
      this.initData.rows = [];
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.init(value);
      }, 1000);
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
            cancelMsg: "继续修改",
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
      this.$confirm("是否删除食品采购信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteOne(row);
          this.$message({
            type: "success",
            message: "食品采购信息删除成功!",
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
      this.$confirm("是否修改食品采购信息", "提示", {
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
            message: "食品采购信息修改成功!",
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
      this.$confirm("是否新增食品采购信息", "提示", {
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
            message: "食品采购信息新增成功!",
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
      this.editData = {};
      this.editIndex = null;
      this.initData.currentPage = value;
    },
    // 每页条数
    sizeChange(value) {
      this.editData = {};
      this.editIndex = null;
      this.initData.pageSize = value;
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
.foodCompany {
  width: 100%;
  height: 100%;
  padding: 20px;
  // background-color: rgba(11, 71, 113, 0.6);
  // background-color: rgba(255, 255, 255, 1);
  .title {
    display: flex;
    justify-content: center;
    position: relative;
    /deep/.el-select {
      position: absolute;
      left: 0;
      bottom: 0;
      input {
        color: @txColor;
        border: none;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        background-color: rgba(93, 173, 184, 0.8);
      }
      i {
        color: #fff;
      }
    }
    h1 {
      font-size: 20px;
      color: #fff;
    }
  }
  /deep/.el-table {
    width: 100%;
    border-top-right-radius: 4px;
    background-color: @bgColor;
    .el-table__empty-text {
      color: #fff;
    }
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
    h1{
      font-size: 20px;
      color: #fff;
      text-align: center;
      margin-bottom: 10px;
    }
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