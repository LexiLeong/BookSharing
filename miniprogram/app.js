//app.js
App({
  globalData:{//全局变量
    openid:"",
    unreadsum:0,//待读消息数
    init:-1 ,//判断是否初始启动
    currbook:'',//目前操作的书名
    nickname:''
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
    this.getNickname();
    this.getOpenid();
   // this.watch_db();
    
  } ,
  //获取当前用户的openid
  getNickname()
  {
    console.log('trying to get nickname');
    wx.getUserInfo({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        //console.log('user:',res);
        this.globalData.nickname=res.userInfo.nickName
      }
    })
   
  },
  getOpenid() {
     let that = this;
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      console.log('云函数获取到的openid: ', res.result.openId)
      this.globalData.openid = res.result.openId;
     }
})
  
}
})
