webpackJsonp([28],{134:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){var i=o(0),n=(o.n(i),o(21));e.default={mixins:[n.a],data:function(){return{news:[],allLoaded:!1,params:{pageNo:1,buildingId:this.$route.params.synId}}},beforeRouteEnter:function(t,e,o){o(function(t){t.getNews(),t.updataStatus()})},created:function(){},mounted:function(){var t=localStorage.getItem("tel"),e=this.myBrowser(),o=this.getCookie("UM_distinctid"),i=localStorage.getItem("ip"),n=new Date;n=this.formatTime(n),localStorage.enter_time=n;var s=this.osType(),a=document.location.href;this.common.request.logPost("/addLog",{logtype:"mobile_visit",user_id:t||null,user_agent:e,cookie:o,ip_addr:i,os_type:s,present_url:a,record_time:n,version:"3.0.0"}).then(function(t){})},beforeRouteLeave:function(t,e,o){var i=localStorage.getItem("tel"),n=this.myBrowser(),s=this.getCookie("UM_distinctid"),a=localStorage.getItem("ip"),r=this.osType(),l=localStorage.getItem("enter_time"),d=new Date;d=this.formatTime(d);var m=window.location.host+t.path,u=window.location.href;u.indexOf("?")>0&&(u=u.substr(0,u.indexOf("?")));this.common.request.logPost("/addLog",{logtype:"mobile_visit_time",user_id:i||null,user_agent:n,cookie:s,ip_addr:a,os_type:r,enter_url:m,leave_url:u,enter_time:l,leave_time:d,version:"3.0.0"}).then(function(t){}),o()},watch:{$route:["resetParams"]},methods:{resetParams:function(){this.params.pageNo=1,this.news=[],this.params.buildingId=this.$route.params.synId},updataStatus:function(){document.title="楼盘动态列表",t(".menu").hide()},goDetail:function(t){this.$router.push("/buildingnewsdetail/"+t)},getNews:function(){var e=this,o=this;t(".mint-loadmore-bottom .mint-loadmore-text").text("正在加载..."),console.log(this.params.pageNo),this.common.request.post("/estate/estateNewsList",this.params).then(function(i){i&&i.list?0==i.list.length&&1==e.params.pageNo?(t(".mint-loadmore-bottom").hide(),t("#noData").show()):(t.each(i.list,function(t,e){o.news.push(e)}),t(".mint-loadmore-bottom").show(),t("#noData").hide(),i.count<=10*e.params.pageNo?(e.allLoaded=!0,t(".mint-loadmore-bottom .mint-loadmore-text").text("无更多动态！"),t(".mint-loadmore-spinner").hide(),t(".mint-loadmore-content").css("transform","translate3d(0px, 0px, 0px)")):(e.allLoaded=!1,t(".mint-loadmore-bottom .mint-loadmore-text").text("上拉加载更多"))):t("#noData").show()})},handleBottomChange:function(){var t=this;this.params.pageNo++,this.getNews(null,function(){t.$refs.loadmore.onBottomLoaded()})}},filters:{formatNewsDate:function(t){return t?t.split(" ")[0].replace("-g","."):""}},components:{"load-more":i.Loadmore}}}.call(e,o(3))},192:function(t,e,o){e=t.exports=o(55)(!1),e.i(o(201),""),e.push([t.i,"",""])},201:function(t,e,o){e=t.exports=o(55)(!1),e.push([t.i,".build-news{height:100%}.mint-loadmore{padding-bottom:.6rem}.build-news .news-item{border-bottom:1px solid #f7f7f7;font-size:.14rem;padding-top:.33rem;padding-bottom:.2rem}.build-news .news-item:last-child{border-bottom:0}.build-news .news-summary{color:#000;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.17rem}.build-news .news-date{color:#888;font-size:.11rem;padding:.15rem 0 .2rem}.build-news .news-date .now{border:1px solid #fa8f0d;color:#fa8f0d;font-size:.1rem;border-radius:2px;padding:0 .05rem}.build-news .news-detail{font-size:.14rem;color:#666}.build-news .news-detail img{width:100%!important}",""])},256:function(t,e,o){var i=o(192);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o(56)("1dbb34ba",i,!0)},350:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("load-more",{ref:"loadmore",staticClass:"load-more",attrs:{"bottom-method":t.handleBottomChange,"bottom-all-loaded":t.allLoaded,"auto-fill":!1}},[o("div",{staticClass:"build-news"},[o("div",{staticClass:"container"},[t._l(t.news,function(e,i){return o("div",{staticClass:"news-item",on:{click:function(o){t.goDetail(e.id)}}},[o("div",{staticClass:"news-summary",domProps:{innerHTML:t._s(e.title)}}),t._v(" "),o("div",{staticClass:"news-date"},[t._v(t._s(t._f("formatNewsDate")(e.updateDate))+" "),0==i?o("span",{staticClass:"now"},[t._v("最新")]):t._e()]),t._v(" "),o("div",{staticClass:"news-detail",domProps:{innerHTML:t._s(e.summary)}})])}),t._v(" "),0==t.news.length?o("div",{staticClass:"no-data text-center"},[t._v("暂无数据")]):t._e()],2)])])},staticRenderFns:[]}},64:function(t,e,o){function i(t){o(256)}var n=o(7)(o(134),o(350),i,"data-v-d9070d42",null);t.exports=n.exports}});