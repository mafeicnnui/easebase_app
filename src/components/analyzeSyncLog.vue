<template>
  <el-form label-width="120px" >
    <el-form-item label=""> </el-form-item>
    <el-row type="flex">
        <el-col :span="5">
            <el-form-item label="项目名称">
                <el-select v-model="queryForm.market_id" placeholder="请选择项目名称" @change="dbMarketClick" style="width:100%">
                    <el-option v-for="dm in queryForm.dm_market_id"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm" ></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="5">
            <el-form-item label="同步任务">
                <el-select v-model="queryForm.sync_tag" placeholder="请选择同步任务" style="width:100%">
                    <el-option v-for="dm in queryForm.dm_sync_tag"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="业务类型">
                <el-select v-model="queryForm.db_type" placeholder="请选择业务类型" style="width:100%">
                    <el-option v-for="dm in queryForm.dm_sync_ywlx"  :key="dm.dmm" :label="dm.dmmc" :value="dm.dmm"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="同步日期">
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
             <el-button type="primary" @click="AnalyzeSyncLog">查询</el-button>
        </el-col>

    </el-row>
    <br>
    <el-col :span="24">
          <div id='myChart1' v-show="show" class="block" :style="{width: '100%', height: '300px'}"></div>
    </el-col>
    <el-col :span="24">
          <div id='myChart2' v-show="show"  class="block" :style="{width: '100%', height: '300px'}"></div>
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
                sync_tag:'',
                sync_ywlx:'',
                market_id:'',
                dm_sync_tag:[],
                dm_market_id:[],
                dm_sync_ywlx:[],
                beginDate:'',
                endDate:'',
            },
            svr:config(),
            show:true
        };
    },

    methods:{
       dbMarketClick:function() {
          this.queryForm.dm_sync_tag=utils.get_sync_tasks( this.queryForm.market_id)
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
        this.AnalyzeSyncLog()
      },
      openDetail:function(index,row){
        console.log('openDetail=',index,row)
      },
      AnalyzeSyncLog() {
        this.axios({
            method: 'get',
            url: utils.stringFormat("http://{0}:{1}/sync/log",[this.svr['server_ip'], this.svr['server_port']]),
            params: {
                sync_tag   : this.queryForm.sync_tag,
                market_id  : this.queryForm.market_id,
                begin_date : this.queryForm.beginDate,
                end_date   : this.queryForm.endDate,
            },
            timeout: 10000,
        }).then((res) => {
            if (res.data['Code'] == 200 ) {
                if (res.data['Data'] != null) {
                    this.tableData =res.data['Data']
                    let createDate = []
                    let syncTime=[]
                    let syncAmount=[]
                    for (let i=0;i<this.tableData.length;i++) {
                        createDate[i] = this.tableData[i].create_date;
                        syncTime[i]   = this.tableData[i].duration;
                        syncAmount[i] = this.tableData[i].amount;
                    }
                    this.$chart.LineImage('myChart1','同步时长',createDate,syncTime);
                    this.$chart.LineImage('myChart2','同步记录',createDate,syncAmount);
                    this.show=true
                } else {
                    this.tableData =[]
                    this.show=false
                }

            }
        }).catch((error) => {
            console.log('error=',error);
        });
      },
    },
    mounted: function() {
      this.queryForm.dm_market_id=utils.get_dm('05')
      this.queryForm.dm_sync_ywlx= utils.get_dm('08')
      this.queryForm.dm_sync_tag=utils.get_sync_tasks( this.queryForm.market_id)
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
