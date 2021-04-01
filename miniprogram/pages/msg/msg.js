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
          for(var t=Object.keys(res.data[0][[index1]]['lenderInfo']).length-1;t>-1;t--)
          {
            var color;
            if(Object.values(res.data[0][[index1]]['lenderInfo'])[0]['isread']==-1){
              color='green';
            }
            else{
              color="white";
            }
            var _={ bookname:_bkname,
                    nickname:Object.values(res.data[0][[index1]]['lenderInfo'])[0]['nickname'],
                    msg:Object.values(res.data[0][[index1]]['lenderInfo'])[0]['msg'],
                    color:color
                  }
            //把获取的数字加载入数组，渲染画面
            arr.push(_);
            var a=arr;
            wx.getSystemInfo({
              success: function (res) {
                that.setData({
                  array: a,
                })
          }})
          console.log(index1);
          //被借人id
          db.collection('lendInfo').where({_openid:db.command.eq('on_ai4t9jBrabqoJLLdKxmsgsaMw')}).update({
            data:{
            [index1]:{
              lenderInfo:{
                [Object.keys(res.data[0][[index1]]['lenderInfo'])[t]]:{
                  isread: 0
              }
            }
            }
          }
          })
         }
        }
        //结束渲染后，将信息标记标记为已读
        
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