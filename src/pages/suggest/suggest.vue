<template>
   <div class="suggest">
	   <textarea class="suggest-content" placeholder="请留下您的宝贵意见，我们将尽快解决。" rows="8" v-model="advice"></textarea>
	  <div class="inputbox title">
			<div class="col-xs-5">
				<img src="../../assets/orderhouse/tel.png" />
				电话
			</div>
			<input class="col-xs-7 text-right"  v-model="tel"></input>
		</div>
		<a class='submit_btn' @click="submit" href="javascript:void(0)" type="button">提交</a>
   </div>
</template>

<script>
	import { Header, MessageBox, Button ,Toast} from 'mint-ui';
	import util  from '../../config/util';
	export default {
		name:"process",
		mixins: [util],
		data() {
			return {
				tel:"",
				advice:""
			}
		},
		created(){
			document.title="意见反馈";
			this.tel=localStorage.tel;
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
			submit(){
				if(this.tel=="" || !(/^1[1-9]\d{9}$/).test(this.tel)){
					Toast('请填写正确的手机号');
					return;
				}
				var param={
					 "tel": this.tel,
					 "title": "意见反馈",
					 "content":this.advice
				};
				this.common.request.post("/myHome/feedback",param).then(data=>{
					Toast('您的意见我们会积极采纳,感谢您的参与!');
					this.$router.go(-1);
				});
			}
		},
		components: {
		  "mt-header":Header,
		  "mt-button":Button
		}
	}
</script>

<style scoped>
	@import "./suggest.css";
</style>