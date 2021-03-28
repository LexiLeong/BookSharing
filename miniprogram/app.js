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
    this.getOpenid();
    const db = wx.cloud.database();
      var app=getApp();
      db.collection('users').where({
        _openid:db.command.eq(app.globalData.openid)
      }).watch({
        onChange: function (snapshot) {
          //监控数据发生变化时触发
          console.log("database change interaction");
        },
        onError:(err) => {
          console.error(err)
        }
      })
  } ,
   
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      console.log('云函数获取到的openid: ', res.result.openId)
      const app=getApp();
      app.globalData.openid = res.result.openId;
      
     }
       // 生命周期函数--监听页面加载
  
})
  }
})
