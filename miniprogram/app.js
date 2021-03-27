//app.js
App({
  globalData: {//全局变量
    openid:""
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'xly-2gjcf9271e609b99',
        traceUser: true,
      })
    }
    this.globalData = {}
    console.log("show");
    this.getOpenid();
    
  },
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      console.log('云函数获取到的openid: ', res.result.openId)
      const app=getApp();
      app.globalData.openid = res.result.openId;
      
     /* that.setData({
       openid: openid
      })*/
     }
})
  }
})
