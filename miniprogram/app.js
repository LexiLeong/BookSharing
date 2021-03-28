//app.js
App({
  globalData:{//全局变量
    openid:"",
    lendnum:0
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
    this.watch_db();
  } ,
  //获取当前用户的openid
  getOpenid() {
    return new Promise((resolve, reject)=>{
     let that = this;
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      console.log('云函数获取到的openid: ', res.result.openId)
      this.globalData.openid = res.result.openId;
     }
})
    setTimeout(()=>{resolve(this.globalData.openid)},1000)
})
},
  //监控云数据库
  async watch_db(){
    var a= await this.getOpenid();
    const db=wx.cloud.database();
    db.collection('users').where({_openid:db.command.eq(this.globalData.openid)}).watch({
      onChange: snapshot=> {
        console.log('lendsuccess', snapshot.docChanges)
          this.globalData.lendnum++;
          var index=this.globalData.lendnum.toFixed(0);
          console.log(index);
          wx.setTabBarBadge({
            index:2,
            text:index
          })
        
      },
      onError: err=> {
        console.error('the watch closed because of error', err)
      }

  })
}
})
