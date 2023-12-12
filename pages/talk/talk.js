// pages/talk/talk.js
Page({
  search: function () {
    wx.navigateTo({
      url: '/pages/searchBar/searchBar'
    })
  },
  

  data: {
  cateItems:[
    {
      cate_id:1,
      cate_name:'聊天室1',
      children:[
        { 
          child_id: 1, 
          name: '你好', 
          image:'../talk/img/head.png',
        },
        {
          child_id: 2,
          name: 'hello', 
          image:'../talk/img/head.png',
        }, 
      ]
    },
    {
      cate_id:2,
      cate_name:'聊天室2'
    },
    {
      cate_id:3,
      cate_name:'聊天室3'
    },
    {
      cate_id: 4,
      cate_name: '聊天室4'
    },
    {
      cate_id: 5,
      cate_name: '聊天室5'
    },
    {
      cate_id: 6,
      cate_name: '聊天室6'
    },
    {
      cate_id: 7,
      cate_name: '聊天室7'
    },
  ],
  curNav:1,
  curIndex:0
},

switchRightTab:function(e){
  let id = e.target.dataset.id,index=e.target.dataset.index;
  this.setData({
    curNav:id,
    curIndex:index
  })
},
bindKeyInput:function(){

},
})
