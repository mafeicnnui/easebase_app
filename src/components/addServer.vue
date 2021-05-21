<template>
  <el-form :inline="true"  ref="form" :model="form" label-width="120px">
    <el-form-item label=""> </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="服务器描述">
          <el-input placeholder="请输入服务器描述" v-model="form.server_desc" style="width:550px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目编码">
          <el-select v-model="form.market_id" placeholder="请选择项目" style="width:550px">
            <el-option v-for="dm in form.dm_market_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
          <el-form-item label="服务器类型">
            <el-select v-model="form.server_type" placeholder="请选择服务器类型" style="width:550px">
              <el-option v-for="dm in form.dm_server_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="认证方式">
          <el-select v-model="form.server_auth" placeholder="请选择服务器认证方式" style="width:550px">
            <el-option v-for="dm in form.dm_server_auth"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="服务器地址">
          <el-input placeholder="请输入服务器地址" v-model="form.server_ip"  style="width:550px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="服务器端口">
          <el-input placeholder="请输入服务器端口" v-model="form.server_port" style="width:550px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="服务器用户">
          <el-input placeholder="请输入服务器用户" v-model="form.server_user" style="width:550px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="服务器口令">
          <el-input placeholder="请输入服务器口令" v-model="form.server_pass" show-password style="width:550px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="服务器密钥">
          <el-input placeholder="请输入服务器密钥" v-model="form.server_keys" style="width:550px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="服务器系统">
          <el-select v-model="form.server_os" placeholder="请选择服务器系统" style="width:550px">
            <el-option v-for="dm in form.dm_server_os"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="服务器CPU">
          <el-input placeholder="请输入服务器CPU" v-model="form.server_cpu" style="width:550px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="服务器内存">
          <el-input placeholder="请输入服务器内存" v-model="form.server_mem" style="width:550px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="服务器状态">
          <el-select v-model="form.status"  style="width:550px">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label=""> </el-form-item>
    <el-row type="flex">
      <el-col :span="24"  style="text-align: center">
        <el-form-item>
          <el-button type="primary" @click="saveServer">保存</el-button>
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
              server_desc:'',
              market_id: '',
              server_type: '',
              server_ip:'',
              server_port:'',
              server_auth:'',
              server_user:'',
              server_pass:'',
              server_keys:'',
              server_os:'',
              server_cpu:'',
              server_mem:'',
              status:'',
              dm_market_id:[],
              dm_server_type:[],
              dm_server_os:[],
              dm_server_auth:[],
          }
        };
    },
    methods:{
      saveServer() {
        console.log('form=',this.form);
        ajax({
          method: 'Put',
          url: utils.stringFormat("http://{0}:{1}/server",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
              server_desc : this.form.server_desc,
              market_id   : this.form.market_id,
              server_type : this.form.server_type,
              server_ip   : this.form.server_ip,
              server_port : this.form.server_port,
              server_auth : this.form.server_auth,
              server_user : this.form.server_user,
              server_pass : this.form.server_pass,
              server_keys : this.form.server_keys,
              server_os   : this.form.server_os,
              server_cpu  : this.form.server_cpu,
              server_mem  : this.form.server_mem,
              status      : this.form.status,
          },
          timeout: 1000,
        }).then((res) => {
          console.log('saveServer:',res)
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

      },
      clearForm() {
          this.form.server_desc=''
          this.form.market_id =''
          this.form.server_type=''
          this.form.server_ip =''
          this.form.server_port =''
          this.form.server_auth =''
          this.form.server_user =''
          this.form.server_pass =''
          this.form.server_keys =''
          this.form.server_os =''
          this.form.server_cpu =''
          this.form.server_mem =''
          this.form.status =''
      }
    },
    mounted: function() {
      this.form.dm_market_id= utils.get_dm('05')
      this.form.dm_server_type=utils.get_dm('06')
      this.form.dm_server_os= utils.get_dm('40')
      this.form.dm_server_auth=utils.get_dm('39')
    } ,
  }

</script>

<style scoped>

</style>
