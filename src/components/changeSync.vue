<template>
  <el-form  label-width="120px">
    <el-form-item label=""> </el-form-item>
    <el-col :span="4">
      <el-form-item label="同步标签">
        <el-input placeholder="请输入标签名" v-model="queryForm.syncTag" @input="changeValue" style="width:100%"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="项目名">
        <el-select v-model="queryForm.marketId" placeholder="请选择项目名" style="width:100%">
          <el-option v-for="dm in queryForm.dm_market_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="业务类型">
        <el-select v-model="queryForm.syncYwlx" placeholder="请选择业务类型" style="width:100%">
          <el-option v-for="dm in queryForm.dm_sync_ywlx"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="数据方向">
        <el-select v-model="queryForm.syncType" placeholder="请选择数据方向" style="width:100%">
          <el-option v-for="dm in queryForm.dm_sync_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="任务状态">
        <el-select v-model="queryForm.status"  style="width:100px">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="querySync">查询</el-button>
    </el-col>
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
              prop="sync_tag_"
              label="同步标识">
      </el-table-column>
      <el-table-column
              prop="comments"
              label="任务描述">
      </el-table-column>
      <el-table-column
              prop="sync_server"
              label="同步服务器"
              width="200">
      </el-table-column>
      <el-table-column
              prop="sync_ywlx"
              label="业务类型"
              width="110">
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
              label="同步状态"
              width="80">
      </el-table-column>
      <el-table-column
              fixed="right"
              label="操作"
              width="220">
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
                  @click="delSync(scope.$index, scope.row)">删除</el-button>
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

    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" :width="dialogWidth">
      <el-form :inline="true"  ref="editForm" :model="editForm" label-width="100px">
        <el-form-item label=""> </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="同步服务器">
              <el-select v-model="editForm.server_id" placeholder="请选择同步服务器" style="width:240px;">
                <el-option v-for="dm in editForm.dm_server_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="源数据库">
              <el-select v-model="editForm.sour_db_id" placeholder="请选择源数据库" style="width:240px">
                <el-option v-for="dm in editForm.dm_db_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目标数据库">
              <el-select v-model="editForm.dest_db_id" placeholder="请选择目标数据库" style="width:240px">
                <el-option v-for="dm in editForm.dm_db_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="同步标识号">
              <el-input placeholder="请输入同步标识号" v-model="editForm.sync_tag"  style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="同步业务类型">
              <el-select v-model="editForm.sync_ywlx" placeholder="请选择业务类型" style="width:240px">
                <el-option v-for="dm in editForm.dm_sync_ywlx"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="同步数据方向">
              <el-select v-model="editForm.sync_type" placeholder="请选择业务类型" style="width:240px">
                <el-option v-for="dm in editForm.dm_sync_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="同步主目录">
              <el-input placeholder="请输入同步主目录" v-model="editForm.script_path" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="同步脚本名">
              <el-input placeholder="请输入同步脚本名" v-model="editForm.script_file" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运行时间">
              <el-input placeholder="请输入运行时间" v-model="editForm.run_time" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务描述">
              <el-input placeholder="请输入任务描述" v-model="editForm.comments" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="源数据库名">
              <el-input placeholder="请输入源数据库名" v-model="editForm.sync_schema" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目标数据库名">
              <el-input placeholder="请输入目标数据库名" v-model="editForm.sync_schema_dest" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="同步表列表">
              <el-input placeholder="请输入同步表列表" v-model="editForm.sync_table" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="全量批大小">
              <el-input placeholder="请输入全量批大小" v-model="editForm.batch_size" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="增量批大小">
              <el-input placeholder="请输入增量批大小" v-model="editForm.batch_size_incr" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="同步间隔">
              <el-input placeholder="请输入同步间隔" v-model="editForm.sync_gap" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="同步列名">
              <el-input placeholder="请输入同步列名" v-model="editForm.sync_col_name" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="同步列值">
              <el-input placeholder="请输入同步列值" v-model="editForm.sync_col_val" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="时间类型">
              <el-select v-model="editForm.sync_time_type" placeholder="请选择时间类型" style="width:240px">
                <el-option v-for="dm in editForm.dm_sync_time_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="修复天数">
              <el-input placeholder="请输入修复天数" v-model="editForm.sync_repair_day" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="API服务器">
              <el-input placeholder="请输入API服务器" v-model="editForm.api_server" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务状态">
              <el-select v-model="editForm.status"  style="width:240px">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updSync">更新</el-button>
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
          dialogWidth: "1200px",
          queryForm:{
            syncTag :'',
            marketId:'',
            syncYwlx:'',
            syncType:'',
            status:'1',
            dm_market_id:[],
            dm_sync_ywlx:[],
            dm_sync_type:[],
          },
          editForm:{
            id:'',
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
      setDialogWidth() {
          let val = document.body.clientWidth
          const def = 800 // 默认宽度
          if (val < def) {
            this.dialogWidth = '100%'
          } else {
            this.dialogWidth = val*0.7 + 'px'
          }
      },
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
        this.querySync()
      },
      querySync() {
        console.log(this.queryForm)
        ajax({
          method: 'get',
          url: utils.stringFormat("http://{0}:{1}/sync",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
            syncTag    : this.queryForm.syncTag,
            marketId   : this.queryForm.marketId,
            syncYwlx   : this.queryForm.syncYwlx,
            syncType   : this.queryForm.syncType,
            status      : this.queryForm.status,
          },
          timeout: 10000,
        }).then((res) => {
          if (res.data['Code'] == 200 ) {
            if (res.data['Data'] != null) {
              this.tableData =res.data['Data']
            } else {
              this.tableData =[]
            }
          }
        }).catch((error) => {
          console.log('error=',error);
        });
      },
      updSync:function(){
        ajax({
          method: 'Post',
          url: utils.stringFormat("http://{0}:{1}/sync",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
            id                : this.editForm.id,
            server_id         : this.editForm.server_id,
            sour_db_id        : this.editForm.sour_db_id,
            dest_db_id        : this.editForm.dest_db_id,
            sync_tag          : this.editForm.sync_tag,
            sync_ywlx         : this.editForm.sync_ywlx,
            sync_type         : this.editForm.sync_type,
            script_path       : this.editForm.script_path,
            script_file       : this.editForm.script_file,
            run_time          : this.editForm.run_time,
            comments          : this.editForm.comments,
            sync_schema       : this.editForm.sync_schema,
            sync_schema_dest  : this.editForm.sync_schema_dest,
            sync_table        : this.editForm.sync_table,
            batch_size        : this.editForm.batch_size,
            batch_size_incr   : this.editForm.batch_size_incr,
            sync_gap          : this.editForm.sync_gap,
            sync_col_val      : this.editForm.sync_col_val,
            sync_col_name     : this.editForm.sync_col_name,
            sync_time_type    : this.editForm.sync_time_type,
            sync_repair_day   : this.editForm.sync_repair_day,
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
          url: utils.stringFormat("http://{0}:{1}/sync/{2}",[this.svr['server_ip'], this.svr['server_port'],row.id]),
          timeout: 10000,
        }).then((res) => {
          if (res.data['Code'] == 200 ) {
             this.editForm.id                = res.data['Data'].Id
             this.editForm.server_id         = res.data['Data'].ServerId
             this.editForm.sour_db_id        = res.data['Data'].SourDbId
             this.editForm.dest_db_id        = res.data['Data'].DestDbId
             this.editForm.sync_tag          = res.data['Data'].SyncTag
             this.editForm.sync_ywlx         = res.data['Data'].SyncYwlx
             this.editForm.sync_type         = res.data['Data'].SyncType
             this.editForm.script_path       = res.data['Data'].ScriptPath
             this.editForm.script_file       = res.data['Data'].ScriptFile
             this.editForm.run_time          = res.data['Data'].RunTime
             this.editForm.comments          = res.data['Data'].Comments
             this.editForm.sync_schema       = res.data['Data'].SyncSchema
             this.editForm.sync_schema_dest  = res.data['Data'].SyncSchemaDest
             this.editForm.sync_table        = res.data['Data'].SyncTable
             this.editForm.batch_size        = res.data['Data'].BatchSize
             this.editForm.batch_size_incr   = res.data['Data'].BatchSizeIncr
             this.editForm.sync_gap          = res.data['Data'].SyncGap
             this.editForm.sync_col_val      = res.data['Data'].SyncColVal
             this.editForm.sync_col_name     = res.data['Data'].SyncColName
             this.editForm.sync_time_type    = res.data['Data'].SyncTimeType
             this.editForm.sync_repair_day   = res.data['Data'].SyncRepairDay
             this.editForm.api_server        = res.data['Data'].ApiServer
             this.editForm.status            = res.data['Data'].Status
          }
        }).catch((error) => {
          console.log('error=',error);
        });
      },
      openDetail:function(index,row){
        console.log('openDetail=',index,row)
      },
      delSync:function(index,row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ajax.delete(utils.stringFormat("http://{0}:{1}/sync",[this.svr['server_ip'], this.svr['server_port']]),
                  { params:
                            {
                              id:row.id
                            }
                  }).then((res) => {
            if (res.data['Code'] == 200 ) {
              this.$notify({
                title: '成功',
                message: '用户['+row.comments+']删除成功',
                position: 'top-right',
                type: 'success'
              });
              this.querySync();
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
      window.onresize = () => {
        return (() => {
          this.setDialogWidth()
        })()
      }

      this.querySync();
      this.queryForm.dm_market_id=utils.get_dm('05')
      this.queryForm.dm_sync_ywlx= utils.get_dm('08')
      this.queryForm.dm_sync_type=utils.get_dm('09')

      //editForm init
      this.editForm.dm_server_id = utils.get_sync_server();
      this.editForm.dm_db_id = utils.get_ds_server();
      this.editForm.dm_sync_ywlx= utils.get_dm('08')
      this.editForm.dm_sync_type=utils.get_dm('09')
      this.editForm.dm_sync_time_type=utils.get_dm('10')

      this.querySync();
    }
  }

</script>

<style scoped>

</style>
