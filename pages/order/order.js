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
    price:0.00,
    number:1,
    totalPrice:0.00,
    productId:0,
    phone:'',
    address:'',
    accountTypeList:[],
    indexType:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    request({url:'/commodity/get-commodity?commodityId='+options.id}).then(res=>{
      console.log(res)
      this.setData({
        // pictureUrl:res.pictureUrl,
        name:res.data.name,
        price:res.data.value,
        totalPrice:this.data.number * res.data.value,
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
        totalPrice:(this.data.number * this.data.price).toFixed(2),
      })
    }
    else if(operation === 1) {
      this.setData({
        number:this.data.number+1,
      })
      this.setData({
        totalPrice:(this.data.number * this.data.price).toFixed(2),
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
      commodityId:this.data.productId,
      userId:app.globalData.id,
      commodityNum:this.data.number,
      bankAccountId:this.data.accountTypeList[this.data.indexType].accountId,
    }
    console.log(info)
    request({
      url:'/commodity/purchase',
      method:"POST",
      data: info,}).then(res =>{
        console.log(res);
        if (res.code===0) {
          wx.navigateBack({
            delta: 1
          });
          wx.showToast({
            title: '购买成功',
            icon: 'success',
            duration: 2000//持续的时间
          })  
        }
        else{
          wx.showToast({
            title: res.message,
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
    request({
      url:'/bankAccount/user-list?userId=' + app.globalData.id,
      method:"GET",}).then(res =>{
        console.log(res)
        if (res.code===0) {
          this.setData({
            accountTypeList:res.data
          })
        }
      })
  },
  bindPickerChange(e){
    this.setData({
      indexType:e.detail.value
    })
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