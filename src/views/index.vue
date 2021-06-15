<template>
    <div class="index">
        <!-- <el-header> -->
        <div class="index_header">
            <div class="header_bar">
                <div class="header_logo">
                    <p>明厨亮灶互联网监管平台</p>
                    <span>MCLZ Regulatory platform</span>
                </div>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
                    <!-- <div v-for="item in power" :key="item.url" class="header_nav"> -->
                    <el-menu-item v-for="item in power" :key="item.url" :index="item.url">
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                    <!-- </div> -->
                </el-menu>
                <div class="header_time">
                    <p class="header_user" @click="logOut"><i class="el-icon-user-solid"></i>：admin <span style="margin-left:10px"><i class="el-icon-switch-button"></i> 登出</span></p>
                    <p>{{ nowDate}}</p>
                </div>
            </div>
        </div>
        <!-- <el-main> -->
        <div class="index_body">
            <router-view />
        </div>
        <!-- </el-main> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '',
            nowDate: '',
            timer: null,
            navlist: [
                {
                    title: "首页",
                    url: "/main",
                    roles: ["admin"],
                },
                {
                    title: "预警信息",
                    url: "/warningInfo",
                    roles: ["admin"],
                },
                {
                    title: "视频监控",
                    url: "/surveillance",
                    roles: ["admin"],
                },
                {
                    title: "企业信息",
                    url: "/companyInfo",
                    roles: ["company"],
                },
                {
                    title: "健康证管理",
                    url: "/healthCards",
                    roles: ["company"],
                },
                {
                    title: "食品快检",
                    url: "/foodAdmin",
                    roles: ["admin"],
                },
                {
                    title: "食品安检",
                    url: "/foodCompany",
                    roles: ["company"],
                },

                {
                    title: "人员晨检",
                    url: "/staffCheck",
                    roles: ["company"],
                },
                {
                    title: "温度湿度",
                    url: "/temperatureHumidity",
                    roles: ["admin", "company"],
                },
                {
                    title: "物联监测",
                    url: "/disinfectionCheck",
                    roles: ["admin", "company"],
                },
                // {

                //     title: "紫外线检测",
                //     url: "/uvcCheck",
                //     roles: ["admin", "company"],
                // },
                // {
                //     title: "挡鼠板检测 ",
                //     url: "/ratCheck",
                //     roles: ["admin", "company"],
                // },
                {
                    title: "人员检测",
                    url: "/staffTest",
                    roles: ["admin"],
                },
                {
                    title: "预警信息",
                    url: "/warningCompany",
                    roles: ["company"],
                },
            ]
        }
    },
    methods: {
        logOut() {
            this.$router.push({
                path: '/login'
            })

        },
        dateFn() {
            let myDate = new Date(); // Mon Jan 16 2017 14:32:22 GMT+0800 (中国标准时间)
            let y = myDate.getFullYear();
            let m = myDate.getMonth() + 1;
            let d = myDate.getDate();
            let h = myDate.getHours();
            let mm = myDate.getMinutes();
            let s = myDate.getSeconds();
            m = m < 10 ? '0' + m : m;
            d = d < 10 ? '0' + d : d;
            h = h < 10 ? '0' + h : h;
            mm = mm < 10 ? '0' + mm : mm;
            s = s < 10 ? '0' + s : s;
            this.nowDate = y + '-' + m + '-' + d + '  ' + h + ':' + mm + ':' + s
        },
        nowTimes() {
            this.dateFn()
            this.timer = setTimeout(this.nowTimes, 1000);
        },
    },
    created() {
        this.activeIndex = this.$route.path;
        this.nowTimes()

    },

    computed: {
        //权限数组
        power() {
            return this.navlist.filter((item) =>
                item.roles.includes(sessionStorage.userType)
            );
        },

    },
    beforeDestroy: function () {
        if (this.timer) {
            console.log("销毁定时器")
            clearTimeout(this.timer); //在Vue实例销毁前，清除我们的定时器
        }
    }


}
</script>

<style lang="less" scoped>
.index {
    height: 100%;

    background: url("~@/assets/bg001.jpg") no-repeat center;
    display: flex;
    flex-direction: column;
    .index_body {
        background-color: rgba(16, 32, 49, 0.5);
        height: 0;
        flex: 1;
    }
}
.index_header {
    padding: 10px 40px 0;
    color: #fff;
    background: rgba(16, 32, 49, 0.5);
    .header_bar {
        padding: 6px 0;
        border-bottom: 2px solid rgba(36, 81, 151, 0.7);
        border-top: 2px solid rgba(36, 81, 151, 0.7);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .header_logo {
        font-weight: bold;
        p {
            font-size: 18px;
        }
        span {
            font-size: 14px;
        }
    }
    .header_nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .header_user {
        cursor: pointer;
        color: #4cc6d5;
    }
}

/deep/.el-menu {
    background: none;
}
/deep/.el-menu--horizontal {
    border-bottom: none;
    .el-menu-item {
        color: #fff;
        font-size: 16px;
        background: none;
        padding: 0 10px;
        &.is-active {
            font-weight: bold;
            color: #4cc6d5;
            font-size: 18px;
            background: none;
        }
        &:hover {
            background: none;
        }
    }
}
</style>