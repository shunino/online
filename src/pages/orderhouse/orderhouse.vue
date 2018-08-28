<template>
	<div class="orderhouse">
		<div style="padding:0 0.2rem;">
			<div class="inputbox title" style="margin-top: 10px;">
				<div class="col-xs-5 padding-0">
					<img src="../../assets/orderhouse/xm.png" /> 预约项目
				</div>
				<div class="col-xs-7 text-right lpname padding-0">
					{{lpname}}
				</div>
			</div>
			<div class="inputbox title">
				<div class="col-xs-5 padding-0">
					<img src="../../assets/orderhouse/nm.png" /> 姓名
				</div>
				<input class="col-xs-7 text-right padding-0" placeholder="请填写" v-model="name">
			</div>
			<div class="inputbox title">
				<div class="col-xs-5 padding-0">
					<img src="../../assets/orderhouse/tel.png" /> 手机号码
				</div>
				<input class="col-xs-7 text-right padding-0" placeholder="请填写" v-model="tel">
			</div>
			<div class="inputbox">
				<input class="col-xs-7 col-xs-offset-1 padding-0" placeholder="请输入验证码" v-model="yzm" />
				<img :src="yzmurl" @click="changeImg" class="col-xs-4 padding-0" style="margin-top: .15rem;position: relative;width: 0.77rem; height: 0.3rem; right: -32px;" />
			</div>
            <div class="inputbox" style="border-top: none;">
			    <input class="col-xs-7 col-xs-offset-1 padding-0" type="text" placeholder="请输入短信验证码" v-model="vcode" />
			    <span class="getVCode-o col-xs-4" @click="sendVcode">获取验证码</span>
		    </div>
			<!-- <div class="inputbox title">
				<div class="col-xs-5">
					<img src="../../assets/orderhouse/rs.png" /> 人数
				</div>
				<input class="col-xs-7 text-right" placeholder="请填写" v-model="num">
			</div>
			<div class="inputbox title">
				<div class="col-xs-5">
					<img src="../../assets/orderhouse/jjr.png"/> 选择经纪人
				</div>
				<span class="col-xs-6 text-right" style="color: #a9a9a9;" @click="showpicker" id='jjr'>
				
				</span>
				<i class="icon-arrow-right" style="color: #a9a9a9;position: relative;top: -1px;" @click="showpicker"></i>
			</div> -->
			<div class="inputbox title">
				<div class="col-xs-5 padding-0">
					<img src="../../assets/orderhouse/bz.png" /> 备注
				</div>
				<input class="col-xs-7 text-right padding-0" placeholder="请填写" v-model="remark">
			</div>
		</div>
		<!-- <div class="line"></div> -->
		<!-- <div class="inputbox">
			<input class="col-xs-7 col-xs-offset-1" placeholder="请输入验证码" v-model="yzm" />
			<img :src="yzmurl" @click="changeImg" class="col-xs-4" style="margin-top: .1rem;position: relative;" />
		</div>
		<div class="inputbox" style="border-top: none;">
			<input class="col-xs-7 col-xs-offset-1" type="text" placeholder="请输入短信验证码" v-model="vcode" />
			<span class="getVCode-o col-xs-4" @click="sendVcode">获取验证码</span>
		</div> -->
		<div class="text-center">
			<a href="javascript:void(0)" type="button" class="btn btn-register" style="margin-top: 0.4rem;color:#fff;" @click="submit">立即预约</a>
		</div>
		<mt-picker v-show="pickshow"  valueKey="username"  :showToolbar=true :slots="slots" @change="onValuesChange" class="jjr_picker scroll">
			<div class="toolbar">
				<span class="col-xs-3" style="color: #a9a9a9;" @click="picker_cancel">
	   	   	  	  取消
	   	   	  </span>
				<span class="col-xs-3 col-xs-offset-6" style="color: #37ab6a;" @click="sure_picker">
	   	   	  	  确定
	   	   	  </span>
			</div>
		</mt-picker>
		<div v-show="pickshow" class="select_mask"></div>
	</div>

</template>

<script>
	import { Header } from 'mint-ui';
	import { Button } from 'mint-ui';
	import { Cell } from 'mint-ui';
	import { Picker } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { Popup } from 'mint-ui';
	import util  from '../../config/util';

	export default {
		name: "orderhouse",
	    mixins: [util],
		data() {
			return {
				jjr: "请选择",
				lpname: "",
				tel: "",
				// num: "",
				remark: "",
				name: "",
				brokerId: "",
				yzm: "",
				vcode: "",
				synId: "",
				time: 60,
				yzmurl: config.server + "/public/captcha.cap?token=" + localStorage.token + "&v=" + new Date().getMilliseconds(),
				pickshow: false,
				slots: [{
					flex: 1,
					values: [],
					className: 'slot2',
					textAlign: 'center'
				}],
				interval:null
			}
		},
		deactivated() {
			this.$destroy(true);
			clearInterval(this.interval);
		},
		created() {
			
			$(".menu").hide();
			document.title = "预约看房";
			this.tel = localStorage.tel;
			this.name = (localStorage.nickName == "null" ? "" : localStorage.nickName);
			var param = {
				"buildingId": this.$route.params ? this.$route.params.buildingId || '' : ''
			}
			//			
			this.common.request.post("/estate/getProjectInfo", param).then(data => {
				this.lpname = data.admProject.projname;
				this.$set(this.slots[0], "values", data.buildingBrokerEntity);
				this.slots[0].values.unshift({
					brokerId:'',
					buildingId:'',
					createDate:'',
					id:'',
					isNewRecord:'',
					isdisabeld:'',
					mobile:'',
					synId:'',
					username:'请选择'
				})
			});

			clearInterval(this.interval);
		},
		mounted(){

			console.log('====this.$route.params.projectSynId', this.$route.params.projectSynId)
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
		methods: {
			changeImg() {
				this.yzmurl = config.server + "/public/captcha.cap?token=" + localStorage.token + "&v=" + new Date().getMilliseconds();
			},
			sendVcode() {
				let _this = this;
				if(this.tel == "") {
					Toast('请输入手机号!');
					return;
				}
				if(!((/^1[1-9]\d{9}$/).test(this.tel))) {
					Toast('请填写正确的手机号!');
					return;
				}
				var param = {
					"phone": this.tel
				};
				if(this.time == 60) {
					this.common.request.post("/myHome/getSMSCode", param).then(data => {
						_czc.push(['_trackEvent', '预约看房','获取验证码',_this.tel,'1']);
						setTimeout(function(){
							Toast({
							  message: '短信已发送，请耐心等待!',
							  duration: 1000
							});
						},1200)
						
					},err =>{
						_czc.push(['_trackEvent', '预约看房','获取验证码',_this.tel,'0']);
					});
					this.interval = setInterval(() => {
						$(".getVCode-o").text((this.time--) + "s后重试");
						if(this.time == 0) {
							this.time = 60;
							clearInterval(this.interval);
							$(".getVCode-o").text("获取验证码");
						}
					}, 1000);
				}

			},
			CheckVcode() {
				let _this = this;
				let param = {
					"buildingId": this.$route.params.buildingId,
					// "brokerId": this.brokerId,
					"name": this.name,
					"tel": this.tel,
					// "peopleNum": this.num,
					// "brokerName":this.jjr,
					"remark": this.remark,
					"reservationDate": "",
					"reservationTime": "",
					"reservationType": "0",
					"isOnline": this.$route.params.isOnline,
					// "synId": this.synId,
					"projectSynId": this.$route.params.projectSynId,
					"msgCode": this.vcode,
					// "imgCode": this.yzm,
					"buildingName": this.lpname,
					"channelId": "2"
				};
				this.common.request.post("/myHome/addReservation2", param).then(data => {
					console.log('=====239=data=', data);

					if (data) {
						localStorage.logindays= this.DateDiff(data.updateDate,data.createDate);
					
						localStorage.headimg=data.head;
						localStorage.tel=data.tel;
						localStorage.userId=data.id;
						localStorage.nickName=data.nickName;
						this.common.request.setToken(data.token);
					}

					_czc.push(['_trackEvent', '预约看房','立即预约',_this.tel,'1']);
					setTimeout(function(){
						Toast({
						  message: '预约成功，请耐心等待，我们稍后联系您!',
						  duration: 2000
						});
					},2200)
					this.$router.go(-1);
				},err =>{
					_czc.push(['_trackEvent', '预约看房','立即预约',_this.tel,'0']);
				});
			},
			DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式  
				// if (sDate1 && sDate2) {
				// 	sDate1 = sDate1.substr(0,10);
				//     sDate2 = sDate2.substr(0,10);
				// }
				// var  aDate,  oDate1,  oDate2,  iDays  
				// aDate  =  sDate1.split("-")  
				// oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式  
				// aDate  =  sDate2.split("-")  
				// oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
				// iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
				// return  iDays  

				var oDate1,  oDate2,  iDays  
			
				oDate1 = new Date(Date.parse(sDate1.replace(/-/g,"/")))
				oDate2 = new Date(Date.parse(sDate2.replace(/-/g,"/")))
				
				iDays = parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);

				return  iDays; 
			},
			submit() {
				if(!((/^1[1-9]\d{9}$/).test(this.tel))) {
					Toast('请填写正确的手机号');
					return;
				}
				// if(this.num == "") {
				// 	Toast('请输入人数');
				// 	return;
				// }

				if(this.name == "") {
					Toast('请输入姓名');
					return;
				}

				// if(this.jjr == "请选择") {
				// 	Toast('请选择经纪人');
				// 	return;
				// }

				if(this.yzm == "") {
					Toast('请输入验证码');
					return;
				}

				if(this.vcode == "") {
					Toast('请输入短信验证码');
					return;
				}

				this.CheckVcode()

			},
			sure_picker() {
				$('body').unbind();
				$('#jjr').text(this.jjr);
				this.pickshow = false;
			},
			showpicker() {
				$('body').on('touchmove', function(event) {
				    event.preventDefault();
				});
				this.pickshow = true;
			},
			picker_cancel() {
				$('body').unbind();
				this.pickshow = false;
				this.jjr = "请选择";
			},
			onValuesChange(picker, values) {
				console.log('=====values', values, picker)
				if(values[0]){
					this.jjr = values[0].username;
					this.brokerId = values[0].id;
					this.synId = values[0].synId;
					if(!$('#jjr').text()){
						$('#jjr').text(this.jjr);
					}
				}
			}
		},
		components: {
			"mt-header": Header,
			"mt-button": Button,
			"mt-cell": Cell,
			"mt-picker": Picker
		}
	}
</script>

<style scoped>
	@import "./orderhouse.css";
</style>