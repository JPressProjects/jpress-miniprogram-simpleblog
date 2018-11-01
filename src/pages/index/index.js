const jpress = require('../../utils/jpress.js')
const app = getApp();


Page({

 
  data: {

    articles:{},
    categories:null,

    slides: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000, 

    listCategoryId : "",
    listPageNumber : 1,

    copyright: app.globalData.copyright
   
  },


 

  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: app.globalData.appName,
    })
    

    jpress.getSlides()
      .then(data => {
        if (data.value) {
          var lines = data.value.split("\n");
          for (var i = 0; i < lines.length; i++){
              var imgAndPage = lines[i].split('|');
              var  x = {
                src : imgAndPage[0],
                page: imgAndPage[1]
              }
              this.data.slides.push(x);
          }
          this.setData({
            slides:this.data.slides
          })
        }
      })

    jpress.getArticleCategories("category")
    .then(data=>{
      this.setData({
        categories: data.categories,
        listCategoryId: data.categories[0].id,
      })
    })

    this.loadFirstList();
  },

  categoryClick: function(event)  {
    var id = event.target.dataset.id ;

    this.setData({
      listCategoryId : id
    })

    this.loadFirstList();
  },


  loadFirstList: function (data) {
    
    jpress.getArticlePage({
      categoryId: this.data.listCategoryId,
      page: this.data.listPageNumber,
    })
    .then(data=>{
      this.setData({
        articles:data.page.list
      })
    })
  },

  
})