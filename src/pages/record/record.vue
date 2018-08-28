<template>
	<div class='record'>
		<load-more :bottom-method="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" class="load-more">
			<build-list v-bind:data="record" v-bind:btns="listBtns"></build-list>
		</load-more>
	</div>
</template>

<script>
import { Loadmore } from 'mint-ui';
import BuildList from '../../components/build-list/build-list.vue';
import util  from '../../config/util';
export default{
	mixins: [util],
	data(){
		return {
			record: [],
			listBtns: ['contact', 'appoint'],
			pageNo:1,
			allLoaded: false
		}
	},
	beforeRouteEnter(to,from,next){
		next(vm =>{
			vm.loadData();
			vm.updataStatus();
		})
	},
	mounted() {
		let mobile = localStorage.getItem("tel");
		let userAgent = this.myBrowser();
		let cookie = this.getCookie('UM_distinctid');
		let ip = localStorage.getItem("ip");
		let record_time = new Date();
		record_time = this.formatTime(record_time);     localStorage.enter_time = record_time;
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
	methods:{
		updataStatus(){
			document.title = '浏览记录';
		},
		loadData(){
			let params = {
				pageNo: this.pageNo,
				type:1
			};
			$(".mint-loadmore-bottom .mint-loadmore-text").text("加载中...");
			this.common.request.post('/myHome/searchHistory', params).then(data => {
				if (data && data.estateBuilding) {
          if(data.estateBuilding.length == 0 && params.pageNo == 1){
        		$(".mint-loadmore-bottom").hide();
          	$('#noData').show();
          }else{
       			let cDate = data.estateBuilding;
       			$.each(cDate, (i, item) => {
       				this.record.push(item);
       			});
            $(".mint-loadmore-bottom").show();
            $('#noData').hide();
            if(data.total <= 10*params.pageNo){
              this.allLoaded = true;
              $(".mint-loadmore-bottom .mint-loadmore-text").text("无更多浏览记录！");
              $('.mint-loadmore-spinner').hide();
              $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
            }else{
              this.allLoaded = false;
              $(".mint-loadmore-bottom .mint-loadmore-text").text("上拉加载更多");
            }  
          }
		    }
			})	
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
	},
	components: {
		'load-more': Loadmore,
		'build-list':BuildList
	}
}	
</script>

<style>
 @import './record.css';
</style>