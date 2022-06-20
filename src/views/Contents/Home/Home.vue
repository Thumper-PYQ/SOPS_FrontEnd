<template>
  <div class="content">
    <p>欢迎使用<br>连锁超市的线下拣货系统(SOPS)</p>
  </div>
</template>

<script>
    export default {
      name:'Home'
    }
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.el-main {
  padding:0;
}
.content{
  width: 100%;
  height: 100%;
  text-align: center;
  background-image: url('@/assets/images/welcome.jpg') ;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
p{
  margin-top: 8%;
  font-size: 50px;
  font-family:'Times New Roman', Times, serif
}
</style>