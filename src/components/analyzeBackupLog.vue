<template>
  <el-form label-width="120px" >
    <el-form-item label=""> </el-form-item>
    <el-row type="flex">
        <el-col :span="4">
            <el-form-item label="数据库环境">
                <el-select v-model="queryForm.db_env" placeholder="请选择数据库环境" @change="dbEnvClick" style="width:100%">
                    <el-option v-for="dm in queryForm.dm_db_env"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm" ></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="数据库类型">
                <el-select v-model="queryForm.db_type" placeholder="请选择数据库类型" @change="dbTypeClick" style="width:100%">
                    <el-option v-for="dm in queryForm.dm_db_type"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="备份任务">
                <el-select v-model="queryForm.db_tag" placeholder="请选择备份任务" style="width:100%">
                    <el-option v-for="dm in queryForm.dm_db_tag"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="备份日期">
                <el-date-picker
                        v-model="queryForm.beginDate"
                        style="width:180px"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <span style="font-size:8px"><pre> 止 </pre></span>
                <el-date-picker
                        style="width:180px"
                        v-model="queryForm.endDate"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="2">
            <el-button type="primary" @click="queryBackupLog">查询</el-button>
        </el-col>
    </el-row>
    <br>
    <el-col :span="24">
          <div id='myChart1' class="block" :style="{width: '100%', height: '300px'}"></div>
    </el-col>
    <el-col :span="24">
          <div id='myChart2' class="block" :style="{width: '100%', height: '300px'}"></div>
    </el-col>
    <el-col :span="24">
          <div id='myChart3' class="block" :style="{width: '100%', height: '300px'}"></div>
     </el-col>
  </el-form>
</template>

<script>
  import utils from "@/utils/common";
  import config from "@/utils/config";
  export default {
    data() {
        return {
            queryForm:{
                db_tag:'',
                db_env:'',
                db_type:'',
                dm_db_tag:[],
                dm_db_type:[],
                dm_db_env:[],
                beginDate:'',
                endDate:'',
            },
            svr:config(),
        };
    },

    methods:{
       dbEnvClick:function() {
          this.queryForm.dm_db_tag=utils.get_backup_tasks( this.queryForm.db_env, this.queryForm.db_type)
       },
       dbTypeClick:function() {
            this.queryForm.dm_db_tag=utils.get_backup_tasks( this.queryForm.db_env, this.queryForm.db_type)
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
        this.queryBackupLog()
      },
      openDetail:function(index,row){
        console.log('openDetail=',index,row)
      },
      queryBackupLog() {
        this.axios({
            method: 'get',
            url: utils.stringFormat("http://{0}:{1}/backup/log",[this.svr['server_ip'], this.svr['server_port']]),
            params: {
                db_tag     : this.queryForm.db_tag,
                db_env     : this.queryForm.db_env,
                db_type    : this.queryForm.db_type,
                begin_date : this.queryForm.beginDate,
                end_date   : this.queryForm.endDate,
            },
            timeout: 10000,
        }).then((res) => {
            if (res.data['Code'] == 200 ) {
                this.tableData =res.data['Data']
                let createDate = []
                let totalSize=[]
                let backupTime=[]
                let gzipTime=[]
                for (let i=0;i<this.tableData.length;i++) {
                    createDate[i] = this.tableData[i].create_date;
                    backupTime[i] = this.tableData[i].elapsed_backup;
                    gzipTime[i]   = this.tableData[i].elapsed_gzip;
                    totalSize[i]  = this.tableData[i].total_size;
                }
                this.$chart.LineImage('myChart1','备份时长(s)',createDate,backupTime);
                this.$chart.LineImage('myChart2','压缩时长(s)',createDate,gzipTime);
                this.$chart.BarImage('myChart3','备份大小(mb)',createDate,totalSize);
            }
        }).catch((error) => {
            console.log('error=',error);
        });
      },
    },
    mounted: function() {
      this.queryForm.dm_market_id=''
      this.queryForm.dm_db_type= utils.get_dm('02')
      this.queryForm.dm_db_env=utils.get_dm('03')
      this.queryForm.dm_db_tag=utils.get_backup_tasks( this.queryForm.db_env, this.queryForm.db_type)
      this.queryForm.beginDate=utils.getBeforeDate(7)
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
