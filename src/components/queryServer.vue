<template>
  <el-form label-width="120px" >
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
              width="100">
      </el-table-column>
      <el-table-column
              prop="server_user"
              sortable
              width="150"
              label="用户">
      </el-table-column>
      <el-table-column
             prop="server_os"
             width="100"
             label="操作系统">
      </el-table-column>
      <el-table-column
              prop="status"
              label="是否启用"
              width="100">
      </el-table-column>
      <el-table-column
              prop="last_update_date"
              label="最近更新时间"
              width="180">
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
              server_name:'',
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
      queryServer() {
        axios({
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
    },
    mounted: function() {
      this.queryServer();
      this.queryForm.dm_market_id=utils.get_dm('05')
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
