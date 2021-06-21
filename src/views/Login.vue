<template>
  <div>
    <el-form ref="form" :rules="rules" :model="userForm" style="width: 300px">
      <el-form-item prop="username" label="用户名：">
        <el-input
          v-model="userForm.username"
          @keyup.enter.native="login"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码：">
        <el-input
          v-model="userForm.password"
          clearable
          @keyup.enter.native="login"
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button type="success" @click="login">登录</el-button>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      userForm: {
        username: "admin",
        password: "123456",
      },
      rules: {},
    };
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    // ...mapActions({
    //   setUser: "user/setUser",
    // }),
    ...mapActions("user", ["setUser"]),
    login() {
      this.setUser(this.userForm)
        .then(() => {
          console.log("登录成功");
        })
        .catch(() => {
          console.log("账号密码错误");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
