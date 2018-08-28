<template>
	<div class="precontact">
		

		<div class="inputbox title" style="margin-top: 10px;">
			<div class="col-xs-5">
				<img src="../../assets/orderhouse/nm.png" /> 姓名
			</div>
			<input class="col-xs-7 text-right" placeholder="请填写" v-model="name">
			</input>
		</div>
		<div class="inputbox title">
			<div class="col-xs-5">
				<img src="../../assets/orderhouse/tel.png" /> 电话
			</div>
			<input class="col-xs-7 text-right" placeholder="请填写" v-model="tel">
			</input>
		</div>
		<div class="inputbox title">
			<div class="col-xs-5">
				<img src="../../assets/orderhouse/date.png" /> 预约日期
			</div>
			<span class="col-xs-6 text-right" style="color: #a9a9a9;" @click="openPicker">
				{{date}}
			</span>
			<i class="icon-arrow-right" style="color: #a9a9a9;"></i>
		</div>
		<div class="inputbox title">
			<div class="col-xs-5">
				<img src="../../assets/orderhouse/time.png" /> 预约时间
			</div>
			<span class="col-xs-6 text-right" style="color: #a9a9a9;" @click="openTimePicker">
				{{time}}
			</span>
			<i class="icon-arrow-right" style="color: #a9a9a9;"></i>
		</div>
		<p class="text-center" style="font-size: 14px;padding: 0 20px;margin-top: .5rem;">
			尊敬的客人，请您保持电话通畅，我们的专业购房顾问会在约定时间联系你
		</p>
		<a @click="submit" href="javascript:void(0)" type="button" class="btn  btn-register col-xs-10 col-xs-offset-1" style="margin-top: .5rem;" >提交</a>
		<mt-datetime-picker @confirm="handleConfirm" :startDate="starttime" ref="picker" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
		</mt-datetime-picker>
		<template>
			<mt-datetime-picker ref="picker2" type="time" v-model="pickerValue" @confirm="handletimeConfirm" >
			</mt-datetime-picker>
		</template>
	</div>
</template>

<script>
	import { Header } from 'mint-ui';
	import { Button } from 'mint-ui';
	import { DatetimePicker } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import util  from '../../config/util';
	export default {
		name: "precontact",
		mixins: [util],
		data() {
			return {
				name:"",
				tel:"",
				date: "请选择",
				time: "请选择",
				starttime:new Date(),
				pickerValue:"00:00",
				pickerVisible: false
			}
		},
		created: function() {
			 $(".menu").hide();
			this.name=(localStorage.nickName=="null"?"":localStorage.nickName);
			this.tel=localStorage.tel;
			document.title="预约联系";
			Date.prototype.Format = function(fmt) { //author: meizz 
				var o = {
					"M+": this.getMonth() + 1, //月份 
					"d+": this.getDate(), //日 
					"h+": this.getHours(), //小时 
					"m+": this.getMinutes(), //分 
					"s+": this.getSeconds(), //秒 
					"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
					"S": this.getMilliseconds() //毫秒 
				};
				if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				for(var k in o)
					if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			}
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
		methods: {
			submit(){
				if(this.name==""){
				 	  Toast("请填写姓名");
				 	  return;
				 }
				 if(this.tel=="" ||!(/^1(1|2|3|4|5|6|7|8)\d{9}$/).test(this.tel)){
					Toast('请填写正确的手机号');
					return;
				}
				 if(this.date=="请选择"){
				 	  Toast("请选择预约日期");
				 	  return;
				 }
				 if(this.time=="请选择"){
				 	  Toast("请选择预约时间");
				 	  return;
				 }
				 
				var param={
				  "buildingId": this.$route.params.buildingId,
				  "brokerId":this.$route.params.brokerId ,
				  "name": this.name,
				  "tel": this.tel,
				  "peopleNum": "",
				  "remark": "",
				  "reservationDate": this.date,
				  "reservationTime": this.time+":00",
				  "reservationType": "2",
				  "msgCode":"",
				  "imgCode":"",
				  "synId":this.$route.params.brokerId,
				   "isOnline": this.$route.params.isOnline,
				  "projectSynId": this.$route.params.projectSynId,
				  "buildingName":this.$route.params.estatebuilding
				};
				this.common.request.post("/myHome/addReservation2",param).then(data=>{
					if (data) {
						localStorage.logindays= this.DateDiff(data.updateDate,data.createDate);
					
						localStorage.headimg=data.head;
						localStorage.tel=data.tel;
						localStorage.userId=data.id;
						localStorage.nickName=data.nickName;
						this.common.request.setToken(data.token);
					}
					
					Toast("预约成功，请耐心等待，我们稍后联系您!");
					this.$router.go(-1);
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
			openPicker() {
				this.$refs.picker.open();
			},
			openTimePicker(){
				this.$refs.picker2.open();
			},
			handletimeConfirm(time){
				this.time=time;
			},
			handleConfirm(date) {
				var date = new Date(date);
				this.date = date.Format("yyyy-MM-dd");
			}
		},
		components: {
			"mt-header": Header,
			"mt-button": Button,
			"mt-datetime-picker": DatetimePicker
		}
	}
</script>

<style>
	@import "./precontact.css";
</style>