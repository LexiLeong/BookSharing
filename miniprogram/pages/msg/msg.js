// pages/msg/msg.js
Page({

  onLoad: function (options) {
    this.getData();
  },
  getData(){
    var that=this;
    var db=wx.cloud.database();
    var arr=[];
    db.collection('lendInfo').where({
      _openid:getApp().globalData.openid,
    }).get({
      success: function(res) {
        for(var i=2 ;i<Object.keys(res.data[0]).length;i++)
        {
          var index1=Object.keys(res.data[0])[i];
          var _bkname=index1;
          var index2='lenderInfo';
          for(var t=0;t<Object.keys(res.data[0][[index1]]['lenderInfo']).length;t++)
          {
            var _={ bookname:_bkname,
                    borrower:Object.keys(res.data[0][[index1]]['lenderInfo'])[t],
                    msg:Object.values(res.data[0][[index1]]['lenderInfo'])[t]
                  }
            arr.push(_);
            if(t==Object.keys(res.data[0][[index1]]['lenderInfo']).length-1)
            {
              var a=arr;
              wx.getSystemInfo({
              success: function (res) {
                that.setData({
                  array: a,
                })
          }})
          console.log(a);
        }
          }
        }
      }
    })
    
  },
  onReady: function () {
  },
  test()
  {
    return new Promise((resolve, reject)=>{
    var a=this.data.arr;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          //btn
          array: a,
        })
  }})
  console.log(a);
  setTimeout(()=>{resolve(this.data.arr)},1500)
})
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