// index.js
import {request} from "../../reguest/index.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path:'',
    filename:'',
    value:"",
    items: [
      {id:0, name:'校园资讯', choose:false},
      {id:1, name:'教材'},
      {id:2, name:'问卷'}
    ],
    isShow: true,
    isShow2: true,
    isShow3: true,
    array1:[],
    array2:[],
    array3:[],
    fileList:[],
    title: "", //保存输入标题
    info: "",  //保存输入内容
    pictureUrl: "", //保存图片url
    url: "", //保存跳转链接
  },


  //删除图片
  deleteClick(e) {
    var imgData = this.data.fileList;
    // 通过splice方法删除图片
    imgData.splice(e.detail.index, 1);
    // 更新图片数组
    this.setData({
        fileList: imgData,
        pictureUrl:"",
    })
  },
  // 添加图片
  afterRead(e) {
    // loading加载
    wx.showLoading({
        title: '上传中...'
    });
    const {file} = e.detail;//获取图片详细信息
    let that = this;//防止this指向问题
    // 调用wx.uploadFile上传图片方法
    wx.uploadFile({
        url: "http://localhost:9090/file/upload",
        method: 'POST',
        filePath: file.url,
        name: 'file',
        // 成功回调
        success(res) {
            console.log(res)
            const {fileList = []} = that.data;
            fileList.push({
              ...file,
              url: res.data
          });
          // 更新存放图片的数组
          that.setData({
              fileList,
              pictureUrl:res.data
          });
          wx.hideLoading();//停止loading
        },
    });
  },

  add1(){
    var arrays=this.data.array1
    var newNum=arrays[arrays.length-1]+1
    arrays.push(newNum)
    this.setData({
      array1: arrays
    })
  },
  add2(){
    var arrays=this.data.array2
    var newNum=arrays[arrays.length-1]+1
    arrays.push(newNum)
    this.setData({
      array2: arrays
    })
  },
  add3(){
    var arrays=this.data.array3
    var newNum=arrays[arrays.length-1]+1
    arrays.push(newNum)
    this.setData({
      array3: arrays,
    })
  },

  

  changed: function(e){
    console.log(e)
    let value = e.detail.value
    this.setData({
      value
    })
    if(value == 0){
      this.setData({isShow: false, isShow2: true, isShow3: true})
    }else if(value == 1){
      this.setData({isShow: true, isShow2: false, isShow3: true})
    }else{
      this.setData({isShow: true, isShow2: true, isShow3: false})
    }
  },

  //监听input内容
  inputBindinput:function(e){
    this.setData({
      title: e.detail.value
    })
    console.log(this.data.title)
  },

  //监听textarea内容
  textareaBindinput:function(e){
    this.setData({
      info: e.detail.value
    })
    console.log(this.data.info)
  },

  //监听链接input内容
  inputUrlBindinput(e){
    this.setData({
      url: e.detail.value
    })
    console.log(this.data.url)
  },

  // 校园资讯提交
  submitInformation(){
    let info={
      campusInformationTitle:this.data.title,
      campusInformationInfo:this.data.info,
      campusInformationPicture:this.data.pictureUrl,
    }
    console.log(info)
    request({
      url:'/campus/insert',
      method:"POST",
      data: info,}).then(res =>{
        console.log(res);
        if (res) {
          wx.navigateBack({
            delta: 1
          });
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000//持续的时间
          })  
        }
        else{
          wx.showToast({
            title: '提交失败',
            icon:'error',
            duration: 2000//持续的时间
          })  
        }
    })
  },

  //教材提交
  submitTextbook(){
    let info={
      textbookName:this.data.title,
      textbookMessage:this.data.info,
      textbookPicture:this.data.pictureUrl,
      textbookUrl:this.data.url,
    }
    console.log(info)
    request({
      url:'/textbook/insert',
      method:"POST",
      data: info,}).then(res =>{
        console.log(res);
        if (res) {
          wx.navigateBack({
            delta: 1
          });
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000//持续的时间
          })  
        }
        else{
          wx.showToast({
            title: '提交失败',
            icon:'error',
            duration: 2000//持续的时间
          })  
        }
    })
  },

  //提交调查问卷
  submitQuestionnaire(){
    let info={
      questionnaireName:this.data.title,
      questionnaireInfo:this.data.info,
      questionnaireUrl:this.data.url,
      questionnairePicture:this.data.pictureUrl,
      userId:app.globalData.id,
    }
    console.log(info)
    request({
      url:'/questionnaire/insert',
      method:"POST",
      data: info,}).then(res =>{
        console.log(res);
        if (res) {
          wx.navigateBack({
            delta: 1
          });
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000//持续的时间
          })  
        }
        else{
          wx.showToast({
            title: '提交失败',
            icon:'error',
            duration: 2000//持续的时间
          })  
        }
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