<template>
  <el-form label-width="120px" >
    <el-form-item label=""> </el-form-item>
    <el-row type="flex">
        <el-col :span="4">
            <el-form-item label="备份标识">
                <el-input placeholder="请输入标签名" v-model="queryForm.db_tag" @input="changeValue" style="width:100%"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="数据库环境">
                <el-select v-model="queryForm.db_env" placeholder="请选择数据库环境" style="width:100%">
                    <el-option v-for="dm in queryForm.dm_db_env"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="数据库类型">
                <el-select v-model="queryForm.db_type" placeholder="请选择数据库类型" style="width:100%">
                    <el-option v-for="dm in queryForm.dm_db_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="备份日期">
                <el-date-picker
                        v-model="queryForm.beginDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        style="width:180px"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <span style="font-size:8px"><pre> 止 </pre></span>
                <el-date-picker
                        style="width:180px"
                        v-model="queryForm.endDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="2">
            <el-form-item >
               <el-button type="primary" @click="queryBackupLog">查询</el-button>
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
                prop="comments"
                label="任务描述" >
      </el-table-column>
      <el-table-column
                prop="db_tag"
                label="标签名">
      </el-table-column>
      <el-table-column
              prop="start_time"
              label="开始时间"
              width="200">
      </el-table-column>
      <el-table-column
              prop="end_time"
              label="结束时间"
              width="200">
      </el-table-column>
      <el-table-column
            prop="total_size"
            label="大小"
            width="120">
       </el-table-column>
       <el-table-column
            prop="elapsed_backup"
            label="备份时间"
            width="120">
       </el-table-column>
        <el-table-column
            prop="elapsed_gzip"
            label="压缩时间"
            width="120">
        </el-table-column>
      <el-table-column
              prop="status"
              label="备份状态"
              width="120">
          <template slot-scope="scope">
              <div v-html="scope.row.status"></div>
          </template>
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
                      prop="db_tag"
                      label="标签名" >
              </el-table-column>
              <el-table-column
                      prop="db_name"
                      label="数据库名" >
              </el-table-column>
              <el-table-column
                      prop="file_name"
                      label="文件名"
                      >
              </el-table-column>
              <el-table-column
                      prop="create_date"
                      label="备份日期"
                      width="100">
              </el-table-column>
              <el-table-column
                      prop="db_size"
                      label="备份大小"
                      width="100">
              </el-table-column>
              <el-table-column
                      prop="elapsed_backup"
                      label="备份耗时"
                      width="100">
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
  // import  axios from 'axios'
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
                db_tag:'',
                db_env:'',
                db_type:'',
                dm_db_type:[],
                dm_db_env:[],
                beginDate:'',
                endDate:'',
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
        this.queryBackupLog()
      },
      openDetail:function(index,row){
            this.dialogFormVisible = true
            this.dialogFormTitle = '备份详情-'+row.comments.split('[')[0]
            this.itemReadOnly = true
            this.itemShow = true
            this.dialogTypeFlag = 'detail'
            this.queryBackupLogDetail(row.db_tag,row.create_date)
      },
      queryBackupLog() {
        this.axios({
          method: 'get',
          url: utils.stringFormat("http://{0}:{1}/backup/log",[this.svr['server_ip'], this.svr['server_port']]),
          params: {
              db_tag    : this.queryForm.db_tag,
              db_env     : this.queryForm.db_env,
              db_type    : this.queryForm.db_type,
              begin_date : this.queryForm.beginDate,
              end_date   : this.queryForm.endDate,
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
      queryBackupLogDetail(p_syncTag,p_createnDate) {
            this.axios({
                method: 'get',
                url: utils.stringFormat("http://{0}:{1}/backup/log/detail",[this.svr['server_ip'], this.svr['server_port']]),
                params: {
                    db_tag : p_syncTag,
                    create_date : p_createnDate,
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
      this.queryBackupLog();
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
