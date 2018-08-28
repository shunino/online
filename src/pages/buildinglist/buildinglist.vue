<template>
	<div class="building_list">
		<div class="fixed-search">
		  <!-- <span class='map-icon'  @click="goPage('/map')">{{city}}<i class='icon-arrow-down city-btn'></i></span> -->
			<span class='map-icon'>{{city}}<i class='icon-arrow-down city-btn'></i></span>
		  <span class='input_wrap'>
		    <!-- <span class='choose_city_btn'>{{city}}</span> -->
		    <img class='icon-search' src="../../assets/icon-search-btn.png" height="40" width="40" @click='search()'>
		    <!-- <span class="search_wrap"> -->
		    <input  type="search" placeholder="请输入楼盘名称" v-model="searchParams.name" v-on:keyup.13="search()"/>
		    <!-- </span> -->
		  </span>
		  <span class='filter' style='float:right;' @click="showFilter = true">筛选<img src="../../assets/icon-filter.png"></span>
		</div>
    <load-more  :bottom-method="handleBottomChange"  :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" id='loadmoreList'>
	    <build-list v-bind:data="listData" v-bind:btns="listBtns"></build-list>
	  </load-more>
		<filter-panel :showFilter="showFilter" v-on:filterStatusChange="filterStatusChange" :data="filterData"></filter-panel>
	</div>
</template>

<script>
import BuildList from '../../components/build-list/build-list.vue';
import Filter from '../../components/filter/filter.vue';
import { Loadmore,MessageBox  } from 'mint-ui';
import util  from '../../config/util';
export default {
	mixins: [util],
	data(){
		return {
			city: localStorage.cityname,
			showFilter: false,
			filterData: [],
			allLoaded: false,
			listData: [],//列表数据
			listBtns: ['contact', 'appoint'],
			searchParams: {
			  area: '',
			  city: localStorage.cityid ? localStorage.cityid : '',
			  contentValue:'',
			  minPrice: '',
			  maxPrice: '',
			  houseType: '',
			  minHouseArea: '',
			  maxHouseArea: '',
			  name:  this.$route.params.searchName ? this.$route.params.searchName || '': '',
			  pageNo: 1,
			  searchType:this.$route.params.searchType ? this.$route.params.searchType || '': ''
			}
		}
	},
	beforeRouteEnter(to,from,next){
		next(vm =>{
			vm.loadData();
		})
	},
	created(){
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

    loadData(params, cb){

      if(params){
        $.extend(this.searchParams, params);
      }
      var _this=this;
      if(localStorage.cityid){
        this.getAreaList();
        this.getProjectList();
      }
      if(cb){
        cb();
      }
    },
    getProjectList(){
      var _this = this;
      var list = _this.listData;
      $(".mint-loadmore-bottom .mint-loadmore-text").text("正在加载...");
      this.common.request.post('/estate/getProjects', this.searchParams).then(data => {
        if (data && data.admProject) {
        	if(data.admProject.length == 0 && this.searchParams.pageNo == 1){
        		$(".mint-loadmore-bottom").hide();
          	$('#noData').show();
          }else{

              list.push.apply(list,data.admProject);
              _this.listData = list;
              $(".mint-loadmore-bottom").show();
              $('#noData').hide();
              if(data.total <= 10*this.searchParams.pageNo){
	              _this.allLoaded = true;
	              $(".mint-loadmore-bottom .mint-loadmore-text").text("更多楼盘, 敬请期待!");
	            }else{
	              _this.allLoaded = false;
	              $(".mint-loadmore-bottom .mint-loadmore-text").text("上拉加载更多");
	            }            	
          }
        }
      })
    },
		getAreaList(){
		  if(localStorage.cityid){
		    this.common.request.post('/home/areaByCityId', {cityId: localStorage.cityid}).then(data => {
		      this.filterData = data;
		    });
		  }
		},
		goPage(key){
		  this.$router.push(key);
		},
		search(){
		  $('.search input[type=search]').blur();
		  	this.searchParams.minPrice="";
		    this.searchParams.houseType="";
		    this.searchParams.maxPrice="";
		    this.searchParams.maxHouseArea="";
		    this.searchParams.minHouseArea="";
		    this.searchParams.area="";
		    this.searchParams.pageNo = '1';
		    this.searchParams.searchType = '';
		    this.listData = [];
		    this.loadData(this.searchParams);
		},
		// inputFocus(status){
		//   if(status){
		//     $('.menu').hide();
		//   }else{
		//     $('.menu').show();
		//   }
		// },
		filterStatusChange(val){
		  this.showFilter = val;
		},
		handleBottomChange(){
		  this.searchParams.pageNo ++;
		  this.loadData(null, ()=>{
		    this.$refs.loadmore.onBottomLoaded();
		  });
		}
	},
	components:{
	  'build-list': BuildList,
	  'load-more': Loadmore,
	  'filter-panel': Filter,
	}
}	
</script>

<style scoped>
@import './buildinglist.css';
</style>