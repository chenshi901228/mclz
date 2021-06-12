import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            name: "login",
            meta: {},
            component: () => import( /* webpackChunkName: "login" */ "@/views/login")
        },

        {
            path: "/index",
            name: "index",
            meta: {
                power: [],
            },
            component: () => import( /* webpackChunkName: "index" */ "@/views/index"),
            children: [{
                    path: "/main",
                    name: "main",
                    meta: {
                        title: "首页",
                        power: ['admin'],

                    },
                    component: () => import( /* webpackChunkName: "main" */ "@/views/main"),
                },
                {
                    path: "/warningInfo",
                    name: "warningInfo",
                    meta: {
                        title: "预警信息",
                        power: ['admin'],

                    },
                    component: () => import( /* webpackChunkName: "warningInfo" */ "@/views/warningInfo"),
                },
                {
                    path: "/companyInfo",
                    name: "companyInfo",
                    meta: {
                        title: "企业信息",
                        power: ['company'],

                    },
                    component: () => import( /* webpackChunkName: "companyInfo" */ "@/views/companyInfo"),
                },
                {
                    path: "/surveillance",
                    name: "surveillance",
                    meta: {
                        title: "视频监控",
                        power: ['admin'],

                    },
                    component: () => import( /* webpackChunkName: "surveillance" */ "@/views/surveillance"),
                }, {
                    path: "/healthCards",
                    name: "healthCards",
                    meta: {
                        title: "健康证管理",
                        power: ['company'],

                    },
                    component: () => import( /* webpackChunkName: "healthCards" */ "@/views/healthCards"),
                }, {
                    path: "/foodAdmin",
                    name: "foodAdmin",
                    meta: {
                        title: "食品快检",
                        power: ['admin'],

                    },
                    component: () => import( /* webpackChunkName: "foodAdmin" */ "@/views/foodAdmin"),
                }, {
                    path: "/foodCompany",
                    name: "foodCompany",
                    meta: {
                        title: "食品安检",
                        power: ['company'],

                    },
                    component: () => import( /* webpackChunkName: "foodCompany" */ "@/views/foodCompany"),
                }, {
                    path: "/staffCheck",
                    name: "staffCheck",
                    meta: {
                        title: "人员晨检",
                        power: ['company'],

                    },
                    component: () => import( /* webpackChunkName: "staffCheck" */ "@/views/staffCheck"),
                }, {
                    path: "/temperatureHumidity",
                    name: "temperatureHumidity",
                    meta: {
                        title: "温度湿度",
                        power: ['company', 'admin'],

                    },
                    component: () => import( /* webpackChunkName: "temperatureHumidity" */ "@/views/temperatureHumidity"),
                }, {
                    path: "/disinfectionCheck",
                    name: "disinfectionCheck",
                    meta: {
                        title: "综合设备监控",
                        power: ['company', 'admin'],

                    },
                    component: () => import( /* webpackChunkName: "disinfectionCheck" */ "@/views/disinfectionCheck"),
                },
                // {
                //     path: "/uvcCheck",
                //     name: "uvcCheck",
                //     meta: {
                //         title: "紫外线检测",
                //         power: ['company', 'admin'],

                //     },
                //     component: () => import( /* webpackChunkName: "uvcCheck" */ "@/views/uvcCheck"),
                // }, {
                //     path: "/ratCheck",
                //     name: "ratCheck",
                //     meta: {
                //         title: "挡鼠板检测",
                //         power: ['company', 'admin'],
                //     },
                //     component: () => import( /* webpackChunkName: "ratCheck" */ "@/views/ratCheck"),
                // }, 
                {
                    path: "/staffTest",
                    name: "staffTest",
                    meta: {
                        title: "人员检测",
                        power: ['admin'],
                    },
                    children:[
                        {
                            path: "/realtimemonitoring",
                            name: "realtimemonitoring",
                            meta: {
                                title: "实时监控",
                                power: ['admin'],
                            },
                            component: () => import( /* webpackChunkName: "staffTest" */ "@/views/staffteschild/realtimemonitoring"),
                        },
                        {
                            path: "/temperaturemonitoring",
                            name: "temperaturemonitoring",
                            meta: {
                                title: "体温监测",
                                power: ['admin'],
                            },
                            component: () => import( /* webpackChunkName: "staffTest" */ "@/views/staffteschild/temperaturemonitoring"),
                        }, {
                            path: "/personnelhealth",
                            name: "personnelhealth",
                            meta: {
                                title: "人员健康证",
                                power: ['admin'],
                            },
                            component: () => import( /* webpackChunkName: "staffTest" */ "@/views/staffteschild/personnelhealth"),
                        }, {
                            path: "/businesslicense",
                            name: "businesslicense",
                            meta: {
                                title: "企业证照",
                                power: ['admin'],
                            },
                            component: () => import( /* webpackChunkName: "staffTest" */ "@/views/staffteschild/businesslicense"),
                        }
                        
                    ],
                    component: () => import( /* webpackChunkName: "staffTest" */ "@/views/staffTest"),
                }, {
                    path: "/warningCompany",
                    name: "warningCompany",
                    meta: {
                        title: "预警信息",
                        power: ['company'],

                    },
                    component: () => import( /* webpackChunkName: "warningCompany" */ "@/views/warningCompany"),
                },
            ]
        },

    ]






})
router.beforeEach((to, from, next) => {
    if (to.name != 'login') {
        if (sessionStorage.userType && to.meta.power.includes(sessionStorage.userType)) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()

    }


})




export default router