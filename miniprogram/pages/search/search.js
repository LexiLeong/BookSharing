// pages/search/search.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[],
    inputMsg:'',
    hiddenModal:true,
    wxid:'',
    msg:'',
    bookName:'',
    author:'',
    description:'',
    picid:'',
    id:'' ,  
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
           _picid:inputMsg['picid'],
           _id:inputMsg['id'],
           _date:inputMsg['date']
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
       }
       else if(typeof(inputMsg)=='string'){
         db.collection('releaseInfo').where({})
         .get({
           success(res) { // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
             for(var i=0;i<Object.keys(res.data).length;i++){//总共有多少个用户
               for(var j=0;j<Object.keys(res.data[i]).length;j++){//每个用户发布了多少书
                 var bookName=Object.keys(res.data[i])[j];
                 if(bookName=='nickname' || bookName=='_id' || bookName=='_openid'){
                  continue;
                }
                 //console.log("bookName=",bookName,"\ninputMsg=",inputMsg)
                 if(bookName==inputMsg){
                   var tempDate=new Date(res.data[i][bookName].date* 1000).toLocaleString()
                   var _={
                     _bookName:Object.keys(res.data[i])[j],
                     _author:res.data[i][bookName].author,
                     _description:res.data[i][bookName].description,
                     _picid:res.data[i][bookName].picid,
                     _id:res.data[i]['_openid'],
                     _date:tempDate
                   }
                   arr.push(_);
                   that.setData({
                     bookList: arr,
                     inputMsg:_
                   })
                 }
               }
             }
           },
           fail(res){
             console.log("fail",res)
           }
         })
       }
     })
       
  },
  borrowBook(e)
  {
     //页面跳转前检查这本书是否已被借
    console.log(this.data.inputMsg);
    var bookname=this.data.inputMsg._bookName;
    db.collection('lendInfo').where({_openid:db.command.eq(this.data.inputMsg['_id'])}).get({
      success: function (res) {
        //console.log(res.data[0]);
        var islend=res.data[0][bookname]['lendnum'];
        console.log(islend);
        //若书已被借出，则无法出借
        if(islend==-1)
        {
          wx.showModal({
            title: '借书失败',
            content: '本书已被借出，再等等哦',
            showCancel:false,//是否显示取消按钮
            cancelColor:'skyblue',//取消文字的颜色
            confirmText:"知道了",//默认是“确定”
            confirmColor: 'skyblue',//确定文字的颜色
            success: function (res) {
              if (res.confirm) {
                  wx.navigateBack({
                    delta: 1,
                  })
              } 
              }
          })
          return ;
        }
      }
    })
    this.data.bookName=e.currentTarget.dataset.item._bookName;
    this.data.author=e.currentTarget.dataset.item._author;
    this.data.description=e.currentTarget.dataset.item._description ;
    this.data.picid=e.currentTarget.dataset.item._picid;
    this.data.id=e.currentTarget.dataset.item._id;
    this.setData({
      hiddenModal:false
    })
    console.log(this.data.wxid);
    
    /*
    wx.navigateTo({
      url: '/pages/borrower/borrower',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(bookMsg) {
          // console.log("in home",inputMsg)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', 
        { bookName:e.currentTarget.dataset.item._bookName,
          author:e.currentTarget.dataset.item._author,
          description: e.currentTarget.dataset.item._description ,
          picid:e.currentTarget.dataset.item._picid,
          id:e.currentTarget.dataset.item._id        
         })
      }
    })*/
  },
  loadLend_db(){
    const db=wx.cloud.database();
    db.collection('lendInfo').where({_openid:db.command.eq(this.data.id)}).update({
      data:{
        [this.data.bookName]:{
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
  confirmM:function() {
    this.setData({
        hiddenModal: true
    })
    this.loadLend_db();
     
  },
  
  cancelM:function() {
    this.setData({
        hiddenModal: true
    })
    
  },
  
  
  
  wxid: function (e) {
    this.setData({
       wxid:e.detail.value
    })
  },
  msg: function (e) {
    this.setData({
       msg: e.detail.value
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
