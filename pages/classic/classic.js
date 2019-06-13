// pages/classic/classic.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()


Page({
  /**
   * 页面的初始数据
   */
  data: {
    // classic: {},
    latest: false,
    first: true,
    likeStatus:false,
    likeCount:0
  },
  onLike(e) {
    let behavior = e.detail.behavior
    let artID = this.data.classic.id
    let category = this.data.classic.type
    likeModel.like(behavior, artID, category)
  },
  onPeriodical(e) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let index = this.data.classic.index
    let todo = e.detail.todo
    classicModel.getClassic(index, todo, (res) => {
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classic: res,
        latest: this.isFirst(res.index),
        first: this.isLatest(res.index)
      })
      wx.hideLoading();
      
    })
  },

  isFirst(index){
    return index == 1 ? true: false
  },

  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return latestIndex == index?true:false
  },



  //获取缓存数据
  _getLatestIndex(){
    let index = wx.getStorageSync('latest');
    return index
  },

  _getLikeStatus(artID,category){
    likeModel.getClassicLikeStatus(artID,category,
      (res)=>{
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
      
    classicModel.getLateat((res) => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
      wx.hideLoading();
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