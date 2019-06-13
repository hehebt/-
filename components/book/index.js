// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:Object,
    hidden:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(){
      const bid = this.properties.list.id
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`
      });
        
    }
  }
})
