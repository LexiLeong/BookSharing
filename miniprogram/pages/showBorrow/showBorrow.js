// pages/showBorrow/showBorrow.js
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
    this.showMyBorrowBooks();
  },
  showMyBorrowBooks:function(){
    var that=this;
    var db=wx.cloud.database();
    var arr=[];
    //当前用户的id
    db.collection('borrowInfo').where({
      _openid:db.command.eq(getApp().globalData.openid)
    }).get({
      success: function(res) {
     //   console.log(res.data[0]);      
        for(var i=0;i<Object.keys(res.data[0]).length;i++){//遍历当前用户发布的所有书
          var bookName=Object.keys(res.data[0])[i];
          if(bookName=='nickname' || bookName=='_id' || bookName=='_openid'){
            continue;
          }
          var returnStatus;
          var display;
          if(res.data[0][bookName]['isreturn']==0){
            returnStatus='已归还';
            display='none'
          }
          else{
            returnStatus='未归还';
            display=''
          }
          var _={
            bookName:Object.keys(res.data[0])[i],
            owner:res.data[0][bookName]['lender'],
            wxid:res.data[0][bookName]['wxid'],
            returnTime:res.data[0][bookName]['returntime'],
            returnStatus:returnStatus,
            display:display
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
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  doReturn(e){
    console.log(e.currentTarget.dataset.item.bookName);
    var bookName=e.currentTarget.dataset.item.bookName;
    const db=wx.cloud.database();
    db.collection('borrowInfo').where({
      _openid:db.command.eq(getApp().globalData.openid)
    }).update({
      data:{
        [bookName]:{
          isreturn:0
        }
      }
    })
    db.collection('borrowInfo').where({_openid:db.command.eq(getApp().globalData.openid)}).get({
      success: function(res) {
        console.log(res.data[0][bookName]['ownerId']);
        var ownerId=res.data[0][bookName]['ownerId'];
        db.collection('lendInfo').where({_openid:db.command.eq(ownerId)}).update({
          data:{
            [bookName]:{
              lendnum:0
            }
          }
        })
      }
    })
    
  },
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