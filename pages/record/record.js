// pages/record/record.js
import {request} from "../../reguest/index.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conditionList:["手机号","邮箱","SSN","交易类型"],
    indexCondition:0,
    typeList:["收入","支出"],
    indexType:0,
    condition:'',
    list:[],
  },
  bindConditionPickerChange(e){
    this.setData({
      indexCondition:e.detail.value
    })
  },
  bindTypePickerChange(e){
    this.setData({
      indexType:e.detail.value
    })
  },
  inputBindtap(e){
    this.setData({
      condition:e.detail.value
    })
    console.log(this.data.condition)
  },
  searchButton(e){
    var info
    if (this.data.indexCondition == 3) {
      info = {
        userId:app.globalData.id,
        field:this.data.conditionList[this.data.indexCondition],
        value:this.data.typeList[this.data.indexType],
      }
      request({
        url:'/user/advancedQuery',
        method:'POST',
        data:info
      }).then(res=>{
        console.log(res)
        this.setData({
          list:res.data
        })
      })
    }
    else if (this.data.condition == '') {
      wx.showToast({
        title: "请输入条件",
        icon:'error',
        duration: 2000//持续的时间
      })  
    }
    else {
      info = {
        userId:app.globalData.id,
        field:this.data.conditionList[this.data.indexCondition],
        value:this.data.condition,
      }
      console.log(info)
      request({
        url:'/user/advancedQuery',
        method:'POST',
        data:info
      }).then(res=>{
        console.log(res)
        this.setData({
          list:res.data
        })
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