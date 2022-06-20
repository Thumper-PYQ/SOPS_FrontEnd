<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name:'App',
    components: {  },
    date() { },
    // mounted(){
    //   console.log('APP',this)
    // }
  }
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
</style>
