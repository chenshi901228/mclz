<template>
  <div class="_title">
    <p>{{ title }}</p>
  </div>
</template>
<script>
export default {
  props: ["title"],
};
</script>
<style lang="less" scoped>
._title {
  width: 100%;
  p {
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
}
</style>