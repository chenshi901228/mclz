export default {
    namespaced: true,
    state: {
        currentData: {},
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
                    label: "河源餐饮按时打算发发撒大苏打1asdasfsdfsdf"
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
        }]
    },
    mutations: {
        // 列表选项点击切换数据
        dataChange(state, params) {
            state.currentData = params
        }
    },
    actions: {

    }
}