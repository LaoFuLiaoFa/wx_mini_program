import { request } from "../../request/index.js"

Page({
  data: {
    // 左侧的菜单数据
    leftMenuList:[],
    // 右侧的商品数据
    rightContent:[],
    // 被点击的左侧菜单
    currentIndex:0,
    scrollTop:0
  },
  // 接口的返回数据
  Cates:[],

  onLoad: function (options) {
    this.getCates();
  },

  // 获取分类数据
  getCates(){
    request({
      url:"/categories"
    })
      .then(res => {
        // console.log(res);
        this.Cates=res.data.message;

        // 构造左侧的菜单数据
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        // 构造右侧的商品数据
        let rightContent=this.Cates[0].children;

        this.setData({
          leftMenuList,
          rightContent
        })
      })
  },

  // 左侧菜单的点击事件
  handleItemTap(e){
    // console.log(e)
    /*
    1.获取被点击的标题上的索引
    2.给data中的currentIndex赋值
    3.根据不同的索引来渲染右侧的商品
    */
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop:0
    })
  }
})