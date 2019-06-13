// components/date/index.js
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    monthArr :  ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
    year: '',
    month: ''
    // _index:""
  },

  // observers:{
  //   index: function(index){
  //     index = formatNumber(index)
  //     this.setData({
  //       _index: index
  //     })
  //   }
  // },

  attached(){
    let toDay = new Date
    let year = toDay.getFullYear()
    let month = toDay.getMonth()
    this.setData({
      year,
      month: this.data.monthArr[month]
    })   
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
