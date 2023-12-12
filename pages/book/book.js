// pages/book/book.js
import {request} from "../../reguest/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '加载中', // 状态
    list: {}, // 数据列表
    paper:[
      {title:'论文1',url:''},
      {title:'论文2',url:''},
      {title:'论文3',url:''},
      {title:'论文4',url:''},
      {title:'论文5',url:''},
      {title:'论文6',url:''},
      {title:'论文7',url:''},
      {title:'论文8',url:''},
      {title:'论文9',url:''},
      {title:'论文10',url:''},
      {title:'论文11',url:''},
    ],
  },
  search: function () {
    wx.navigateTo({
      url: '/pages/searchBar/searchBar'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      title:options.id,
    })
    switch (options.id) {
      case '教材':
        request({
          url:'/textbook',
          methond:"GET",
        }).then(res =>{
          res =JSON.parse(JSON.stringify(res).replace(/textbookName/g,'name'))
          res =JSON.parse(JSON.stringify(res).replace(/textbookPicture/g,'pictureUrl'))
          res =JSON.parse(JSON.stringify(res).replace(/textbookUrl/g,'url'))
          res =JSON.parse(JSON.stringify(res).replace(/textbookMessage/g,'message'))
          this.setData({
            list:res,
          })
          console.log(res);
          console.log(this.data.list);
        })
        break;
      case '校园资讯':
          request({
            url: '/campus',
            methond:"GET"
          }).then(res =>{
            res =JSON.parse(JSON.stringify(res).replace(/campusInformationTitle/g,'name'))
            res =JSON.parse(JSON.stringify(res).replace(/campusInformationPicture/g,'pictureUrl'))
            res =JSON.parse(JSON.stringify(res).replace(/campusInformationInfo/g,'message'))
            this.setData({
              list:res,
            })
            console.log(this.data.list);
          })
        break;
      case '调查问卷':
        request({
          url: '/questionnaire',
          methond:"GET"
        }).then(res =>{
          res =JSON.parse(JSON.stringify(res).replace(/questionnaireName/g,'name'))
          res =JSON.parse(JSON.stringify(res).replace(/questionnairePicture/g,'pictureUrl'))
          res =JSON.parse(JSON.stringify(res).replace(/questionnaireInfo/g,'message'))
          res =JSON.parse(JSON.stringify(res).replace(/questionnaireUrl/g,'url'))
          this.setData({
            list:res,
          })
          console.log(this.data.list);
        })
        break;
      case '论文':
          this.setData({
            list:this.data.paper,
          })
        break;
      default:
        break;
    }
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