// pages/home/home.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[]
  },

  getData(){
    let getDataVar = this
    db.collection('releaseInfo').where({})
    .get({
      success(res) { // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log("success",res);
        console.log("success",res.data[0].发布3);

        getDataVar.setData({
          bookList:res.data
        })
      },
      fail(res){
        console.log("fail",res)
      }
    })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  //页面开始加载就会触发
  onLoad: function (options) {

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