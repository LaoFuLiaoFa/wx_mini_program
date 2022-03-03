// pages/goos_detail/index.js
/*
1.发送请求 获取数据
2.点击轮播图 预览大图
  ①给轮播图绑定点击事件
  ②调用小程序的api previewImage
3.点击加入购物车
  ①先绑定点击事件
  ②获取缓存中的购物车数据 数组格式
  ③先判断 当前的商品是否已经存在于购物车
  ④已经存在 修改商品数据 执行购物车数量++ 重新把购物车数组 填充回缓存中
  ⑤不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素带上购买数量属性 num 重新把购物车数组 填充回缓存中
  ⑥弹出提示
4.商品收藏
  1)页面onShow的时候 加载缓存中的商品收藏的数据
  2)判断当前商品是不是被收藏
    ①是 改变页面的图标
    ②不是
  3)点击商品收藏按钮
    ①判断该商品是否存在于缓存数据中
    ②已经存在 把该商品删除
    ③没有存在 把商品添加到收藏数组中 存入到缓存中即可
*/
import { request } from "../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    // 商品是否被收藏
    isCollect:false
  },
  // 商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },
  // 获取商品的详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo = goodsObj;
    // console.log(res);
    // 1.获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect")||[];
    // 2.判断当前商品是不是被收藏
    let isCollect = collect.some(v=>v.goods_id === this.GoodsInfo.goods_id);

    this.setData({
      goodsObj:{
        goods_name:goodsObj.data.message.goods_name,
        goods_price:goodsObj.data.message.goods_price,
        // iphone部分手机 不识别 webp图片格式
        // 最好找到后台 让他进行修改
        // 临时自己改 确保后台存在 1.webp => 1.jpg
        goods_introduce:goodsObj.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.data.message.pics
      },
      isCollect
    })
  },
  // 点击轮播图放大预览
  handlePreviewImage(e){
    // console.log("点击预览图片");
    // 1.先构造要预览的图片数组
    const urls = this.GoodsInfo.data.message.pics.map(v=>v.pics_mid);
    // 2.接收传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  // 点击加入购物车
  handleCartAdd(){
    // console.log("点击加入购物车");
    // 1.获取缓存中的购物车数据 数组格式
    let cart = wx.getStorageSync("cart")||[];
    // 2.判断 当前的商品是否已经存在于购物车
    let index = cart.findIndex(v=>v.goods_id === this.GoodsInfo.data.message.goods_id);
    // console.log(this.GoodsInfo.data.message.goods_id);
    if(index === -1){
      // 3.不存在 第一次添加
      this.GoodsInfo.data.message.num = 1;
      this.GoodsInfo.data.message.checked = true;
      cart.push(this.GoodsInfo.data.message);
      // console.log(this.GoodsInfo.data.message.num)
      // console.log(index);
    } else {
      // 4.已经存在购物车数据 执行 num++
      cart[index].num++;
      // console.log(index);
    }
    // 5.把购物车数组 填充回缓存中
    wx.setStorageSync("cart",cart);
    // 6.弹出提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮
      mask: true
    });
  },
  // 点击商品收藏图标
  handleCollect(){
    let isCollect = false;
    // 1.获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect")||[];
    // 2.判断该商品是否被收藏过
    let index = collect.findIndex(v=>v.goods_id === this.GoodsInfo.data.message.goods_id);
    // console.log(this.GoodsInfo.data.message.goods_id);
    // 3.当index!=-1表示 已经收藏过
    if(index!==-1){
      // 能找到 已经收藏过了 在数组中删除该商品
      // console.log(index);
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '取消成功~',
        icon: 'success',
        mask: true
      });
    } else {
      // console.log(index);
      // 没有收藏过
      collect.push(this.GoodsInfo.data.message);
      isCollect = true;
      wx.showToast({
        title: '收藏成功~',
        icon: 'success',
        mask: true
      });
    }
    // 4.把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5.修改data中的属性 isCollect
    this.setData({
      isCollect
    })
  }
})