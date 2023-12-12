// pages/login/login.js
import {request} from "../../reguest/index.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    username:'',
    password:'',
    height:'',//屏幕高度
    showIndex:null,//打开弹窗的对应下标
  },
  usernameInput:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  passwordInput:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  login(){
    let info={
      username:this.data.username,
      password:this.data.password,
    }
    console.log(info)
    request({
      url:'/user/login',
      method:"POST",
      data: info,}).then(res =>{
        console.log(res);
        if(res.code==="200"){
          wx.navigateTo({url: '../../pages/home/home'})
          app.globalData.id=res.data.id
        }
        else{
          this.setData({
            showIndex:1
          })
        }
    })
   
  },

//关闭弹窗
closePopup(){
  this.setData({
    showIndex:null
  })
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
    var that = this;
    // 动态获取屏幕高度
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          height: result.windowHeight
        });
      },
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