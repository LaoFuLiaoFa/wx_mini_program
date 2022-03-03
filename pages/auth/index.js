/* import { request } from "../../request/index.js"
import { login } from "../../utils/asyncWx.js"
// pages/auth/index.js
Page({
  // 获取用户信息
  async handleGetUserInfo(e){
    try {
          // console.log(e);
    // 1.获取用户信息
    const { encryptedData, rawData, iv, signature } = e.detail;
    // 2.获取小程序登录成功后的code值
    const { code } = await login();
    // console.log(code);
    const loginParams = {encryptedData, rawData, iv, signature, code};
    // 3.发送请求 获取用户的token
    const res = await request({url:"/users/wxlogin", data: loginParams, method:"post"});
    console.log(res);
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta:1
    });
    } catch (error) {
      console.log(error);
    }
  }
}) */