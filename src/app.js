//app.js

const jpress = require('./utils/jpress.js')


App({
  onLaunch: function () {

   //jpress 初始化
   jpress.init({
     host:'http://jpress.s3.natapp.cc',
     app_id:'my_app_id',
     app_secret:'my_app_secret'
   }) 

    jpress.getAppName()
      .then(data => {
        if (data.value) {
          this.globalData.appName = data.value;
        }
      })


    jpress.getCopyright()
      .then(data => {
        if (data.value) {
          this.globalData.copyright = data.value
        }
      })

  },

  globalData: {
    appName: '',
    copyright:'Copyright © 2008-2013 Designed by Jean.'
  }
})