// pages/wenzhang/wenzhang.js
//在使用的View中引入WxParse模块
var WxParse = require('../wxParse/wxParse.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  wenzhang:"",
  nextday:"",
  preday:"",
  title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadWenZhang()
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

  },
  loadWenZhang:function(){
    var that=this
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/today?dev=1',
      method:'Get',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        //that.processDoubanData(res.data, settedKey, categoryTitle)
      
        that.setData({
          wenzhang: res.data.data.content,
          nextday: res.data.data.date.next,
          title: res.data.data.title,
          preday: res.data.data.date.prev
        });
        var article = '<div>我是HTML代码</div>';
        /**
        * WxParse.wxParse(bindName , type, data, target,imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */
      
        WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
        console.log(res.data)
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  next:function(){
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/day?dev=1&date= '+that.data.nextday,
      method: 'Get',
      header: {
        "Content-Type": "json"
      },
      success:function(res){
        if (res.data.data.content == undefined) {
          return;
        }
        that.setData({
          wenzhang: res.data.data.content,
          title: res.data.data.title,
          nextday: res.data.data.date.next,
          preday: res.data.data.date.prev
        });
        var article = '<div>我是HTML代码</div>';
        /**
        * WxParse.wxParse(bindName , type, data, target,imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */

        WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
        console.log(res.data)
      },
      fail:function(e){

      }
    })
  },
  prev:function(){
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/day?dev=1&date= ' + that.data.preday,
      method: 'Get',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        if (res.data.data.content==undefined){
          return;
        }
        that.setData({
          wenzhang: res.data.data.content,
          nextday: res.data.data.date.next,
          title: res.data.data.title,
          preday: res.data.data.date.prev
        });
        var article = '<div>我是HTML代码</div>';
        /**
        * WxParse.wxParse(bindName , type, data, target,imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */

        WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
        console.log(res.data)
      },
      fail: function (e) {

      }
    })
  }

})