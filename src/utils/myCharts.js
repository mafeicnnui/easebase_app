import * as echarts from 'echarts'
import  'echarts/theme/macarons.js'

const install = function(Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    //画一条简单的线
                    LineImage: function (id,title,xData,yData) {
                        this.chart = echarts.init(document.getElementById(id),'macarons');
                        this.chart.clear();
                        const optionData = {
                            tooltip: {
                                trigger: 'axis',
                                padding: [8, 10, 8, 10],
                                axisPointer: {
                                    type: 'line',
                                    lineStyle: {
                                        color: 'rgba(231,211,211,0.65)'
                                    },
                                },
                                backgroundColor: 'transparent',
                            },
                            title: {
                                text: title,
                                top: '15',
                                left: '18',
                                textStyle:{
                                    fontSize: 14,   //字体大小
                                    color: '#663737',   //字体颜色
                                    fontWeight: '500'
                                },
                            },
                            xAxis: {
                                type: 'category',
                                data:xData,
                                axisLine: {   // 改变x轴颜色
                                    lineStyle: {
                                        color: '#7bb83e',
                                        width: '1',
                                    }
                                },
                                axisLabel: {    // 改变x轴字体颜色和大小
                                    textStyle: {
                                        color: "#654261",
                                        fontSize: 12,
                                    },
                                },
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: yData,
                                type: 'line',
                                smooth: true
                            }]
                        };
                        this.chart.setOption(optionData);
                    },
                    //画柱状图
                    BarImage: function (id,title,xData,yData) {
                        this.chart = echarts.init(document.getElementById(id),'macarons');
                        this.chart.clear();
                        const optionData = {
                            tooltip: {
                                show:true,
                                trigger: 'axis',
                                padding: [8, 10, 8, 10],
                                axisPointer: {
                                    type: 'line',
                                    lineStyle: {
                                        color: 'rgba(0, 0, 0, 0.65)'
                                    },
                                },
                                backgroundColor: 'transparent',
                            },
                            title: {
                                text: title,
                                top: '15',
                                left: '15',
                                textStyle:{
                                    fontSize: 14,   //字体大小
                                    color: '#666666',   //字体颜色
                                    fontWeight: '500'
                                },
                            },
                            xAxis: {
                                 type: 'category',
                                 data:xData,
                                 axisLine: {   // 改变x轴颜色
                                     lineStyle: {
                                         color: '#aa1d1d',
                                             width: '1',
                                     }
                                 },
                                axisLabel: {    // 改变x轴字体颜色和大小
                                    textStyle: {
                                        color: "#666666",
                                        fontSize: 12,
                                    },
                               },
                            },
                            yAxis: [ {
                                type: 'value',
                                axisTick: 'none',    // 右边轴样式的显示
                                axisLine: 'none',    // 右边轴样式的显示
                                // 修改网格的颜色
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        type: 'solid',
                                        color: '#f5f5f5'
                                    }
                                },
                            } ],
                            series: [{
                                name: '',
                                type: 'bar',
                                barWidth: '50%',
                                data: yData,
                            }]
                        };
                        this.chart.setOption(optionData);
                    },
                }
            }
        }
    })
}
export default {
    install
}