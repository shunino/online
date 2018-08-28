	<template>
	<div class='activitydetail'>
		<h4 class='title' v-html='detail.doingsName'></h4>
		<div class='time' v-if='detail.updateDate'><i class='icon-clock'></i>&nbsp;&nbsp;{{detail.updateDate.substring(0,10)}}</div>
		<div class='detail' v-html='detail.newdesc'></div>
	</div>
</template>

<script>
import util  from '../../config/util';
export default{
	mixins: [util],
	data(){
		return {
			params:{
				pageNo:1,
				doingsId:this.$route.params.id
			},
			detail:{}
		}
	},
	beforeRouteEnter(to,from,next){
		next(vm =>{
			vm.loadData();
			vm.updataParam();
		})
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
	methods:{
		updataParam(){
			document.title = "活动详情";
			this.params.doingsId = this.$route.params.id;
			$('.menu').hide();
		},
		loadData(){
			this.common.request.post('/home/getDoingsContent', this.params).then(data => {
				data.newdesc = $.parseHTML(data.content)[0].data;
				this.detail = data ;
			});
		}
	}
}
</script>

<style>
@import './activitydetail.css';
</style>