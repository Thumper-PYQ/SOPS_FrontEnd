<template>
    <el-container style="height:100%">
      <el-aside width="auto">
        <common-aside :isCollapse='isCollapse' ></common-aside>
      </el-aside>
      
      <el-container>
        <el-header>
          <common-header @changeCollapse='changeCollapse' ></common-header>
        </el-header>
        <el-main>
          <router-view></router-view>        
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import CommonAside from '@/views/Layout/CommonAside.vue';
import CommonHeader from '@/views/Layout/CommonHeader.vue'

export default {
  name: "index",
  components: {
     CommonAside,
     CommonHeader,
  },
  data() {
    return {
      isCollapse:false
    };
  },
  methods: {
    changeCollapse(){
      this.isCollapse=!this.isCollapse
    }
  },
};
</script>

<style lang="less" scoped>

.el-header{
  background-color: #333;
}
.el-main{
  padding-top: 0;
  // background-color: pink;
}
</style>
