<template>
  <div class="personal">
    <div class="gray-bg">
      <div class="container">
        <div class="info" @click="goPage('setting')">
          <div class="avatar">
            <img v-if="user.avatar != ''" :src="user.avatar">
            <img v-else src="../../assets/default-avator.png">
          </div>
          <div class="name double">
            <div class="user-name">{{user.name}}<br>
              <div v-if="!comboDayFlg" class="text-tips">开启美好生活</div>
              <div v-else class="text-tips" >您已经持续登录{{comboDays}}天</div>
            </div>
          </div>
          <div class="right-arrow">
            <img src="../../assets/icon-right-arrow.png">
          </div>
        </div>
        <!-- <div class="row number text-center">
          <button class='mint-button light-green mint-button--normal' @click="goPage('appoint')">我的预约({{user.appointCount}})</button>
          <button class='mint-button light-green mint-button--normal'>我的订单({{user.orderCount}})</button>
          <button class='mint-button light-green mint-button--normal' @click="goPage('record')">浏览记录({{user.recordCount}})</button>
        </div> -->
        <div class="main-list">
          <div class="row" @click="goPage('appoint')">
            <div class="col-xs-9 row-title appoint">
              <img src="../../assets/appoint.png">
              <span>我的预约({{isLogin ? user.appointCount : 0}})</span>
            </div>
            <div class="col-xs-3 text-right">
              <img src="../../assets/icon-right-arrow.png">
            </div>
          </div>
          <div class="row" @click="goPage('record')">
            <div class="col-xs-9 row-title record">
              <img src="../../assets/record.png">
              <span>浏览记录({{isLogin ? user.recordCount : 0 }})</span>
            </div>
            <div class="col-xs-3 text-right">
              <img src="../../assets/icon-right-arrow.png">
            </div>
          </div>
          <!-- <div class="row">
            <div class="col-xs-9">
              <span>文章收藏</span>
            </div>
            <div class="col-xs-3 text-right">
              <img src="../../assets/icon-right.png">
            </div>
          </div> -->
          <div class="row" @click="goPage('concern')">
            <div class="col-xs-9 row-title concern">
              <img src="../../assets/concern.png">
              <span>楼盘收藏</span>
            </div>
            <div class="col-xs-3 text-right">
              <img src="../../assets/icon-right-arrow.png">
            </div>
          </div>
          <div class="row" @click="goPage('suggest')">
            <div class="col-xs-9 row-title suggest">
              <img src="../../assets/suggest.png">
              <span>意见反馈</span>
            </div>
            <div class="col-xs-3 text-right">
              <img src="../../assets/icon-right-arrow.png">
            </div>
          </div>
          
          <!-- <div class="row" @click="goPage('news')">
            <div class="col-xs-9">
              <span>房产快讯</span>
            </div>
            <div class="col-xs-3 text-right">
              <img src="../../assets/icon-right.png">
            </div>
          </div> -->
        <!--<div class="row" @click="goPage('guide')">
            <div class="col-xs-10">
              <span>新手引导</span>
            </div>
            <div class="col-xs-2 text-right">
              <i class="icon-arrow-right"></i>
            </div>
          </div> -->
        </div>
      </div>
      <div class="hot-line">
            <a class='hot-button' href="tel:95059 ">
              服务热线:
              <span class="tel">95059</span>
            </a>
          </div>
      <!-- <div class="hot-line">
        <a class='mint-button light-green mint-button--large' href="tel:95059 ">服务热线:95059</a>
      </div> -->
    </div>  
  </div>
</template>
<script>
  import util  from '../../config/util';
  export default {
    mixins: [util],
    data(){
      return {
        user:{
          name: '',
          avatar: '',
          appointCount: 0,
          orderCount: 0,
          recordCount: 0,
        },
        comboDayFlg:false,
        comboDays:  isNaN(localStorage.logindays) ? 1: localStorage.logindays,
        isLogin: localStorage.token ? true : false
      }
    },
    beforeRouteEnter(to,from,next){
      next( vm =>{
        vm.UpdateInfo();
      })
    },
    methods: {
      goPage(page){
        if(page !='news' && page != 'suggest' && page !='guide'){
          if(localStorage.token){
            this.getInfo();
          }
        }
        this.$router.push('/' + page);
      },
      getInfo(){
        this.common.request.post('/myHome/getMyHomeInfo').then(data => {
            if(data && data.userInfo){
              this.user.name = localStorage.nickName=="null" ?'请完善个人信息':localStorage.nickName;
              if(localStorage.headimg!="null"){
                this.user.avatar = config.file_show_url+localStorage.headimg 
              }else{
                this.user.avatar = '';
              }
            }

            localStorage.appointCount = data.myReservationNum || 0;
            localStorage.orderCount = data.myOrderNum || 0;
            localStorage.recordCount = data.myHistoryNum || 0;

            this.user.appointCount = data.myReservationNum || 0;
            this.user.orderCount = data.myOrderNum || 0;
            this.user.recordCount = data.myHistoryNum || 0;
            this.comboDayFlg = true;
        });
      },
      UpdateInfo(){
        this.user.name = localStorage.nickName ? localStorage.nickName  : "请登录/注册";
        this.comboDays = isNaN(localStorage.logindays)? 1:localStorage.logindays;
        if(localStorage.token){
           this.getInfo();
        }        
      }
    },
    created(){
    	$(".menu").show();
      document.title="我的";
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
			next();
	},
    components:{
    }
  }
</script>
<style scoped>
  @import "./personal.css";
</style>
