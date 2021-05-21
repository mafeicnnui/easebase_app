<template>
  <el-form label-width="120px" >
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
              prop="market_name"
              label="项目名称"
              width="200">
      </el-table-column>
      <el-table-column
              prop="db_desc"
              label="数据源描述"
              width="300">
      </el-table-column>
      <el-table-column
              prop="db_env"
              label="数据源环境"
              width="160">
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
              ds_name:'',
              market_id:'',
              db_type:'',
              db_env:'',
              dm_market_id:[],
              dm_db_type:[],
              dm_db_env:[],
            },
            svr:config(),
            ds_name: '',
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
      queryDs() {
        axios({
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
    },
    mounted: function() {
      this.queryDs();
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
