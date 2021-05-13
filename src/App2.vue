<template>
  <div id="app">
      <div>
          <router-link to="/addUser">addUser</router-link>
          <router-link to="/queryUser">queryUser</router-link>
          <router-link to="/changeUser">changeUser</router-link>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
import userTree from './components/userTree.vue'

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    userTree
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
    margin:0px;
}
</style>
