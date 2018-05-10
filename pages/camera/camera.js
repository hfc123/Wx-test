// pages/camera/camera.js
var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = []; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {} ,
    adress:"",
    src:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'kyq22lejNlYBnIH67cKBvgX3y70h9Ae6'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      console.log(wxMarkerData)
      that.setData({
        markers: wxMarkerData,
        adress: wxMarkerData[0].address
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    }); 
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
  takePhoto:function() {
    var that=this;
    const ctx = wx.createCameraContext()
  //  setTimeout(function (){} ,500);
    console.log(this.data.latitude)
   
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log("ss1");
        this.setData({
          src: res.tempImagePath
        })
        wx.navigateTo({
          url: 'image/image?imgurl=' + that.data.src + "&jindu=" + that.data.latitude + "&weidu=" + that.data.longitude + "&address=" + that.data.adress
        })
     
      }
    })
  }
})