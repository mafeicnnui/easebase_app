<template>
  <el-form :inline="true"  ref="form" :model="form" label-width="120px">
    <el-form-item label=""> </el-form-item>
    <el-row>
        <el-col :span="12">
          <el-form-item label="项目编码">
            <el-select v-model="form.market_id" placeholder="请选择项目" style="width:550px">
              <el-option v-for="dm in form.dm_market_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实例类型">
            <el-select v-model="form.inst_type" placeholder="请选择实例" style="width:550px">
              <el-option v-for="dm in form.dm_inst_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="数据库类型">
          <el-select v-model="form.db_type" placeholder="请选择数据库类型" style="width:550px">
            <el-option v-for="dm in form.dm_db_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="数据库环境">
          <el-select v-model="form.db_env" placeholder="请选择数据库环境" style="width:550px">
            <el-option v-for="dm in form.dm_db_env"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="数据源描述">
          <el-input placeholder="请输入数据源描述" v-model="form.db_desc" style="width:550px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="数据源地址">
          <el-input placeholder="请输入数据源地址" v-model="form.ip"  style="width:550px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="数据源端口">
          <el-input placeholder="请输入数据源端口" v-model="form.port" style="width:550px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="数据源服务名">
          <el-input placeholder="请输入数据源服务名" v-model="form.service" style="width:550px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="数据源用户">
          <el-input placeholder="请输入数据源用户" v-model="form.user" style="width:550px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="数据源口令">
          <el-input placeholder="请输入数据源口令" v-model="form.password" show-password style="width:550px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="数据源状态">
          <el-select v-model="form.status"  style="width:550px">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否启用代理">
          <el-select v-model="form.proxy_status"  style="width:550px">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="代理服务接口">
          <el-select v-model="form.proxy_server" placeholder="请选择代理服务接口" style="width:550px">
            <el-option v-for="dm in form.dm_proxy_server"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label=""> </el-form-item>
    <el-row type="flex">
      <el-col :span="24"  style="text-align: center">
        <el-form-item>
          <el-button type="primary" @click="saveDs">保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import ajax from 'axios'
  import config from '@/utils/config.js';
  import utils from '@/utils/common.js'

  export default {
    data() {
        return {
          svr:config(),
          form: {
              market_id: '',
              inst_type: '',
              db_type:'',
              db_env:'',
              db_desc:'',
              ip:'',
              port:'',
              service:'',
              user:'',
              password:'',
              status:'',
              proxy_status:'',
              proxy_server:'',
              dm_market_id:[],
              dm_inst_type:[],
              dm_db_type:[],
              dm_db_env:[],
              dm_proxy_server:[]
          }
        };
    },
    methods:{
      saveDs() {
        ajax({
          method: 'Put',
          url: utils.stringFormat("http://{0}:{1}/ds",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
            market_id: this.form.market_id,
            inst_type: this.form.inst_type,
            db_type:this.form.db_type,
            db_env:this.form.db_env,
            db_desc:this.form.db_desc,
            ip:this.form.ip,
            port:this.form.port,
            service:this.form.service,
            user:this.form.user,
            password:this.form.password,
            status:this.form.status,
            proxy_status:this.form.proxy_status,
            proxy_server:this.form.proxy_server,
          },
          timeout: 1000,
        }).then((res) => {
          console.log('saveDs:',res)
          if (res.data['Code'] == 200 ) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success'
            });
            this.clearForm();
          }
        }).catch((error) => {
          console.log('error=',error);
        });

        console.log('form=',this.form);
        this.getParent();
      },
      clearForm() {
          this.form.market_id =''
          this.form.inst_type=''
          this.form.db_type =''
          this.form.db_env =''
          this.form.db_desc =''
          this.form.ip =''
          this.form.port =''
          this.form.service =''
          this.form.user =''
          this.form.password =''
          this.form.status =''
          this.form.proxy_status =''
          this.form.proxy_server =''
      }
    },
    mounted: function() {
      this.form.dm_market_id= utils.get_dm('05')
      this.form.dm_inst_type=utils.get_dm('07')
      this.form.dm_db_type= utils.get_dm('02')
      this.form.dm_db_env=utils.get_dm('03')
      this.form.dm_proxy_server=utils.get_dm('26')

    } ,
  }

</script>

<style scoped>

</style>
