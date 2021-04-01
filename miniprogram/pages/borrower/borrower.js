// pages/borrower/borrower.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    tle:"",
    address:"",
  },
inptname:function(e){//获取input里的姓名
    this.setData({
      name: e.detail.value
    })
  },
  inpttle:function(e){//获取input里的电话号码
    this.setData({
      tle: e.detail.value
    })
  },
  inptadr:function(e){//获取input里的地址
    this.setData({
      address: e.detail.value
    })
  },
certain:function()
{
  let name = this.data.name;
  let tle = this.data.tle;
  let address = this.data.address;
  if(name=='')
  {
    wx.showToast({
      title: '姓名不能为空',
      icon: "none"
    })
    return false
  }
  else if(tle=='')
  {
    wx.showToast({
      title: '手机号码不能为空',
      icon: "none"
    })
    return false
  }
  else if(address=='')
  {
    wx.showToast({
      title: '地址不能为空',
      icon: "none"
    })
    return false
  }
  else{
    let that=this;
  wx.showModal({
    title:"提示",
    content:"是否确定借这本书?",
    success:function(res)
    {
      if(res.confirm){
          wx.showLoading({
          title:"借书中",
          })
          setTimeout(function () {
            that.borrowbooks()
            }, 1000)   
      }
      else{
        console.log("用户点击取消")
      }
    }
  })
  }
  
},
borrowbooks:function()
{
  var bookname="围城" //书名
  //console.log(getApp().getOpenid())
  var openid=getApp().globalData.openid
  //console.log(openid)
  //数据库添加借书信息
  const db=wx.cloud.database();
  db.collection('lendInfo').where({_openid:db.command.eq(openid)})
    .update({
      data:{
        [bookname]:{
          lendnum:db.command.inc(1),
       },
        }
    })
  console.log("借书成功")
  wx.hideLoading()
  wx.showToast({
  title:"成功",
  icon:"success"
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
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
