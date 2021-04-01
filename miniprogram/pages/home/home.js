// pages/home/home.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[]
  },
 /**
   * 生命周期函数--监听页面加载
   */
  //页面开始加载就会触发
  onLoad: function (options) {
    this.getData();
  },
  getData(){
    
    let that = this
    var arr=[]
    db.collection('releaseInfo').where({})
    .get({
      success(res) { // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        for(var i=0;i<Object.keys(res.data).length;i++){//总共有多少个用户
          for(var j=2;j<Object.keys(res.data[i]).length;j++){//每个用户发布了多少书
            var bookName=Object.keys(res.data[i])[j];
            var _={
              _bookName:Object.keys(res.data[i])[j],
              _author:res.data[i][bookName].author,
              _description:res.data[i][bookName].description,
              _picid:res.data[i][bookName].picid
            }
            arr.push(_);
            //console.log("书名：",_.bookName,"作者：",_._author,"描述：",_._description,"图片id：",_._picid);
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
        that.setData({
          bookList,
        })
      },
      fail(res){
        console.log("fail",res)
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



            // console.log("书名：",bookName,"作者：",res.data[i][bookName].author,"描述：",res.data[i][bookName].description,"图片id：",res.data[i][bookName].picid);
            // console.log(res.data[i][bookName].author);
            // console.log(res.data[i][bookName].description);
            // console.log(res.data[i][bookName].picid);