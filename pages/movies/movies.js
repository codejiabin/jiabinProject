var app=getApp();
var util=require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchResult:{},
    containerShow:true,
    searchPanelShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase +"/v2/movie/in_theaters"+"?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +"/v2/movie/coming_soon"+"?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250"+"?start=0&count=3";

    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣top250");
  },
  onMoreTap:function(event){
    var category=event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category
    })
  },

  onMovieTap:function(event){
    var movieId=event.currentTarget.dataset.movieid;
    console.log(movieId);
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+movieId,
    })
  },

  getMovieListData:function(url,settedKey,categoryTitle){
    var that=this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res);
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  
  onCancelImgTap:function(){
    this.setData({
      containerShow:true,
      searchPanelShow:false
    })
  },

  onBindFocus:function(){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },

  onBindConfirm:function(e){
    var text=e.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl,"searchResult","")
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle){
    var movies=[];
    for(var idx in moviesDouban.subjects){
      var subject=moviesDouban.subjects[idx];
      var title=subject.title;
      if(title.length>=6){
        title=title.substring(0,6)+'...';
      }
      var temp={
        stars:{
          average:subject.rating.average,
          star:subject.rating.stars
        },
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp);
    }
    var readyData={};
    readyData[settedKey]={
      categoryTitle:categoryTitle,
      movies:movies
    };
    this.setData(readyData);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})