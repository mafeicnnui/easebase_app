<template>
  <el-form  label-width="120px">
    <el-form-item label=""> </el-form-item>
    <el-row type="flex">
      <el-col :span="5">
        <el-form-item label="数据源描述">
          <el-input placeholder="请输入数据源描述" v-model="queryForm.ds_name" @input="changeValue" style="width:100%"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="项目名称">
          <el-select v-model="queryForm.market_id" placeholder="请选择项目" style="width:100%">
            <el-option v-for="dm in queryForm.dm_market_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
          </el-select>
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
        <el-button type="primary" @click="queryDs">查询</el-button>
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
              prop="db_desc"
              label="数据源描述"
              width="300">
      </el-table-column>
      <el-table-column
              prop="db_env"
              label="数据源环境"
              width="120">
      </el-table-column>
      <el-table-column
              prop="ds_name"
              label="数据源定义"
              width="350">
      </el-table-column>
      <el-table-column
              prop="user"
              sortable
              width="150"
              label="用户">
      </el-table-column>
      <el-table-column
              prop="status"
              sortable
              label="是否启用"
              width="120">
      </el-table-column>
      <el-table-column
              prop="updater"
              label="更新人"
              width="100">
      </el-table-column>
      <el-table-column
              prop="last_update_date"
              label="最近更新时间"
              width="180">
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
                  @click="delDs(scope.$index, scope.row)">删除</el-button>

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
            <el-form-item label="项目编码">
              <el-select v-model="editForm.market_id" placeholder="请选择项目" style="width:240px">
                <el-option v-for="dm in editForm.dm_market_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实例类型">
              <el-select v-model="editForm.inst_type" placeholder="请选择实例" style="width:240px">
                <el-option v-for="dm in editForm.dm_inst_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
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
            <el-form-item label="数据库环境">
              <el-select v-model="editForm.db_env" placeholder="请选择数据库环境" style="width:240px">
                <el-option v-for="dm in editForm.dm_db_env"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数据源描述">
              <el-input placeholder="请输入数据源描述" v-model="editForm.db_desc" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据源地址">
              <el-input placeholder="请输入数据源地址" v-model="editForm.ip"  style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数据源端口">
              <el-input placeholder="请输入数据源端口" v-model="editForm.port" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据源服务名">
              <el-input placeholder="请输入数据源服务名" v-model="editForm.service" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数据源用户">
              <el-input placeholder="请输入数据源用户" v-model="editForm.user" style="width:240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据源口令">
              <el-input placeholder="请输入数据源口令" v-model="editForm.password" show-password style="width:240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数据源状态">
              <el-select v-model="editForm.status"  style="width:240px">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否启用代理">
              <el-select v-model="editForm.proxy_status"  style="width:240px">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="代理服务接口">
              <el-select v-model="editForm.proxy_server" placeholder="请选择代理服务接口" style="width:240px">
                <el-option v-for="dm in editForm.dm_proxy_server"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updDs">更新</el-button>
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
            ds_name:'',
            market_id:'',
            db_type:'',
            db_env:'',
            dm_market_id:[],
            dm_db_type:[],
            dm_db_env:[],
          },
          editForm:{
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
          },
          svr:config(),
          ds_name: '',
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
        this.queryDs()
      },
      queryDs() {
        ajax({
          method: 'get',
          url: utils.stringFormat("http://{0}:{1}/ds",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
            ds_name   : this.queryForm.ds_name,
            market_id : this.queryForm.market_id,
            db_type   : this.queryForm.db_type,
            db_env    : this.queryForm.db_env,
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
      updDs:function(){
        ajax({
          method: 'Post',
          url: utils.stringFormat("http://{0}:{1}/ds",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
            id           : this.editForm.id,
            market_id    : this.editForm.market_id,
            inst_type    : this.editForm.inst_type,
            db_type      : this.editForm.db_type,
            db_env       : this.editForm.db_env,
            db_desc      : this.editForm.db_desc,
            ip           : this.editForm.ip,
            port         : this.editForm.port,
            service      : this.editForm.service,
            user         : this.editForm.user,
            password     : this.editForm.password,
            status       : this.editForm.status,
            proxy_status : this.editForm.proxy_status,
            proxy_server : this.editForm.proxy_server,
          },
          timeout: 10000,
        }).then((res) => {
          if (res.data['Code'] == 200 ) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success'
            });
            this.queryDs();
          }
        }).catch((error) => {
          console.log('error=',error);
        });

      },
      openEdit:function(index,row){
        this.dialogFormVisible = true
        this.dialogFormTitle = '数据源变更'
        this.itemReadOnly = true
        this.itemShow = true
        this.dialogTypeFlag = 'edit'

        //获取数据源信息
        ajax({
          method: 'get',
          url: utils.stringFormat("http://{0}:{1}/ds/{2}",[this.svr['server_ip'], this.svr['server_port'],row.id]),
          timeout: 10000,
        }).then((res) => {
          if (res.data['Code'] == 200 ) {

             this.editForm.id           = res.data['Data'].Id
             this.editForm.market_id    = res.data['Data'].MarketId
             this.editForm.inst_type    = res.data['Data'].InstType
             this.editForm.db_type      = res.data['Data'].DbType
             this.editForm.db_env       = res.data['Data'].DbEnv
             this.editForm.db_desc      = res.data['Data'].DbDesc
             this.editForm.ip           = res.data['Data'].Ip
             this.editForm.port         = res.data['Data'].Port
             this.editForm.service      = res.data['Data'].Service
             this.editForm.user         = res.data['Data'].User
             this.editForm.password     = res.data['Data'].Password
             this.editForm.status       = res.data['Data'].Status
             this.editForm.proxy_status = res.data['Data'].ProxyStatus
             this.editForm.proxy_server = res.data['Data'].ProxyServer

          }
        }).catch((error) => {
          console.log('error=',error);
        });
      },
      openDetail:function(index,row){
        console.log('openDetail=',index,row)
      },
      delDs:function(index,row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ajax.delete(utils.stringFormat("http://{0}:{1}/ds",[this.svr['server_ip'], this.svr['server_port']]),
                  { params:
                            {
                              id:row.id
                            }
                  }).then((res) => {
            if (res.data['Code'] == 200 ) {
              this.$notify({
                title: '成功',
                message: '用户['+row.db_desc+']删除成功',
                position: 'top-right',
                type: 'success'
              });
              this.queryDs();
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
      testDs:function(index,row) {
          ajax.post(utils.stringFormat("http://{0}:{1}/ds/test",[this.svr['server_ip'], this.svr['server_port']]),
                  { params:
                            {
                              id:row.id
                            }
                  }).then((res) => {
            if (res.data['Code'] == 200 ) {
              this.$notify({
                title: '成功',
                message: '用户['+row.db_desc+']删除成功',
                position: 'top-right',
                type: 'success'
              });
              this.queryDs();
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

      },
    },
    mounted: function() {
      //queryForm init
      this.queryForm.dm_market_id=utils.get_dm('05')
      this.queryForm.dm_db_type= utils.get_dm('02')
      this.queryForm.dm_db_env=utils.get_dm('03')
      //editForm init
      this.editForm.dm_market_id= utils.get_dm('05')
      this.editForm.dm_inst_type=utils.get_dm('07')
      this.editForm.dm_db_type= utils.get_dm('02')
      this.editForm.dm_db_env=utils.get_dm('03')
      this.editForm.dm_proxy_server=utils.get_dm('26')
      this.queryDs();
    }
  }

</script>

<style scoped>

</style>
