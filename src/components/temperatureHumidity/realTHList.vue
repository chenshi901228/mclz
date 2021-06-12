<!--温度湿度检测数据列表 -->
<template>
  <div class="realTHList">
    <p class="title">温湿度检测数据</p>
    <div class="listFilter">
      <div>
        <el-date-picker
          size="mini"
          v-model="startDate"
          :clearable="false"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="开始日期"
        >
        </el-date-picker>
        <span style="font-size: 14px; color: #758aa1; margin: 0 2px">至</span>
        <el-date-picker
          size="mini"
          v-model="endDate"
          :clearable="false"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="截至日期"
        >
        </el-date-picker>
      </div>
      <div>
        <el-select size="mini" v-model="warningType" placeholder="请选择">
          <el-option
            v-for="item in thList.selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <input
          @click="serchFuc"
          type="button"
          name="serchBtn"
          id="serchBtn"
          value="搜索"
        />
      </div>
    </div>
    <div style="height: calc(100% - 50px)">
      <dv-scroll-board
        :config="thList.config"
        style="width: 100%; height: 100%"
      />
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("temperatureHumidity");
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      warningType: "全部类型",
    };
  },
  props: ["thList"],
  methods: {
    ...mapMutations(["realTHListFilter"]),
    serchFuc() {
      this.realTHListFilter({
        startDate: this.startDate,
        endDate: this.endDate,
        warningType: this.warningType,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.realTHList {
  height: 100%;
  .title {
    font-weight: 700;
    color: #16d0ff;
    font-size: 14px;
    &::before {
      content: "";
      width: 6px;
      height: 6px;
      display: inline-block;
      margin-right: 4px;
      background-color: #16d0ff;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  /deep/.listFilter {
    display: flex;
    justify-content: space-between;
    margin: 6px 0;
    .el-input {
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
    #serchBtn {
      padding: 2px 8px;
      border: none;
      border-radius: 4px;
      background-color: #16d0ff;
      color: #fff;
      margin-left: 4px;
      font-size: 12px;
      cursor: pointer;
    }
  }
  /deep/.dv-scroll-board {
      .header {
        font-size: 12px;
        color: #53d1f7;
      }
    .rows {
      .row-item {
        font-size: 12px;
        height: 30px !important;
        line-height: 30px !important;
      }
    }
  }
}
</style>