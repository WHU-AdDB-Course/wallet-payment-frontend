// pages/requestRecord/requestRecord.js
import {request} from "../../reguest/index.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    addPhone:"",
    addEmail:"",
    phoneAndEmailsList:[],
  },
  longtapDeleteLabel(e) {
    let tag = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除该银行账户吗？',
      complete: (res) => {
        if (res.confirm) {
          var list = this.data.phoneAndEmailsList;
          list.splice(tag, 1);
          this.setData({
            phoneAndEmailsList: list
          })
        }
      }
    })
  },
  addTargeterClick() {
    this.setData({
      show: true,
    })
  },
  cancelMask() {
    this.setData({
      show: false,
    })
  },
  defineMask(){
    console.log(this.data.addEmail)
    console.log(this.data.addPhone)
    if (this.data.addPhone === '' || this.data.addEmail ==='') {
      wx.showToast({
        title: '信息不完整',
        icon: 'none'
      })
    }else{
      var phoneAndEmail = this.data.addPhone + '-' + this.data.addEmail;
      var phoneAndEmail = this.data.phoneAndEmailsList;
        this.setData({
          show: false,
          phoneAndEmailsList: phoneAndEmail.concat(this.data.addPhone + '-' + this.data.addEmail),
          addPhone:'',
          addEmail:'',
        })
    }
  },
  inputAddPhoneClick(e){
    this.setData({
      addPhone:e.detail.value,
    })
  },
  inputAddEmailClick(e){
    this.setData({
      addEmail:e.detail.value,
    })
  },
  formSubmit(e){
    if (e.detail.value.value ==='' || this.data.phoneAndEmailsList.length === 0) {
      wx.showToast({
        title: "信息不全",
        icon:'error',
        duration: 2000//持续的时间
      })
    }else {
      // console.log(e.detail.value)
      // console.log(this.data.phoneAndEmailsList)
      var info = {
        requesterId:app.globalData.id,
        value:e.detail.value.value,
        remark:e.detail.value.remark,
        phoneAndEmails:this.data.phoneAndEmailsList
      }
      console.log(info)
      request({
        url:'/requestRecord/add',
        method:'POST',
        data:info,
      }).then(res=>{
        console.log(res)
        if (res.data) {
          wx.navigateBack({
            delta: 1  // 返回的页面数，1 表示返回上一个页面
          });
          wx.showToast({
            title: '请求收款成功',
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
    }
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