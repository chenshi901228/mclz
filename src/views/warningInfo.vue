<template>
    <div class="warning_info">
        <div class="info_left">
            <dv-border-box-12>
                <div>

                </div>
            </dv-border-box-12>
        </div>
        <div class="info_table">

        </div>
        <div class="info_right">
            <dv-border-box-12 style="height:58%; padding:12px 4px 0;">
                <div id="waring_data_chart" style="width:100%;height:100%;"></div>
            </dv-border-box-12>
            <dv-border-box-12 style="height:38%;padding:12px 4px 0;">
                <div id="waring_handle_chart" style="width:96%;height:100%;"></div>
            </dv-border-box-12>

        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            waringDataChart: null,
            waringHandleChart: null,
        }
    },
    created() {
        // this.getAlarmMessageNewFn();
    },
    mounted() {
        this.waringDataChartRender()
    },
    methods: {
        waringDataChartRender() {
            this.waringDataChart = this.$echarts.init(document.getElementById('waring_data_chart'));
            this.waringDataChart.setOption({
                tooltip: {
                    trigger: 'item',

                },
                legend: {
                    // orient: 'vertical',
                    // left: 'left',
                    padding: [30, 0, 0, 0],
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                    }
                },
                title: {
                    left: 'center',
                    text: '预警分类统计',
                    textStyle: {
                        color: '#fff',
                    }
                },

                series: [
                    {
                        name: '预警分类统计',
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '70%'],

                        data: [
                            { value: 7841, name: '人员健康证报警' },
                            { value: 1921, name: '食品溯源报警' },
                            { value: 58104, name: '未戴厨师帽报警' },
                            { value: 126668, name: '未戴口罩报警' },
                            { value: 3099, name: '企业离线报警' },
                            { value: 1331, name: '小目标移动报警' },
                            { value: 3805, name: '温度湿度报警' },
                            { value: 510, name: '人员健康证预警' },

                        ],
                        label: {
                            color: '#fff',
                            fontSize: 16,
                        },
                    }
                ]
            })
        },
        //没处理的消息
        getAlarmMessageNewFn() {
            this.$http({
                url: this.$http.adornUrl('/mclz/service/getAlarmMessageNew'),
                method: 'get',
                params: this.$http.adornParams({})
            }).then(({
                data
            }) => {
                console.log(data.data);
            })

        },
        // 所有预警消息
        getAlarmMessageAllFn() {
            this.$http({
                url: this.$http.adornUrl('/mclz/service/getAlarmMessageNew'),
                method: 'get',
                params: this.$http.adornParams({})
            }).then(({
                data
            }) => {
                console.log(data.data);
            })

        },

        // 本周告警信息列表
        getAlarmMessageThisweekFn() {
            this.$http({
                url: this.$http.adornUrl('/mclz/service/getAlarmMessageNew'),
                method: 'get',
                params: this.$http.adornParams({})
            }).then(({
                data
            }) => {
                console.log(data.data);
            })

        },
        // 查找本月告警信息列表
        getAlarmMessageThismonthFn() {
            this.$http({
                url: this.$http.adornUrl('/mclz/service/getAlarmMessageNew'),
                method: 'get',
                params: this.$http.adornParams({})
            }).then(({
                data
            }) => {
                console.log(data.data);
            })

        },
        // 查找历史告警信息列表,今天以前的所有消息
        getAlarmMessageHistoryFn() {
            this.$http({
                url: this.$http.adornUrl('/mclz/service/getAlarmMessageNew'),
                method: 'get',
                params: this.$http.adornParams({})
            }).then(({
                data
            }) => {

                console.log(data.data);
            })

        },

    },
}
</script>

<style lang="less" scoped>
.warning_info {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    .info_left {
        width: 400px;
    }
    .info_table {
        flex: 1;
    }
    .info_right {
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
}
</style>