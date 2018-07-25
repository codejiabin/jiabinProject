var postsData=require('../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"Sep 18 2017"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      post_key:postsData.postList
    });
  },
  onPostTap:function(event){
    var postId=event.currentTarget.dataset.postid;
    console.log(postId);
    wx.navigateTo({
      url:"post-detail/post-detail?id="+postId
    })
  }
})