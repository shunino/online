<template>
   <div class="question">
   	 <!-- <div class='ask-title'><input type="text" placeholder="请输入问题标题?" v-model='asktitle'></div> -->
	   <textarea class="question-content" placeholder="请在此输入您的问题，我们将竭尽全力为您解答!" rows="8" v-model="question"></textarea>
	  <!-- <div class="inputbox title">
			<img src="../../assets/orderhouse/tel.png" /><span class='tel'>或拨打咨询热线:<a class='tel-num' href="tel:95059">95059</a></span>
		</div> -->
		<a class='submit_btn' @click="submit" href="javascript:void(0)" type="button">提交</a>
   </div>
</template>

<script>
import { Toast } from 'mint-ui';
import util  from '../../config/util';
	export default {
		mixins: [util],
		data(){
			return {
				param:{
				  "buildingId": this.$route.params.synId,
				  "buildingName": this.$route.params.buildingName,
				  "title": '',
				  "content": ''
				},
				question:''
			}
		},
		created(){
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
		beforeRouteEnter(to,from,next){
			 next(vm =>{
				vm.updateStatus();
			})
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
			if(leave_url.indexOf("?") > 0) {
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
			updateStatus(){
				document.title = "我要提问";
				this.param.buildingName = this.$route.params.buildingName;
				this.param.buildingId = this.$route.params.synId;
				$('.menu').hide();
			},
			submit(){
				var _this =this;
				if(this.question == ""){
					Toast("请输入问题描述!");
					return;
				}
				this.param.title = this.asktitle;
				this.param.content = this.question;

				// console.log(this.param);
				this.common.request.post('/advisor/addAdvisory',this.param).then(data => {
					setTimeout(function(){
						Toast({
	            message: '咨询成功',
	            duration: 1000
	          });
					},2000)

          setTimeout(function () {
          	 _this.$router.push('/consulting/'+_this.$route.params.synId +'/'+_this.$route.params.buildingId);
          },1000)
         
				})
			}
		}
	}
</script>

<style scoped>
	@import "./question.css";
</style>