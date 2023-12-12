// pages/publish/publish.js
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
    items2: [
      {id:3, name:'单选题', choose:false},
      {id:4, name:'多选题'},
      {id:5, name:'问答题'}
    ],
    isShow: true,
    isShow2: true,
    isShow3: true,
    array1:[],
    array2:[],
    array3:[]
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
      array3: arrays
    })
  },

  upload(e){
    wx.chooseMessageFile({
      count: 3,
      type: 'file',
      success(res) {
        var filename = res.tempFiles[0].filename;
        that.setData({
          path: res.tempFiles[0].path, //将文件的路径保存在页面的变量上,方便 wx.uploadFile调用
          filename: filename              //渲染到wxml方便用户知道自己选择了什么文件4
        })
      }
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