<template>
	<div class="news">
		<load-more :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill='false' ref="loadmore">
			<!-- <div class='banner' v-if='bannerList.length > 0'>
				<mt-swipe :auto="4000" :show-indicators="false">
				  <mt-swipe-item v-for="item in bannerList">
				  	<div class='banner-item'> 
					  	<img v-if="item.imageWechat !=null && item.imageWechat != ''" :src="item.imageWechat | imgUrl" width="100%" height="100%" @click='goNewsDetail(item.id)'>
					  	<img v-else src="../../assets/banner.png" width="100%" height="100%" @click='goNewsDetail(item.id)'>
					  	<div class='banner-title'>
					  		<div>{{item.title}}</div>
					  		<div v-if='item.updateDate'><i class="icon-clock"></i> {{item.updateDate.substring(0,10)}}</div>
					  	</div>
				  	</div>
				  </mt-swipe-item>
				</mt-swipe>
			</div> -->
			<div style="padding:0 0.2rem;">
				<div class='item_group'>
					<div v-for="item in list" class='item' @click='goNewsDetail(item.id);'>
						
						<div class="item_right">
							<div class='name' v-html='item.title'></div>
							<!-- <div class='summary' v-html='item.summary'></div> -->
							<div class='time'>
                <!-- <img src="../../assets/icon-clock.png"> -->
                {{item.updateDate.substring(0,10)}}
                <!-- <span class='author'>
                  <img src="../../assets/news.png" height="12" width="12" alt="">&nbsp;
                  <span v-if='item.author'>{{item.author}}</span>
                  <span v-else>绿城新闻</span>
                </span> -->
              </div>
						</div>
            <div class="item_left">
							<img v-if='item.image != null && item.image !=""' :src="item.image | imgUrl" width='100%' height="100%">
							<img v-else src="../../assets/list-default.png" width='100%' height="100%">
						</div>
					</div>
				</div>
				<div id="noData" class="text-center no-data" style="display: none;">暂无数据!</div>
			</div>
		</load-more>
	</div>
</template>

<script>
	// import { Swipe, SwipeItem } from 'mint-ui';
	import { Loadmore } from 'mint-ui';
	import util  from '../../config/util';
	export default {
		name: "news",
	    mixins: [util],
		data() {
			return {
				allLoaded: false,
				list: [],
				params:{
					"cityId": localStorage.cityid,
					"showType":2,
					"pageNo":1
				},
				// bannerList:[]
			}
		},
		filters: {
			imgUrl(url) {
				return config.file_show_url + url;
			}
		},
		created() {
			document.title = "资讯";
		},
		mounted(){
			if($('#main').hasClass('isMenu')){
			    $('#main').css('padding-bottom',0);
			}
	
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
		beforeRouteEnter(to,from,next){
			if(from.path.includes('personal')){
				next(vm =>{
					vm.updateTitle();
				})
			}
			next(vm =>{
				vm.getList();
				// vm.getNewsBanner();
				vm.updateParems();
			})
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
			'$route':['updateParems']
		},
		methods: {
			updateTitle(){
				document.title = "资讯";
			},
			updateParems(){
				this.params.cityId = localStorage.cityid;
				this.list = [];
				this.params.pageNo = 1;
				$('.menu').show();
			},
			// getNewsBanner(){
			// 	if(localStorage.cityid){
			// 		this.common.request.post('/home/getNewsBanner', {cityId:this.params.cityId}).then(data => {
			// 			 this.bannerList = data;
			// 		})
			// 	}
			// },
			getList() {
				var _this = this;
				if(localStorage.cityid){
					$(".mint-loadmore-bottom .mint-loadmore-text").text("加载中...");
					this.common.request.post('/home/newsList', this.params).then(data => {
				          if (data && data.admNews) {
				          	if(data.admNews.length == 0 && this.params.pageNo == 1){
				          		$(".mint-loadmore-bottom").hide();
				            	$('#noData').show();
				           	}else{
			                $(".mint-loadmore-bottom").show();
			                $('#noData').hide();
			                $.each(data.admNews, (i, item) =>{
			                  _this.list.push(item);
			                });
			                if(data.total <= 10*this.params.pageNo){
			                	// _this.list = data.admNews;
					              _this.allLoaded = true;
					              $('.mint-loadmore-spinner').hide();
					              $(".mint-loadmore-bottom .mint-loadmore-text").text("无更多资讯！");
					              $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
					            }else{
					              _this.allLoaded = false;
					              $('.mint-loadmore-spinner').hide();
					              $(".mint-loadmore-bottom .mint-loadmore-text").text("上拉加载更多");
					              // $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
					            }            	
				            }
				          }
					});
				}
			},
			goNewsDetail(newsId) {
				this.$router.push("/newsDetail/" + newsId);
			},
			loadBottom(){
				this.params.pageNo ++;
        this.getList(null, ()=>{
          this.$refs.loadmore.onBottomLoaded();
        });
			}
		},
		components: {
			'load-more': Loadmore,
			// 'mt-swipe':Swipe,
			// 'mt-swipe-item':SwipeItem
		}
	}
</script>

<style scoped>
	@import "./information.css";
</style>
