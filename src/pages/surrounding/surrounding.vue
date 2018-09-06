<template>
  <div id='allmap'></div>
</template>

<script>
import util  from '../../config/util';
export default {
	mixins: [util],
  data(){
  	return {
  		mapObj:{},
  		projectName:this.$route.params.projectName,
  		addressX:this.$route.params.addressx,
  		addressY:this.$route.params.addressy
  	}
  },
  created(){
		$(".menu").show();
	  document.title="周边概况";
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
  		vm.initMap();
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
  watch:{
  	'$route':['updateParams']
  },
  methods:{
  	updateParams(){
  		this.projectName = this.$route.params.projectName;
  		this.addressX = this.$route.params.addressx;
  		this.addressY = this.$route.params.addressy;
  	},
  	initMap(){
  		this.mapObj = new BMap.Map('allmap');
  		let point = new BMap.Point(this.addressX, this.addressY);
      let marker = new BMap.Marker(point);  // 创建标注
  		this.mapObj.centerAndZoom(point, 15);	
      this.mapObj.addOverlay(marker);   
  		let opts = {
  		  position : point,    // 指定文本标注所在的地理位置
  		  offset   : new BMap.Size(10, -30)    //设置文本偏移量
			}
			var local = new BMap.LocalSearch(this.mapObj, {renderOptions: {map: this.mapObj}});      
      local.search("银行");
  		let label = new BMap.Label(this.projectName, opts);  // 创建文本标注对象
  		label.setStyle({
  			 color : "#00B96D",
  			 fontSize : "12px",
  			 backGround:'#fff',
  			 height : "20px",
  			 lineHeight : "18px",
  			 fontFamily:"微软雅黑",
  			 padding:"0 10px",
  			 border:"1px solid #fff",
  			 maxWidth:"none"
  		 });
  		this.mapObj.addOverlay(label);
  	}
  }
}
</script>

<style scoped>
 #allmap{
 	width: 100%;
 	height: 100%;
 	padding-bottom: 0.48rem;
 }
</style>