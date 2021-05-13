<template>
  <el-container style="height:100%; border: 0px solid #eee">
    <el-aside width="200px" >
      <el-menu :default-openeds="['1']"
               class="el-menu-vertical-demo"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               @open="handleOpen"
               @close="handleClose"
               @select="handleSelect"
               :collapse="isCollapse">
               <el-submenu v-for="item in nav" :key="item.name"  :index="item.id" >
                  <template slot="title">&nbsp;<i style="fontsize:12px;" :class="item.icon"></i>&nbsp;{{ item.name }}</template>
                  <el-menu-item
                          v-for="children in item.children"  :key="children.name" :index="children.url">{{ children.name }}
                  </el-menu-item>
              </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <br><span>欢迎使用欢迎使用EaseBase2.0 数据库运维平台</span>
      </el-header>

      <el-main>
        <el-tabs v-model="editableTabsValue"  closable @tab-remove="removeTab" @tab-click="handleClick">
          <el-tab-pane v-for="(item) in editableTabs"
                       :key="item.name"
                       :label="item.title"
                       :name="item.name">
            <keep-alive>
              <component :is="activeName"></component>
            </keep-alive>
          </el-tab-pane>
        </el-tabs>
      </el-main>

      <el-footer>
         <span> 开发者：合生通DBA运维团队</span>
      </el-footer>

    </el-container>

  </el-container>
</template>

<script>
  import  ajax from 'axios'
  import  user_query  from '@/components//queryUser'
  import  user_add    from "@/components/addUser";
  import  user_change from "@/components/changeUser";

  export default {
    data() {
        return {
          isCollapse: false,
          activeName: user_query,
          editableTabsValue: '2',
          editableTabs: [],
          tabIndex: 0,
          nav  :[],
        };
    },
    components: {
        user_query:user_query,
        user_add:user_add,
        user_change:user_change
    },
    created: function() {
      this.loadTree()
    },
    methods:{
      loadTree() {
          ajax.post('http://10.16.47.114:9000/tree'
          ).then((res) => {
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
        this.addTab(key);
        this.activeName = key.split('^')[1]
      },
      addTab(key) {
        let title = key.split('^')[0]
        let name  = key.split('^')[1]

        let flag = false;
        for (let i=0;i<this.editableTabs.length;i++){
          if (this.editableTabs[i]['name'] == name ){
            flag=true;
          }
        }

        if (flag == false ) {
          this.editableTabs.push({
            title: title,
            name: name,
          });
          this.editableTabsValue = name
        } else {
          this.editableTabsValue = name
        }
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      handleClick(tab) {
        console.log('handleClick=',tab)
        this.activeName=tab.name;
      }
    },
  }

</script>

<style scoped>
  @import "../assets/css/icons.css";
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    height: 50px;
  }
  .el-aside {
    color: #333333;
    text-align: left;
    height: 100%;
  }
  .el-main {
    color: #333;
    text-align: left;
    height: 800px;
  }
  .menuSize {
    font-size:30px;
  }

</style>
