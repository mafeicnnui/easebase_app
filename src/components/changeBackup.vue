<template>
  <el-form  label-width="120px">
    <el-form-item label=""> </el-form-item>
    <el-row type="flex">
      <el-col :span="5">
        <el-form-item label="任务描述">
          <el-input placeholder="请输入标签名" v-model="queryForm.db_tag" @input="changeValue" style="width:100%"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="数据库环境">
          <el-select v-model="queryForm.db_env" placeholder="请选择数据库环境" style="width:100%">
            <el-option v-for="dm in queryForm.dm_db_env"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="数据库类型">
          <el-select v-model="queryForm.db_type" placeholder="请选择数据库类型" style="width:100%">
            <el-option v-for="dm in queryForm.dm_db_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="queryBackup">查询</el-button>
      </el-col>
    </el-row>
    <br>
    <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'left'}"
            border
            style="width: 100%"
            :default-sort="{prop: 'EmpNo', order: 'descending'}" >
      <el-table-column
              prop="id"
              label="标识符"
              width="80">
      </el-table-column>
      <el-table-column
              prop="comments"
              label="任务描述" >
      </el-table-column>
      <el-table-column
              prop="db_tag"
              label="标签名">
      </el-table-column>
      <el-table-column
              prop="run_time"
              label="运行时间"
              width="120">
      </el-table-column>
      <el-table-column
              prop="api_server"
              label="接口服务器"
              width="200">
      </el-table-column>
      <el-table-column
              prop="status"
              label="备份状态"
              width="120">
      </el-table-column>
      <el-table-column
              prop="task_status"
              label="任务状态"
              width="120">
      </el-table-column>
      <el-table-column
              prop="last_update_date"
              label="最近更新时间" >
      </el-table-column>
      <el-table-column
              fixed="right"
              label="操作"
              width="250">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="openDetail(scope.$index, scope.row)">详情</el-button>
          <el-button
                  size="mini"
                  @click="openEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
                  size="mini"
                  type="danger"
                  @click="delBackup(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="block" style="margin-top:15px;">
      <el-pagination
              align='center'
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1,5,10,20]"
              :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length">
      </el-pagination>
    </div>

    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
      <el-form :inline="true"  ref="editForm" :model="editForm" label-width="100px">
        <el-form-item label=""> </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备份服务器">
              <el-select v-model="editForm.server_id" placeholder="请选择备份服务器" style="width:240px;">
                <el-option v-for="dm in editForm.dm_server_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据库服务">
              <el-select v-model="editForm.db_id" placeholder="请选择数据库服务" style="width:240px">
                <el-option v-for="dm in editForm.dm_db_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数据库类型">
              <el-select v-model="editForm.db_type" placeholder="请选择数据库类型" style="width:240px">
                <el-option v-for="dm in editForm.dm_db_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备份标识号">
              <el-input placeholder="请输入备份标识号" v-model="editForm.db_tag"  style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备份有效期">
              <el-input placeholder="请输入备份有效期" v-model="editForm.expire"  style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备份主目录">
              <el-input placeholder="请输入备份主目录" v-model="editForm.bk_base" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="脚本主目录">
              <el-input placeholder="请输入脚本主目录" v-model="editForm.script_path"  style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备份脚本名">
              <el-input placeholder="请输入备份脚本名" v-model="editForm.script_file" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备份命令名">
              <el-input placeholder="请输入备份命令名" v-model="editForm.bk_cmd"  style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运行时间">
              <el-input placeholder="请输入运行时间" v-model="editForm.run_time" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务描述">
              <el-input placeholder="请输入任务描述" v-model="editForm.comments" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备份数据库">
              <el-input placeholder="请输入备份数据库" v-model="editForm.backup_databases" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="API服务器">
              <el-input placeholder="请输入API服务器" v-model="editForm.api_server" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务状态">
              <el-select v-model="editForm.status"  style="width:250px">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updBackup">更新</el-button>
      </div>
    </el-dialog>

  </el-form>
</template>

<script>
  import ajax from 'axios'
  import config from '@/utils/config.js';
  import utils from '@/utils/common.js'

  export default {
    data() {
        return {
          queryForm:{
            db_tag:'',
            db_env:'',
            db_type:'',
            dm_db_type:[],
            dm_db_env:[],
          },
          editForm:{
            id:'',
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
          },
          svr:config(),
          tableData: [],
          currentPage: 1, // 当前页码
          total: 20,      // 总条数
          pageSize: 10,   // 每页的数据条数,
          dialogFormVisible : false,
          dialogTypeFlag:'',
          dialogFormTitle : '',
          }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      changeValue: function() {
        this.queryBackup()
      },
      queryBackup() {
        ajax({
          method: 'get',
          url: utils.stringFormat("http://{0}:{1}/backup",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
            db_tag   : this.queryForm.db_tag,
            db_env   : this.queryForm.db_env,
            db_type  : this.queryForm.db_type,
          },
          timeout: 10000,
        }).then((res) => {
          if (res.data['Code'] == 200 ) {
            this.tableData =res.data['Data']
          }
        }).catch((error) => {
          console.log('error=',error);
        });
      },
      updBackup:function(){
        ajax({
          method: 'Post',
          url: utils.stringFormat("http://{0}:{1}/backup",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
            id                : this.editForm.id,
            server_id         : this.editForm.server_id,
            db_id             : this.editForm.db_id,
            db_type           : this.editForm.db_type,
            db_tag            : this.editForm.db_tag,
            expire            : this.editForm.expire,
            bk_base           : this.editForm.bk_base,
            script_path       : this.editForm.script_path,
            script_file       : this.editForm.script_file,
            bk_cmd            : this.editForm.bk_cmd,
            run_time          : this.editForm.run_time,
            comments          : this.editForm.comments,
            backup_databases  : this.editForm.backup_databases,
            api_server        : this.editForm.api_server,
            status            : this.editForm.status,
          },
          timeout: 10000,
        }).then((res) => {
          if (res.data['Code'] == 200 ) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success'
            });
            this.queryBackup();
          }
        }).catch((error) => {
          console.log('error=',error);
        });

      },
      openEdit:function(index,row){
        this.dialogFormVisible = true
        this.dialogFormTitle = '备份变更'
        this.itemReadOnly = true
        this.itemShow = true
        this.dialogTypeFlag = 'edit'

        //获取服务器信息
        ajax({
          method: 'get',
          url: utils.stringFormat("http://{0}:{1}/backup/{2}",[this.svr['server_ip'], this.svr['server_port'],row.id]),
          timeout: 10000,
        }).then((res) => {
          if (res.data['Code'] == 200 ) {
             this.editForm.id               = res.data['Data'].Id
             this.editForm.server_id        = res.data['Data'].ServerId
             this.editForm.db_id            = res.data['Data'].DbId
             this.editForm.db_type          = res.data['Data'].DbType
             this.editForm.db_tag           = res.data['Data'].DbTag
             this.editForm.expire           = res.data['Data'].Expire
             this.editForm.bk_base          = res.data['Data'].BkBase
             this.editForm.script_path      = res.data['Data'].ScriptPath
             this.editForm.script_file      = res.data['Data'].ScriptFile
             this.editForm.bk_cmd           = res.data['Data'].BkCmd
             this.editForm.run_time         = res.data['Data'].RunTime
             this.editForm.comments         = res.data['Data'].Comments
             this.editForm.backup_databases = res.data['Data'].BackupDatabases
             this.editForm.api_server       = res.data['Data'].ApiServer
             this.editForm.status           = res.data['Data'].Status
          }
        }).catch((error) => {
          console.log('error=',error);
        });
      },
      openDetail:function(index,row){
        console.log('openDetail=',index,row)
      },
      delBackup:function(index,row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ajax.delete(utils.stringFormat("http://{0}:{1}/backp",[this.svr['server_ip'], this.svr['server_port']]),
                  { params:
                            {
                              id:row.id
                            }
                  }).then((res) => {
            if (res.data['Code'] == 200 ) {
              this.$notify({
                title: '成功',
                message: '用户['+row.server_desc+']删除成功',
                position: 'top-right',
                type: 'success'
              });
              this.queryBackup();
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data['Msg'],
                position: 'top-right',
                type: 'success'
              });
            }
          }).catch((error) => {
            console.log('error=',error);
          });

        }).catch((error) => {
          console.log('error=',error);
          this.$message({
            message: '已取消删除',
            position: 'top-right',
            type: 'success'
          });
        });
      },
    },
    mounted: function() {
      this.queryForm.dm_market_id=''
      this.queryForm.dm_db_type= utils.get_dm('02')
      this.queryForm.dm_db_env=utils.get_dm('03')
      //editForm init
      this.editForm.dm_server_id = utils.get_backup_server();
      this.editForm.dm_db_id = utils.get_ds_server();
      this.editForm.dm_db_type= utils.get_dm('02')
      this.queryBackup();
    }
  }

</script>

<style scoped>

</style>
