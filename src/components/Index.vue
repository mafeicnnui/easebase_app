<template>
     <el-container style="height:100%; border: 0px solid #eee">
                <el-aside width="200px">
                    <el-menu router
                             :default-active="$route.path"
                             class="el-menu-vertical-demo"
                             background-color="#545c64"
                             text-color="#fff"
                             active-text-color="#ffd04b"
                             :collapse="isCollapse">
                        <el-submenu v-for="item in nav" :key="item.name"  :index="item.id" >
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
                            </el-tab-pane>
                        </el-tabs>
                        <router-view></router-view>
                    </el-main>
                    <el-footer>
                        <span> 开发者：合生通DBA运维团队</span>
                    </el-footer>

                </el-container>
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
            }
        },
        created: function() {
            this.nav = utils.get_tree();
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
            }
        }
    }
</script>

<style >
    pre {
        display: inline;
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
