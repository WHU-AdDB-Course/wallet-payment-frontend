// pages/personPage/personPage.js
import {request} from "../../reguest/index.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    hobby: false,
    nickName: '',
    phone: '',
    ssn:'',
    // 编辑时临时数据
    tempList: {
      nameTemp: '',
      phoneTemp: '',
      ssn: '',
    },
    indexSex: 0,
    indexMarry: 0,
    indexEducation: 4,
    attrImg: [],
    hobbyVal: '',
    labelList: [],
    emailList: [],
    thisMonthGet:0,
    thisMonthPay:0,
    getMost:0,
    payMost:0
  },
  editClick() {
    this.setData({
      show: true,
      hobby: false
    })
  },
  // 添加兴趣爱好【注意：itemList最长6】
  addHobbyClick() {
    this.setData({
      show: true,
      hobby: true,
    })
  },

  // 兴趣爱好输入监听
  inputHobbyClick(e) {
    this.setData({
      hobbyVal: e.detail.value
    })
  },
  // 昵称姓名输入监听
  inputNick(e) {
    this.setData({
      'tempList.nameTemp': e.detail.value
    })
  },
  // 联系电话输入监听
  inputPhone(e) {
    this.setData({
      'tempList.phoneTemp': e.detail.value
    })
  },
  inputSsn(e) {
    this.setData({
      'tempList.ssn': e.detail.value
    })
  },
  // 长安删除邮箱标签
  longtapDeleteLabel(e) {
    let that = this;
    let tag = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除该邮箱吗？',
      complete: (res) => {
        if (res.confirm) {
          var list = that.data.labelList;
          list.splice(tag, 1);
          that.setData({
            labelList: list
          })
        }
      }
    })
  },
  // 取消监听
  cancelMask() {
    this.setData({
      show: false,
      hobbyVal: '',
      'tempList.nameTemp': this.data.nickName,
      'tempList.phoneTemp': this.data.phone,
      'tempList.ssn': this.data.ssn
    })
  },
  // 确定监听
  defineMask() {
    if (this.data.hobby) {
      if (this.data.hobbyVal == '') {
        wx.showToast({
          title: '邮箱不能为空',
          icon: 'none'
        })
      } else {
        var attr = this.data.labelList;
        this.setData({
          show: false,
          hobbyVal: '',
          labelList: attr.concat(this.data.hobbyVal)
        })
      }
    } else {
      let info={
        userId:app.globalData.id,
        name:this.data.tempList.nameTemp,
        phone:this.data.tempList.phoneTemp,
        ssn: this.data.tempList.ssn,
      }
      request({
        url:'/user/update',
        method:"POST",
        data: info,}).then(res =>{
          console.log(res);
          if(res.code===0){
            this.setData({
              show: false,
              nickName: this.data.tempList.nameTemp,
              phone: this.data.tempList.phoneTemp,
              ssn: this.data.tempList.ssn,
            })
          }
          else{
            this.setData({
              showIndex:1,
              errorMsg: res.message
            })
          }
      })
    }
  },
  // 提交
  formSubmit(e) {
    const emailString = this.data.labelList.join(',')
    console.log(emailString)
    let info={
      userId:app.globalData.id,
      email:emailString,
      name:this.data.tempList.nameTemp,
      phone:this.data.tempList.phoneTemp,
      ssn: this.data.tempList.ssn,
    }
    request({
      url:'/user/update',
      method:"POST",
      data: info,}).then(res =>{
        console.log(res);
        if(res.code===0){
          this.setData({
            emailList:[...this.data.labelList]
          })
        }
        else{
          this.setData({
            showIndex:1,
            errorMsg: res.message
          })
        }
    })
  },
  formReset(e) {
    this.setData({
      labelList:[...this.data.emailList],
    })
    console.log(this.data.emailList)
  },
  bindPickerChange(e){
    this.setData({
      indexSex:e.detail.value
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
    request({url:'/user/get?id='+ app.globalData.id }).then(res=>{
      console.log(res),
      this.setData({
        nickName:res.data.name,
        phone:res.data.phone,
        ssn:res.data.ssn,
        labelList:res.data.email,
        emailList:[...res.data.email],
        'tempList.nameTemp':res.data.name,
        'tempList.phoneTemp':res.data.phone,
        'tempList.ssn':res.data.ssn,
      })
    })
    //当月收入总和
    request({
      url:'/user/income-amount?userId=' + app.globalData.id,
      method:'GET',
    }).then(res=>{
      console.log("当月收入总和")
      console.log(res)
      this.setData({
        thisMonthGet:res.data
      })
    })
    //当月支出总和
    request({
      url:'/user/expenses-amount?userId=' + app.globalData.id,
      method:'GET',
    }).then(res=>{
      console.log("当月支出总和")
      console.log(res)
      this.setData({
        thisMonthPay:res.data
      })
    })
    //当月最大收入交易
    request({
      url:'/user/income-transaction?userId=' + app.globalData.id,
      method:'GET',
    }).then(res=>{
      console.log("当月最大收入交易")
      console.log(res)
      this.setData({
        getMost:res.data.value
      })
    })
    //当月最大支出交易
    request({
      url:'/user/expenses-transaction?userId=' + app.globalData.id,
      method:'GET',
    }).then(res=>{
      console.log("当月最大支出交易")
      console.log(res)
      this.setData({
        payMost:res.data.value
      })
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