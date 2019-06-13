const paginationBev = Behavior({
    data: {
        dataArr: [],
        total: null,
        noneResult:false
    },
    methods: {
        // 设置新的数据
        setMoreData(dataArr) {
            const tempArr = this.data.dataArr.concat(dataArr)
            this.setData({
                dataArr: tempArr,
            })
        },
        // 返回起始的记录数
        getCurrentStart() {
            return this.data.dataArr.length
        },
        // 判断是还有更多服务器数据需要加载
        setTotal(total) {
            this.setData({
                total
            })
            if(total == 0 ){
                this.setData({
                    noneResult:true
                })
            }
        },

        hasMore() {
            if (this.data.dataArr.length >= this.data.total) {
                return false
            } else {
                return true
            }
        },
        initialize(){
            this.setData({
                dataArr:[],
                noneResult:false
            })
            this.data.total=null
        }
    }
})

export {
    paginationBev
}