// pages/search/search.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[],
    inputMsg:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(option.query)
    var arr=[];
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', this.data.inputMsg);
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    var temp;
    eventChannel.on('acceptDataFromOpenerPage', function(inputMsg) {
      var _={
      _bookName:inputMsg['bookName'],
      _author:inputMsg['author'],
      _description:inputMsg['description'],
      _picid:inputMsg['picid']}
      arr.push(_);
      var a=arr;
      wx.getSystemInfo({
      success: function (res) {
        that.setData({
           bookList: a,
            })
          }
      })
     temp=inputMsg;
     
    })
    this.data.inputMsg=temp;
  },
  borrowBook()
  {

  },
  loadLend_db:function(e){
    const db=wx.cloud.database();
    //要更改为借书对象的id
    //要更改对应书目索引的列表
    var msg="i want to borrow"//借家留下的信息
      //被借人的id
    db.collection('lendInfo').where({_openid:db.command.eq(this.data.inputMsg['id'])}).update({
      data:{
        [this.data.inputMsg['bookName']]:{
          lendnum:db.command.inc(1),//该书目的借阅数+1
          lenderInfo:{
            [getApp().globalData.openid]:{
              nickname:getApp().globalData.nickname,
              msg:'尝试',//申请借阅人ID：留言
              isread:-1//这个消息被借人读取否；否为-1，是为1
            }
       },
     }}})
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