// pages/send/send.js
import {request} from "../../reguest/index.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountPayList:[],
    indexPay:0,
    phone:'',
    email:'',
    value:0.00,
    remark:'',
  },
  bindPickerChange(e){
    this.setData({
      indexPay:e.detail.value
    })
  },
  formSubmit(e) {
    console.log(e.detail.value)
    if (e.detail.value.phone === '' && e.detail.value.email === '') {
      wx.showToast({
        title: "无法确认收款人",
        icon:'error',
        duration: 2000//持续的时间
      })  
    }else{
      let info={
        senderId:app.globalData.id,
        phone:e.detail.value.phone,
        email:e.detail.value.email,
        remark:e.detail.value.remark,
        value:e.detail.value.value,
        senderAccountId:this.data.accountPayList[this.data.indexPay].accountId
      }
      request({
        url:'/sendRecord/add',
        method:"POST",
        data:info
      }).then(res =>{
        console.log(res)
        if (res.data) {
          wx.navigateBack({
            delta: 1  // 返回的页面数，1 表示返回上一个页面
          });
          wx.showToast({
            title: '转账成功',
            icon: 'none'
          })
        }
        else {
          wx.showToast({
            title:res.message,
            icon:'error',
            duration: 2000//持续的时间
          })
        }
      })
      console.log(info)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    request({
      url:'/bankAccount/user-list?userId=' + 1,
      method:"GET",}).then(res =>{
        console.log(res)
        if (res.code===0) {
          this.setData({
            accountPayList:res.data
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