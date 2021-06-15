<template>
    <div class="main">
        <div class="main_top">
            <div class="main_warning">
                <dv-border-box-13 style="width:400px;height:460px;">
                    <div class="warning_card">
                        <div class="item" v-for="(item, index) in warningList" :key="index">
                            <p style="color:#f4f4f4">{{item.title}}</p>
                            <p :style="'color:'+item.color+';font-weight:bold;'">{{item.number}}</p>
                        </div>
                    </div>
                    <div class="warning_table">
                        <el-tabs type="border-card" v-model="warningListVal" @tab-click="warningChartChange" tabPosition="top">
                            <el-tab-pane label="天"></el-tab-pane>
                            <el-tab-pane label="周"></el-tab-pane>
                            <el-tab-pane label="月"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="main_chart">
                        <div id="main_waring_chart" style="width:96%;height:100%;"></div>

                    </div>
                </dv-border-box-13>
            </div>
            <div class="main_map">
                <div id="box">
                    <ul id="content" :class="{anim:animate==true}">
                        <li v-for='(item,index) in items' :key="index">{{item.name}}</li>
                    </ul>
                </div>
                <dv-border-box-12 style="width:100%;height:90%;">
                    <div id="container" style="width:100%;height:100%;"></div>
                </dv-border-box-12>
            </div>
            <div class="main_right">
                <dv-border-box-13 style="width:400px;height:460px;">
                    <div class="main_chart">
                        <div id="main_temp_chart" style="width:96%;height:80%;"></div>
                    </div>
                    <p class="daily_title">检查合格率</p>
                    <div class="main_daily">
                        <div class="daily_item">
                            <p>月度：检查数量 <span style="color:#042F83; font-weight:bold;">198</span> </p>
                            <dv-decoration-9 style="width:120px;height:120px;" :dur='9' :color="['#409EFF','#409EFF']">98%</dv-decoration-9>
                        </div>
                        <div class="daily_item">
                            <p>季度：检查数量 <span style="color:#042F83; font-weight:bold;">5204</span></p>
                            <dv-decoration-9 style="width:120px;height:120px;" :dur='9' :color="['#409EFF','#409EFF']">99%</dv-decoration-9>
                        </div>
                    </div>
                </dv-border-box-13>
            </div>
        </div>

        <div class="main_bottom">
            <div class="bottom_repot">
                <div id="main_report_chart" style="width:96%;height:100%;"></div>
            </div>
            <div class="bottom_data">
                <p class="bottom_title">检测数据</p>
                <dv-scroll-board :config="checkTableList" style="width:100%;height:76%" />
            </div>
            <div class="bottom_data">
                <p class="bottom_title">预警数据</p>
                <dv-scroll-board :config="warningTableList" style="width:100%;height:76%" />
            </div>
        </div>
    </div>
</template>

<script>
import AMap from 'AMap'
export default {
    data() {
        return {
            warningList: [
                {
                    title: '企业总数',
                    number: '19',
                    color: '#409EFF',
                },
                {
                    title: '预警总数',
                    number: '197232',
                    color: '#F56C6C',
                }, {
                    title: '已处理预警数',
                    number: '1250',
                    color: '#67C23A',
                }, {
                    title: '检验总数',
                    number: '38117',
                    color: '#409EFF',
                }, {
                    title: '合格总数',
                    number: '37966',
                    color: '#67C23A',
                }, {
                    title: '不合格总数',
                    number: '151',
                    color: '#F56C6C',
                }, {
                    title: '设备总数',
                    number: '213',
                    color: '#409EFF',
                }, {
                    title: '在线数量',
                    number: '204',
                    color: '#67C23A',
                }, {
                    title: '离线数量',
                    number: '9',
                    color: '#F56C6C',
                },
            ],
            warningChart: null,
            tempChart: null,
            reportChart: null,
            warningListVal: '0',
            warningData: [92, 34, 105, 42, 43, 110, 91, 27, 19, 3, 5, 22],
            warningDate: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00', '2:00', '4:00', '6:00'],
            msg: '各工作人员请注意，为切实加强检测管理的效率和速度，我们推出了新的规章制度',
            animate: false,
            items: [
                { name: "各工作人员请注意，为切实加强检测管理的效率和速度，我们推出了新的规章制度请大家仔细阅读" },
                { name: "关于市委市政府2021食品安全防控规定：1、遵守法律法规的规定，取得合法、有效、完备的营业手续.." },
            ],
            checkTableList: {
                header: ["时间", "单位", "名称", "产地", "检测项目", "检测值", "标准", "结果", "检测人"],
                // headerBGC: "rgba(11, 71, 113, 0.8)",
                // oddRowBGC: "rgba(11, 71, 113, 0.7)",
                evenRowBGC: "rgba(16, 32, 49, 0.5)",
                headerHeight: 16,
                rowNum: 5,
                waitTime: 1000,
                hoverPause: true,
                data: [
                    ['06-14', 'C2', '韭菜', '兴隆', '农药残留', '3.2%', '<50%', '合格', '李江'],
                    ['06-14', 'C3', '金针菇', '兴隆', '农药残留', '1.7%', '<50%', '合格', '李江'],
                    ['06-14', 'C5', '青椒', '兴隆', '农药残留', '1.2%', '<50%', '合格', '李江'],
                    ['06-14', 'A3', '黄豆', '兴隆', '农药残留', '2.2%', '<50%', '合格', '李江'],
                    ['06-14', 'B2', '四季豆', '兴隆', '农药残留', '7.2%', '<50%', '合格', '李江'],
                    ['06-14', 'A2', '生菜', '兴隆', '农药残留', '3.1%', '<50%', '合格', '李江'],
                    ['06-14', 'C3', '小白菜', '兴隆', '农药残留', '3.4%', '<50%', '合格', '李江'],
                    ['06-14', 'A3', '白萝卜', '兴隆', '农药残留', '5.5%', '<50%', '合格', '李江'],
                    ['06-14', 'B4', '冬瓜', '兴隆', '农药残留', '3.1%', '<50%', '合格', '李江'],
                    ['06-14', 'B1', '大葱', '兴隆', '农药残留', '2.2%', '<50%', '合格', '李江'],

                ],
            },
            warningTableList: {
                header: ["企业名称", "负责人电话", "预警类型", "处理状态", "预警时间"],
                // headerBGC: "rgba(11, 71, 113, 0.8)",
                oddRowBGC: "rgba(16, 32, 49, 0.5)",
                // evenRowBGC: "rgba(11, 71, 113, 0.4)",
                headerHeight: 16,
                rowNum: 5,
                waitTime: 1000,
                hoverPause: true,
                data: [
                    ['和源餐饮', '027-87915266', '未带口罩', '未处理', '2021-06-14 11:34',],
                    ['和源餐饮', '027-87915266', '未带厨师帽', '未处理', '2021-06-14 11:12',],
                    ['和源餐饮', '027-87915266', '未带口罩', '未处理', '2021-06-14 11:28',],
                    ['和源餐饮', '027-87915266', '未带厨师帽', '未处理', '2021-06-14 12:02',],
                    ['和源餐饮', '027-87915266', '未带口罩', '未处理', '2021-06-14 12:37',],
                    ['和源餐饮', '027-87915266', '未带厨师帽', '未处理', '2021-06-14 12:41',],
                    ['和源餐饮', '027-87915266', '未带口罩', '未处理', '2021-06-14 12:55',],
                    ['和源餐饮', '027-87915266', '未带口罩', '未处理', '2021-06-14 13:22',],
                ],
            },
            mapList: [
                [114.357674, 30.558942], [114.337674, 30.521942], [114.357674, 30.535942], [114.327674, 30.545942]
            ]
        }
    },
    mounted() {
        setInterval(this.scroll, 3000);
        this.warningChart = this.$echarts.init(document.getElementById('main_waring_chart'));
        this.tempChart = this.$echarts.init(document.getElementById('main_temp_chart'));
        this.reportChart = this.$echarts.init(document.getElementById('main_report_chart'));
        this.warningChartRender();
        this.tempChartRender();
        this.reportChartRender();
        this.showCityInfo()
    },
    methods: {
        showCityInfo() {
            let map = new AMap.Map('container', {
                resizeEnable: true,
                center: [114.357674, 30.538942],
                zoom: 13,
                mapStyle: "amap://styles/blue",
            });
            let list = this.mapList

            let infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
            for (let i = 0; i < list.length; i++) {
                let marker = new AMap.Marker({
                    position: list[i],
                    map: map,
                });
                marker.content = '和源餐饮' + (i + 1);
                marker.on('click', markerClick);
                marker.emit('click', { target: marker });
            }
            function markerClick(e) {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
            }
            map.setFitView();
        },
        scroll() {
            this.animate = true;
            setTimeout(() => {
                this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
                this.items.shift();              // 删除数组的第一个元素
                this.animate = false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
            }, 500)
        },
        warningChartChange(tab) {
            switch (tab.index) {
                case '0':
                    this.warningData = [92, 34, 105, 42, 43, 110, 91, 27, 19, 3, 5, 22];
                    this.warningDate = ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00', '2:00', '4:00', '6:00'];
                    break;
                case '1':
                    this.warningData = [631, 542, 572, 391, 611, 702, 558];
                    this.warningDate = ['周一', '周二', '周三', '周四', '周五', '周六', '周末'];
                    break;
                case '2':
                    this.warningData = [1733, 1212, 1655, 1492, 1573, 1406, 1544, 1308, 1489, 1420, 1542, 1612];
                    this.warningDate = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
                    break;
            }
            this.warningChartRender()
        },
        warningChartRender() {
            this.warningChart.setOption({
                tooltip: {
                    trigger: 'axis',

                },
                title: {
                    left: 'left',
                    text: '预警统计',
                    textStyle: {
                        color: '#fff',
                    }
                },
                grid: {
                    x: 30,
                    y: 40,
                    x2: 10,
                    y2: 30
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.warningDate,
                    axisLabel: {//修改坐标系字体颜色
                        show: true,
                        textStyle: {
                            color: "rgb(16, 32, 49)"
                        }
                    },

                },
                yAxis: {
                    type: 'value',
                    axisLabel: {//修改坐标系字体颜色
                        show: true,
                        textStyle: {
                            color: "rgb(16, 32, 49)"
                        }
                    },

                },
                series: [
                    {
                        type: 'line',
                        symbol: 'none',
                        sampling: 'lttb',
                        itemStyle: {
                            color: 'rgb(255, 70, 131)'
                        },
                        areaStyle: {
                            color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        },
                        data: this.warningData
                    }
                ]
            })
        },
        tempChartRender() {
            this.tempChart.setOption({
                title: {
                    text: '温度湿度',
                    textStyle: {
                        color: '#f5f5f5',
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    }
                },
                legend: {
                    data: ['温度', '湿度'],
                    textStyle: {
                        color: '#f5f5f5'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00', '2:00', '4:00', '6:00'],
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "rgb(16, 32, 49)"
                            }
                        },

                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "rgb(16, 32, 49)"
                            }
                        },
                    }
                ],
                series: [
                    {
                        name: '温度',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { type: 'default', color: '#CC3333' },
                        lineStyle: { color: '#CC3333' },
                        color: '#CC3333',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [22, 25, 29, 31, 32, 29, 27, 25, 23, 22, 20, 20],
                    },
                    {
                        name: '湿度',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { type: 'default', color: '#9999CC' },
                        lineStyle: { color: '#9999CC' },
                        color: '#9999CC',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [80, 77, 75, 75, 76, 77, 77, 79, 78, 79, 79, 80],
                    },
                ]
            })

        },
        reportChartRender() {
            // main_report_chart
            this.reportChart.setOption({
                title: {
                    text: '企业台账上报率',
                    textStyle: {
                        color: '#f5f5f5',
                    }
                },
                grid: {
                    x: 40,
                    y: 40,
                    x2: 0,
                    y2: 40
                },
                xAxis: {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七'],
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#fff"
                        }
                    },

                },
                yAxis: {
                    type: 'value',
                    data: ['0.2', '0.4', '0.6', '0.8', '1.0',],
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#fff"
                        }
                    },
                },
                series: [{
                    data: [0.8, 1, 0.2, 0, 1, 0.8, 0.2],
                    type: 'line',
                    smooth: true
                }]
            })
        },


    },


}
</script>

<style lang="less" scoped>
.main {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .main_top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .main_warning {
            margin: 10px;
        }
        .main_right {
            margin: 10px;
        }
        .main_chart {
            width: 100%;
            height: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 14px 6px;
            box-sizing: border-box;
        }
    }
    .main_map {
        width: 44%;
    }
    .main_bottom {
        width: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .bottom_repot {
            width: 400px;
            padding-left: 24px;
            height: 100%;
            box-sizing: border-box;
        }
        .bottom_data {
            width: 36%;
            height: 100%;
            padding: 0 0 12px;
            box-sizing: border-box;
            .bottom_title {
                color: #fff;
                font-weight: bold;
                margin-bottom: 8px;
            }
        }
    }
}
.warning_card {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 10px 10px;
    align-items: center;
    justify-content: center;
    .item {
        width: 28%;
        background: rgba(16, 32, 49, 0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #4cc6d5;
        padding: 4px 0;
        margin: 6px 6px;
    }
}
.warning_table {
    position: absolute;
    right: 5%;
}
.daily_title {
    color: #fff;
    text-indent: 20px;
    font-weight: bold;
    margin-top: 10px;
}
.main_daily {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #204062;
    font-weight: bold;
    p {
        font-weight: normal;
        margin: 8px 0;
        color: #fff;
    }
}
/deep/.el-tabs--border-card {
    // margin-top: -40px;
    background: none;
    border: none;
    box-shadow: none;
    padding-left: 20px;
    .el-tabs__header {
        background: none;
        border: none;
    }
    .el-tabs__content {
        padding: 0;
    }
    .el-tabs__item {
        padding: 0 8px !important;
        color: #f5f5f5;
        text-align: center;
        &.is-active {
            background-color: rgba(16, 32, 49, 0.5);
            border-color: #4cc6d5;
        }
    }
}
#box {
    width: 100%;
    height: 32px;
    overflow: hidden;
    padding-left: 30px;
    color: #4cc6d5;
    background: rgba(16, 32, 49, 0.5);
    box-sizing: border-box;
}
.anim {
    transition: all 0.5s;
    margin-top: -30px;
}
#content {
    li {
        width: 100%;
        list-style: none;
        line-height: 30px;
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
#map-styles .input-item {
    height: 2rem;
}

#map-styles .input-item span {
    display: inline-block;
    width: 4rem;
}

#map-styles .input-item .input-text {
    color: #0288d1;
    margin-left: 1rem;
    margin-right: 0rem;
    width: 6rem;
}

/deep/.amap-logo {
    display: none !important;
    visibility: hidden !important;
}
</style>