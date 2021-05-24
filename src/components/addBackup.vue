<template>
  <el-form :inline="true"  ref="form" :model="form" label-width="120px">
    <el-form-item label=""> </el-form-item>
    <el-row>
      <el-col :span="8">
        <el-form-item label="备份服务器">
          <el-select v-model="form.server_id" placeholder="请选择备份服务器" style="width:250px;">
            <el-option v-for="dm in form.dm_server_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="数据库服务">
          <el-select v-model="form.db_id" placeholder="请选择数据库服务" style="width:250px">
            <el-option v-for="dm in form.dm_db_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="8">
          <el-form-item label="数据库类型">
            <el-select v-model="form.db_type" placeholder="请选择数据库类型" style="width:250px">
              <el-option v-for="dm in form.dm_db_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="备份标识号">
            <el-input placeholder="请输入备份标识号" v-model="form.db_tag"  style="width:250px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="备份有效期">
          <el-input placeholder="请输入备份有效期" v-model="form.expire"  style="width:250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="备份主目录">
          <el-input placeholder="请输入备份主目录" v-model="form.bk_base" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="脚本主目录">
          <el-input placeholder="请输入脚本主目录" v-model="form.script_path"  style="width:250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="备份脚本名">
          <el-input placeholder="请输入备份脚本名" v-model="form.script_file" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="备份命令名">
          <el-input placeholder="请输入备份命令名" v-model="form.bk_cmd"  style="width:250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="运行时间">
          <el-input placeholder="请输入运行时间" v-model="form.run_time" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="任务描述">
            <el-input placeholder="请输入任务描述" v-model="form.comments" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="备份数据库">
          <el-input placeholder="请输入备份数据库" v-model="form.backup_databases" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="API服务器">
          <el-input placeholder="请输入API服务器" v-model="form.api_server" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="任务状态">
          <el-select v-model="form.status"  style="width:250px">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label=""> </el-form-item>
    <el-row type="flex">
      <el-col :span="16"  style="text-align: center">
        <el-form-item>
          <el-button type="primary" @click="saveBackup">保存</el-button>
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
              server_id:'',
              db_id: '',
              db_type: '',
              db_tag:'',
              expire:'',
              bk_base:'',
              script_path:'',
              script_file:'',
              bk_cmd:'',
              run_time:'',
              comments:'',
              backup_databases:'',
              api_server:'',
              status:'',
              dm_server_id:[],
              dm_db_id:[],
              dm_db_type:[],
          }
        };
    },
    methods:{
      saveBackup() {
        console.log('form=',this.form);
        ajax({
          method: 'Put',
          url: utils.stringFormat("http://{0}:{1}/backup",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
              server_id         : this.form.server_id,
              db_id             : this.form.db_id,
              db_type           : this.form.db_type,
              db_tag            : this.form.db_tag,
              expire            : this.form.expire,
              bk_base           : this.form.bk_base,
              script_path       : this.form.script_path,
              script_file       : this.form.script_file,
              bk_cmd            : this.form.bk_cmd,
              run_time          : this.form.run_time,
              comments          : this.form.comments,
              backup_databases  : this.form.backup_databases,
              api_server        : this.form.api_server,
              status            : this.form.status,
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
          this.form.server_id=''
          this.form.db_id =''
          this.form.db_type=''
          this.form.db_tag =''
          this.form.expire =''
          this.form.bk_base =''
          this.form.script_path =''
          this.form.script_file = ''
          this.form.bk_cmd =''
          this.form.run_time =''
          this.form.comments =''
          this.form.backup_databases =''
          this.form.api_server =''
          this.form.status =''
      }
    },
    mounted: function() {
      this.form.dm_server_id = utils.get_backup_server();
      this.form.dm_db_id = utils.get_ds_server();
      this.form.dm_db_type= utils.get_dm('02')
    } ,
  }

</script>

<style scoped>

</style>
