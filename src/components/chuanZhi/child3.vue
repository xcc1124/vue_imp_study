<template>
  <div>
    <el-input :value="value3" placeholder="子1" @input="input"></el-input>
  </div>
</template>

<script>
export default {
  props: {
    value3: {
      type: String,
      default: "",
    },
  },
  methods: {
    input(e) {
      this.$emit("update:value3", e);
    },
  },
};
</script>

<style lang="scss" scoped></style>
