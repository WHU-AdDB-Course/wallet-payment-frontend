// pages/wallet/wallet.js
import {request} from "../../reguest/index.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    accountVal: '',
    accountTypeVal:'',
    labelList: [],
    indexType:0,
    accountTypeList: ['储蓄卡','信用卡'],
    defaultAccountId:0,
    items: [
      {
        url: '../../pages/send/send',
        text: '转账',
      }, {
        url: '../../pages/requestRecord/requestRecord',
        text: '发起收款',
      },{
        url: '../../pages/payList/payList',
        text: '待付款',
      }
    ],
    items2: [
      {
        url: '',
        image: 'iconfont icon-yinhangqia',
        text: '银行卡',
        color: 'color:#63B8FF'
      }, {
        url: '',
        image: 'iconfont icon-jiaoyijilu',
        text: '交易记录',
        color: 'color:red'
      }
    ],
  },
  addHobbyClick() {
    this.setData({
      show: true,
    })
  },
  cancelMask() {
    this.setData({
      show: false,
      accountVal: '',
      accountTypeVal:'',
    })
  },
  defineMask() {
    console.log(this.data.accountVal)
      if (this.data.accountVal == '') {
        wx.showToast({
          title: '银行账户不能为空',
          icon: 'none'
        })
      } else {
        var attr = this.data.labelList;
        var info = {
          bankName:this.data.accountVal,
          accountType:this.data.accountTypeList[this.data.indexType],
          userId:app.globalData.id,
        }
        console.log(info)
        if (info.userId !== undefined) {
          request({
            url:'/bankAccount/add',
            method:"POST",
            data: info,}).then(res =>{
              console.log(res);
              if(res.code===0){
                this.setData({
                  show: false,
                  labelList: attr.concat(res.data),
                  accountVal: '',
                })
              }
              else{
                wx.showToast({
                  title: '添加失败',
                  icon: 'none'
                })
                this.setData({
                  show: false,
                  accountVal: '',
                })
              }
          })
        }else{
          wx.showToast({
            title: '不存在用户',
            icon: 'none'
          })
          this.setData({
            show: false,
            accountVal: '',
          })
        }
    }
  },
  inputAccountClick(e) {
    this.setData({
      accountVal: e.detail.value
    })
  },
  inputAccountTypeClick(e){
    this.setData({
      accountTypeVal: e.detail.value
    })
  },
  longtapDeleteLabel(e) {
    let that = this;
    let tag = e.currentTarget.dataset.index;
    console.log(this.data.labelList[tag].accountId)
    wx.showModal({
      title: '提示',
      content: '确定删除该银行账户吗？',
      complete: (res) => {
        if (res.confirm) {
          request({
            url:'/bankAccount/delete?id='+ this.data.labelList[tag].accountId,
            method:"POST",
          }).then(res=>{
            if (res.code===0) {
              var list = that.data.labelList;
              list.splice(tag, 1);
              that.setData({
              labelList: list
              })
            }
          })
        }
      }
    })
  },
  bindPickerChange(e){
    this.setData({
      indexType:e.detail.value
    })
  },
  tapDefaultAccount(e){
    let tag = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '是否设置为默认银行账号',
      complete: (res) => {
        if (res.confirm) {
          var info={
            userId:app.globalData.id,
            bankAccountId:this.data.labelList[tag].accountId
          }
          console.log(info)
          request({
            url:'/user/setDefaultAccount?id=',
            method:"POST",
            data:info,
          }).then(res=>{
            console.log(res)
            if (res.code===0) {
              this.setData({
                defaultAccountId:this.data.labelList[tag].accountId
              })
              console.log(this.data.defaultAccountId)
            }
            else{
              wx.showToast({
                title: "账户不存在",
                icon:'error',
                duration: 2000//持续的时间
              })  
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    request({
      url:'/bankAccount/user-list?userId=' + app.globalData.id,
      method:"GET",}).then(res =>{
        console.log(res)
        if (res.code===0) {
          this.setData({
            labelList:res.data
          })
        }
      })
    request({
      url:'/user/get?id=' + app.globalData.id,
      method:"GET",
    }).then(res=>{
      console.log(res)
      if (res.code===0) {
        this.setData({
          defaultAccountId:res.data.defaultAccountId
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
    request({
      url:'/bankAccount/user-list?userId=' + app.globalData.id,
      method:"GET",}).then(res =>{
        console.log(res)
        if (res.code===0) {
          this.setData({
            labelList:res.data
          })
          console.log(1)
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