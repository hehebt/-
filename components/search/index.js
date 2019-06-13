// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword'
import {
  BookModel
} from '../../models/book'

import {
  paginationBev
} from '../Behaviors/pagination-bev'

const keywordModel = new KeywordModel
const bookModel = new BookModel

Component({
  /**
   * 组件的属性列表
   */

  properties: {
    more: {
      type: Boolean,
      // observer:function(){
      //   console.log(123)
      // }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    // dataArr: [],
    value: '',
    searching: false,
    loading: false,
    // hasMore: true
    loadingCenter:false
  },
  observers: {
    more: function () {
      this.loadMore()
    }
  },
  behaviors: [
    paginationBev
  ],

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('cancel', {}, {})
      this.initialize()
    },
    onDelete() {
      this.setData({
        searching: false,
        value: '',
        dataArr: []
      })
      this.initialize()
    },
    onConfirm(e) {
      this._showLoadingCenter()
      this.initialize()
      const keyword = e.detail.value || e.detail.text
      // this.data.hasMore = true
      this.setData({
        searching: true,
        value: keyword
      })

      bookModel.search(0, keyword).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this._hideLoadingCenter()
        keywordModel.addToHistory(keyword)
      })
    },

    loadMore() {
      if (!this.data.value) {
        return
      }
      if (this.data.loading) {
        return
      }
      // if(!this.data.hasMore){
      //   return
      // }
      // const length = this.data.dataArr.length

      
      if (this.hasMore()) {//判断是否还有更多数据
        this._locked()
        bookModel.search(this.getCurrentStart(), this.data.value)
          .then(res => {
            //判断是否还有更多数据
            // if(res.books.length == 0){
            //   wx.showToast({
            //     title: '没有更多',
            //     icon: 'none',
            //     image: '',
            //     duration: 2000,
            //     mask: false,
            //     success: (result) => {
            //       this.data.hasMore = false
            //       this.data.loading = false
            //     }
            //   });
            //   return
            // }

            //合并新加载的数据
            this.setMoreData(res.books)
            this._unLocked()
          },()=>{
            this._unLocked()
          })
      }else{
        wx.showToast({
          title: '没有更多',
          icon: 'none',
          image: '',
          duration: 2000,
          mask: false
        });
          
      }

    },

    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    },
    _locked(){
      this.setData({
        loading:true
      })
    },
    _unLocked(){
      this.setData({
        loading:false
      })
    }

  }
})