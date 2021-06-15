export default {
    namespaced: true,
    state: {
        // 当前选中监控项内容
        currentData: {},
        // 左侧监控列表项
        menu: [{
            id: 0.1,
            label: "区域列表",
            total: 120,
            online: 102,
            children: [{
                label: "河源餐饮",
                total: 16,
                online: 14,
                children: [{
                    id: 0,
                    label: "河源餐饮1"
                }, {
                    id: 1,
                    label: "河源餐饮2",
                    disabled: true
                }, {
                    id: 2,
                    label: "河源餐饮3"
                }, {
                    id: 3,
                    label: "河源餐饮4"
                }, {
                    id: 4,
                    label: "河源餐饮5"
                }]
            }, {
                label: "河源餐饮",
                total: 16,
                online: 11,
                children: [{
                    id: 0,
                    label: "河源餐饮"
                }, {
                    id: 1,
                    label: "河源餐饮2"
                }, {
                    id: 2,
                    label: "河源餐饮3"
                }, {
                    id: 3,
                    label: "河源餐饮4"
                }, {
                    id: 4,
                    label: "河源餐饮5"
                }]
            }, {
                label: "河源餐饮",
                total: 23,
                online: 22,
                children: [{
                    id: 0,
                    label: "河源餐饮1"
                }, {
                    id: 1,
                    label: "河源餐饮2",
                    disabled: true
                }, {
                    id: 2,
                    label: "河源餐饮3"
                }, {
                    id: 3,
                    label: "河源餐饮4"
                }, {
                    id: 4,
                    label: "河源餐饮5"
                }]
            }]
        }],
        //温度图表配置项
        temperature: {
            // title: {
            //     text: "温度",
            //     style: {
            //         fill: "#fff",
            //     },
            //     offset: [0, 130],
            // },
            color: ["#16d0ff"],
            series: [{
                type: "gauge",
                data: [{
                    name: "temperature",
                    value: 25
                }],
                center: ["50%", "42%"],
                splitNum: 6,
                axisLabel: {
                    formatter: "{value}",
                    style: {
                        fill: "#fff",
                    },
                },
                axisTick: {
                    style: {
                        stroke: "#fff",
                    },
                },
                details: {
                    show: true,
                    formatter: "{value}°C",
                    offset: [0, 50],
                },
                animationCurve: "easeInOutBack",
            }, ],
        },
        // 湿度图表配置项
        humidity: {
            // title: {
            //     text: "湿度",
            //     style: {
            //         fill: "#fff",
            //     },
            //     offset: [0, 130],
            // },
            color: ["#16d0ff"],
            series: [{
                type: "gauge",
                data: [{
                    name: "humidity",
                    value: 55
                }],
                center: ["50%", "42%"],
                splitNum: 6,
                axisLabel: {
                    formatter: "{value}",
                    style: {
                        fill: "#fff",
                    },
                },
                axisTick: {
                    style: {
                        stroke: "#fff",
                    },
                },
                details: {
                    show: true,
                    formatter: "{value}%",
                    offset: [0, 50]
                },
                animationCurve: "easeInOutBack",
            }, ],
        },
        // 温湿度大数据面积图表配置项
        thOption: {},
        // 温湿度监控列表数据
        thList: {
            selectOptions: [{
                    value: "全部类型",
                    label: "全部类型",
                },
                {
                    value: "一般数据",
                    label: "一般数据",
                },
                {
                    value: "温度上限报警",
                    label: "温度上限报警",
                },
                {
                    value: "湿度上限报警",
                    label: "湿度上限报警",
                },
                {
                    value: "温度下限报警",
                    label: "温度下限报警",
                },
                {
                    value: "湿度下限报警",
                    label: "湿度下限报警",
                },
                {
                    value: "温度下限湿度上限报警",
                    label: "温度下限湿度上限报警",
                },
                {
                    value: "温度上限湿度下限报警",
                    label: "温度上限湿度下限报警",
                },
                {
                    value: "其它报警",
                    label: "其它报警",
                },
            ],
            config: {}
        }
    },
    mutations: {
        // 左侧列表选项点击切换数据
        dataChange(state, params) {
            state.currentData = params
            // 温湿度图表配置更新
            this.commit("temperatureHumidity/realTHChart")
            // 温湿度大数据面积图表数据更新
            this.commit("temperatureHumidity/realListChartDrawLine")
            // 温湿度监控列表数据更新
            this.commit("temperatureHumidity/realTHListInit")
        },
        // 温湿度图表配置更新
        realTHChart(state) {
            let t = Math.floor(Math.random() * 100 + 1)
            let h = Math.floor(Math.random() * 100 + 1)
            state.temperature.series[0].data[0].value = t
            state.humidity.series[0].data[0].value = h
            if (t > 60 || t < 10) {
                state.temperature.color = ["#F56C6C"]
            } else {
                state.temperature.color = ["#16d0ff"]
            }
            if (h > 80 || h < 20) {
                state.humidity.color = ["#F56C6C"]
            } else {
                state.humidity.color = ["#16d0ff"]
            }
            // 温度图表配置更新
            state.temperature = {
                ...state.temperature
            }
            // 湿度图表配置更新
            state.humidity = {
                ...state.humidity
            }
        },
        // 温湿度大数据面积图表绘制
        realListChartDrawLine(state) {
            let base = +new Date();
            let oneM = 5 * 60 * 1000;
            let date = [];
            let thOption;

            let dataT = [];
            let dataH = [];

            for (let i = 0; i <= 24 * 12; i++) {
                let now = new Date((base += oneM));
                date.push(
                    now.getHours() +
                    ":" +
                    (now.getMinutes().toLocaleString().length == 1 ?
                        "0" + now.getMinutes() :
                        now.getMinutes())
                );
                dataT.push(Math.floor(Math.random() * 21) + 80);
                dataH.push(Math.floor(Math.random() * 20) + 24);
            }

            thOption = {
                tooltip: {
                    trigger: "axis",
                    position: function (pt) {
                        return [pt[0], "2%"];
                    },
                },
                grid: {
                    left: "3%",
                    top: "10%",
                    right: "8%",
                    bottom: "5%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: date,
                    axisLabel: {
                        color: "#16d0ff",
                    },
                },
                yAxis: {
                    type: "value",
                    max: function () {
                        return 100;
                    },
                    axisLabel: {
                        color: "#16d0ff",
                    },
                },
                series: [{
                        name: "湿度",
                        type: "line",
                        symbol: "none",
                        sampling: "lttb",
                        itemStyle: {
                            color: "#228bab",
                        },
                        areaStyle: {
                            color: "#228bab",
                        },
                        lineStyle: {
                            color: "transparent"
                        },
                        markLine: {
                            data: [{
                                    yAxis: 60
                                },
                                {
                                    yAxis: 80
                                }
                            ],
                            silent: true,
                            lineStyle: {
                                color: "#F56C6C"
                            }
                        },
                        smooth: true,
                        data: dataT,
                    },
                    {
                        name: "温度",
                        type: "line",
                        symbol: "none",
                        sampling: "lttb",
                        itemStyle: {
                            color: "#924e55",
                        },
                        lineStyle: {
                            color: "transparent"
                        },
                        areaStyle: {
                            color: "#924e55",
                        },
                        markLine: {
                            data: [{
                                    yAxis: 10
                                },
                                {
                                    yAxis: 30
                                }
                            ],
                            silent: true,
                            lineStyle: {
                                color: "#E6A23C",
                            }
                        },
                        smooth: true,
                        data: dataH,
                    },
                ],
            };
            state.thOption = thOption
        },
        // 温湿度监控列表数据初始化
        realTHListInit(state) {
            let config = {};
            config.header = [
                "企业名称",
                "摄像机名称",
                "记录时间",
                "温度值",
                "湿度值",
                "事件类型",
            ];
            config.data = [];
            config.waitTime = 1500;
            config.headerHeight = 24;
            config.headerBGC = "rgba(11, 71, 113, 0.8)";
            config.oddRowBGC = "rgba(11, 71, 113, 0.7)";
            config.evenRowBGC = "rgba(11, 71, 113, 0.4)";
            config.columnWidth = [100, 100, 100, 70, 70, 120];
            config.rowNum = 20
            let getType = function (t, h) {
                if (t < 10 && h <= 80 && h >= 20) {
                    return "温度下限报警"
                } else if (t > 60 && h <= 80 && h >= 20) {
                    return "温度上限报警"
                } else if (h < 20 && t >= 10 && t <= 60) {
                    return "湿度下限报警"
                } else if (h > 80 && t >= 10 && t <= 60) {
                    return "湿度上限报警"
                } else if (h > 80 && t > 60) {
                    return "温湿度上限报警"
                } else if (h < 20 && t < 10) {
                    return "温湿度下限报警"
                } else if (h < 20 && t > 60) {
                    return "温度上限湿度下限报警"
                } else if (h > 80 && t < 10) {
                    return "温度下限湿度上限报警"
                } else {
                    return "一般数据"
                }
            }
            for (let i = 0; i < 130; i++) {
                let t = Math.floor(Math.random() * 86) //随机温度
                let h = Math.floor(Math.random() * 100) //随机湿度
                config.data.push([
                    "河源餐饮" + i,
                    "河源餐饮出餐",
                    "2021-05-23",
                    t + "°C",
                    h + "%",
                    `<span style="color:${getType(t,h)=="一般数据"?"#fff":"#F56C6C"}" title=${getType(t,h)}>${getType(t,h)}</span>`,
                ]);
            }
            state.thList.config = config;
        },
        // 右侧温湿度监控列表搜索过滤
        realTHListFilter(state, {
            startDate,
            endDate,
            warningType
        }) {

            console.log(`
      开始日期：${startDate}
      截止日期：${endDate}
      预警类型：${warningType}
    `);
        }
    },
    actions: {

    }
}