<template>
	<div class="news">
		<div class='item_group'>
			<div class="item">
				<div  @click='goNewsDetail(item.id);'>		
					<div class="item_left">
							<img src="../../assets/list-default.png" width='100%' height="100%">
					</div>
        			<div class="item_right">
						<div class='name'>4343434</div>
						<div class='time'>4342342</div>
					</div>
				</div>
			</div>
			<div class="item">
				<div  @click='goNewsDetail(item.id);'>		
					<div class="item_left">
							<img src="../../assets/list-default.png" width='100%' height="100%">
					</div>
        			<div class="item_right">
						<div class='name'>4343434</div>
						<div class='time'>4342342</div>
					</div>
				</div>
			</div>
			<div class="item">
				<div  @click='goNewsDetail(item.id);'>		
					<div class="item_left">
							<img src="../../assets/list-default.png" width='100%' height="100%">
					</div>
        			<div class="item_right">
						<div class='name'>4343434</div>
						<div class='time'>4342342</div>
					</div>
				</div>
			</div>
			<div class="item">
				<div  @click='goNewsDetail(item.id);'>		
					<div class="item_left">
							<img src="../../assets/list-default.png" width='100%' height="100%">
					</div>
        			<div class="item_right">
						<div class='name'>4343434</div>
						<div class='time'>4342342</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import { Swipe, SwipeItem } from 'mint-ui';
	import { Loadmore } from 'mint-ui';
	import util  from '../../config/util';
	export default {
		name: "news",
	    mixins: [util],
		created() {
			document.title = "资讯";
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
