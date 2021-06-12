<template>
    <div class="realtbox">
        <div>
            <div><img src="" alt="" class="imgs"></div>
            <div id="myChart" :style="{width: '740px', height: '220px'}"></div>
        </div>
        <dv-border-box-1 class="boxes">
            <div style="color:rgb(76, 198, 213);width:30rem;" class="boxright">
                <div class="titles">抓拍记录 <span>上次更新时间:2021-06-02 10:31:02</span></div>

                <div class="lists">
                    <div class="titlesbottom">
                        <div class="titles-face">
                            <img src="@/assets/face02.jpg" alt="" class="faceimg">
                            <div class="factitle">人脸照片</div>
                        </div>
                        <div class="pla">
                            <div class="places">抓拍地点</div>
                            <div class="placename">和源</div>
                        </div>
                        <div class="platime">
                            <div class="zhuatim">抓拍时间</div>
                            <div class="times">2021-06-02 10:15:02</div>
                        </div>
                    </div>
                    <div class="titlesbottom">
                        <div class="titles-face">
                            <img src="@/assets/face02.jpg" alt="" class="faceimg">
                            <div class="factitle">人脸照片</div>
                        </div>
                        <div class="pla">
                            <div class="places">抓拍地点</div>
                            <div class="placename">和源</div>
                        </div>
                        <div class="platime">
                            <div class="zhuatim">抓拍时间</div>
                            <div class="times">2021-06-02 10:15:02</div>
                        </div>
                    </div>
                    <div class="titlesbottom">
                        <div class="titles-face">
                            <img src="@/assets/face02.jpg" alt="" class="faceimg">
                            <div class="factitle">人脸照片</div>
                        </div>
                        <div class="pla">
                            <div class="places">抓拍地点</div>
                            <div class="placename">和源</div>
                        </div>
                        <div class="platime">
                            <div class="zhuatim">抓拍时间</div>
                            <div class="times">2021-06-02 10:15:02</div>
                        </div>
                    </div>
                    <div class="titlesbottom">
                        <div class="titles-face">
                            <img src="@/assets/face01.jpg" alt="" class="faceimg">
                            <div class="factitle">人脸照片</div>
                        </div>
                        <div class="pla">
                            <div class="places">抓拍地点</div>
                            <div class="placename">和源</div>
                        </div>
                        <div class="platime">
                            <div class="zhuatim">抓拍时间</div>
                            <div class="times">2021-06-02 10:15:02</div>
                        </div>
                    </div>
                </div>

                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="9" layout="prev, pager, next, jumper" :total="1000">
                    </el-pagination>
                </div>
            </div>
        </dv-border-box-1>
    </div>
</template>

<script>

export default {
    data() {
        return {
            currentPage3: 5,
        }
    },
    mounted() {
        this.drawLine();
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart"));
            // 绘制图表
            myChart.setOption({

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },

                toolbox: {
                    feature: {
                        saveAsImage: {}
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
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                textStyle: {
                    fontSize: 15,
                    color: '#fff'
                },
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        label: {
                            show: true,
                            position: 'top'
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    }
                ]
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style lang="less" scoped>
.imgs {
    margin-top: 20px;
    width: 44rem;
    height: 24rem;
}
.boxes {
    width: 36rem;
    position: absolute;
    right: 1rem;
    height: 44rem;
}
.block {
    margin-top: 1rem;
}
/deep/.el-pager li {
    background: none;
    color: #fff;
}
/deep/.el-pagination .btn-prev,
.el-pagination .btn-next {
    background: none;
    color: #fff;
}
/deep/ .el-pager li.active {
    color: rgb(76, 198, 213);
}
.realtbox {
    width: 80rem;
    display: flex;
    .titles {
        font-size: 1rem;
        span {
            color: #a39e9b;
            font-size: 0.5rem;
            margin-left: 0.5rem;
        }
        &-face {
            position: relative;
            .faceimg {
                width: 6rem;
                height: 7rem;
            }
            .factitle {
                position: absolute;
                top: 5rem;
                left: 0rem;
                height: 2rem;
                line-height: 2rem;
                font-size: 0.8rem;
                width: 6rem;
                text-align: center;
                background-color: rgba(0, 0, 0, 0.5);
            }
        }
    }
    .boxright {
        position: relative;
        padding: 1rem;
        font-size: 0.8rem;
    }
    .lists {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 36rem;
    }
    .titlesbottom {
        margin: 1rem 0;
        width: 11rem;
        position: relative;
        margin-left: 0.5rem;
        .pla {
            display: flex;
            font-size: 0.8rem;
        }
        .places {
            margin-right: 0.5rem;
        }
        .placename {
            color: #fff;
        }
        .platime {
            display: flex;
            left: -2rem;
            position: absolute;
            .zhuatim {
                margin-right: 0.5rem;
            }
            .times {
                color: #fff;
            }
        }
    }
}
</style>