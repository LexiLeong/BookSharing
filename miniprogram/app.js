//app.js
App({
  globalData:{//全局变量
    openid:"",
    releasesum:0,//发布的书的总数
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
    this.getOpenid();
    this.watch_db();
    this.getNickname();
  } ,
  //获取当前用户的openid
  getNickname()
  {
    wx.getUserInfo({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.globalData.nickname=res.userInfo.nickName
      }
    })
   
  },
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
    setTimeout(()=>{resolve(this.globalData.openid)},1500)
})
},
  //监控云数据库
  async watch_db(){
    console.log('watch_db');
    var a= await this.getOpenid();
    const db=wx.cloud.database();
    console.log(this.globalData.openid);
    db.collection('lendInfo').where({_openid:db.command.eq(this.globalData.openid)}).watch({
      onChange: snapshot=> {
        //判断是否为程序初启动时的监听
        console.log('watching');
        if (this.globalData.init==-1){
          this.globalData.init=0;
          return ;
        }
        var a=this.globalData.releasesum.toString();
        console.log(snapshot.docChanges[0]);
        var test=this.globalData.currbook+'.lenderInfo.'+this.globalData.openid;
        console.log(test);
        if(snapshot.dataType=='add')
        {
          return ;
        }
        if(typeof snapshot.docChanges[0].updatedFields[[test]]=='undefined')
        {
          return;
        }
          this.globalData.unreadsum++;
          var index=this.globalData.unreadsum.toFixed(0);
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
