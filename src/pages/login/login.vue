<template>
 <div class="navlogin">
 	<mt-navbar v-model="selected" class="nav-login">
	   <mt-tab-item id="ksdl">快速登录</mt-tab-item>
	   <mt-tab-item id="mmdl">密码登录</mt-tab-item>
	</mt-navbar>
	<div v-if="selected=='ksdl'" class="row ksdl">
		<div>
			<input type="number" placeholder="请输入手机号码" v-model="tel"/>
			<span class="getVCode" @click="getVCode">获取验证码</span>
		</div>
		<div>
			<input type="number" placeholder="请输入验证码" v-model="vcode"/>
		</div>
	</div>
	<div v-if="selected=='mmdl'" class="row mmdl">
		<div>
			<input type="number" placeholder="请输入手机号码" v-model="tel"/>
		</div>
		<div>
			<input type="password" placeholder="请输入密码" v-model="pwd"/>
		</div>
		
	</div>
	<div class="row" style="margin-top: .5rem;">
		<button type="button" class="btn btn-success" @click="login" style="width: 86%;margin-left: 7%;height: .5rem;line-height: .3rem;">登录</button>
		<div class="col-xs-12 text-center" style="color: #A9A9A9;margin-top:14px ;">
			或
		</div>
		<a @click="gotoPage('/register')" class="btn btn-register" style="margin-top: 20px;width: 86%;margin-left: 7%;height: .5rem;line-height: .4rem;">注册</a>
	</div>
	<div style="text-align: center;padding: 0 .3rem;margin-top: .6rem;font-size: 12px;">
		<p  v-if="selected=='mmdl'" @click="gotoPage('/forgetpwd')"  style="text-align: center;text-decoration: underline;"><a style="color: #00B96D;">忘记密码</a></p>
		<!--<a v-if="selected=='mmdl'"style="color: #37ab6a ;margin-bottom: 5px;" class="forgetmm" @click="gotoPage('/forgetpwd')">忘记密码</a>-->
		<div v-if="selected=='ksdl'">温馨提示：未注册绿城官网的手机号,登录时将自动注册,且代表已经同意<span style="color: #00B96D;">《用户服务协议》</span></div>
		<div v-if="selected=='mmdl'">温馨提示：点击登录代表已经同意<span style="color: #00B96D;">《用户服务协议》</span></div>
	</div>
 </div>


</template>

<script>
	import { Navbar, TabItem  } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import util  from '../../config/util';
	var interval;
	export default {
		mixins: [util],
		data() {
			return {
				selected: "ksdl",
				tel:"",
				vcode:"",
				pwd:"",
				time:60
			}
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
		
			clearInterval(interval);
			next(true);
		},
		deactivated(){
		    this.$destroy(true)
		},
		methods:{
			gotoPage(page){
				this.$router.push(page);
			},
			login(){
				// if(this.tel=="" || !(/^1[1-9]\d{9}$/).test(this.tel)){
				// 	Toast('请填写正确的手机号');
				// 	return;
				// }
				// if(this.selected=="ksdl" && this.vcode==""){
				// 	Toast('请输入验证码');
				// 	return;
				// }
				// if(this.selected=="mmdl" && this.pwd==""){
				// 	Toast('请输入密码');
				// 	return;
				// }
				// var param={
				// 	"phone":this.tel
				// };
				// if(this.selected=="mmdl"){
				// 	param.type=1;
				// 	param.password=this.pwd;
				// }

				// if(this.selected=="ksdl"){
				// 	param.type=0;
				// 	param.verCode=this.vcode;
				// }
				let param = {};
				this.common.request.post("/wechat/login",param).then(data=>{

					console.log('==updateDate==createDate=', data)
					localStorage.logindays=this.DateDiff(data.updateDate,data.createDate);

					console.log('==updateDate==createDate=', localStorage.logindays)
					
					localStorage.headimg=data.head;
					localStorage.tel=data.tel;
					localStorage.userId=data.id;
					localStorage.nickName=data.nickName;
					this.common.request.setToken(data.token);
					this.$router.push("/home");
					_czc.push(['_trackEvent', '快速登录','登录',this.tel,'1']);
				},err=>{
					_czc.push(['_trackEvent', '快速登录','登录',this.tel,'0']);	
				});

			},
			DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式 
				var oDate1,  oDate2,  iDays  
			
				oDate1 = new Date(Date.parse(sDate1.replace(/-/g,"/")))
				oDate2 = new Date(Date.parse(sDate2.replace(/-/g,"/")))
				
				iDays = parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);

				return  iDays; 
			},
			getVCode(){
				if(!(/^1[1-9]\d{9}$/).test(this.tel)){
					Toast('请填写正确的手机号');
					return;
				}
				if(this.time==60){
					this.common.request.post("/wechat/getSMSCode",{"phone":this.tel,"type":2}).then(data=>{
						Toast("发送验证码成功！");	           
						interval=setInterval(()=>{
						  $(".getVCode").text((this.time--)+"s后重试");
						  if(this.time==0){
						  	 this.time=60;
						  	 clearInterval(interval);
						  	 $(".getVCode").text("获取验证码");
						  }
						},1000);
						_czc.push(['_trackEvent', '快速登录','获取验证码',this.tel,'1']);    
					},err =>{
						_czc.push(['_trackEvent', '快速登录','获取验证码',this.tel,'0']);    
					});
				}
				
			}
		},
		components: {
		   "mt-navbar":Navbar,
		   "mt-tab-item":TabItem
		}
	}
</script>

<style scoped>
   @import "./login.css";
</style>
