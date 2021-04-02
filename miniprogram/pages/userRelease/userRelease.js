// pages/userRelease/userRelease.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showMyReleaseBooks();
  },
  showMyReleaseBooks:function(){
    var that=this;
    var db=wx.cloud.database();
    var arr=[];
    db.collection('releaseInfo').where({
      _openid:db.command.eq(getApp().globalData.openid)
    }).get({
      success: function(res) {
        console.log(res.data[0]);      
        for(var i=3;i<Object.keys(res.data[0]).length;i++){//遍历当前用户发布的所有书
          var bookName=Object.keys(res.data[0])[i];
          var _={
            _bookName:Object.keys(res.data[0])[i],
            _author:res.data[0][bookName].author,
            _description:res.data[0][bookName].description,
            _picid:res.data[0][bookName].picid,
          }
          // console.log("书名：",bookName,"作者：",_._author,"描述：",_._description,"图片id：",_._picid);
          arr.push(_);
          var a=arr;
          wx.getSystemInfo({
            success: function (res) {
              that.setData({
                bookList: a,
              })
            }
          })
        }        
      }
    })
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