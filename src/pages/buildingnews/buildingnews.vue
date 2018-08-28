<template>
  <load-more :bottom-method="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" class="load-more">
    <div class="build-news">
      <div class="container">
        <div v-for="(n,index) in news" class="news-item" @click="goDetail(n.id)">
          <div class="news-summary" v-html='n.title'></div>
          <div class="news-date">{{n.updateDate | formatNewsDate}} <span class='now' v-if='index == 0'>最新</span></div>
          <div class='news-detail' v-html='n.summary'></div> 
        </div>
        <div v-if="news.length == 0" class="no-data text-center">暂无数据</div>
      </div>
    </div>
  </load-more>
</template>
<script>
import { Loadmore, Toast } from 'mint-ui';
import util  from '../../config/util';
export default {
	mixins: [util],
  data(){
    return {
      news: [],
      allLoaded:false,
      params:{
        pageNo:1,
        buildingId:this.$route.params.synId
      }
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm =>{
      vm.getNews();
      vm.updataStatus();
    })
  },
  created(){
  },
  mounted() {
    let mobile = localStorage.getItem("tel");
		let userAgent = this.myBrowser();
		let cookie = this.getCookie('UM_distinctid');
		let ip = localStorage.getItem("ip");
		let record_time = new Date();
    record_time = this.formatTime(record_time);   
      localStorage.enter_time = record_time;
		let os_type = this.osType();
		let present_url = document.location.href;
		let version = '3.0.0';

		this.common.request.logPost('/addLog', {
			logtype: 'mobile_visit',
			user_id: mobile || null,
			user_agent: userAgent,
			cookie: cookie,
			ip_addr: ip,
			os_type: os_type,
			present_url: present_url,
			record_time: record_time,
			version: version,
		}).then(result => {
			//   
		});   
  },
  beforeRouteLeave: function(to, from, next) {
		  let mobile = localStorage.getItem("tel");
      let userAgent = this.myBrowser();
      let cookie = this.getCookie('UM_distinctid');
      let ip = localStorage.getItem("ip");
      let os_type = this.osType();
      let enter_time = localStorage.getItem("enter_time");
      let leave_time = new Date();
      leave_time = this.formatTime(leave_time);
      let enter_url = window.location.host + to.path;
      let leave_url = window.location.href;
      if (leave_url.indexOf("?") > 0) {
        leave_url = leave_url.substr(0, leave_url.indexOf("?"));
      }
      let version = '3.0.0';

      this.common.request.logPost('/addLog', {
        logtype: 'mobile_visit_time',
        user_id: mobile || null,
        user_agent: userAgent,
        cookie: cookie,
        ip_addr: ip,
        os_type: os_type,
        enter_url: enter_url,
        leave_url: leave_url,
        enter_time: enter_time,
        leave_time: leave_time,
        version: version,
      }).then(result => {
      //   
      }); 
			next();
	},
  watch:{
    '$route':['resetParams']
  },
  methods: {
    resetParams(){
      this.params.pageNo = 1;
      this.news = [];
      this.params.buildingId = this.$route.params.synId;
    },
    updataStatus(){
      document.title = "楼盘动态列表";
      $('.menu').hide();
    },
    goDetail(id){
      this.$router.push('/buildingnewsdetail/' + id)
    },
    getNews(){
      var _this =this;
      $(".mint-loadmore-bottom .mint-loadmore-text").text("正在加载...");
      console.log(this.params.pageNo);
      this.common.request.post('/estate/estateNewsList', this.params).then(data => {
        if (data && data.list) {
          if(data.list.length == 0 && this.params.pageNo == 1){
            $(".mint-loadmore-bottom").hide();
            $('#noData').show();
          }else{
            $.each(data.list, (i, item) =>{
              _this.news.push(item);
            });
            $(".mint-loadmore-bottom").show();
            $('#noData').hide();
            if(data.count <= 10*this.params.pageNo){
              this.allLoaded = true;
              $(".mint-loadmore-bottom .mint-loadmore-text").text("无更多动态！");
              $('.mint-loadmore-spinner').hide();
              $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
            }else{
              this.allLoaded = false;
              $(".mint-loadmore-bottom .mint-loadmore-text").text("上拉加载更多");
            }             
          }   
        }else{
          $('#noData').show();
        }
      });
    },
    handleBottomChange() {
      this.params.pageNo++;
      this.getNews(null, () => {
        this.$refs.loadmore.onBottomLoaded();
      });
    },
  },
  filters: {
    formatNewsDate(date){
      return date ? date.split(' ')[0].replace('\-\g', '.') : '';
    }
  },
  components: {
    'load-more': Loadmore
  }
}
</script>

<style scoped>
 @import './buildingnews.css';
</style>
