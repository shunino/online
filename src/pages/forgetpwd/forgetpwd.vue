<template>
	<div class="process">
		<div v-if="pageindex==1">
			<h3>重新设置密码</h3>
			<h5>保证密码为6-11位以上数字与字母的结合</h5>
			<div class="inputbox-f"  style="margin-top: .5rem;">
				<input class="col-xs-8" type="number" @focus="inputFocus(true)" @focusout="inputFocus(false)" placeholder="请输入手机号" v-model="tel"/>
				<span class="sendVcode-f" @click="sendMsg">获取验证码</span>
			</div>
			<div class="inputbox-f" style="border-top: none;">
				<input class="col-xs-12" type="number" placeholder="请输入验证码" @focus="inputFocus(true)" @focusout="inputFocus(false)" v-model="vcode"/>
			</div>
			<button style="width: 70%;margin-left: 15%;" type="button" class="btn btn-success" @click="NextStep">下一步</button>
		</div>
		<div v-if="pageindex==2">
			<h3>重新设置密码</h3>
			<h5>建议密码为6-11位以上数字与字母的结合</h5>
			<div class="inputbox-f"  style="margin-top: .5rem;">
				<input class="col-xs-12" type="password" placeholder="请输入密码" @focus="inputFocus(true)" @focusout="inputFocus(false)" v-model="pwd"/>
			</div>
			<div class="inputbox-f" style="border-top: none;">
				<input class="col-xs-12" type="password" placeholder="请再次输入密码" @focus="inputFocus(true)" @focusout="inputFocus(false)" v-model="repwd"/>
			</div>
			<button type="button" style="width: 70%;margin-left: 15%;" class="btn btn-success" @click="submit">完成</button>

		</div>
		<NavProcess class="process_navbar" ref="child1" splitlength="2"></NavProcess>
	</div>

</template>

<script>
	import navprocess from '../../components/navprocess/navprocess.vue';
	import { Toast } from 'mint-ui';
    import util  from '../../config/util'; 
	var interval;
	export default {
		name:"process",
	    mixins: [util],
		data() {
			return {
				pageindex:1,
				tel:"",
				vcode:"",
				pwd:"",
				repwd:"",
				time:60
			}
		},
        created(){
        	 $(".menu").hide();
        	document.title="忘记密码";
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

			clearInterval(interval);
			next(true);
		},
		deactivated(){
		    this.$destroy(true)
		},
		methods:{
			inputFocus(status) {
				if(status) {
					$('.process_navbar').hide();
				} else {
					$('.process_navbar').show();
				}
			},
			sendMsg(){
				if(this.tel=="" || !(/^1[1-9]\d{9}$/).test(this.tel)){
					Toast('请填写正确的手机号');
					return;
				}
				if(this.time==60){
					this.common.request.post("/wechat/getSMSCode",{"phone":this.tel,"type":1}).then(data=>{
						Toast("发送验证码成功！");
						_czc.push(['_trackEvent', '找回密码','获取验证码',this.tel,'1']);
					},err =>{
						_czc.push(['_trackEvent', '找回密码','获取验证码',this.tel,'0']);
					});
					interval=setInterval(()=>{
         	  $(".sendVcode").text((this.time--)+"s后重试");
         	  if(this.time==0){
         	  	 this.time=60;
         	  	 clearInterval(interval);
         	  	 $(".sendVcode").text("获取验证码");
         	  }
	        },1000);
				}
				
			},
			CheckMsg(){
				this.common.request.post("/wechat/checkSMSCode",{"phone":this.tel,"code":this.vcode,"type":1}).then(data=>{
					 this.pageindex=2;
			     this.$refs.child1.setProcess(2);
				});
			},
			NextStep:function(){
				if(this.tel=="" || !(/^1[1-9]\d{9}$/).test(this.tel)){
					Toast('请填写正确的手机号');
					return;
				}
				if(this.vcode==""){
					Toast('请输入验证码');
					return;
				}
				this.CheckMsg();

			},
			created(){
				document.title="注册";
			},
			submit(){
				if(this.pwd==""){
					Toast("请输入新密码");
					return;
				}
				
				if(this.pwd.length<6 || this.pwd.length>11){
					Toast("请输入6-11位数的密码");
					return;
				}

				if(this.repwd==""){
					Toast("请再次输入密码");
					return;
				}

				if(this.repwd!=this.pwd){
					Toast("请确保两次密码输入一致");
					return;
				}
				var $vue=this;
				this.common.request.post("/wechat/modifyPassWord",{"phone":this.tel,"password":this.pwd}).then(data=>{
					Toast("修改密码成功！");
					_czc.push(['_trackEvent', '找回密码','完成',this.tel,'1']);
					setTimeout(function(){
						$vue.$router.push("/login");
					},1000);
				},err =>{
					_czc.push(['_trackEvent', '找回密码','完成',this.tel,'0']);
				});
			}
		},
		components: {
		  "NavProcess":navprocess
		}
	}
</script>

<style scoped>
  @import "./forgetpwd.css";
</style>
