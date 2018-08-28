<template>
	<div class='buildinginfo'>
		<div class='building-detail'>
			<h4>
				<span v-if='detail.buildingName'>{{detail.buildingName.substring(0,detail.buildingName.length - 1)}}</span>
				<span class='status' v-if='detail.buildingStatus == 1' style="color:#3fb9bc;">[待售]</span>
				<span class='status' v-if='detail.buildingStatus == 2' style="color:#fa8e07;">[在售]</span>
				<span class='status' v-if='detail.buildingStatus == 3' style="color:#f00;">[售罄]</span>
			 </h4>
			<div class='item item-first'>
				<div>开盘时间：{{detail.bgnsaledate}}</div>
				<div>入住时间：{{detail.stayInTime}}</div>
			</div>
			<div class='item'>
				<div>单元：{{detail.unitCount}}</div>
				<div>户型：{{detail.houseCount}}个户型</div>
			</div>
			<div class='item'>
				<div>层数：{{detail.totalFloor}}</div>
				<div>梯户比：暂无数据</div>
			</div>
		</div>
		<div class='unit-info'>
			<div class='line'></div>
			<div class='unit-content'>
				<div class='content-left' v-for='(item,index) in unitList' v-if='index == 0'>
					<div class='title'><span class='title-u'>单元</span><span class='title-f'>楼层</span></div>
					<div  class='floor' v-for='floor in item.floorList'>{{floor.floor}}F</div>
				</div>
				<div class='content-right'>
					<div class="unit-item"  v-for='item in unitList'>
						<div class='unit-title'>{{item.unitName}}单元</div>
						<div class='room-group' v-for='floor in item.floorList'>
							<div class='room-num' v-for="num in floor.roomList">
								<span v-if='num.status == 1' style="color:#3fb9bc;border:1px solid #3fb9bc;">{{num.roomName}}</span>
								<span v-if='num.status == 2' style="color:#fff;background:#ff8300">{{num.roomName}}</span>
								<span v-if='num.status == 3' style="color:#f00;">{{num.roomName}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Indicator } from 'mint-ui';

import util  from '../../config/util';
export default {
	mixins: [util],
	data(){
		return {
			buildingInfoId:this.$route.params.buildingInfoId,
			buildingId:this.$route.params.buildingId,
			detail:{},
			unitList:[]
		}
	},
	created(){
		$('.menu').hide();
	},
	beforeRouteEnter(to,from,next){
		next(vm =>{
			vm.loadData();
			vm.updataStatus();
		})
	},
	watch:{
		'$route':['updateRouteParam']
	},
	mounted(){
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
	methods:{
		updataStatus(){
			document.title = '楼栋信息';
			$('.menu').hide();
		},
		updateRouteParam(){
			this.buildingId = this.$route.params.buildingId;
			this.buildingInfoId = this.$route.params.buildingInfoId;
			console.log(this.buildingInfoId)
		},
		loadData(){
			this.common.request.post('/estate/findBuildingDetail', {buildingInfoId:this.buildingInfoId}).then(data => {
				this.detail = data ? data :{};
			})
			Indicator.open({spinnerType: 'fading-circle'});
			this.common.request.post('/estate/findUnitAndRoomList', {buildingId:this.buildingId}).then(data => {
				Indicator.close();
				this.unitList = data ? data : [];
			})
		}
	}
}
</script>

<style scoped>
@import './buildinginfo.css';
</style>