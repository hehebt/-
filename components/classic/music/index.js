// components/classic/music/index.js
import {classicBeh} from '../classic-beh.js'
const mMgr = wx.createInnerAudioContext()
Component({
  behaviors:[classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    src:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    imgTag:'images/music@tag.png',
    playing:false
  },

  attached(){
    this._recoverStatus()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(){
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.src= this.properties.src
        mMgr.play()
      }else{
        this.setData({
          playing:false
        })
        mMgr.pause()
      }
    },

    _recoverStatus(){
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return
      }
      if(mMgr.src==this.properties.src){
        this.setData({
          playing:true
        })
      }
    }
  }
})
