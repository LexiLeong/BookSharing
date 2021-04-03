// pages/home/home.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[],
    inputSearchBook:"",
  },
 /**
   * 生命周期函数--监听页面加载
   */
  //页面开始加载就会触发
  onLoad: function (options) {
    this.getData();
  },
  getData(){
    let that = this
    var arr=[]
    db.collection('releaseInfo').where({})
    .get({
      success(res) { // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        for(var i=0;i<Object.keys(res.data).length;i++){//总共有多少个用户
          for(var j=2;j<Object.keys(res.data[i]).length;j++){//每个用户发布了多少书
            var bookName=Object.keys(res.data[i])[j];
            if(bookName=='nickname'){
              continue;
            }
            var tempDate=new Date(res.data[i][bookName].date* 1000).toLocaleString()
            console.log("tempDate=",tempDate)
            var _={
              _bookName:Object.keys(res.data[i])[j],
              _author:res.data[i][bookName].author,
              _description:res.data[i][bookName].description,
              _picid:res.data[i][bookName].picid,
              _id:res.data[i]['_openid'],
              // _date:res.data[i][bookName].date
              _date:tempDate

            }
            arr.push(_);
            console.log("书名：",_._bookName,"作者：",_._author,"描述：",_._description,"图片id：",_._picid,"发布时间：",_._date);
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
        that.setData({
          bookList,
        })
      },
      fail(res){
        console.log("fail",res)
      }
    })
  },
  inputSearchBook:function(e) {
    this.data.inputSearchBook=e.detail.value;
  },
  searchBook: function (e) {
    var that = this;
    var inputMsg = that.data.inputSearchBook;
    if(inputMsg){
      wx.navigateTo({
        url: '../../pages/search/search',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function(inputMsg) {
            // console.log("in home",inputMsg)
          }
        },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', inputMsg)
        }
      })
    }
    else{
      wx.showToast({
        title: '输入不能为空',
        icon: 'none',
        duration: 1500
      })
    }

    console.log(this.data.inputSearchBook);
  },
  seeBookDetail:function(e){
    var that = this;
    var bookNameMsg = e.currentTarget.dataset.item._bookName;
    wx.navigateTo({
      url: '../../pages/bookmsg/bookmsg',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(bookNameMsg) {
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
          id:e.currentTarget.dataset.item._id,
          date:e.currentTarget.dataset.item._date
         })
      }
    })
  },
borrowBook:function()
{
  wx.navigateTo({
    url:'../borrower/borrower'
  })
  /*let that=this;
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
            that.borrowbook()
            }, 1000)   
      }
      else{
        console.log("用户点击取消")
      }
    }
  })*/
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
