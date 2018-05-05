// pages/xiaobing/yanzhi.js
var that;
var Bmob=require("../../libs/bmob.js")

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:null,
    imageurl:"",
    text:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
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
    getUserInfo();
    /**
     *      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
     * 
     * 
     */
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
  ,
  getimage:function(){
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          avatarUrl: tempFilePaths
        })
      },
    })
  },
  uploadimage:function(){
wx.showLoading({
  title: '正在检测你的颜值',
  mask:true
})
  wx.uploadFile({
    url: 'https://mediaplatform.msxiaobing.com/Image/Upload',
    filePath: that.data.avatarUrl[0],
    name: 'file',
    header: {
      'content-type': 'multipart/form-data'
    },
    success:function(res){
      console.log(res.data);
      var url = JSON.parse(res.data);
      var value = "" + url.Host + url.Url;
    console.log(res.data.Host )
    that.setData({
      imageurl:value
    })
 // var key= keyvalue[1];
    console.log(that.data.imageurl)
    var imageurl = "{ 'ImageUrl': " + "'"+that.data.imageurl+"'"+"}"
  wx.request({
    url: 'https://minisite-skill.msxiaobing.com/Api/ImageAnalyze/Process?service=CSYanzhiWeApp&tid=9QfE6FiUxbovQayaA3v2gR2fPalVvvdD&validate=EjJdtJA1VwXHeF8TfBNwRwYDfkdXV0ATZic7FywjZANqCyZjZ0cwc25HXA' ,
    method:"POST",
    data:{
      Content: { "ImageUrl": that.data.imageurl }
    },
    header: {
      "Content-Type": "application/json"
      ,
      'refer': 'https://servicewechat.com/wx56f522b041e7d9bf/4/page-frame.html'
    },
  
    success:function(res){
      console.log(res.data.content)
     var text= res.data.content.text
     // var value = text.replace(/[^0-9]/ig, "");
      console.log(res.data.content.metadata.score);
      wx.hideLoading();     
      that.createtable(res.data.content.metadata.score, that.data.imageurl, res.data.content.metadata.age);
     that. setData({
       text: res.data.content.text
     })
    },
    fail:function(err){
      console.log("error")
    }
  })
    },
    fail:function(res){
      console.log("shibai")
    }
  })
  },
  createtable: function (deifen, url, age){
    var Diary = Bmob.Object.extend("diary");
    var diary = new Diary();
    diary.set("nickName", app.globalData.userInfo.nickName);
    diary.set("gender", app.globalData.userInfo.gender);
    diary.set("avatarUrl", app.globalData.userInfo.avatarUrl);
    diary.set("deifen", deifen);
    diary.set("img", url);
    diary.set("age",age);
    //添加数据，第一个入口参数是null
    diary.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("日记创建成功, objectId:" + result.id);
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建日记失败');

      }
    });
  },
toRank: function (e) {
  
   wx.navigateTo({
     url: './rank/rank'
   })
  }
})