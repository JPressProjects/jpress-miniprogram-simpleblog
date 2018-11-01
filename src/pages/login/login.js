const jpress = require('../../utils/jpress.js')

Page({

  onLoad:function(){
    wx.login({
      success(res) {
        if (res.code) {
          jpress.wxLogin(res.code)
        }
      }
    })
  },

  onGetUserInfo:function(res){
    jpress.wxGetUserInfo(res.detail,function(success){
      if (success){
        wx.navigateBack({
          delta: 1
        })
      }
    })    
  }
})