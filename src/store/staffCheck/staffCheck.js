export default {
    namespaced: true,
    state: {
        staffCheckData: {
            currentPage: 1,
            pageSize: 10,
            total: 0,
            rows: []
        },
    },
    getters: {
        // 当前页数据
        currentData(state) {
            let {
                rows,
                currentPage,
                pageSize
            } = state.staffCheckData
            let startIndex = pageSize * (currentPage - 1)
            let endIndex = pageSize * currentPage
            let data = rows.slice(startIndex, endIndex)
            return data
        }
    },
    mutations: {
        // 初始化生成数据
        init(state) {
            let data = []
            for (let i = 0; i < 32; i++) {
                data.push({
                    id: i,
                    name: "王小虎" + i,
                    clothing: "整洁",
                    hygiene: "良好",
                    health: "健康",
                    problem: "武汉市东湖高新区万邻汇生鲜市场",
                    measures: "整改措施",
                    detectionDate: "2016-05-02",
                })
            }
            state.staffCheckData.total = data.length
            state.staffCheckData.rows = data
        },
        // 编辑行
        edit(state, params) {
            let {
                id
            } = params
            let data = state.staffCheckData.rows
            let newArr = data.map(item => {
                if (item.id == id) {
                    item = params;
                }
                return item
            })
            state.staffCheckData.rows = newArr
        },
        // 新增行
        addNew(state, params) {
            let i = state.staffCheckData.rows.length - 1
            let data = Object.assign({
                id: state.staffCheckData.rows[i].id + 1
            }, params)
            state.staffCheckData.rows.push(data)
            state.staffCheckData.total++
        },
        // 删除行
        deleteOne(state, {
            id
        }) {
            let data = state.staffCheckData.rows
            data.map((item, index) => {
                if (item.id == id) {
                    data.splice(index, 1)
                }
                return item
            })
            state.staffCheckData.total = data.length
        }
    }
}