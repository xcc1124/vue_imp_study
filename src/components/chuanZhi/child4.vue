<template>
  <div>
    <el-input :value="value4" placeholder="子2" @input="input"></el-input>
  </div>
</template>

<script>
export default {
  props: {
    value4: {
      type: String,
      default: "",
    },
  },
  methods: {
    input(e) {
      this.$emit("update:value4", e);
    },
  },
};
</script>

<style lang="scss" scoped></style>
