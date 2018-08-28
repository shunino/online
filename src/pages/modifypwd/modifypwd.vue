<template>
	 <div class="modifypwd">
	 	 <div class="inputbox-m">
			<input class="col-xs-12" type="password" placeholder="请输入原密码" v-model="oldpwd"/>
		</div>
	 	 <div class="inputbox-m">
			<input class="col-xs-12" type="password" placeholder="请输入密码" v-model="pwd"/>
		</div>
		<div class="inputbox-m" style="border-top: none;">
			<input class="col-xs-12" type="password" placeholder="请再次输入密码" v-model="repwd"/>
		</div>
		<button type="button" class="btn btn-success col-xs-8 col-xs-offset-2" @click="submit">完成</button>
	 </div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import util  from '../../config/util';
	 export default{

	    mixins: [util],
	 	data(){
	 		return {
	 			oldpwd:"",
	 			pwd:"",
	 			repwd:""
	 		}
	 	},
	 	created(){
	 		 $(".menu").hide();
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
	 	methods:{
	 		submit(){
	 			if(this.oldpwd==""){
	 				Toast("请输入原密码");
	 				return;
	 			}
	 			if(this.pwd==""){
	 				Toast("请输入新密码");
	 				return;
	 			}
	 			if(this.repwd==""){
	 				Toast("请再次输入密码");
	 				return;
	 			}
	 			if(this.pwd.length<6 || this.pwd.length>11 ){
	 				Toast("请输入有效位数的密码");
	 				return;
	 			}
	 			if(this.repwd.length<6 || this.repwd.length>11 ){
	 				Toast("请输入有效位数的密码");
	 				return;
	 			}
	 			var $vue=this;
	 			var param={
				  "id": localStorage.userId,
				  "oldPassword": this.oldpwd,
				  "newPassword": this.repwd
				};
	 			this.common.request.post("/myHome/updatePassWord",param).then(data=>{
					Toast("修改密码成功！");
					_czc.push(['_trackEvent', '改密码','完成',localStorage.tel,'1']);
					setTimeout(function(){
						$vue.$router.go(-1);
					},1000);
				},err =>{
					_czc.push(['_trackEvent', '改密码','完成',localStorage.tel,'0']);
				});
	 		}
	 	}
	 }
</script>

<style scoped>
	@import "./modifypwd.css";
</style>