// pages/user/user.js
Page({
  data: {
    tip:''
  },
  test:function()
  {
    const db=wx.cloud.database();
    //要更改为借书对象的id
    //要更改对应书目索引的列表
    var msg="i want to borrow"//借家留下的信息
    var bookname='发布3';    //获取借入的书的名字
    getApp().globalData.currbook=bookname;
      //被借人的id
    db.collection('lendInfo').where({_openid:db.command.eq('on_ai4t9jBrabqoJLLdKxmsgsaMw')}).update({
      data:{
        [bookname]:{
          lendnum:db.command.inc(1),//该书目的借阅数+1
          lenderInfo:{
            [getApp().globalData.openid]:msg//申请借阅人ID：留言
       },
     }}})
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