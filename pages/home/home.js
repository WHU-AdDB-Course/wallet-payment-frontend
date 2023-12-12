// pages/home/home.js
Page({
  data: {
    menu_add: "iconfont",
    menu: [
      {
        icon: "icon_search",
        name: "搜索",
      },
      {
        icon: "icon_conversation",
        name: "聊天室",
      },
      {
        icon:"icon_publish",
        name:"发布",
      },
      {
        icon:"icon_shopping",
        name:"店铺",
      }
    ],
    show_menu: false,
    currIndex: "",
  },
  showMenu() {
    let { show_menu } = this.data;
    this.setData({
      show_menu: !show_menu,
      currIndex: "",
    });
  },
  clickActive(e) {
    let { index } = e.currentTarget.dataset;
    if (this.data.currIndex === index || index === undefined) return false;
    this.setData({
      currIndex: index,
    });
    switch (index) {
      case 0:
        wx.navigateTo({
          url: '../../pages/search/search'
        });
        break;
      case 1:
        wx.navigateTo({
          url: '../../pages/talk/talk'
        });
        break;
      case 2:
        wx.navigateTo({
          url: '../../pages/index/index'
        });
        break;
      case 3:
        wx.navigateTo({
          url: '../../pages/shop/shop'
        });
        break;
      default:
        break;
    }
  },
});