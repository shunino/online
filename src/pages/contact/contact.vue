<template>
      <div class="contact">
	  
		<div class="inputbox title"  style="margin-top: 10px;">
			<div class="col-xs-5">
				<img src="../../assets/orderhouse/nm.png"/>
				姓名
			</div>
			<input class="col-xs-7 text-right" placeholder="请填写" v-model="name">
			</input>
		</div>
		 <div class="inputbox title">
			<div class="col-xs-5">
				<img src="../../assets/orderhouse/tel.png"/>
				手机号码
			</div>
			<input class="col-xs-7 text-right" placeholder="请填写" v-model="tel">
			</input>
		</div>
		<p class="text-center" style="font-size: 14px;padding: 0 20px;margin-top: .5rem;">
		  请保持电话畅通，置业顾问会尽快给您回拨！
		</p>
		<a href="javascript:void(0)" type="button"  class="btn btn-register" style="margin-top: .5rem;width: 80%;margin-left: 10%;" @click="submit">提交</a>
</div>
</template>

<script>
	import { Header } from 'mint-ui';
	import { Button } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import util  from '../../config/util';
	export default {
		name:"contact",

	    mixins: [util],
		data() {
			return {
				name:"",
				tel:""
			}
		},
		created(){
			 $(".menu").hide();
			this.name=(localStorage.nickName=="null"?"":localStorage.nickName);
			this.tel=localStorage.tel;
			document.title="马上联系";
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
		deactivated(){
		    this.$destroy(true)
		},
		methods:{
			submit(){
				 if(this.name==""){
				 	  Toast("请填写姓名");
				 	  return;
				 }
				 if(this.tel=="" || !(/^1[1-9]\d{9}$/).test(this.tel)){
					Toast('请填写正确的手机号');
					return;
				}
				 var param={
				  "buildingId": this.$route.params.buildingId,
				  "brokerId":this.$route.params.brokerId ,
				  "name": this.name,
				  "tel": this.tel,
				  "peopleNum": "",
				  "remark": "",
				  "brokerName":"",
				  "reservationDate": "",
				  "reservationTime": "",
				  "reservationType": "1",
				  "imgCode":"",
				  "isOnline": this.$route.params.isOnline,
				  "projectSynId": this.$route.params.projectSynId,
				  "synId":this.$route.params.synId,
				  "buildingName":this.$route.params.estatebuilding
				};
				let _this = this;
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
					_czc.push(['_trackEvent', '联系置业顾问','提交',_this.tel,'1']);    
					this.$router.go(-1);
				},err =>{
					_czc.push(['_trackEvent', '联系置业顾问','提交',_this.tel,'0']);
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
		},
		components: {
		  "mt-header":Header,
		  "mt-button":Button
		}
	}
</script>

<style scoped>
@import "./contact.css";
</style>