// pages/movie/movie.js

var that={};
Page({

  /**
   * 页面的初始数据
   */
  data: {
      itemlist:[],
      nextPage:"",
      bannerlist:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //load index页面
    that=this;
    this.loadindex();
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
  loadmore:function(){
   // var 
    wx.request({
      url: that.data.nextPage,
      header: {
        "Content-Type": "json"
      },
      success:function(res){
        that.nextPage=res.data.nextPage
        var itemlist = []
        for (var i = 0; i < res.data.itemList.length; i++) {
          if (res.data.itemList[i].type == "video") {
            itemlist.push(res.data.itemList[i]);
          }
        }
        that.setData({
          itemlist: itemlist
        })
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  loadindex:function(){
    wx.request({
      url: 'http://baobab.kaiyanapp.com/api/v4/tabs/selected',
      success:function(res) {
        //that.data.nextPage = res.data.nextPageUrl;
        that.setData({
          nextPage: res.data.nextPageUrl
        })
        var bannerlist=[]
      for (var i = 0; i < res.data.itemList.length; i++){
        if (res.data.itemList[i].type =="video"){
          bannerlist.push(res.data.itemList[i]);
        }     
      }
      that.loadmore();
     
      that.setData({
        bannerlist: bannerlist
      })
      console.log(that.data.itemlist)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})