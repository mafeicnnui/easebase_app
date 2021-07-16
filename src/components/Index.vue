<template>
     <el-container>
          <el-header style="height:60px;width:100%;color:black;background-color:#fbfdff;padding:0px;margin:0px;">
             <el-row justify="center" align="middle">
                 <el-col :span="3" style="height:60px;width:209px;background-color:rgb(84, 92, 100);color:white" ><br><i class="ion-coffee"></i> EaseBase2.0</el-col>
                 <el-col :span="8"><br>{{nowDate}}</el-col>
                 <el-col :span="11"><br>{{tips}}<pre> </pre></el-col>
                 <el-col :span="2">
                      <el-dropdown>
                          <span class="el-dropdown-link"><br>
                              <i class="ion-android-social-user"></i>
                              个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item>个人详情</el-dropdown-item>
                                 <el-dropdown-item @click.native="logout"> 系统注销</el-dropdown-item>
                          </el-dropdown-menu>
                     </el-dropdown>
                 </el-col>
             </el-row>
         </el-header>

         <el-container :style="container_style">
                <el-aside :style="aside_style" >
                    <el-menu router
                             :default-active="$route.path"
                             class="el-menu-vertical-demo"
                             background-color="#545c64"
                             text-color="#fff"
                             active-text-color="#ffd04b"
                             :collapse="isCollapse"
                         >
                        <el-submenu v-for="item in nav" :key="item.name" :index="item.id" >
                            <template slot="title"><i :class="item.icon"></i><pre>&nbsp;</pre><span>{{ item.name }}</span></template>
                            <el-menu-item
                                    v-for="children in item.children"
                                    :key="children.id"
                                    :index="children.url"
                                    @click="menuItemClick(children)"><pre>&nbsp;&nbsp;</pre><span>{{ children.name }}</span>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>

                <el-main style="height:909px;">
                    <el-tabs v-model="editableTabsValue"  closable @tab-remove="removeTab" @tab-click="handleClick">
                        <el-tab-pane v-for="(item) in editableTabs"
                                     :key="item.name"
                                     :label="item.title"
                                     :name="item.name">
                        </el-tab-pane>
                    </el-tabs>
                    <router-view></router-view>
                </el-main>
         </el-container>

          <el-footer style="height:60px;width:100%;color:black;background-color:#fbfdff;padding:0px;margin:0px;">
              <el-row  justify="center" align="middle">
                  <el-col :span="3" style="height:60px;width:209px;background-color:rgb(84, 92, 100);color:white" ></el-col>
                  <el-col :span="21"><span>开发者：合商云汇DBA运维团队<pre>               </pre>邮箱:190343@lifeat.cn</span></el-col>
              </el-row>
          </el-footer>
     </el-container>
</template>

<script>
    import config from "@/utils/config";
    import utils from "@/utils/common";

    export default {
        name: 'App',
        data() {
            return {
                svr:config(),
                isCollapse: false,
                activeName: '',
                editableTabsValue: '',
                editableTabs: [],
                tabIndex: 0,
                nav: [],
                tips :'管理员，上午好！',
                //welcome:'EaseBase2.0 数据库运维平台',
                nowDate:'',
                windowWidth : document.documentElement.clientWidth,    //实时屏幕宽度
                windowHeight: document.documentElement.clientHeight,   //实时屏幕高度
                treeHeight  :(document.documentElement.clientHeight-280).toString()+"px",
                tree_style : {
                    width:"210px",
                    height: this.treeHeight,
                    padding:"0px",
                    margin:"0px",
                },
                aside_style:{
                    width:"210px",
                    // height: this.treeHeight,
                    padding:"0px",
                    margin:"0px",
                },
                container_style:{
                    height: "847px",
                    padding:"0px",
                    margin:"0px",
                }
            }
        },
        created: function() {
            this.nav = utils.get_tree();
            console.log('tree height=',this.treeHeight)
        },
        mounted() {
            this.currentTime();
        },
        beforeDestroy() {
            if (this.formatDate) {
                clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
            }
        },
        methods:{
            addTab(item) {
                let title = item.name
                let name  = item.url
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
                this.activeName = name
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
                this.$router.push({path: tab.name});
            },
            menuItemClick(item) {
                console.log('menuItemClick=',item)
                this.addTab(item);
            },
            currentTime() {
                setInterval(this.formatDate, 500);
            },
            formatDate() {
                let date = new Date();
                let year = date.getFullYear(); // 年
                let month = date.getMonth() + 1; // 月
                let day = date.getDate(); // 日
                let week = date.getDay(); // 星期
                let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
                let hour = date.getHours(); // 时
                hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
                let minute = date.getMinutes(); // 分
                minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
                let second = date.getSeconds(); // 秒
                second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
                this.nowDate = `${year}年${month}月${day}日 ${hour}时${minute}分${second}秒   ${weekArr[week]}`;
            },
            logout() {
                localStorage.removeItem('Authorization')
                this.$router.push('/login');
            }
        }
    }
</script>

<style >
    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
        width:1px;
    }
    /* 滚动槽 */
    ::-webkit-scrollbar-track {
        -webkit-box-shadow:inset006px rgba(0,0,0,0.3);
        border-radius:10px;
    }
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius:10px;
        background:rgba(0,0,0,0.1);
        -webkit-box-shadow:inset006px rgba(0,0,0,0.5);
    }
    ::-webkit-scrollbar-thumb:window-inactive {
        background:rgba(255,0,0,0.4);
    }
    .el-header {
        position: relative;
        width: 100%;
        height: 60px;
    }
    .el-aside {

        position: relative;
    }

    .el-main {
        /*position: absolute;*/
        overflow-y: scroll;
    }


    pre {
        display: inline;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: black;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }

    .el-submenu /deep/ .el-submenu__title:hover
    {
        color: rgba(255, 134, 50, 1) !important;
        background-color: #ad9d9d !important;
    }

    .el-submenu i
     {
        font-size: 15px;
     }

    .el-submenu,.el-submenu__title  {
        padding-left :0px !important;
        margin-left  :0px !important;
     }

    .el-transfer-panel {
        width: 300px;
        height: 400px;
        font-size:5px;
    }

    .el-transfer-panel__list.is-filterable{
        height: 400px;
    }
    .el-transfer-panel__header,.el-transfer-panel__body {
        text-align: left;
    }

</style>
