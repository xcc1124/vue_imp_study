<template>
  <div></div>
</template>

<script>
//定义一个混入对象,混入可以使得，当前对象下的方法与主页面完美融合
//如果主页面和混入对象中的命名有冲突，以主页面的为主
var mixin = {
  methods: {
    sayHello1() {
      console.log("sayHello-noMain");
    },
  },
  //不能写箭头函数
  mounted: function () {
    this.sayHello1();
  },
};
export default {
  data() {
    return {
      a: "1",
    };
  },
  mixins: [mixin],
  methods: {
    sayHello() {
      console.log("sayHello-main");
    },
  },

  created() {
    this.sayHello();
  },
};
</script>

<style lang="scss" scoped></style>
