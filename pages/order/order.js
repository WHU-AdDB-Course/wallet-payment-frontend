// pages/order/order.js
import {request} from "../../reguest/index.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictureUrl:'',
    name:'',
    price:'',
    number:1,
    totalPrice:0,
    productId:0,
    phone:'',
    address:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    request({url:'/product/'+options.id}).then(res=>{
      this.setData({
        pictureUrl:res.pictureUrl,
        name:res.productName,
        price:res.price,
        totalPrice:this.data.number * res.price,
        productId:parseInt(options.id),
      })
    })
  },

  handleItemNumEdit(e){
    const operation = e.currentTarget.dataset.operation;
    if(this.data.number ===1 && operation === -1) {
      wx.showToast({
        title: '商品至少为一件',
        icon:'error',
        duration: 2000//持续的时间
      }) 
    }
    else if(operation === -1) {
      this.setData({
        number:this.data.number-1,
      })
      this.setData({
        totalPrice:this.data.number * this.data.price,
      })
    }
    else if(operation === 1) {
      this.setData({
        number:this.data.number+1,
      })
      this.setData({
        totalPrice:this.data.number * this.data.price,
      })
    }
  },

  //监听input内容
  inputBindinput:function(e){
    this.setData({
      phone: e.detail.value
    })
    console.log(this.data.phone)
  },

  //监听textarea内容
  textareaBindinput:function(e){
    this.setData({
      address: e.detail.value
    })
    console.log(this.data.address)
  },

  //提交订单
  submitOrder(){
    let info={
      productId:this.data.productId,
      userId:app.globalData.id,
      price:parseFloat(this.data.price),
      address:this.data.address,
      quantity:this.data.number,
      productName:this.data.name,
      phone:this.data.phone,
    }
    console.log(info)
    request({
      url:'/orderForm/insert',
      method:"POST",
      data: info,}).then(res =>{
        console.log(res);
        if (res.code==="200") {
          wx.navigateBack({
            delta: 1
          });
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000//持续的时间
          })  
        }
        else if(res.code==="400"){
          wx.showToast({
            title: res.msg,
            icon:'error',
            duration: 2000//持续的时间
          })  
        }
        else if(res.code==="600"){
          wx.showToast({
            title: res.msg,
            icon:'error',
            duration: 2000//持续的时间
          })  
        }
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