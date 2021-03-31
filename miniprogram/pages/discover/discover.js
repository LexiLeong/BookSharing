// pages/discover/discover.js
Page({
  data:{
    img_id:'',
    imgURL:"./1.jpg",
    flag_pic:0,
    bookname:'',
    author:'',
    description:'',
  },
  //确定发布后的数据库更新操作
  release:function()
  {
    let _picid=this.data.img_id;
    //若实则未上传照片
    if(this.data.flag_pic==0)
    {
      _picid='';
    }
    const db=wx.cloud.database();
    const app=getApp();//不加报错 加了报别的错
    db.collection('releaseInfo').where({_openid:db.command.eq(app.globalData.openid)}).get(
      {
        success: res => {
          const _=db.command;
          //当当前用户初次发布,建立结构
          if(res.data.length==0){
          console.log("no exist");
          //发布信息数据库的更新
          db.collection('releaseInfo').add({
            data:{
            }
          })
          //借阅信息数据库的更新
          db.collection('lendInfo').add({
            data:{

             }
           })
        }
        var bookname=this.data.bookname;
        getApp().globalData.currbook=this.data.bookname;//更改当前操作的书名
        //当前用户非初次发布
          db.collection('releaseInfo').where({_openid:db.command.eq(app.globalData.openid)}).update({
           data:{
              [bookname]:{
                author:this.data.author,
                picid:_picid,
                description:this.data.description
              }
            }
          })
          //发布人当前用户的id
          db.collection('lendInfo').where({_openid:db.command.eq(getApp().globalData.openid)}).update({
            data:{
               [bookname]:{
                 lendnum:0,
                 lenderInfo:{
                 }
               }
             }
           })
        }
  })
  this.data.path_img='';
},

  upload(){
    // let that = this;
    // 选择一张图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        this.setData()
        // that.uploadFile(tempFilePaths) 如果这里不是=>函数
        //则使用上面的that = this
        this.uploadFile(tempFilePaths) 
      },
    })
  },
  //上传操作
  uploadFile(filePath) {
    wx.cloud.uploadFile({
      cloudPath: (new Date()).valueOf()+'.png', // 文件名
      filePath: filePath, // 文件路径
      success: res => {
        // get resource ID
        console.log(res.fileID)
        this.setData({
          imgURL:res.fileID
        })
        this.data.img_id=res.fileID;
        this.data.flag_pic=1;//有上传照片
      },
      fail: err => {
        // handle error
      }
    })
  },
  getAuthor:function(e){
    this.setData({
      author: e.detail.value
    })
  },
  getBookname:function(e){
    this.setData({
      bookname: e.detail.value
    })
  },
  getDescription:function(e){
    this.setData({
      description: e.detail.value
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