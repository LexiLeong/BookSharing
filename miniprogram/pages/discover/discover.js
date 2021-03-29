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
    const app=getApp();
    const openid=app.globalData.openid;
    const db=wx.cloud.database();
    db.collection('users').where({_openid:db.command.eq(app.globalData.openid)}).get(
      {
        success: res => {
          console.log(res.data);
          console.log(res.data.length);
          const _=db.command;
          //当当前用户初次发布
          if(res.data.length==0){
          console.log("no exist");
          db.collection('users').add({
            data:{
              lend_name_lst:[],
              lend_author_lst:[],
              lend_pic_lst:[],
              description_lst:[],
              is_lend:[]//未被借阅赋值0，被借阅赋值-1
            }
          })
        }
        //当前用户非初次发布
          db.collection('users').where({_openid:db.command.eq(app.globalData.openid)}).update({
           data:{
              lend_name_lst:_.push(this.data.bookname),
              lend_author_lst:_.push(this.data.author),
              lend_pic_lst:_.push(_picid),
              description_lst:_.push(this.data.description),
              is_lend:_.push(0)
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