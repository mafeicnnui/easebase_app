<template>
  <el-form label-width="120px" >
    <el-form-item label=""> </el-form-item>
    <el-row type="flex">
        <el-col :span="4">
            <el-form-item label="同步标识">
                <el-input placeholder="请输入标签名" v-model="queryForm.syncTag" @input="changeValue" style="width:100%"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="项目名称">
                <el-select v-model="queryForm.market_id" placeholder="请选择项目名称" style="width:100%">
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
        <el-col :span="8">
            <el-form-item label="同步日期">
                <el-date-picker
                        v-model="queryForm.beginDate"
                        style="width:180px"
                        type="date"
                        placeholder="请选择时间"
                      >
                </el-date-picker>
                <span style="font-size:8px"><pre> 止 </pre></span>
                <el-date-picker
                        style="width:180px"
                        v-model="queryForm.endDate"
                        type="date"
                        placeholder="请选择时间"
                       >
                </el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="2">
            <el-form-item >
               <el-button type="primary" @click="querySyncLog">查询</el-button>
            </el-form-item>
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
                prop="market_name"
                label="项目名称"
                width="200px">
        </el-table-column>
        <el-table-column
                prop="comments"
                label="任务描述">
        </el-table-column>
        <el-table-column
                prop="sync_tag"
                label="标签名"
               >
        </el-table-column>
        <el-table-column
                prop="create_date"
                label="最近同步日期"
                width="200">
        </el-table-column>
        <el-table-column
                prop="duration"
                label="同步时长(s)"
                width="120">
        </el-table-column>
        <el-table-column
                prop="amount"
                label="同步记录"
                width="120">
      </el-table-column>
      <el-table-column
                fixed="right"
                label="操作"
                width="100">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="openDetail(scope.$index, scope.row)">详情</el-button>
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
            <el-table
                      :data="tableDataDetail.slice((currentPageDetail-1)*pageSizeDetail,currentPageDetail*pageSizeDetail)"
                      :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'left'}"
                      border
                      style="width: 100%"
                      :default-sort="{prop: 'id', order: 'descending'}" >

                  <el-table-column
                          prop="sync_tag"
                          label="标签名" >
                  </el-table-column>
                  <el-table-column
                          prop="sync_table"
                          label="同步表" >
                  </el-table-column>
                  <el-table-column
                          prop="create_date"
                          label="同步日期"
                          width="180">
                  </el-table-column>
                  <el-table-column
                          prop="amount"
                          label="同步记录"
                          width="120">
                  </el-table-column>
                  <el-table-column
                          prop="duration"
                          label="同步时长(s)"
                          width="120">
                  </el-table-column>
              </el-table>
            <div class="block" style="margin-top:15px;">
                <el-pagination
                        align='center'
                        @size-change="handleSizeChangeDetail"
                        @current-change="handleCurrentChangeDetail"
                        :current-page="currentPageDetail"
                        :page-sizes="[1,5,10,20]"
                        :page-size="pageSizeDetail" layout="total, sizes, prev, pager, next, jumper"
                        :total="tableDataDetail.length">
                </el-pagination>
           </div>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">关 闭</el-button>
          </div>
      </el-dialog>

  </el-form>
</template>

<script>
  import utils from "@/utils/common";
  import config from "@/utils/config";
  export default {
    data() {
        return {
            dialogWidth: "1200px",
            dialogFormVisible : false,
            dialogTypeFlag:'',
            dialogFormTitle : '',
            queryForm:{
                syncTag:'',
                dm_sync_ywlx:[],
                dm_market_id:[],
                beginDate:new Date(),
                endDate:new Date(),
            },
            svr:config(),
            tableData: [],
            currentPage: 1, // 当前页码
            total: 20,      // 总条数
            pageSize: 10,   // 每页的数据条数,

            tableDataDetail: [],
            currentPageDetail: 1, // 当前页码
            totalDetail: 20,      // 总条数
            pageSizeDetail: 10,   // 每页的数据条数,
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
      handleSizeChangeDetail(val) {
            console.log(`每页 ${val} 条`);
            this.currentPageDetail = 1;
            this.pageSizeDetail = val;
      },
      handleCurrentChangeDetail(val) {
            console.log(`当前页: ${val}`);
            this.currentPageDetail = val;
      },
      changeValue: function() {
        this.querySyncLog()
      },
      openDetail:function(index,row){
          this.dialogFormVisible = true
          this.dialogFormTitle = '同步详情-'+row.comments.split('[')[0]
          this.itemReadOnly = true
          this.itemShow = true
          this.dialogTypeFlag = 'detail'
          this.querySyncLogDetail(row.sync_tag,row.create_date)
      },
      querySyncLog() {
            this.axios({
                method: 'get',
                url: utils.stringFormat("http://{0}:{1}/sync/log",[this.svr['server_ip'], this.svr['server_port']]),
                params: {
                    sync_tag   : this.queryForm.syncTag,
                    market_id  : this.queryForm.market_id,
                    sync_ywlx  : this.queryForm.sync_ywlx,
                    begin_date : new Date(this.queryForm.beginDate),
                    end_date   : new Date(this.queryForm.endDate),
                },
                timeout: 100000,
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
      querySyncLogDetail(p_syncTag,p_create_date) {
            this.axios({
                method: 'get',
                url: utils.stringFormat("http://{0}:{1}/sync/log/detail",[this.svr['server_ip'], this.svr['server_port']]),
                params: {
                    sync_tag    : p_syncTag,
                    create_date : p_create_date,
                },
                timeout: 10000,
            }).then((res) => {
                if (res.data['Code'] == 200 ) {
                    if (res.data['Data'] != null) {
                       this.tableDataDetail =res.data['Data']
                    } else {
                        this.tableDataDetail =[]
                    }
                }
            }).catch((error) => {
                console.log('error=',error);
            });
        },
    },
    mounted: function() {
      this.querySyncLog();
      this.queryForm.dm_market_id= utils.get_dm('05')
      this.queryForm.dm_sync_ywlx= utils.get_dm('08')
      this.queryForm.beginDate=utils.getBeforeDate(1)
      this.queryForm.endDate=utils.getBeforeDate("0")
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
