const jpress = require('../../utils/jpress.js')
const app = getApp();

Page({

  data: {
    article : null,
    relatedArticles:[],
    comments:[],
    commentContent:'',

    copyright: app.globalData.copyright

  },

  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: app.globalData.appName,
    })

    //加载文章
    jpress.getArticle(options.id)
    .then(data=>{
      this.setData({
        article:data.article
      })

      //加载评论内容
      this.loadComment(1);

      //加载相关文章
      this.loadRelatedArticles();
    })

  },


  postComment:function(e){

    if (jpress.isLogined() == false) {
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }

    var content = e.detail.value.content;
    jpress.doPostComment({
      articleId:this.data.article.id,
    },
    content
    )
    .then(data=>{
      this.data.comments.unshift(data.comment);
      this.setData({
        commentContent: '',
        comments: this.data.comments
      })
    })

  },


  loadComment:function(page){

    jpress.getCommentPage({
      articleId: this.data.article.id,
      page: page
    })
    .then(data=>{
      this.setData({
        comments:data.page.list
      })
    })
  },

  loadRelatedArticles : function(){

    jpress.getArticleRelevantList({
      articleId: this.data.article.id,
      count: 3
    })
      .then(data => {
        if(data.articles){
          this.setData({
            relatedArticles: data.articles
          })
        }
      })
  }

 
})