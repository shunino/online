<template>
  <div class="city_choose">
    <div class="title_locate" id='locate-title'>
      当前定位城市
    </div>
    <div class='current_city_box'>
       <span style="font-size: 18px;" @click='goPage'>{{localcity}}</span> 
       <span class='relocate_btn' @click="relocate">重新定位</span> 
    </div>

    <div class='city_list'>
      <div v-for='item in cities'>
        <div class='city-letter' :id='item.start'>{{item.start}}</div>
        <div class='city-name' v-for='(city,index) in item.sysAreas' ref="cityItem"  :cityid="city.id"  @click="citychoose(city)">{{city.areaName}}</div>
      </div>
    </div>

    <div class="initials">
      <ul>
        <li @click='fixedLetter()'><img src="../../assets/068.png"></li>
        <li v-for='item in cities' @click='fixedLetter(item.start)'>{{item.start}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { MessageBox,Toast } from 'mint-ui';
import wx from 'weixin-js-sdk';
import util  from '../../config/util';
export default {
  mixins: [util],
  data(){
    return {
      cities:[],
      localcity:'',
      city:'',
      cityId:''

    }
  },
  beforeRouteEnter(to,from,next){
    next(vm =>{
      vm.updateStatus();
      vm.getCurrentCity();
    })
  },
  created(){
    var _this = this;
    this.common.request.post('/home/getSortCitys',{provinceId:'',name:''}).then(data => {
      this.cities = data;
    }); 
    // this.getCurrentCity();
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
  methods:{
    updateStatus(){
      $('.menu').hide();
      this.cityId = '';
    },
    relocate(){
      this.getCurrentCity();
    },
    goPage(){
      var _this = this;
      if(!_this.cityId){
        MessageBox.alert('当前城市无列表请手动选择!').then(action => {
        });
      }else{
        localStorage.cityid = _this.cityId;
        localStorage.cityname = _this.city;
        this.$router.push('/home');
      }
    },
    citychoose(city){
      this.city = city.areaName;
      this.cityId = city.id
      this.setCurrentCity(this.cityId, this.city);
      if(this.$route.params.type == 'home'){
        this.$router.push('/home')
        $('#main').scrollTop(0);
      }else if(this.$route.params.type == 'list'){
        this.$router.push('/building')
      }
    },
    getCurrentCity() {  
      var param = {
        "url": location.href.split("#")[0]
      };
      var _this = this;

      this.common.request.post('/home/getWxSignature', param).then(data => {
        wx.config({
          //            debug: true,
          appId: data.appid, // 必填，公众号的唯一标识    
          timestamp: data.timestamp, // 必填，生成签名的时间戳    
          nonceStr: data.noncestr, // 必填，生成签名的随机串    
          signature: data.signature, // 必填，签名，见附录1    
          jsApiList: ['checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard' //获取地理位置接口  
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2    
        });
        wx.ready(function() {
          wx.getLocation({
            type: 'wgs84',
            success: function(res) {
              localStorage.addressx = res.longitude;
              localStorage.addressy = res.latitude;
              var point = new BMap.Point(res.longitude, res.latitude);
              var gc = new BMap.Geocoder();
              gc.getLocation(point, function(rs) {
                var addComp = rs.addressComponents;
                var cityname = addComp.city;
                _this.localcity = cityname;
                $.each(_this.cities, function(index, item) {
                  $.each(item.sysAreas,function(index,sub){
                     if(cityname.indexOf(sub.areaName) > -1){
                      _this.setCurrentCity(sub.id, sub.areaName);
                      _this.cityId = sub.id;
                      _this.city = sub.areaName;
                      return false;
                     }
                  })
                });
              });
            },
            cancel: function(res) {
              Toast('用户拒绝授权获取地理位置');
            },
            fail: function(res) {
              Toast(JSON.stringify(res));
            }
          });
        });
      });
    },
    fixedLetter(letter){
      if(letter){
        Toast({
          message: letter,
          duration: 500
        })
        document.getElementById(letter).scrollIntoView();
      }else{
        document.getElementById('locate-title').scrollIntoView();
      }
      
    }

  }
}
</script>
<style scoped>
  @import './choosecity.css';
</style>