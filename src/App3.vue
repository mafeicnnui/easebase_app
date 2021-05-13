<template>
  <div id="app">
      <div>
          <el-container style="height:100%; border: 0px solid #eee">
              <el-aside width="220px" >
                  <el-menu router :default-active="$route.path"
                           class="el-menu-vertical-demo"
                           @open="handleOpen"
                           @close="handleClose" theme="dark">
                      <el-submenu index="1">
                          <template slot="title">
                              <i class="el-icon-location"></i>
                              <span>用户信息</span>
                          </template>
                          <el-menu-item index="/addUser">用户新增</el-menu-item>
                          <el-menu-item index="/queryUser">用户查询</el-menu-item>
                          <el-menu-item index="/changeUser">用户变更</el-menu-item>
                      </el-submenu>
                  </el-menu>
              </el-aside>

              <el-container>
                  <el-header>
                      <br><span>欢迎使用欢迎使用EaseBase2.0 数据库运维平台</span>
                  </el-header>

                  <el-main>
                      <router-view></router-view>
                  </el-main>

                  <el-footer>
                      <span> 开发者：合生通DBA运维团队</span>
                  </el-footer>

              </el-container>

          </el-container>

      </div>

  </div>
</template>

<script>
import userTree from './components/userTree.vue'

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    userTree
  },
  methods:{
      handleOpen(key, keyPath) {
          console.log("handleOpen=",key, keyPath,'x');
      },
      handleClose(key, keyPath) {
          console.log("handleClose=",key, keyPath,'y');
      },
      handleSelect(key) {
          console.log("handleClose=",key);
      },
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
