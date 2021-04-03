// pages/borrower/borrower.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    wxid:'',
    borrowMsg:'',
    msg:''
  },
inptmsg:function(e){//获取留言
    this.setData({
      msg: e.detail.value
    })
  },
  inpttle:function(e){//获取input里的微信号
    this.setData({
      wxid: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('acceptDataFromOpenedPage', this.data.inputMsg);
    var temp;
     // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
     eventChannel.on('acceptDataFromOpenerPage', function(borrowMsg) {
      temp=borrowMsg;
     })
     this.data.borrowMsg=temp;
  },
  borrowConfirm:function(e){
    if(this.data.wxid==''){
      wx.showModal({
        title: "请填写微信号哦",
        content: "微信号不能为空",
        showCancel: false,
        confirmText: "确定",
        confirmColor: "#0f0",
        success: function (res) {
          if (res.confirm) {
          }
         
        }
      })
      return ;
    }
    console.log('outbreak');
    const db=wx.cloud.database();
    //要更改为借书对象的id
    //要更改对应书目索引的列表
    var msg="i want to borrow"//借家留下的信息
      //被借人的id
    getApp().globalData.currbook=this.data.borrowMsg['bookname'];
    var bookname=this.data.borrowMsg['bookname'];
    console.log(this.data.borrowMsg);
    console.log(this.data.borrowMsg['bookName']);
   //更改该本人的待处理借书信息
    db.collection('lendInfo').where({_openid:db.command.eq(this.data.borrowMsg['id'])}).update({
      data:{
        [this.data.borrowMsg['bookName']]:{
          lendnum:db.command.inc(1),//该书目的借阅数+1
          lenderInfo:{
            [getApp().globalData.openid]:{
              nickname:getApp().globalData.nickname,
              msg:this.data.msg,//申请借阅人ID：留言
              wxid:this.data.wxid,
              isread:-1//这个消息被借人读取否；否为-1，是为1
            }
       },
     }}})
     wx.showModal({
      title: "已发送结束申请",
      content: "请耐心等待书主回复哦~",
      showCancel: false,
      confirmText: "确定",
      confirmColor: "#0f0",
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1,
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
