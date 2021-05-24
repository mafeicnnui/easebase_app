//引入vue
import Vue from 'vue';
//引入vue-router
import VueRouter from 'vue-router';
//第三方库需要use一下才能用
Vue.use(VueRouter)

//引用组件
import addUser      from '@/components/addUser';
import queryUser    from '@/components/queryUser';
import changeUser   from '@/components/changeUser';

import addMenu      from "@/components/addMenu";
import queryMenu    from "@/components/queryMenu";
import changeMenu   from "@/components/changeMenu";

import addRole      from '@/components/addRole';
import queryRole    from '@/components/queryRole';
import changeRole   from '@/components/changeRole';

import addDs        from "@/components/addDs";
import queryDs      from "@/components/queryDs";
import changeDs     from '@/components/changeDs';

import addServer    from "@/components/addServer";
import queryServer  from "@/components/queryServer";
import changeServer from '@/components/changeServer';

import addBackup    from "@/components/addBackup";
import queryBackup  from '@/components/queryBackup';
import changeBackup from '@/components/changeBackup';


//定义routes路由的集合，数组类型
const routes=[
    //单个路由均为对象类型，path代表的是路径，component代表组件
    // user router
    { path:'/user_add',component:addUser},
    { path:"/user_query",component:queryUser},
    { path:"/user_change",component:changeUser},

    // menu router
    { path:'/menu_add',component:addMenu},
    { path:"/menu_query",component:queryMenu},
    { path:"/menu_change",component:changeMenu},

    // role router
    { path:'/role_add',component:addRole},
    { path:"/role_query",component:queryRole},
    { path:"/role_change",component:changeRole},

    // db source router
    { path:'/ds_add',component:addDs},
    { path:"/ds_query",component:queryDs},
    { path:"/ds_change",component:changeDs},

    // server router
    { path:'/server_add',component:addServer},
    { path:"/server_query",component:queryServer},
    { path:"/server_change",component:changeServer},

    // backup router
    { path:'/backup_add',component:addBackup},
    { path:"/backup_query",component:queryBackup},
    { path:"/backup_change",component:changeBackup},

    // default router
    { path:'',component:queryUser},

]

//实例化VueRouter并将routes添加进去
const router=new VueRouter({
   //ES6简写，等于routes：routes
    routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router