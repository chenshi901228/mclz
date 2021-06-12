export default {
    namespaced: true,
    state: {
        purchaseData: {
            currentPage: 1,
            pageSize: 10,
            total: 0,
            rows: []
        },
    },
    getters: {
        // 当前页数据
        currentData({
            purchaseData
        }) {
            let {
                rows,
                currentPage,
                pageSize
            } = purchaseData
            let startIndex = pageSize * (currentPage - 1)
            let endIndex = pageSize * currentPage
            let data = rows.slice(startIndex, endIndex)
            return data
        }
    },
    mutations: {
        // 初始化生成数据
        init({
            purchaseData
        }) {
            let data = []
            for (let i = 0; i < 32; i++) {
                data.push({
                    id: i,
                    name: "王小虎" + i,
                    size: "斤",
                    number: 10 * i,
                    providerName: "张百寿" + i,
                    providerAddress: "武汉市东湖高新区万邻汇生鲜市场",
                    providerPhone: "13909387403",
                    providerDate: "2016-05-02",
                })
            }
            Object.assign(purchaseData, {
                currentPage: 1,
                pageSize: 10,
                total: data.length,
                rows: data
            })
        },
        // 编辑行
        edit(state, params) {
            let {
                id
            } = params
            let data = state.purchaseData.rows
            let newArr = data.map(item => {
                if (item.id == id) {
                    item = params;
                }
                return item
            })
            state.purchaseData.rows = newArr
        },
        // 新增行
        addNew(state, params) {
            let i = state.purchaseData.rows.length - 1
            let data = Object.assign({
                id: state.purchaseData.rows[i].id + 1
            }, params)
            state.purchaseData.rows.push(data)
            state.purchaseData.total++
        },
        // 删除行
        deleteOne(state, {
            id
        }) {
            let data = state.purchaseData.rows
            data.map((item, index) => {
                if (item.id == id) {
                    data.splice(index, 1)
                }
                return item
            })
            state.purchaseData.total = data.length
        }
    }
}