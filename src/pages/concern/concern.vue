<template>
	<div class="concern">
		<load-more :bottom-method="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" class="load-more">
			<build-list v-bind:data="concern" v-bind:btns="listBtns" @refresh='spliceList'></build-list>
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
			concern: [],
			listBtns: ['contact', 'appoint'],
			pageNo: 1,
			allLoaded: false
		}
	},
	beforeRouteEnter(to,from,next){
		next(vm =>{
			vm.updateStaus();
			if(!(window.location.hash.split("?")[1])){
				vm.loadData();
			}
		})
	},
	deactivated(){
	   this.$destroy(true)
	},
	created(){
		if(window.location.hash.split("?")[1]){
		  this.checkUser();
		  $('#main').css('padding-bottom',0);
		}
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
	methods:{
		updateStaus(){
			document.title = '我的收藏';
		},
		spliceList(index){
			this.concern.splice(index,1);
			if(this.concern.length == 0){
				$(".mint-loadmore-bottom").hide();
		  	$('#noData').show();
			}
		},
		checkUser(){
		  let params = {
		    "onClient": this.getQueryString('onClient'),
		    "timestamp": this.getQueryString('timestamp'),
		    "source": this.getQueryString('source'),
		    "desStr": this.getQueryString('desStr'),
		    "menu": this.getQueryString('isMenu')
		  }
		 this.common.request.post('/config/checkUser', params).then(data => {
		    localStorage.cityid = data.cityId;
		    localStorage.token = data.token;
		    this.loadData();
		    this.common.request.post('/myHome/getMyHomeInfo').then(info => {
		      // console.log(info)
		      localStorage.headimg = info.userInfo.head;
		      localStorage.tel = info.userInfo.tel;
		      localStorage.userId = info.userInfo.id;
		      localStorage.nickName = info.userInfo.nickName;
		      // console.log(data);
		    })
		    this.common.request.post('/home/cityList').then(city => {
		      $.each(city,function (index,item) {
		        if(data.cityId == item.id){
		          localStorage.cityname = item.areaName;
		          this.city = item.areaName;
		          $('.choose_city_btn').text(item.areaName);
		        }
		      })
		    });    
		    
		 })
		},
		getQueryString(name){
		   let after = window.location.hash.split("?")[1];
		   if(after){
		    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		    let r = after.match(reg);
		    if(r != null){
		      return  decodeURIComponent(r[2]);
		    }else{
		      return null;
		    }
		   }
		},
		loadData(){
			let params = {
				pageNo: this.pageNo
			};
			$(".mint-loadmore-bottom .mint-loadmore-text").text("加载中...");
			this.common.request.post('/myHome/attentionList', params).then(data => {
				if (data && data.attentionAndBuilding) {
          if(data.attentionAndBuilding.length == 0 && params.pageNo == 1){
          		$(".mint-loadmore-bottom").hide();
            	$('#noData').show();
          }else{
              $(".mint-loadmore-bottom").show();
              $('#noData').hide();
              let cDate = data.attentionAndBuilding;
              $.each(cDate, (i, item) => {
              	this.concern.push(item);
              });
              if(data.total <= 10*params.pageNo){
	              this.allLoaded = true;
	              $(".mint-loadmore-bottom .mint-loadmore-text").text("无更多收藏！");
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
		handleBottomChange() {
			this.pageNo++;
			this.loadData(null, () => {
				this.$refs.loadmore.onBottomLoaded();
			});
		},
	},
	components: {
		'build-list': BuildList,
		'load-more': Loadmore
	}
}
</script>

<style>
	 @import './concern.css';
</style>