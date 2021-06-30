<template>
  <div>
    <!-- v-model和value效果一样 -->
    <el-input v-model="value" placeholder="子2" @input="input"></el-input>
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
