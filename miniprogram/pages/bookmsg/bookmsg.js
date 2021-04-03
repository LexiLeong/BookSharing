// pages/bookmsg/bookmsg.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[],
    inputMsg:'没',
    evaluate_contant: ['评价:'],
    stars: [0, 1, 2, 3, 4],
    normalSrc: './star_default.png',
    selectedSrc: './star_full.png',
    halfSrc: './star_half.png',
    score: 0,
    scores: [0],
  },
// 提交事件
submit_evaluate: function () {
  console.log('评价得分' + this.data.scores)
},
//点击左边,半颗星
selectLeft: function (e) {
  var score = e.currentTarget.dataset.score
  if (this.data.score == 0.5 && e.currentTarget.dataset.score == 0.5) {
    score = 0;
  }
  this.data.scores[e.currentTarget.dataset.idx] = score,
    this.setData({
      scores: this.data.scores,
      score: score
    })
},
//点击右边,整颗星
selectRight: function (e) {
  var score = e.currentTarget.dataset.score
  this.data.scores[e.currentTarget.dataset.idx] = score,
    this.setData({
      scores: this.data.scores,
      score: score
    })
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
       console.log(inputMsg);
       if(typeof(inputMsg)=='object'){
         var _={
           _bookName:inputMsg['bookName'],
           _author:inputMsg['author'],
           _description:inputMsg['description'],
           _picid:inputMsg['picid'],
           _id:inputMsg['id']
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
         console.log("点击view bookList:",that.data.bookList)
         console.log("点击view inputMsg:",that.data.inputMsg)
       }
       else if(typeof(inputMsg)=='string'){
         db.collection('releaseInfo').where({})
         .get({
           success(res) { // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
             for(var i=0;i<Object.keys(res.data).length;i++){//总共有多少个用户
               for(var j=2;j<Object.keys(res.data[i]).length;j++){//每个用户发布了多少书
                 var bookName=Object.keys(res.data[i])[j];
                 if(bookName=='nickname'){
                  continue;
                }
                 //console.log("bookName=",bookName,"\ninputMsg=",inputMsg)
                 if(bookName==inputMsg){
                   var _={
                     _bookName:Object.keys(res.data[i])[j],
                     _author:res.data[i][bookName].author,
                     _description:res.data[i][bookName].description,
                     _picid:res.data[i][bookName].picid,
                     _id:inputMsg['id']
                   }
                   arr.push(_);
                   that.setData({
                     bookList: arr,
                     inputMsg:_
                   })
                   console.log("查询 bookList:",that.data.bookList)
                   console.log("查询 inputMsg:",that.data.inputMsg)
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
    getApp().globalData.currbook=this.data.inputMsg['bookname'];
    var bookname=this.data.inputMsg['bookname'];
    console.log(this.data.inputMsg['_id']);
    db.collection('lendInfo').where({_openid:db.command.eq(this.data.inputMsg['_id'])}).get({
      success: function (res) {
        console.log(res.data[0]);
        console.log(res.data[0][bookname]['lendnum']);
        var islend=res.data[0][bookname]['lendnum'];
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
                 //点击取消,默认隐藏弹框
              } 
              }
          })
          return ;
        }
      }
    })
    db.collection('lendInfo').where({_openid:db.command.eq(this.data.inputMsg['_id'])}).update({
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
