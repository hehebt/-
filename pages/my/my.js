// pages/my/my.js
import {
  MyLike
} from '../../models/my-like.js'
import {
  BookModel
} from '../../models/book'
let myLike = new MyLike
let bookModel = new BookModel

Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    myLikeClassic:null
  },
  //判断用户是否已经授权
  userAuthorized() {
    wx.getSetting({
      success: (result) => {
        if (result.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          console.log("未授权")
        }
      }
    });

  },

  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },
  getMyLikeClassic() {
    myLike.getMyLike().then(res => {
      console.log(res)
      this.setData({
        myLikeClassic: res
      })
    })
  },
  // onSwitchTab(e){
  //   wx.switchTab({
  //     url: "/pages/classic/classic",
  //     success: (result) => {
  //       this.setData({
  //         classic:e.detail.myLikeClassic
  //       })
  //     }
  //   });
      
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyLikeClassic()

  },

  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
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

  }
})