// pages/map/map.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 0,        // 对应wxml文件中的longitude变量
    latitude: 0,          // 对应wxml文件中的latitude变量
    location: ',',         // 对应wxml文件中的location变量
    markers: [{          // 对应wxml文件中的markers变量
    id: 0,
    latitude: 0,
    longitude: 0,
    width: 50,
    height: 50
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  var that = this
   wx.getLocation({
     type: 'gcj02', // 返回 可以 用于 wx. openLocation 的 经纬度
     success: function (res) {
       var latitude = res.latitude
       var longitude = res.longitude
       console.log(res)
       var location = latitude.toFixed(2) + ',' + longitude.toFixed(2)
       that.setData({ 
        longitude: longitude,
        latitude: latitude,
        location: location,
        markers: [{
          latitude: latitude,
          longitude: longitude,
        }]
       });
     }
  })
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})