<template>
  <el-form :inline="true"  ref="form" :model="form" label-width="120px">
    <el-form-item label=""> </el-form-item>
    <el-row>
      <el-col :span="8">
        <el-form-item label="同步服务器">
          <el-select v-model="form.server_id" placeholder="请选择同步服务器" style="width:250px;">
            <el-option v-for="dm in form.dm_server_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="源数据库">
          <el-select v-model="form.sour_db_id" placeholder="请选择源数据库" style="width:250px">
            <el-option v-for="dm in form.dm_db_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="目标数据库">
          <el-select v-model="form.dest_db_id" placeholder="请选择目标数据库" style="width:250px">
            <el-option v-for="dm in form.dm_db_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
          <el-form-item label="同步标识号">
            <el-input placeholder="请输入同步标识号" v-model="form.sync_tag"  style="width:250px"></el-input>
          </el-form-item>
      </el-col>
        <el-col :span="8">
          <el-form-item label="同步业务类型">
            <el-select v-model="form.sync_ywlx" placeholder="请选择业务类型" style="width:250px">
              <el-option v-for="dm in form.dm_sync_ywlx"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
           <el-form-item label="同步数据方向">
            <el-select v-model="form.sync_type" placeholder="请选择业务类型" style="width:250px">
              <el-option v-for="dm in form.dm_sync_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="同步主目录">
          <el-input placeholder="请输入同步主目录" v-model="form.script_path" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="同步脚本名">
          <el-input placeholder="请输入同步脚本名" v-model="form.script_file" style="width:250px"></el-input>
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
        <el-form-item label="源数据库名">
          <el-input placeholder="请输入源数据库名" v-model="form.sync_schema" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="目标数据库名">
          <el-input placeholder="请输入目标数据库名" v-model="form.sync_schema_dest" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="同步表列表">
          <el-input placeholder="请输入同步表列表" v-model="form.sync_table" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="全量批大小">
          <el-input placeholder="请输入全量批大小" v-model="form.batch_size" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="增量批大小">
          <el-input placeholder="请输入增量批大小" v-model="form.batch_size_incr" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="同步间隔">
          <el-input placeholder="请输入同步间隔" v-model="form.sync_gap" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="同步列名">
          <el-input placeholder="请输入同步列名" v-model="form.sync_col_name" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="同步列值">
          <el-input placeholder="请输入同步列值" v-model="form.sync_col_val" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
          <el-form-item label="时间类型">
            <el-select v-model="form.sync_time_type" placeholder="请选择时间类型" style="width:250px">
              <el-option v-for="dm in form.dm_sync_time_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="修复天数">
          <el-input placeholder="请输入修复天数" v-model="form.sync_repair_day" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="API服务器">
          <el-input placeholder="请输入API服务器" v-model="form.api_server" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
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
      <el-col :span="24"  style="text-align: center">
        <el-form-item>
          <el-button type="primary" @click="saveSync">保存</el-button>
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
              sour_db_id:'',
              dest_db_id:'',
              sync_tag:'',
              sync_ywlx: '',
              sync_type:'',
              script_path:'',
              script_file:'',
              run_time:'',
              comments:'',
              sync_schema:'',
              sync_schema_dest:'',
              sync_table:'',
              batch_size:'',
              batch_size_incr:'',
              sync_gap:'',
              sync_col_val:'',
              sync_col_name:'',
              sync_time_type:'',
              sync_repair_day:'',
              api_server:'',
              status:'',
              dm_server_id:[],
              dm_db_id:[],
              dm_db_type:[],
              dm_sync_ywlx:[],
              dm_sync_type:[],
              dm_sync_time_type:[]
          }
        };
    },
    methods:{
      saveSync() {
        console.log('form=',this.form);
        ajax({
          method: 'Put',
          url: utils.stringFormat("http://{0}:{1}/sync",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
              server_id         : this.form.server_id,
              sour_db_id        : this.form.sour_db_id,
              dest_db_id        : this.form.dest_db_id,
              sync_tag          : this.form.sync_tag,
              sync_ywlx         : this.form.sync_ywlx,
              sync_type         : this.form.sync_type,
              script_path       : this.form.script_path,
              script_file       : this.form.script_file,
              run_time          : this.form.run_time,
              comments          : this.form.comments,
              sync_schema       : this.form.sync_schema,
              sync_schema_dest  : this.form.sync_schema_dest,
              sync_table        : this.form.sync_table,
              batch_size        : this.form.batch_size,
              batch_size_incr   : this.form.batch_size_incr,
              sync_gap          : this.form.sync_gap,
              sync_col_val      : this.form.sync_col_val,
              sync_col_name     : this.form.sync_col_name,
              sync_time_type    : this.form.sync_time_type,
              sync_repair_day   : this.form.sync_repair_day,
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
            //this.clearForm();
          }
        }).catch((error) => {
          console.log('error=',error);
        });

      },
      clearForm() {
          this.form.server_id=''
          this.form.sour_db_id =''
          this.form.dest_db_id =''
          this.form.sync_tag=''
          this.form.sync_ywlx =''
          this.form.sync_type =''
          this.form.script_path =''
          this.form.script_file =''
          this.form.run_time = ''
          this.form.comments =''
          this.form.sync_schema =''
          this.form.sync_schema_dest =''
          this.form.sync_table =''
          this.form.batch_size =''
          this.form.batch_size_incr =''
          this.form.sync_gap =''
          this.form.sync_col_val =''
          this.form.sync_col_name =''
          this.sync_time_type =''
          this.form.sync_repair_day =''
          this.form.api_server =''
          this.form.status =''
      }
    },
    mounted: function() {
      this.form.dm_server_id = utils.get_sync_server();
      this.form.dm_db_id = utils.get_ds_server();
      this.form.dm_sync_ywlx= utils.get_dm('08')
      this.form.dm_sync_type=utils.get_dm('09')
      this.form.dm_sync_time_type=utils.get_dm('10')
    } ,
  }

</script>

<style scoped>

</style>
