<template>
  <el-menu
    :default-active="$router.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>SOPS</h3>
    
    <el-menu-item
      v-for="item in noChildren"
      :index="item.path+''"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :index="item.path+''" :key="item.path" >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item :index="subItem.path+''" @click="clickChildren(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
    height: 100%;
    border: none;
    h3 {
        color: #fff;
        text-align:center;
        line-height:48px;
    }
}

</style>

<script>
export default {
  name: "CommonAsides",
  props:['isCollapse'],
  data() {
    return {
      // isCollapse: true,
      menu: [
        {
          path:"/puhome",
          name: "puhome",
          label: "首页",
          icon: "s-home",
        },
        {
          path:"/pu",
          name: "puorder",
          label: "订单处理",
          icon: "coin",
        },
        {
          path:"/pugoods",
          name: "pugoods",
          label: "商品信息",
          icon: "document",
        },
        {
          path:"/pushelve",
          name: "pushelve",
          label: "货架分区",
          icon: "location-information",
        }
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
        this.$router.push({
            name:item.name
        })
    },
    clickChildren(item){
      this.$router.push({
        name:item.name
      })
    }
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
  },
};
</script>