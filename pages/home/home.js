// pages/home/home.js
Page({
  data: {
    menu_add: "iconfont",
    menu: [
      {
        icon: "icon_wallet",
        name: "钱包",
      },
      {
        icon: "icon_search",
        name: "查询",
      },
      {
        icon:"icon_person",
        name:"个人信息",
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
          url: '../../pages/wallet/wallet'
        });
        break;
      case 1:
        wx.navigateTo({
          url: '../../pages/record/record'
        });
        break;
      case 2:
        wx.navigateTo({
          url: '../../pages/personPage/personPage'
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