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
      if(typeof(inputMsg)=='object'){
        var _={
          _bookName:inputMsg['bookName'],
          _author:inputMsg['author'],
          _description:inputMsg['description'],
          _picid:inputMsg['picid']
        }
        arr.push(_);
        wx.getSystemInfo({
        success: function (res) {
          that.setData({
             bookList: arr,
             inputMsg:_
            })
          }
        })
        // console.log("first",this.data.inputMsg)

        // console.log("bookList：",this.data.bookList);
        // console.log("qqq",inputMsg);
        // console.log("hhh",typeof(inputMsg));
        // temp=inputMsg;
        // this.data.inputMsg=temp;
      }
      else if(typeof(inputMsg)=='string'){
        db.collection('releaseInfo').where({})
      .get({
        success(res) { // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
          for(var i=0;i<Object.keys(res.data).length;i++){//总共有多少个用户
            for(var j=3;j<Object.keys(res.data[i]).length;j++){//每个用户发布了多少书
              var bookName=Object.keys(res.data[i])[j];
              //console.log("bookName=",bookName,"\ninputMsg=",inputMsg)
              if(bookName==inputMsg){
                var _={
                  _bookName:Object.keys(res.data[i])[j],
                  _author:res.data[i][bookName].author,
                  _description:res.data[i][bookName].description,
                  _picid:res.data[i][bookName].picid
                }
                arr.push(_);
                // wx.getSystemInfo({
                //   success: (res) =>  {
                   
                //   // success: function (res) {
                //     console.log("in success",arr)
                //     console.log("in success",_)
                //     that.setData({
                //       bookList: arr,
                //       inputMsg:_
                //     })
                //     wx.showModal({
                //       content: '纬度：' + that.data.bookList[0] + ',经度： ' +  that.data.inputMsg
                //     }) 
                //     console.log("after setData",this.data.bookList[0])
                //     console.log("after setData",this.data.inputMsg)
                //   }
                // })
   
                //console.log("书名：",_.bookName,"作者：",_._author,"描述：",_._description,"图片id：",_._picid);
                // var a=arr;
                // wx.getSystemInfo({
                //   success: function (res) {
                //     that.setData({
                //       bookList: a,
                //       inputMsg:_
                //     })
                //   }
                // })
              }
            }
          }


          console.log("in success",arr)
          console.log("in success",_)
          that.setData({
            // bookList,
            bookList: arr,
            inputMsg:_
          })
          console.log("after setData",this.data.bookList)
          console.log("after setData",this.data.inputMsg)



        },
        fail(res){
          console.log("fail",res)
        }
      })
      }
    })
    

    //this.data.inputMsg=temp;
    console.log("finalaaa",that.data.bookList)
    console.log("finalbbb",that.data.inputMsg)
  },
  borrowBook()
  {
    wx.navigateTo({
      url:'../borrower/borrower'
    })

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
