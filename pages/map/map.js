// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    selsectState: [1, 0, 0],
    mode:"食物",
    fail:'',
    success:'',
    BMap:''
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
  },
  onLoad: function () {
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
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    this.setData({
      success: success,
      fail: fail,
      BMap: BMap
    });
    // 发起POI检索请求 
    BMap.search({
      "query": that.data.mode,
      fail: fail,
      success: success,
      // 此处需要在相应路径放置图片文件 
      iconPath: '../../img/marker_red.png',
      // 此处需要在相应路径放置图片文件 
      iconTapPath: '../../img/marker_red.png'
    });
  },
  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      placeData: {
        title: '名称：' + data[i].title + '\n',
        address: '地址：' + data[i].address + '\n',
        telephone: '电话：' + data[i].telephone
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        // 此处需要在相应路径放置图片文件 
        data[j].iconPath = "../../img/marker_blue.png";
      } else {
        // 此处需要在相应路径放置图片文件 
        data[j].iconPath = "../../img/marker_red.png";
      }
      markers[j]=data[j];
    }
    that.setData({
      markers: markers
    });
  },
  clickHotel:function(){
    this.setData({
      mode:"酒店",
      selsectState: [0, 1, 0]
    })
   this. onShow()
  },
  clickFood: function () {
    this.setData({
      mode: "食物",
      selsectState: [1, 0, 0]
    })
    this.onShow()
  },
  clickService: function () {
    this.setData({
      mode: "服务",
      selsectState: [0, 0, 1]
    })
    this.onShow()
  },
  onShow: function () {
    // 发起POI检索请求 
    this.data.BMap.search({
      "query": this.data.mode,
      fail: this.data.fail,
      success: this.data.success,
      // 此处需要在相应路径放置图片文件 
      iconPath: '../../img/marker_red.png',
      // 此处需要在相应路径放置图片文件 
      iconTapPath: '../../img/marker_red.png'
    });
  },
})