<template>
  <div>
    <el-divider content-position="left">父子传值</el-divider>
    <!-- 
      这种传值方式本质是  
      父=》子：通过props直接传过去，而且这种方式已经是单向绑定了，父亲的变化了会影响子的
      子=》父：子中用value绑定而不是用v-model绑定，子通过监听input事件反馈给父  对父进行改变从而影响子本身
     -->
    <el-input v-model="value1" placeholder="父"></el-input>
    <child1 :value1="value1" @value1Change="value1Change"></child1>

    <el-divider content-position="left">上述方法的简化</el-divider>
    <el-input v-model="value2" placeholder="父"></el-input>
    <child2 :value2.sync="value2"></child2>
  </div>
</template>

<script>
import child1 from "@/components/chuanZhi/child1.vue";
import child2 from "@/components/chuanZhi/child2.vue";
export default {
  components: {
    child1,
    child2,
  },
  data() {
    return {
      value1: "",
      value2: "",
    };
  },
  methods: {
    value1Change(value1) {
      this.value1 = value1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
