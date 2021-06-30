<template>
  <div>
    <el-input :value="value" placeholder="子1" @input="input"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    this.$bus.$on("getValue", (e) => {
      this.value = e;
    });
  },
  methods: {
    input(e) {
      this.$bus.$emit("getValue", e);
    },
  },
};
</script>

<style lang="scss" scoped></style>
