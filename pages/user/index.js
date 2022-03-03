// pages/user/index.js
Page({
  data: {
    userInfo:{},
    // 被收藏的商品数量
    collectNums:0
  },
  onShow(){
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect")||[];
    this.setData({
      userInfo,
      collectNums:collect.length
    });
  },
  handleOrder(){
    wx.showToast({
      title:"暂不支持此功能",
      icon:'error',
      duration:1500,
      });
  }
})