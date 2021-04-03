// pages/user/user.js
Page({
  data: {
    tip:''
  },

  show_release(){
    // var that = this;
    // var myID = getApp().globalData.openid;//that.data.inputSearchBook;
    var that=this;
    var db=wx.cloud.database();
    var arr=[];
    db.collection('releaseInfo').where({
      _openid:db.command.eq(getApp().globalData.openid)
    }).get({
      success: function(res) {
        console.log(Object.keys(res.data[0]).length);
        if(Object.keys(res.data[0]).length==3){
          //提示当前没有发布图书
          wx.showToast({
            title: '当前没有发布图书',
            icon: 'none',
            duration: 1500
          })
        }
        else{
          wx.navigateTo({
            url: '../../pages/userRelease/userRelease',
          })
        }
      }
    })
  },
  show_msg(){
    wx.navigateTo({
      url: "/pages/msg/msg"
    })
  },
  show_lend()
  {
    wx.navigateTo({
      url: '/pages/showLend/showLend',
    })
  },
  show_borrow()
  {
    wx.navigateTo({
      url: '/pages/showBorrow/showBorrow',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   /*
    console.log('watch_db');
    const db=wx.cloud.database();
    console.log(getApp().globalData.openid);
    db.collection('lendInfo').where({_openid:db.command.eq(getApp().globalData.openid)}).update({
      data:{kll:33333}

    }).then(res => {
      console.log(res)
    })
    .catch(console.error);
    db.collection('lendInfo').where({_openid:db.command.eq(getApp().globalData.openid)}).watch({
      onChange: snapshot=> {
        //判断是否为程序初启动时的监听
        console.log('在看了在看了');
      },
      onError: err=> {
        console.error('the watch closed because of error', err)
      }

  })
  */
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
