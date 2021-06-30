<template>
  <div>
    <el-input :value="value2" placeholder="子" @input="input"></el-input>
  </div>
</template>

<script>
export default {
  props: {
    value2: {
      type: String,
      default: "",
    },
  },
  methods: {
    input(e) {
      this.$emit("update:value2", e);
    },
  },
};
</script>

<style lang="scss" scoped></style>
