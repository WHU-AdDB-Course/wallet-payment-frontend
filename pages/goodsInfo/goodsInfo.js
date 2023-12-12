// pages/goodsInfo/goodsInfo.js
import {request} from "../../reguest/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId:0, //商品id
    obj:{},      //当前商品
    pictureList:[] //图片列表
  },

  getProductInfo(id){
    request({url:'/product/'+id}).then(res=>{
      this.setData({
        obj:res,
        pictureList:res.pictureUrl
      })
    })
  },
  orderProduct(){
    wx.navigateTo({
      url: '/pages/order/order?id='+this.data.productId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      productId:options.id
    })
    this.getProductInfo(options.id);
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