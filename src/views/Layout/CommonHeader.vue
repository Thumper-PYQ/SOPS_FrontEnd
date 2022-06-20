<template>
  <div class="header">
      <div  class="l-content">
          <el-button plain icon="el-icon-menu" size="mini" @click="changeMenu"></el-button>
      </div>
      <div class="r-content">
        <el-dropdown>
        <span class="el-dropdown-link">
            {{userinfo.user}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item icon="el-icon-switch-button" @click.native="loginOut" >登出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>

<script>

import {mapState,mapMutations} from 'vuex';
export default {
    name:"CommonHeader",
    computed:{
        ...mapState('loginModule',['userinfo'])
    },
    methods:{
        ...mapMutations('loginModule',['clearUser']),
        changeMenu(){
            this.$emit('changeCollapse')
        },
        loginOut(){
            this.clearUser()
            sessionStorage.removeItem('user')
            this.$router.push({name:'login'})
            // this.$router.push('/login')
        },
        
    },
    // mounted(){
    //     console.log(this.$store)
    // }
}
</script>

<style lang='less' scoped>
    .header{
        position: relative;
    }
    .l-content{
        float: left;
        text-align: left;
        margin-top: 15px;
        
    }
    .r-content{
        position: absolute;
        top: 18px;
        right: 0;
        cursor: pointer;
        float: right;
        padding-right: 15px;
       
    }
    .r-content span {
        color: aliceblue;
    }
</style>