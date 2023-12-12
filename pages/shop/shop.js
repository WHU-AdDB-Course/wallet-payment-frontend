// pages/shop/shop.js
import {request} from "../../reguest/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'../../utils/picture/大学物理.jpg',
    goodsInfoCarouselList:[] ,//轮播图列表
    list:[],//商品列表
  },
  ToShoppingList(){
    wx.navigateTo({
      url: '../../pages/shoppingList/shoppingList'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // let list=[];
    // list.push({"name":"1","url": this.data.url});
    // list.push({"name":"2","url": this.data.url});
    // list.push({"name":"3","url": this.data.url});
    // this.setData({
    //   goodsInfoCarouselList:list,
    // })
    request({url:'/product/recommend',method:"GET",}).then(res =>{
      this.setData({
        goodsInfoCarouselList:res,
      })
      console.log(this.data.goodsInfoCarouselList)
    })
    request({url:'/product',method:"GET",}).then(res =>{
      this.setData({
        list:res,
      })
      console.log(this.data.list)
    })
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