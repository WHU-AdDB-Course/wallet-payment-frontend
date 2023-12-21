// pages/payList/payList.js
import {request} from "../../reguest/index.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },
  payButton(e){
    const index = e.currentTarget.dataset.index;
    console.log("点击的按钮对应的索引值为：" + index);
    var info = {
      requestRecordId:this.data.list[index].requestRecordId,
      requesterId:this.data.list[index].requesterId,
      targeterId:this.data.list[index].targeterId,
      value:this.data.list[index].value,
      status:this.data.list[index].status,
      remark:this.data.list[index].remark,
      createTime:this.data.list[index].createTime,
      finishTime:this.data.list[index].finishTime,
    }
    console.log(info)
    request({
      url:'/requestRecord/verify',
      method:'POST',
      data:info
    }).then(res=>{
      console.log(res)
      if (res.data == true) {
        this.getList()
      }
      else{
        wx.showToast({
          title: '余额不足',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getList(){
    request({
      url:'/requestRecord/listIn?targeterId='+app.globalData.id,
      method:"GET"
    }).then(res=>{
      console.log(res)
      this.setData({
        list:res.data
      })
    })
  },
  onLoad(options) {
    // request({
    //   url:'/requestRecord/listIn?targeterId='+app.globalData.id,
    //   method:"GET"
    // }).then(res=>{
    //   console.log(res)
    //   this.setData({
    //     list:res.data
    //   })
    // })
    this.getList()
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