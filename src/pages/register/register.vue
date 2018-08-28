<template>
	<div class="process">
		<div v-if="pageindex==1">
			<h3>输入手机号码</h3>
			<h5>注册即代表已阅读并同意<span style="color: #00B96D;">《用户服务协议》</span></h5>
			<div class="inputbox" style="margin-top: .5rem;">
				<p class="col-xs-4">+86</p>
				<input class="col-xs-8" type="number" @focus="inputFocus(true)" @focusout="inputFocus(false)" placeholder="请输入手机号"  v-model="tel"/>
			</div>
			<button type="button" style="width: 80%;margin-left: 10%;"  class="btn btn-success"  @click="sendMsg">获取验证码</button>
		</div>
		<div v-if="pageindex==2">
			<h3>输入短信验证</h3>
			<h5>请输入手机短信收到的6位验证码</h5>
			<input class="vcode" v-model="vcode" @focus="inputFocus(true)" @focusout="inputFocus(false)" @keyup="yzminput" />
			<p class="resend" @click="sendMsg">重新获取</p>
		</div>
		<div v-if="pageindex==3">
			<h3>设置密码</h3>
			<h5>建议密码为6-11位以上数字与字母的结合</h5>
			<div class="inputbox" style="margin-top: .5rem;">
				<input class="col-xs-12" type="password" placeholder="请输入密码" @focus="inputFocus(true)" @focusout="inputFocus(false)" v-model="pwd"/>
			</div>
			<div class="inputbox" style="border-top: none;">
				<input class="col-xs-12" type="password" placeholder="请再次输入密码" @focus="inputFocus(true)" @focusout="inputFocus(false)" v-model="repwd"/>
			</div>
			<button type="button" style="width: 80%;margin-left: 10%;" class="btn btn-success" @click="submit">完成</button>

		</div>
		<a class="loginbtn2" href="#/login">已有账号,现在去登录</a>
		<NavProcess class="process_navbar" ref="child1" splitlength="3"></NavProcess>
	</div>

</template>

<script>
	import navprocess from '../../components/navprocess/navprocess.vue';
	import { Toast } from 'mint-ui';
	import util  from '../../config/util';
	var interval;
	export default {
		name: "process",
		mixins: [util],
		data() {
			return {
				pageindex: 1,
				vcode: "",
				tel:"",
				pwd:"",
				repwd:"",
				time:60
			}
		},
		deactivated(){
		    this.$destroy(true)
		},
        created(){
        	 $(".menu").hide();
        	document.title="注册登录";
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

			clearInterval(interval);
			this.time=60;
			next(true);
		},
		methods: {
			inputFocus(status) {
				if(status) {
					$('.process_navbar').hide();
				} else {
					$('.process_navbar').show();
				}
			},
			sendMsg(){
				if(this.tel=="" || !/^1[1-9]\d{9}$/.test(this.tel)){
					Toast('请填写正确的手机号');
					return;
				}
				let _this=this;
				if(this.time==60){
					this.common.request.post("/wechat/getSMSCode",{"phone":this.tel,"type":0}).then(data=>{
						Toast("发送验证码成功！");
						if(this.pageindex==1){
							
							this.pageindex = 2;
					        this.$refs.child1.setProcess(2);
						}
						interval=setInterval(()=>{
           	  $(".resend").text((_this.time--)+"s后重试");
           	  if(_this.time==0){
           	  	 _this.time=60;
           	  	 clearInterval(interval);
           	  	 $(".resend").text("重新获取");
           	  }
            },1000);
						_czc.push(['_trackEvent', '新用户注册','获取验证码',_this.tel,'1']);
					},err =>{
						_czc.push(['_trackEvent', '新用户注册','获取验证码',_this.tel,'0']);
					});
				}
				
			},
			
			CheckMsg(){
				this.common.request.post("/wechat/checkSMSCode",{"phone":this.tel,"code":this.vcode,"type":0}).then(data=>{

					this.pageindex = 3;
					this.$refs.child1.setProcess(3);
				});
			},

			yzminput: function() {
				if(this.vcode.length > 5) {
					this.CheckMsg();

				}
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
				var _this=this;
				this.common.request.post("/wechat/register",{"phone":this.tel,"password":this.pwd,"channelId":1}).then(data=>{
			    localStorage.headimg=data.head;
					localStorage.tel=data.tel;
					localStorage.userId=data.id;
					this.common.request.setToken(data.token);
					localStorage.nickName=data.nickName;
	        Toast("注册成功!");
          setTimeout(function(){
            _this.$router.push("/home");
          },2000);
		      _czc.push(['_trackEvent', '新用户注册','完成',_this.tel,'1']);    
				},err =>{
					_czc.push(['_trackEvent', '新用户注册','完成',_this.tel,'0']); 
				});
			}
		},
		components: {
			"NavProcess": navprocess
		}
	}
</script>

<style>
	@import "./register.css";
</style>
