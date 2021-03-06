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
    this.loadmore()
  },
  //下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.loadindex();
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
     //   that.nextPage=res.data.nextPage
        wx.hideNavigationBarLoading();
        var itemlist = that.data.itemlist
        for (var i = 0; i < res.data.dailyList[0].videoList.length; i++) {
          if (res.data.dailyList[0].videoList[i].dataType == "VideoBeanForClientV1") {
            itemlist.push(res.data.dailyList[0].videoList[i]);
          }
        }
        that.setData({
          itemlist: itemlist
          ,nextPage: res.data.nextPageUrl
        })
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  loadindex:function(){
    wx.request({
      url: 'https://baobab.kaiyanapp.com/api/v1/feed',
      success:function(res) {
        //that.data.nextPage = res.data.nextPageUrl;
        that.setData({
          nextPage: res.data.nextPageUrl
        })
        var bannerlist=[]
        for (var i = 0; i < res.data.dailyList[0].videoList.length; i++){
          if (res.data.dailyList[0].videoList[i].dataType =="VideoBeanForClientV1"){
            bannerlist.push(res.data.dailyList[0].videoList[i]);
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
  },
  tovideo: function (event){
    var videourl=event.currentTarget.dataset.albumlist
    console.log(videourl)
    videourl=videourl.replace("?","&")
    wx.navigateTo({

      url:"../video/video?url="+ videourl
    })
  }
})