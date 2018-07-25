var postsData=require('../../../data/posts-data.js')
var app=getApp();
Page({
  data:{
    
  },
  onLoad:function(option){
    var postId=option.id;
    this.data.currentPostId=postId;
    var postData=postsData.postList[postId];
    this.setData({
      postData:postData
    })

    var postsCollected=wx.getStorageSync('posts_Collected')
    if(postsCollected){//判定该缓存是否存在，如果存在
      var postCollected=postsCollected[postId]//获取具体某个文章的缓存状态
      if(postCollected){
        this.setData({
          collected: postCollected//数据绑定
        })
      }
    }else{//如果不存在
      var postsCollected={};
      postsCollected[postId]=false;
      wx.setStorageSync('posts_Collected', postsCollected);
    }
    if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId){
      this.setData({
        isPlayingMusic:true
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic=true;
      app.globalData.g_currentMusicPostId=that.data.currentPostId;
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId=null;
    })
  },
  onCollectionTap:function(event){
    this.getPostsCollectedSyc()
    // this.getPostsCollectedAsy()
  },
  getPostsCollectedAsy:function(){
    var that=this;
    wx.getStorage({
      key: 'posts_Collected',
      success: function(res) {
        var postsCollected=res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      }
    })
  },
  getPostsCollectedSyc: function () {
    var postsCollected = wx.getStorageSync('posts_Collected');
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //更新文章是否收藏的缓存值
    // wx.setStorageSync('posts_Collected', postsCollected)
    // //更新数据绑定变量，从而实现切换图片
    // this.setData({
    //   collected:postCollected
    // })
    this.showToast(postsCollected, postCollected);
  },
  showModal:function(postsCollected,postCollected){
    var that =this;
    wx.showModal({
      title: '收藏',
      content: postCollected?"收藏该文章？":"取消收藏该文章",
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success: function (res) { 
        if(res.confirm){
          wx.setStorageSync('posts_Collected', postsCollected)
          //更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  showToast: function (postsCollected, postCollected){
    wx.setStorageSync('posts_Collected', postsCollected)
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消收藏",
      duration: 1200,
      icon: "success"
    })
  },
  onShareTap:function(event){
      var itemList=[
        "分享到微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ];
      wx.showActionSheet({
        itemList:itemList,
        itemColor:"#405f80",
        success: function (res) {
          //res.cancel 用户是不是点击了取消按钮
          //res.tapIndex 数组元素的序号，从0开始
          wx.showModal({
            title: '用户' + itemList[res.tapIndex],
            content: '用户是否选择取消' + res.cancel + '现在无法实现分享功能',
          })
        }
      })
  },
  onMusicTap:function(event){
    var currentPostId=this.data.currentPostId;
    var postData=postsData.postList[currentPostId]
    var isPlayingMusic=this.data.isPlayingMusic;
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic:true
      })
    }
  }
})