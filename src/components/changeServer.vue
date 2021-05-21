<template>
  <el-form  label-width="120px">
    <el-form-item label=""> </el-form-item>
    <el-row type="flex">
      <el-col :span="6">
        <el-form-item label="服务器描述">
          <el-input placeholder="请输入服务器(地址、端口、描述)" v-model="queryForm.server_name" @input="changeValue" style="width:100%"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="queryServer">查询</el-button>
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
              prop="server_type"
              label="服务器类型"
              width="120">
      </el-table-column>
      <el-table-column
              prop="server_desc"
              label="服务器描述"
              width="250">
      </el-table-column>
      <el-table-column
              prop="market_id"
              label="项目编码"
              width="100">
      </el-table-column>
      <el-table-column
              prop="market_name"
              label="项目名称"
              width="200">
      </el-table-column>
      <el-table-column
              prop="server_ip"
              label="地址"
              width="250">
      </el-table-column>
      <el-table-column
              prop="server_port"
              label="端口"
              width="80">
      </el-table-column>
      <el-table-column
              prop="server_user"
              sortable
              width="120"
              label="用户">
      </el-table-column>
      <el-table-column
              prop="server_os"
              width="100"
              label="操作系统">
      </el-table-column>
      <el-table-column
              prop="status"
              label="状态"
              width="80">
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
                  @click="delServer(scope.$index, scope.row)">删除</el-button>
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
              <el-form-item label="服务器描述">
                <el-input placeholder="请输入服务器描述" v-model="editForm.server_desc" style="width:240px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目编码">
                <el-select v-model="editForm.market_id" placeholder="请选择项目" style="width:240px">
                  <el-option v-for="dm in editForm.dm_market_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="服务器类型">
                <el-select v-model="editForm.server_type" placeholder="请选择服务器类型" style="width:240px">
                  <el-option v-for="dm in editForm.dm_server_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="认证方式">
                <el-select v-model="editForm.server_auth" placeholder="请选择服务器认证方式" style="width:240px">
                  <el-option v-for="dm in editForm.dm_server_auth"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="服务器地址">
                <el-input placeholder="请输入服务器地址" v-model="editForm.server_ip"  style="width:240px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="服务器端口">
                <el-input placeholder="请输入服务器端口" v-model="editForm.server_port" style="width:240px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="服务器用户">
                <el-input placeholder="请输入服务器用户" v-model="editForm.server_user" style="width:240px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="服务器口令">
                <el-input placeholder="请输入服务器口令" v-model="editForm.server_pass" show-password style="width:240px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="服务器密钥">
                <el-input placeholder="请输入服务器密钥" v-model="editForm.server_keys" style="width:240px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="服务器系统">
                <el-select v-model="editForm.server_os" placeholder="请选择服务器系统" style="width:240px">
                  <el-option v-for="dm in editForm.dm_server_os"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="服务器CPU">
                <el-input placeholder="请输入服务器CPU" v-model="editForm.server_cpu" style="width:240px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="服务器内存">
                <el-input placeholder="请输入服务器内存" v-model="editForm.server_mem" style="width:240px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="服务器状态">
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
        <el-button type="primary" @click="updServer">更新</el-button>
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
            server_name:'',
          },
          editForm:{
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
        this.queryServer()
      },
      queryServer() {
        ajax({
          method: 'get',
          url: utils.stringFormat("http://{0}:{1}/server",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
            server_name   : this.queryForm.server_name,
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
      updServer:function(){
        ajax({
          method: 'Post',
          url: utils.stringFormat("http://{0}:{1}/server",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
            id          : this.editForm.id,
            server_desc : this.editForm.server_desc,
            market_id   : this.editForm.market_id,
            server_type : this.editForm.server_type,
            server_ip   : this.editForm.server_ip,
            server_port : this.editForm.server_port,
            server_auth : this.editForm.server_auth,
            server_user : this.editForm.server_user,
            server_pass : this.editForm.server_pass,
            server_keys : this.editForm.server_keys,
            server_os   : this.editForm.server_os,
            server_cpu  : this.editForm.server_cpu,
            server_mem  : this.editForm.server_mem,
            status      : this.editForm.status,
          },
          timeout: 10000,
        }).then((res) => {
          if (res.data['Code'] == 200 ) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success'
            });
            this.queryServer();
          }
        }).catch((error) => {
          console.log('error=',error);
        });

      },
      openEdit:function(index,row){
        this.dialogFormVisible = true
        this.dialogFormTitle = '服务器变更'
        this.itemReadOnly = true
        this.itemShow = true
        this.dialogTypeFlag = 'edit'

        //获取服务器信息
        ajax({
          method: 'get',
          url: utils.stringFormat("http://{0}:{1}/server/{2}",[this.svr['server_ip'], this.svr['server_port'],row.id]),
          timeout: 10000,
        }).then((res) => {
          if (res.data['Code'] == 200 ) {
             this.editForm.id           = res.data['Data'].Id
             this.editForm.server_desc  = res.data['Data'].ServerDesc
             this.editForm.market_id    = res.data['Data'].MarketId
             this.editForm.server_type  = res.data['Data'].ServerType
             this.editForm.server_ip    = res.data['Data'].ServerIp
             this.editForm.server_port  = res.data['Data'].ServerPort
             this.editForm.server_auth  = res.data['Data'].ServerAuth
             this.editForm.server_user  = res.data['Data'].ServerUser
             this.editForm.server_pass  = res.data['Data'].ServerPass
             this.editForm.server_keys  = res.data['Data'].ServerKeys
             this.editForm.server_os    = res.data['Data'].ServerOs
             this.editForm.server_cpu   = res.data['Data'].ServerCpu
             this.editForm.server_mem   = res.data['Data'].ServerMem
             this.editForm.status       = res.data['Data'].Status
          }
        }).catch((error) => {
          console.log('error=',error);
        });
      },
      openDetail:function(index,row){
        console.log('openDetail=',index,row)
      },
      delServer:function(index,row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ajax.delete(utils.stringFormat("http://{0}:{1}/server",[this.svr['server_ip'], this.svr['server_port']]),
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
              this.queryServer();
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
      //editForm init
      this.editForm.dm_market_id= utils.get_dm('05')
      this.editForm.dm_server_type=utils.get_dm('06')
      this.editForm.dm_server_os= utils.get_dm('40')
      this.editForm.dm_server_auth=utils.get_dm('39')
      this.queryServer();
    }
  }

</script>

<style scoped>

</style>
