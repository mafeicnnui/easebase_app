<template>
  <el-form label-width="120px" >
    <el-form-item label=""> </el-form-item>
    <el-row type="flex">
        <el-col :span="5">
            <el-form-item label="任务描述">
                <el-input placeholder="请输入标签名" v-model="queryForm.db_desc" @input="changeValue" style="width:100%"></el-input>
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
            :default-sort="{prop: 'id', order: 'descending'}" >
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
            prop="updater"
            label="更新人"
            width="150">
     </el-table-column>
     <el-table-column
            prop="last_update_date"
            label="最近更新时间" >
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
                db_desc:'',
                db_env:'',
                db_type:'',
                dm_db_type:[],
                dm_db_env:[],
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
        this.queryDs()
      },
      queryBackup() {
        axios({
          method: 'get',
          url: utils.stringFormat("http://{0}:{1}/backup",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
              db_desc  : this.queryForm.db_desc,
              db_env   : this.queryForm.db_env,
              db_type  : this.queryForm.db_type,
          },
          timeout: 10000,
        }).then((res) => {
          console.log(res.data['Data'])
          if (res.data['Code'] == 200 ) {
            this.tableData =res.data['Data']
          }
        }).catch((error) => {
          console.log('error=',error);
        });
      },
    },
    mounted: function() {
      this.queryBackup();
      this.queryForm.dm_market_id=''
      this.queryForm.dm_db_type= utils.get_dm('02')
      this.queryForm.dm_db_env=utils.get_dm('03')
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
