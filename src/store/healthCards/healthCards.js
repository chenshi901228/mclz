export default {
    namespaced: true,
    state: {
        healthCardsData: {
            currentPage: 1,
            pageSize: 10,
            total: 0,
            rows: []
        }
    },
    getters: {
        // 当前数据
        currentData(state) {
            let {
                rows,
                currentPage,
                pageSize
            } = state.healthCardsData
            let startIndex = pageSize * (currentPage - 1)
            let endIndex = pageSize * currentPage
            let data = rows.slice(startIndex, endIndex)
            return data
        }
    },
    mutations: {
        // 初始化生成数据
        randomData(state) {
            let data = []
            for (let i = 0; i < 26; i++) {
                data.push({
                    id: i,
                    imgUrl: "https://picsum.photos/500/500?random=" + (i + 1),
                    name: "张三" + i,
                    company: "高新区大锅饭食堂锅饭食堂",
                    validDate: "2012-02-02"
                })
            }
            state.healthCardsData.rows = data
            state.healthCardsData.total = data.length
        },
        // 翻页
        showListPageChange(state, params) {
            state.healthCardsData.currentPage = params
        },
        // 编辑修改人员健康证
        edit(state, params) {
            let {
                id
            } = params
            let data = state.healthCardsData.rows
            let newArr = data.map(item => {
                if (item.id == id) {
                    item = params;
                }
                return item
            })
            state.healthCardsData.rows = newArr
        },
        // 删除人员健康证
        delete(state, params) {
            let {
                id
            } = params
            console.log(id)
            let data = state.healthCardsData.rows
            data.map((item, index) => {
                if (item.id == id) {
                    data.splice(index, 1)
                }
                return item
            })
            state.healthCardsData.total = data.length
        },
        // 上传人员健康证
        healthCardUpload(state, params) {
            let data = Object.assign({
                id: state.healthCardsData.total
            }, params)
            console.log(data)
            state.healthCardsData.rows.push(data)
            state.healthCardsData.total = state.healthCardsData.rows.length
        }
    }
}