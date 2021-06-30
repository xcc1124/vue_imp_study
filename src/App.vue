<template>
  <div id="app">
    <el-button icon="el-icon-s-home" @click="$router.push('/')"></el-button>
    <el-button icon="el-icon-switch-button" @click="loginOut"></el-button>
    <router-view />
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  created() {},
  methods: {
    ...mapMutations("user", ["isLoginFlase"]),
    loginOut() {
      this.isLoginFlase();
      this.$router.push("/");
    },
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-input {
  max-width: 200px;
  margin-bottom: 10px;
}
</style>
