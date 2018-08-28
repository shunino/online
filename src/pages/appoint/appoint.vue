<template>
	<div class='appoint'>
		<div>
			<transition name="dialog">
				<div class="call-dialog contact" v-show="dialogShow"  style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,0.3);z-index: 10;" @click='closeDialog'>
					<div class="dialog-content">
						<div class="close-btn" @click="dialogShow = !dialogShow"><i class="icon-close"></i></div>
						<div class="dialog-data text-center" style="white-space: nowrap;display: flex;">
							<a v-if='currentItem.brokerMobile != null && currentItem.brokerMobile !="null" && currentItem.brokerMobile != "" '  v-bind:href="'tel:' + currentItem.brokerMobile"  style="flex: 1;" >
								<i class="icon-call-out"></i>
								<p>一键呼叫</p>
							</a>
							<a v-else  style="flex: 1;" @click='call'>
								<i class="icon-call-out"></i>
								<p>一键呼叫</p>
							</a>
							<a style="flex: 1;" @click="goPage('contact')">
								<i class="icon-call-in"></i>
								<p>请联系我</p>
							</a>
							<div class="clearfix"></div>
						</div>
					</div>
				</div>
			</transition>
		</div>
		<load-more :bottom-method="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" class="load-more">
			<div>
				<div v-for="(item,index) in appoint" class="appointment">
					<div class="left-part pull-left">
						<img v-if="item.brokerAvatar" v-bind:src="item.brokerAvatar|getImgUrl">
						<img v-else="" src="../../assets/default-avator.png">
						<div v-for="key in item.buildings" class="line">
							<div></div>
						</div>
					</div>
					<div class="right-part pull-right">
						<div class="appoint-header">
							<span class="">{{item.brokerName}}</span>
							<a @click="dialogvshow($event,item)" class="pull-right">联系Ta</a>
						</div>
						<div v-for="build in item.buildings" class="building"  @click="showdetail(item,build.synid)">
							<img v-if="build.listpicwechat" :src="build.listpicwechat|getImgUrl">
							<img v-else="" src="../../assets/list-default.png">
							<div class="pull-right build-info text-left">
								<div class="name">{{build.projname}}</div>
								<div class="addr">{{build.projectaddress}}</div>
								<div class="price">
									<span v-if='build.unitpriceshow !=null'>{{parseInt(build.unitpriceshow)}}元/㎡</span>
									<span v-else>暂无价格</span>
								</div>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
				</div>
				<div id="noData" class="text-center no-data" style="display: none;">暂无数据</div>
			</div>
		</load-more>
	</div>
</template>

<script>
import { Loadmore, Toast } from 'mint-ui';
import util  from '../../config/util';
export default {
	mixins: [util],
	data(){
		return {
			appoint: [],
			pageNo: 1,
			allLoaded:false,
			dialogShow: false,
			currentItem:{},
			currentBuild:{},
			appointList:[]

		}	
	},
	beforeRouteEnter(to,from,next){
		next(vm =>{
			vm.loadData();
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
	deactivated(){
	   this.$destroy(true)
	},
	filters: {
		getImgUrl(url) {
			return config.file_show_url + url;
		}
	},
	methods:{
		updataStatus(){
			document.title = '我的预约';
		},
		loadData(){
			let params = {
				pageNo: this.pageNo
			};
			var _this = this;
			$(".mint-loadmore-bottom .mint-loadmore-text").text("正在加载...");
			this.common.request.post('/myHome/reservationsByUserId', params).then(data => {
				if (data && data.userReservations) {
					if(data.userReservations.length == 0 && this.pageNo == 1){
						$(".mint-loadmore-bottom").hide();
				  	$('#noData').show();
				  }else{
				  	$.each(data.userReservations, (i, item) =>{
				  	  _this.appointList.push(item);
				  	});
				    this.buildData(_this.appointList);
				    $(".mint-loadmore-bottom").show();
				    $('#noData').hide();
				    if(data.total <= 10*this.pageNo){
				      this.allLoaded = true;
				      $(".mint-loadmore-bottom .mint-loadmore-text").text("无更多预约！");
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
			})
		},
		buildData(data) {
			let result = [];
			let resObj = {};
			$.each(data, (i, item) => {
				let broker = item.userReservationEntity;
				if(!resObj[broker.brokerId]) {
					resObj[broker.brokerId] = {};
					resObj[broker.brokerId].synId = broker.synid;
					resObj[broker.brokerId].brokerId = broker.brokerId;
					resObj[broker.brokerId].brokerName = broker.username;
					resObj[broker.brokerId].brokerAvatar = broker.photo;
					resObj[broker.brokerId].brokerMobile = broker.mobile;
					resObj[broker.brokerId].buildings = [];
				}
				resObj[broker.brokerId].buildings.push(item.estateBuilding);
			})
			for(var key in resObj) {
				result.push(resObj[key]);
			}
			this.appoint = result;
		},
		showdetail(item,synid){
			let scrolltop = sessionStorage.scrolltop ? sessionStorage.scrolltop : 0
			this.$router.push('/buildingdetail/building/' + item.buildings[0].projguid+'/'
				+scrolltop+'/'+synid);			
		},
		dialogvshow(event,broker) {
			event.stopPropagation();
			this.dialogShow = true;
			this.currentItem=broker;
			this.currentBuild=broker.buildings[0];
		},
		goPage(page){
			this.$router.push('/' + page + '/' + this.currentBuild.projguid + '/' + (this.currentItem.brokerId || '') + '/' + (this.currentBuild.projname || '') + '/' + (this.currentItem.synId || '')+ '/' + (this.currentBuild.isonline || '')
				+ '/' + (this.currentBuild.synid || ''));
		},
		// handleTopChange() {
		// 	this.allLoaded = false;
		// },
		handleBottomChange() {
			this.pageNo++;
			this.loadData(null, () => {
				this.$refs.loadmore.onBottomLoaded();
			});
		},
		call(){
			Toast({
			  message: '该经纪人暂无电话',
			  position:'top',
			  duration: 1000
			});
		},
		closeDialog(e){
			let _con = $('.dialog-content');   // 设置目标区域
			if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
				this.dialogShow = false;
			}
		},
	},
	components: {
		'load-more': Loadmore
	}
}
</script>

<style>
@import './appoint.css';
</style>