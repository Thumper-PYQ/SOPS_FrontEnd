<template>
<div calss="parent">
  <div class="login">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="80px"
      class="from"
    >
      <h3 class="title">用户登录</h3>

      <el-form-item label="用户名" prop="name">
        <el-input
          size="normal"
          type="text"
          v-model="loginForm.name"
          autocomplete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>

      <el-form-item label="密 码" prop="password">
        <el-input
          size="normal"
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="verifiCode">
        <el-input
          size="normal"
          type="text"
          v-model="loginForm.verifiCode"
          autocomplete="off"
          placeholder="请输入验证码"
          @keydown.enter.native="submitForm('loginForm')"
          class="code"
        ></el-input>
        <el-image
          style="width: 110px; height: 40px"
          :src="vcUrl"
          @click="changeCode"
        ></el-image>
      </el-form-item>


        <el-radio-group class="userprop" v-model="loginForm.userProp">
          <el-radio :label="3">超级管理员</el-radio>
          <el-radio :label="6">仓库管理员</el-radio>
          <el-radio :label="9">仓库拣货员</el-radio>
        </el-radio-group>


      <el-form-item class="bottom">
        <el-button type="primary" @click="submitForm('loginForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import axios from "axios";
//让ajax携带cookie
axios.defaults.withCredentials = true;

export default {
  name: "Login",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      vcUrl: "http://localhost/sys/getcode?time=" + new Date(),
      backSession: "",
      loginForm: {
        name: "",
        password: "",
        verifiCode: "",
        userProp:3
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        verifiCode: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations('loginModule',['setUser']),

    changeCode() {
      this.vcUrl = "http://localhost/sys/getcode?time=" + new Date();
    },
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          let { name, password, verifiCode ,userProp} = this.loginForm;
          axios.post("http://localhost/sys/login", {
              name,
              password,
              verifiCode,
              userProp
            }).then((response) => {
              if(response.data.code === 200){
                this.$message({
                  message:'登录成功',
                  type:'success'
                });
                //登录成功后：1.存储登录信息 2.跳转网页 3. 顶部区域显示用户信息 4.持久化
                let obj = {
                  user:response.data.data.username,
                  token:response.data.data.token
                }
                this.setUser(obj)
                //存储到本地
                sessionStorage.setItem('user',JSON.stringify(obj))
                //跳转
                if(userProp==3){
                  this.$router.push('/home')
                }else if(userProp==6){
                  this.$router.push('/wmu/home')
                }else if(userProp==9){
                  this.$router.push('/pu/home')
                }
                

              }else if(response.data.code === 201){
                  this.$message({
                    message:response.data.message,
                    type:'error'
                  })
              }
              },
              (error) => {
                console.log(error.data)
              }
            );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(loginForm) {
      this.$refs[loginForm].resetFields();
    },
  },
  mounted() {
    this.vcUrl = "http://localhost/sys/getcode?time=" + new Date();
    // console.log(this)
  },
};
</script>

<style lang='less' scoped >

.parent{
  background-image: url("@/assets/images/login.jpg");
  background: #f89;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
} 

.title {
  margin-bottom: 20px;
  text-align: center;
  color: #666;
}
.login {
  width: 400px;
  height: 280px;
  padding: 20px;
  margin: 150px auto;
  border-radius: 10px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #eee;
}
.code {
  float: left;
  width: 200px;
  margin-right: 10px;
}
.bottom {
  margin-left: 50px;
}
.el-radio-group {
    font-size: 0;
    margin-left: 35px;
    margin-bottom: 10px;
}
</style>