<template>
    <div class="surveillance">
        <el-row :gutter="20">
            <el-col :span="5">
                <div class="left-box">
                    <dv-border-box-1>
                        <div style="padding: 10px 10px 0;">
                            <LeftSerchInput :serchInput="serchInput" />
                        </div>
                        <div class="top-radio" style="padding: 10px 10px 0;">
                            <div style="color: #2aaef2">设备状态 :</div>
                            <div>
                                <div :class="radio == 1 ? 'radio activeRadio' : 'radio'" @click="onRadio(1)">
                                    不限
                                </div>
                                <div :class="radio == 2 ? 'radio activeRadio' : 'radio'" @click="onRadio(2)">
                                    在线
                                </div>
                                <div :class="radio == 3 ? 'radio activeRadio' : 'radio'" @click="onRadio(3)">
                                    离线
                                </div>
                            </div>
                        </div>
                        <div class="wrap">
                            <LeftList :dataList="menu" :listItemChange="listItemChange" :serchInputText="serchInputText" />
                        </div>
                    </dv-border-box-1>

                </div>
            </el-col>
            <el-col :span="19">
                <div class="right-box">
                    <div class="right-top">
                        <div class="right-title right-active">
                            <p>实时监控</p>
                        </div>
                    </div>
                    <div class="main">
                        <div v-show="show==1" class="box1">
                            <div>
                                <img src="@/assets/vidopic.png" alt="">
                            </div>
                            <div> <img src="@/assets/vidopic.png" alt=""></div>
                            <div> <img src="@/assets/vidopic.png" alt=""></div>
                            <div> <img src="@/assets/vidopic.png" alt=""></div>
                            <div> <img src="@/assets/vidopic.png" alt=""></div>
                            <div> <img src="@/assets/vidopic.png" alt=""></div>
                        </div>
                        <div v-show="show==2" class="box2">
                            <div> <img src="@/assets/vidopic.png" alt=""></div>
                            <div> <img src="@/assets/vidopic.png" alt=""></div>
                            <div> <img src="@/assets/vidopic.png" alt=""></div>
                            <div> <img src="@/assets/vidopic.png" alt=""></div>
                        </div>
                        <div v-show="show==3" class="box3">
                            <div> <img src="@/assets/vidopic.png" alt=""></div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="bottom-img">
                            <img @click="onShow(3)" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAXUlEQVRIS+2WMQ4AIAgD7f8fjZMuakLQCMM5Y5peSoNa0lOSbkP4G/l6qM3MXtiXtDV3dIxwFDuoBznCNTPEOrFOXgIUCAWyZCWtQLypjc7Vu7miTrz/cOwldT3XAfwvSB9Sni7WAAAAAElFTkSuQmCC" alt="" />
                            <img @click="onShow(2)" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAYklEQVRIS+2UOwoAIAxDzf0PXcHBQVDe4KdgOoemCWlUHo0e8RYTX3M+n9URESv5ktrRFDfumiqmCynOxLa6Z4CGhuLyh+t0hbm5Pg4XfROKy/9OVAnFWXG+AvmvMq14twMVj5SAHxAsXYYAAAAASUVORK5CYII=" alt="" />
                            <img @click="onShow(1)" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAdElEQVRIS+2WQRJAEQxD5f6HrrH4fywQpqhFLHUq+qRAChoI0k0Svkb+PdRmZivlA0Arp8y31ulWLGGGXag/QlfMxY6jjsvVPw31MTPOtj5mQt74sqtHlR19JCRcX41bUHvNw/Lf+/qwHXvjqthLcDo/DHUGlbaMH52MZDgAAAAASUVORK5CYII=" alt="" />
                        </div>

                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import LeftList from "../components/surveillance/leftList";
import LeftSerchInput from "../components/surveillance/leftSerchInput";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers(
    "surveillance"
);
export default {
    data() {
        return {
            serchInputText: "",
            show: 1,
            radio: 1,
            state: [{
                label: "不限", id: 1,
            }, {
                label: "在线", id: 2,
            }, {
                label: "离线", id: 3,
            }]
        };
    },
    components: {
        LeftSerchInput,
        LeftList
    },
    computed: {
        ...mapState(["menu", "currentData"]),
    },
    methods: {
        ...mapMutations(["dataChange"]),
        listItemChange(t) {
            this.dataChange(t);
        },
        onRadio(val) {
            this.radio = val;
        },
        // 搜索内容
        serchInput(t) {
            this.serchInputText = t;
        },
        onShow(val) {
            this.show = val
        }
    },
};
</script>

<style lang="less" scoped>
.surveillance {
    // height: calc(100vh - 140px);
    height: 100%;
    min-height:400px;
    max-height: 650px;
    margin: 10px;
    .el-row {
        height: 100%;
        margin-bottom: 20px;
    }
    .el-col {
        height: 100%;
        border-radius: 4px;
    }

    .left-box {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        background-color: rgba(16, 32, 49, 0.5);
        padding-top: 0.2rem;
        box-sizing: border-box;
        .top-radio {
            display: flex;
            line-height: 1.5;
            margin-bottom: 10px;
            & > div:first-child {
                padding: 0 5%;
                box-sizing: border-box;
                // flex: 20%;
            }
            & > div:last-child {
                flex: 1;
                display: flex;
                flex-flow: row;
                .radio {
                    width: 30%;
                    background: #000;
                    color: #fff;
                    text-align: center;
                    margin: 0 2px;
                    border-radius: 3px;
                }
                .activeRadio {
                    background: #409eff;
                }
            }
        }
        .wrap {
            padding: 0 10px;
            height: 84%;
            overflow-y: auto;
            overflow-x: auto;
            scrollbar-color: transparent transparent;
            scrollbar-track-color: transparent;
            -ms-scrollbar-track-color: transparent;
            &::-webkit-scrollbar {
                /*滚动条整体样式*/
                width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
                // height: 1px;
            }
            &::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                border-radius: 10px;
                background: #2acaff;
            }
            &::-webkit-scrollbar-track {
                /*滚动条里面轨道*/
                border-radius: 10px;
                background: rgba(76, 198, 213, 0.3);
            }
        }
    }
    .right-box {
        height: 100%;
        width: 100%;
        padding-top: 0.2rem;
        box-sizing: border-box;
        display: flex;
        flex-flow: column;
        //    border: 1px #000 solid;

        .right-top {
            width: 100%;
            height: 8%;
            min-height: 50px;
            .right-active {
                box-shadow: inset 0 0 9px 1px #2aaef2;
            }
            .right-title {
                margin-left: 5%;
                line-height: 2;
                min-width: 100px;
                width: 100px;

                background-color: #021544;
                text-align: center;
                transform: skew(-45deg);
                cursor: pointer;
                p {
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #2aaef2;
                    transform: skew(45deg);
                    text-align: center;
                }
            }
        }
        .main {
         max-height: 530px;
         min-height:350 ;
            flex: 1;
            width: 100%;
            .box1,
            .box2 {
                height: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                flex-wrap: wrap;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .box3 {
                width: 100%;
                height: 520px;
                & > div {
                    border: 2px solid #000;
                    height: 98%;
                    margin: 0.05rem 0.1rem;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .box1 > div {
                width: 32.5%;
                height: 48%;
                // height: 260px;

                border: 2px solid #000;
                box-sizing: border-box;
                // margin: 0.05rem 0;
            }
            .box1 > div:nth-child(2),
            .box1 > div:nth-child(5) {
                margin: 0 0.5rem 0.5rem;
            }
            .box2 > div:nth-child(2),
            .box2 > div:nth-child(4) {
                margin: 0 0.5rem 0.5rem;
            }
            .box2 > div {
                box-sizing: border-box;
                width: 49%;
                // height: 48%;
                height: 250px;
                margin: 0.05rem 0;
                border: 2px solid #000;
            }
        }
        .bottom {
            width: 100%;
            height: 8%;
            min-height: 50px;
            background-image: url(../assets/xiaBottom.b495c37a.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            box-sizing: border-box;
            padding: 0 20px;
            .bottom-img {
                float: right;
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 100%;
            }
        }
    }
}
</style>