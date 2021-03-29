// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip:''
  },
  
  test:function()
  {
    const db=wx.cloud.database();
    var app=getApp();
    //要更改为借书对象的id
    //要更改对应书目索引的列表
    var text="i want to borrow"
    var bk_index=2;
    db.collection('lendInfo').where({_openid:db.command.eq('on_ai4t9jBrabqoJLLdKxmsgsaMw')}).update({
      data:{
        'detail.4.lendnum': db.command.inc(1),
        'detail.4.lenderInfo.lenderId':db.command.push(getApp().globalData.openid),
        'detail.4.lenderInfo.msg':db.command.push(text)
       }
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    //getApp().watch_db();
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