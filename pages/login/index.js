// pages/login/index.js
Page({
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // console.log(res);
        // console.log(res.userInfo);
        wx.setStorageSync("userInfo", res.userInfo);
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
})