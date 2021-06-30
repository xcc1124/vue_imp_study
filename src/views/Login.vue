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
import { routes } from "@/config";
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
    ...mapActions("router", ["setRouter"]),
    login() {
      //设置了严格模式，不能给vuex中绑定地址
      this.setUser(JSON.parse(JSON.stringify(this.userForm)))
        .then(async () => {
          this.$message.success("登录成功，等待跳转...");

          let routerList = await new Promise((resolve) => {
            setTimeout(() => {
              resolve(routes);
            }, 500);
          });
          this.setRouter(routerList); //登录的时候异步请求一次路由数据--当然，这个数据也可以和登录接口写在一块
          this.$router.push("/");
        })
        .catch(() => {
          this.$message.error("账号密码错误");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
