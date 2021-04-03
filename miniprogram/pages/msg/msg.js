// pages/msg/msg.js
Page({
  data:{
    hiddenmodalput:true,
    returnTime:"",
    wxid:'',
  },
  onLoad: function (options) {
    this.getData();
  },
  getData(){
    var that=this;
    var db=wx.cloud.database();
    var arr=[];
    db.collection('lendInfo').where({
      _openid:db.command.eq(getApp().globalData.openid)
    }).get({
      success: function(res) {
        for(var i=2 ;i<Object.keys(res.data[0]).length;i++)
        {
          console.log('loop');
          var index1=Object.keys(res.data[0])[i];
          //判断书是否是借出的书籍,是则不展示
          if(res.data[0][index1]['lendnum']==-1)
          {
            continue ;
          }
          var _bkname=index1;
          var index2='lenderInfo';
          for(var t=Object.keys(res.data[0][[index1]]['lenderInfo']).length-1;t>-1;t--)
          {
            var id=Object.keys(res.data[0][[index1]]['lenderInfo'])[t];
            var color;
            if(Object.values(res.data[0][[index1]]['lenderInfo'])[0]['isread']==-1){
              color='green';
            }
            else{
              color="black";
            }
            var _={ bookname:_bkname,
                    nickname:Object.values(res.data[0][[index1]]['lenderInfo'])[0]['nickname'],
                    msg:Object.values(res.data[0][[index1]]['lenderInfo'])[0]['msg'],
                    wxid:Object.values(res.data[0][[index1]]['lenderInfo'])[0]['wxid'],
                    color:color,
                    id:id
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
          //被借人id
          //设置信息为已读，变色
          db.collection('lendInfo').where({_openid:db.command.eq(getApp().globalData.openid)}).update({
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
  lendConfirm(e){
    this.setData({
      hiddenmodalput:false
    })
    var bookname=e.currentTarget.dataset.item['bookname'];
    var lendid=e.currentTarget.dataset.item['id'];
    var lender=e.currentTarget.dataset.item['nickname'];
    const db=wx.cloud.database();
    var waitingst;
    //当用户初次借书
    db.collection('borrowInfo').where({_openid:db.command.eq(lendid)}).get({
    success: res => {
      if(res.data.length==0){
      //发布信息数据库的更新
      db.collection('borrowInfo').add({
        data:{
          
        }
      })
    }
  }
})
console.log(bookname);
//给借书人的数据库进行加载
var index=bookname;
db.collection('borrowInfo').where({_openid:db.command.eq(lendid)}).update({
  data:{
     [index]:{
       owner:lender,
       ownerId:getApp().globalData.openid,
       wxid:'test',
       returntime:'2022',
       isreturn:-1,//-1则未归还，0则归还
     }
  }})
  //设置书为已借
  db.collection('lendInfo').where({_openid:db.command.eq(getApp().globalData.openid)}).get({
    success: function(res) {
      watinglst=Object.keys(res.data[0][[bookname]]['lenderInfo']);
    }
  })
  db.collection('lendInfo').where({_openid:db.command.eq(getApp().globalData.openid)}).update({
    data:{
      [bookname]:{
        lendnum:-1//lendnum为-1表示已借
      }
    }
  })
  //将出借书目的其他等待者清空
 for(var key in waitingst){
   if(key==lendid){continue ;}
  db.collection('lendInfo').where({_openid:db.command.eq(getApp().globalData.openid)}).update({
    data:{
      [bookname]:{
        lenderInfo:{
          [key]:db.command.remove()
        }
      }
    }
  })
}
},


confirmM: function (e) {
  this.setData({
    hiddenmodalput:true,
  })
},

wxid: function (e) {
  this.setData({
     name:e.detail.value
  })
},
returnTime: function (e) {
  this.setData({
     wxid: e.detail.value
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