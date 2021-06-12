<template>
  <div class="list">
    <el-tree
      :data="dataList"
      :props="defaultProps"
      node-key="id"
      :default-expanded-keys="[0.1]"
      @node-click="handleNodeClick"
      :filter-node-method="filterNode"
      :render-content="renderContent"
      ref="tree"
    ></el-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    serchInputText(val) {
      this.$refs.tree.filter(val);
    },
  },
  props: ["dataList", "listItemChange", "serchInputText"], // 列表数据  /  点击切换数据 / 搜索内容
  methods: {
    handleNodeClick(data) {
      if (data.disabled || data.children) {
        return;
      } else {
        this.listItemChange(data);
      }
    },
    // 搜索过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    renderContent(h, { node, data }) {
      if (node.level == 1) {
        return (
          <span style="color:white;font-size:14px">
            <span style="font-weight:700;font-size:16px">{data.label}</span>
            [总数 {data.total}/在线
            <span style="color:#0ab187"> {data.online}</span>]
          </span>
        );
      } else {
        if (data.total) {
          return (
            <p style="width:88%;white-space:break-spaces;overflow-wrap: break-word;color:white;font-size:12px">
              <span style="font-weight:700;font-size:14px">{data.label}</span>[
              {data.total}/<span style="color:#0ab187">{data.online}</span>]
            </p>
          );
        } else {
          return (
            <p
              style={
                "width:88%;white-space:break-spaces;font-size:14px;color:" +
                (data.disabled ? "#7d7e82;cursor:not-allowed;" : "white")
              }
            >
              <span class="icon_camera"></span>
              {data.label}
            </p>
          );
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.list {
  // padding: 24px 0;
  // padding-left: 10px;
  height: 100%;
  .el-tree {
    background-color: transparent;
    /deep/.icon_camera {
      width: 16px;
      height: 16px;
      display: inline-block;
      margin-right: 4px;
      vertical-align: bottom;
      background: url("~@/assets/icons/icon_camera.png") no-repeat center /
        cover;
    }
    /deep/ .el-tree-node {
      &:hover {
        background-color: transparent;
      }
      &:focus {
        .el-tree-node__content {
          background-color: transparent;
        }
      }
      .el-tree-node__content {
        height: auto;
        &:hover {
          background-color: transparent;
        }
      }
    }
  }
}
</style>