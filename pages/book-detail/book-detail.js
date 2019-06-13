// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js'
const bookModel = new BookModel
const likeModel = new LikeModel
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    book: null,
    comments: [],
    likeStatus: false,
    likeCount: 0,
    post: false,
  },

  onLike(e) {
    console.log(e)
    const likeOrCancel = e.detail.behavior
    likeModel.like(likeOrCancel, this.data.book.id, 400)
  },
  onFakePost() {
    this.setData({
      post: true
    })
  },
  onCancel() {
    this.setData({
      post: false
    })
  },
  onPost(e) {
    const comment = e.detail.text || e.detail.value

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+1',
          icon: 'none'
        })

        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        this.setData({
          comments: this.data.comments,
          post: false
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
      

    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums,
          loading:false,
        })
        wx.hideLoading()
      })

    // detail.then(res=>{
    //   this.setData({
    //     book:res,
    //   })
    // })
    // comments.then(res=>{
    //   this.setData({
    //     comments:res.comments
    //   })
    // })
    // likeStatus.then(res=>{
    //   this.setData({
    //     likeStatus:res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log(1)
  }
})