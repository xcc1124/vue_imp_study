<template>
  <div>
    <el-divider content-position="left"
      >天地图=》火星坐标=》百度地图</el-divider
    >
    <el-form>
      <el-form-item label="天地图">
        <el-input v-model="map.td.lon" placeholder="经度"></el-input>
        <el-input v-model="map.td.lat" placeholder="纬度"></el-input>
        <el-button type="success" @click="changeMap(map.td.lon, map.td.lat, 1)"
          >转换</el-button
        >
      </el-form-item>
      <el-form-item label="火星坐标">
        <el-input v-model="map.hx.lon" placeholder="经度"></el-input>
        <el-input v-model="map.hx.lat" placeholder="纬度"></el-input>
        <el-button type="success" @click="changeMap(map.hx.lon, map.hx.lat, 2)"
          >转换</el-button
        >
      </el-form-item>
      <el-form-item label="百度地图">
        <el-input v-model="map.bd.lon" placeholder="经度"></el-input>
        <el-input v-model="map.bd.lat" placeholder="纬度"></el-input>
        <el-button type="success" @click="changeMap(map.bd.lon, map.bd.lat, 3)"
          >转换</el-button
        >
      </el-form-item>
      <el-divider content-position="left">base64转文件</el-divider>
      <el-form-item label="base64:">
        <el-input
          clearable
          type="textarea"
          v-model="base64"
          :autosize="{ minRows: 10, maxRows: 20 }"
          style="width: 500px"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="文件：">
        <el-input readonly></el-input>
        <el-button>下载</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: {
        td: {
          lon: "",
          lat: "",
        },
        hx: {
          lon: "",
          lat: "",
        },
        bd: {
          lon: "112.881102",
          lat: "28.23461",
        },
      },
      base64: "utils里面有方法",
    };
  },
  methods: {
    changeMap(lon, lat, type) {
      if (type === 1) {
        this.map.bd = this.$GCJ2WGSTobaidu({ lon, lat }); //天地图转百度地图

        this.map.hx = this.$WGSToGCJ({ lon, lat }); //天地图转火星地图
      } else if (type === 2) {
        this.map.bd = this.$marsTobaidu({ lon, lat }); //火星地图转百度地图

        this.map.td = this.$transformGCJ2WGS({ lon, lat }); //火星地图转天地图
      } else if (type === 3) {
        this.map.hx = this.$baiduTomars({ lon, lat }); //百度地图转火星地图

        this.map.td = this.$baiduToGCJ2WGS({ lon, lat }); //百度地图转天地图
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
