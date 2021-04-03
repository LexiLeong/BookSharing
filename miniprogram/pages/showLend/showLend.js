// pages/showLend/showLend.js
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

  },
  getData(){
    var db=wx.cloud.database();
    var arr=[];
    var idLst;
    //当前已借人员的id
    db.collection('lendInfo').where({
      _openid:db.command.eq(getApp().globalData.openid)
    }).get({
      success:function(res){
        for(var i=2;i<Object.keys(res.data[0]).length;i++){
          if(res.data[0][i]['lendnum']==-1){
            console.log(Object.keys(res.data[0][[i]]['lenderInfo'])[i]);
            idLst.push(Object.keys(res.data[0][[i]]['lenderInfo'])[i]);
          }
        }
      }
    })
    //查看每个成员的borrow信息
    for(var id in idLst){
      db.collection('borrowInfo').where({
        _openid:db.command.eq(id)
      }).get({
        success:function(res){
          for(var i=2;i<Object.keys(res.data[0]).length;i++){
            if(Object.keys(res.data[0])[i].split('#')[1]==getApp().globalData.openid){
              //判断是否为已归还
              if(res.data[0][i]['isreturn']==0){
                continue ;
              }
              var _={
                bookName:Object.keys(res.data[0])[i].split('#')[0],
                wxid:res.data[0][i]['wxid'],
                returnTime:res.data[0][i]['returntime']
              }
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
        }
      })
    }
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