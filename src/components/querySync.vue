<template>
  <el-form label-width="120px" >
    <el-form-item label=""> </el-form-item>
    <el-row type="flex">
        <el-col :span="4">
            <el-form-item label="同步标签">
                <el-input placeholder="请输入标签名" v-model="queryForm.syncTag" @input="changeValue" style="width:100%"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="项目名">
                <el-select v-model="queryForm.market_id" placeholder="请选择项目名" style="width:100%">
                    <el-option v-for="dm in queryForm.dm_market_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="业务类型">
                <el-select v-model="queryForm.sync_ywlx" placeholder="请选择业务类型" style="width:100%">
                    <el-option v-for="dm in queryForm.dm_sync_ywlx"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="数据方向">
                <el-select v-model="queryForm.sync_type" placeholder="请选择数据方向" style="width:100%">
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
    </el-row>
    <br>
    <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'left'}"
            border
            style="width: 100%"
            :default-sort="{prop: 'id', order: 'descending'}" >
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
            width="120">
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
              width="100">
      </el-table-column>
      <el-table-column
              prop="task_status"
              label="任务状态"
              width="100">
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
  </el-form>
</template>

<script>
  import  axios from 'axios'
  import utils from "@/utils/common";
  import config from "@/utils/config";
  export default {
    data() {
        return {
            queryForm:{
                syncTag :'',
                market_id:'',
                sync_ywlx:'',
                sync_type:'',
                status:'1',
                dm_market_id:[],
                dm_sync_ywlx:[],
                dm_sync_type:[],
            },
            svr:config(),
            tableData: [],
            currentPage: 1, // 当前页码
            total: 20,      // 总条数
            pageSize: 10,   // 每页的数据条数,
        };
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
        this.querySync()
      },
      querySync() {
        axios({
          method: 'get',
          url: utils.stringFormat("http://{0}:{1}/sync",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
              sync_tag    : this.queryForm.sync_tag,
              market_id   : this.queryForm.market_id,
              sync_ywlx   : this.queryForm.sync_ywlx,
              sync_type   : this.queryForm.sync_type,
              status      : this.queryForm.status,
          },
          timeout: 10000,
        }).then((res) => {
            console.log('res.data=',res.data)
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
    },
    mounted: function() {
      this.querySync();
      this.queryForm.dm_market_id=utils.get_dm('05')
      this.queryForm.dm_sync_ywlx= utils.get_dm('08')
      this.queryForm.dm_sync_type=utils.get_dm('09')
    }
  }

</script>

<style scoped>
  i {
    font-size: 18px;
    padding-left:20px;
    margin-left:5px;
  }
</style>
