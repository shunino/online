<template>
  <div class="building">
    <div class="fixed-search is-block">
      <!-- <span class='map-icon'  @click="goPage('/map')">{{city}}<i class='icon-arrow-down city-btn'></i></span> -->
      <span class='map-icon' >{{city}}<i class='icon-arrow-down city-btn'></i></span>
      <span class='input_wrap'>
        <!-- <span class='choose_city_btn'>{{city}}</span> -->
        <img class='icon-search' src="../../assets/icon-search-btn.png" @click='search()'>
        <input  type="search" placeholder="请输入楼盘名称" v-model="searchParams.name" v-on:keyup.13="search()" />
      </span>
      <span class='filter' style='float:right;' @click="showFilter = true">筛选<img src="../../assets/icon-filter.png"></span>
    </div>
    <div class="building-content" >
      <!-- <mt-swipe  :show-indicators="true">
        <mt-swipe-item>
           <img src="../../assets/banner01.jpg" width='100%' height="100%" />
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/banner02.jpg" width='100%' height="100%"  />
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/banner03.jpg" width='100%' height="100%" />
        </mt-swipe-item>
      </mt-swipe> -->
      <banner v-bind:data="bannerResource"></banner>
      <!-- <div class='building-activity'>
        <div class="search">
          <img class='icon-search' src="../../assets/icon-search.png" height="40" width="40" @click='search()'>
          <input  type="search" placeholder="输入楼盘名称" v-model="searchParams.name" v-on:keyup.13="search()"/>
          <div class='location_choose' @click='goPage("/map")'>
            <img src="../../assets/map.png"><br/>地图选房
          </div>
        </div>
        <div class='activity' v-for='item in activityList' @click='goActivityDetail(item)'>
            <img v-if='item.image2 != null && item.image2 != ""' :src="item.image2 | imgUrl  " width='100%' height='100%'>
            <img v-else src="../../assets/pic1.png" width='100%' height='100%'>
        </div>
        <div class="activity_3" v-if="contentList.length > 0">
          <div class='activity_item' v-for='item in contentList' @click='goActivityList(item.contentType)'>
            <p>{{item.contentName}}</p>
            <img v-if='item.imageWechat != null && item.imageWechat != ""' :src="item.imageWechat | imgUrl"  width='100%' style="height: 1rem;">
            <div v-else>
              <img v-if='item.contentType == 1' src="../../assets/lvdc.png" width='100%' height='100%'>
              <img v-if='item.contentType == 2' src="../../assets/200wxf.png" width='100%' height='100%'>
              <img v-if='item.contentType == 3' src="../../assets/zxkp.png" width='100%' height='100%'>
            </div> 
          </div>
        </div>
        <div class="activity_3" v-if="contentList.length == 0">
          <div  class='activity_item' @click='goActivityList(3)'>
            <p>最新开盘</p>
            <img src="../../assets/zxkp.png" width='100%' height='100%' style="heigth:1rem;">
          </div> 
          <div  class='activity_item' @click='goActivityList(2)'>
            <p>潜力好房</p>
            <img src="../../assets/200wxf.png" width='100%' height='100%' style="heigth:1rem;">
          </div> 
          <div class='activity_item' @click='goActivityList(1)'>
            <p>旅居地产</p>
            <img src="../../assets/lvdc.png" width='100%' height='100%' style="heigth:1rem;">
          </div>
        </div>
      </div> -->
    </div>

    <load-more  :bottom-method="handleBottomChange"  :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" id='loadmoreList'>
      <build-list v-bind:data="listData" v-bind:btns="listBtns"></build-list>
    </load-more>
    <filter-panel :showFilter="showFilter" v-on:filterStatusChange="filterStatusChange" :data="filterData"></filter-panel>
  </div>
</template>
<script>
  import Banner from '../../components/banner/banner.vue';
  import { Loadmore,MessageBox,Swipe, SwipeItem } from 'mint-ui';
  import BuildList from '../../components/build-list/build-list.vue';
  import Filter from '../../components/filter/filter.vue';
  import util  from '../../config/util';
  export default {
     mixins: [util],
    data(){
      return {
        city: localStorage.cityname,
        bannerResource: [],//轮播数据
        // contentList:[],//旅居地产，200万新房，最新开盘数据
        // activityList:[],//活动列表
        allLoaded: false,
        filterData: [],
        listData: [],//列表数据
        listBtns: ['contact', 'appoint'],
        showFilter: false,
        searchParams: {
          area: '',
          city: '',
          // contentValue: this.$route.params ? parseInt(this.$route.params.type) || '': '',
          contentValue: 0,
          minPrice: '',
          maxPrice: '',
          houseType: '',
          minHouseArea: '',
          maxHouseArea: '',
          name: this.$route.params ? this.$route.params.name || '': '',
          pageNo: 1
        }
      }
    },
    filters: {
			imgUrl(url) {
				return config.file_show_url + url;
			}
    },
    beforeRouteEnter(to, from, next){
      if(from.path.includes('/buildingdetail/building/')){
        next(vm => {
          vm.upStatus();
        })
      }else{
        sessionStorage.setItem("initNum", "1");

        next(vm =>{
          vm.updateCity();
          vm.listData = [];
          if(!(window.location.hash.split("?")[1]) ){
              vm.checkUser();
          }
          setTimeout(function(){
              if((!!window.location.hash.split("?")[1] && window.location.hash.split("?")[1].indexOf("onClient") > -1) && sessionStorage.getItem("initNum") == "1"){
                  vm.checkUser();
              }
          },1000)

        });
      }
    },
    // beforeRouteLeave(to,from,next){
    //   sessionStorage.removeItem('cityIdfrommap');
    //   next()
    // },
    created(){
    	$(".menu").show();
      document.title="楼盘";
      if(window.location.hash.split("?")[1]){
        //this.checkUser();
        $('#main').css('padding-bottom',0).addClass('isMenu');
      }
    },
    mounted(){
      $(window).unbind('scroll').bind('scroll', this.watchScroll)

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

      sessionStorage.removeItem('cityIdfrommap');
			next();
	},
    methods:{
      updateCity(){
        this.city = localStorage.cityname;
        this.searchParams.pageNo = '1';
        this.searchParams.name = '';
        this.searchParams.minPrice = '';
        this.searchParams.maxPrice = '';
        this.searchParams.area = '';
        // $('.fixed-search').removeClass("is-block");
        // if(sessionStorage.isMenu){
        //   $('.menu').hide();
        // }
      },
      upStatus(){
        $(window).unbind('scroll').bind('scroll', this.watchScroll);
        // $('.fixed-search').removeClass("is-block");
        $("#main").scrollTop(sessionStorage.scrolltop);
      },
      watchScroll(){
        let offset = $(window).scrollTop();
        sessionStorage.setItem('scrolltop',offset)
        let pageHeight = $('.building-content').outerHeight();
        if(offset > pageHeight/2) {
          // $('.fixed-search').addClass("is-block");
        } else {
          // $('.fixed-search').removeClass("is-block");
        }
      },
      checkUser(){
        if(this.getQueryString('isMenu') == 'true'){
            let params = {
              "onClient": this.getQueryString('onClient'),
              "timestamp": this.getQueryString('timestamp'),
              "source": this.getQueryString('source'),
              "desStr": this.getQueryString('desStr'),
              "menu": this.getQueryString('isMenu')
            }
           this.common.request.post('/config/checkUser', params).then(data => {
              localStorage.cityid = data.cityId;
              localStorage.token = data.token;
              this.loadData();
              this.common.request.post('/myHome/getMyHomeInfo').then(info => {
                // console.log(info)
                localStorage.headimg = info.userInfo.head;
                localStorage.tel = info.userInfo.tel;
                localStorage.userId = info.userInfo.id;
                localStorage.nickName = info.userInfo.nickName;
                // console.log(data);
              })
              this.common.request.post('/home/cityList').then(city => {
                $.each(city,function (index,item) {
                  if(data.cityId == item.id){
                    localStorage.cityname = item.areaName;
                    this.city = item.areaName;
                    $('.choose_city_btn').text(item.areaName);
                  }
                })
              });
           })
        } else {
          this.loadData();
        }
      },
      getQueryString(name){
         let after = window.location.hash.split("?")[1];
         if(after){
          let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          let r = after.match(reg);
          if(r != null){
            return  decodeURIComponent(r[2]);
          }else{
            return null;
          }
         }
      },
      getAreaList(){
        if(localStorage.cityid){
          this.common.request.post('/home/areaByCityId', {cityId: localStorage.cityid}).then(data => {
            this.filterData = data;
          });
        }
      },
      goChooseCity(key){
        this.$router.push(key+'/list');
      },
      goPage(key){
        this.$router.push(key);
      },
      // goActivityList(contentType){
      //   this.$router.push('/building_activity_list/'+contentType);
      // },
      search(){
        $('.search input[type=search]').blur();
         this.$router.push('/buildinglist/1/'+this.searchParams.name)
      },
      loadData(params, cb){
        if(params){
          $.extend(this.searchParams, params);
        }
        var _this=this;

        if(localStorage.cityid){
          
          this.searchParams.city = localStorage.cityid
          this.common.request.post('/home/bannerList', {cityId:  localStorage.cityid}).then(data => {
              this.bannerResource = data;
          });
          
          // this.getContentList();
          // this.getActivityList();
          this.getProjectList();
          this.getAreaList();
        }
        if(cb){
          cb();
        }
      },
      getAreaList(){
        if(localStorage.cityid){
          this.common.request.post('/home/areaByCityId', {cityId: localStorage.cityid}).then(data => {
            this.filterData = data;
          });
        }
      },
      // getContentList(){
      //   var _this = this;
      //   _this.contentList = [];
      //   if(localStorage.cityid){
      //     this.common.request.post('/home/contentList', {cityId:  localStorage.cityid }).then(data => {
      //       data.map(function(item,index){
      //         if(item.contentConfig == 1){
      //           if(item.contentType == 1 || item.contentType == 2 || item.contentType == 3){
      //               _this.contentList.push(item)
      //           }
      //         }
      //       })
      //     });
      //   }
      // },
      // getActivityList(){
      //   if(localStorage.cityid){
      //     this.common.request.post('/home/doingsList', {pageNo:1,showType:1,cityId:  localStorage.cityid }).then(data => {
      //       this.activityList = data;
      //     });
      //   }
      // },
      // goActivityDetail(item){
      //   // console.log(item)
      //   if(item.contentType == 0){
      //     this.$router.push('/activitydetail/'+item.id);
      //   }else if(item.contentType == 1){
      //     location.href = 'http://' +item.url;
      //   }
      // },
      filterStatusChange(val){
        this.showFilter = val;
      },

      getProjectList(){
            var _this = this;
            var list = _this.listData;
            // console.log(this.searchParams)
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
      handleBottomChange(){
      		  this.searchParams.pageNo ++;
      		  this.loadData(null, ()=>{
      		    this.$refs.loadmore.onBottomLoaded();
      		  });
      		}
    },
    components:{
      'banner': Banner,
      'build-list': BuildList,
      'load-more': Loadmore,
      'filter-panel': Filter,
      'mt-swipe': Swipe,
      'mt-swipe-item': SwipeItem
    }
  }
</script>
<style scoped>
  @import "./building.css";
</style>
