<template>
  <div id="app">
      <div>
          <el-container style="height:100%; border: 0px solid #eee">
              <el-aside width="220px" >
                  <el-menu router :default-active="$route.path"
                           class="el-menu-vertical-demo"
                           background-color="#545c64"
                           text-color="#fff"
                           active-text-color="#ffd04b"
                           @open="handleOpen"
                           @close="handleClose"
                           @select="handleSelect"
                           :collapse="isCollapse">
                           <el-submenu v-for="item in nav" :key="item.name"  :index="item.id" >
                              <template slot="title">&nbsp;&nbsp;<i style="fontsize:14px;" :class="item.icon"></i>&nbsp;&nbsp;<span>{{ item.name }}</span></template>
                              <el-menu-item
                                   v-for="children in item.children"  :key="children.name"  :index="children.url"><span>{{ children.name }}</span>
                              </el-menu-item>
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
    import ajax from 'axios'
    import userTree from './components/userTree.vue'
    import config from "@/utils/config";
    import utils from "@/utils/common";

export default {
  name: 'App',
  data() {
      return {
          svr:config(),
          isCollapse: false,
          // activeName: '',
          // editableTabsValue: '',
          // editableTabs: [],
          // tabIndex: 0,
          nav  :[],
      }

  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    userTree
  },
  created: function() {
     this.loadTree()
  },
  methods:{
     loadTree() {
          ajax.post(utils.stringFormat("http://{0}:{1}/tree2",[this.svr['server_ip'], this.svr['server_port']])
          ).then((res) => {
              console.log('loadtree:',res)
              this.nav = res.data['Data']
          }).catch((error) => {
              console.log('error=',error);
          });
      },
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
