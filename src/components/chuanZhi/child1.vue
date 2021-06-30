<template>
  <div>
    <el-input :value="value1" placeholder="子" @input="input"></el-input>
  </div>
</template>

<script>
export default {
  props: {
    value1: {
      type: String,
      default: "",
    },
  },
  methods: {
    input(e) {
      this.$emit("value1Change", e);
    },
  },
};
</script>

<style lang="scss" scoped></style>
