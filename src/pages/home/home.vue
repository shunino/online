<template>
  <div class="home">
    <my-search />
    <div class='content'>
      <my-banner height="1.9075rem" width="3.39rem" />
    </div>
    <div class='activity'>
      <div class='activity_item' @click="goPage('building')">
        <i class='icon_location_map'></i>
        <span class='activity_name'>本地楼盘</span>
      </div>
      <div class='activity_item' @click='goActivityList(3)'>
        <i class='icon_new_open'></i>
        <span class='activity_name'>最新开盘</span>
      </div>
      <div class='activity_item' @click='goActivityList(4)'>
        <i class='icon_green_town'></i>
        <span class='activity_name'>绿城小镇</span>
        
      </div>
      <div class='activity_item' @click="goPage('information')">
        <i class='icon_visit_house'></i>
        <span class='activity_name'>地图找房</span>
      </div>
    </div>
    <my-zixun />
    <my-title name="得到的" />
    <my-scroll :builds="builds" />
    <my-title name="得到的" />
    <my-scroll :builds="builds" />
    <my-title name="好盘" />
    <div class="haopan">   
      <div class="haopan_div">
        <img src="../../assets/pic1.png">
        <div class="pan1">fdfd</div>
        <div class="pan2">dfdfd</div>
      </div>
      <div class="haopan_div">
        <img src="../../assets/pic1.png">
        <div class="pan1">fdfd</div>
        <div class="pan2">dfdfd</div>
      </div>
      <div class="haopan_div">
        <img src="../../assets/pic1.png">
        <div class="pan1">fdfd</div>
        <div class="pan2">dfdfd</div>
      </div>
      <div class="haopan_div">
        <img src="../../assets/pic1.png">
        <div class="pan1">fdfd</div>
        <div class="pan2">dfdfd</div>
      </div>
    </div>
    <div class='content no_margin'>
      <my-banner height="0.955rem" width="3.75rem" />
    </div>
    <my-title name="房产资讯" />
    <div class="home_new">
      <my-information />
    </div>
    <div style="height: 3rem;"></div>
  </div>
</template>
<script>
import { MessageBox, Swipe, SwipeItem, Toast } from 'mint-ui';
import wx from 'weixin-js-sdk';
import util  from '../../config/util';
import Banner  from '../../components/banner/banner.vue';
import Title  from '../../components/title/title.vue';
import Scroll  from '../../components/scroll/scroll.vue';
import Information  from '../../components/information/information.vue';
import Zixun  from '../../components/zixun/zixun.vue';
import Search  from '../../components/search/search.vue';
export default {
  mixins: [util],
  data(){
    return {
      city:'',
   remyId:'',
      cities:[],
      isWechat: true,
      builds: [
      //   {
      //   projguid: '97090310075553455',
      //   listpicwechat: 'test/20170911fd62572b-5b68-408c-b177-42d027ad3525.jpg',
      //   projname: '杭州翡翠城',
      //   attentionFlg: false,
      //   projectaddress: '我是楼盘地址',
      //   unitpriceshow: '20000',
      //   typeAndColor: [{buildingType: "我是卖点1", color: "#e1f8fe"}, {buildingType: "我是卖点2", color: "#fcf2e6"}]
      // },
      ],
      // coverList:[],
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm =>{
      vm.upDateCity();
      // vm.getNewList();

      if(!(window.location.hash.split("?")[1]) ){
        vm.checkUser();
      }
      setTimeout(function(){
          if((!!window.location.hash.split("?")[1] && window.location.hash.split("?")[1].indexOf("onClient") > -1) && sessionStorage.getItem("initNum") == "1"){
              vm.checkUser();
          }
      },1000)
    })
  },
  created(){
    if(window.location.hash.split("?")[1]){
      $('#main').css('padding-bottom',0).addClass('isMenu');
    }

    if(this.getQueryString('isMenu') == 'true') {
      this.isWechat = false;
    } else {
      this.isWechat = true;
    }

    if(localStorage.cityid) {
      this.cityId = localStorage.cityid;
      this.city = localStorage.cityname;
    }else{
      localStorage.cityid = 975;
      localStorage.cityname = '杭州市';
    }

    if(window.location.hash.split("?")[1]){
      this.checkUser();
    }
  },
  mounted(){
    if (this.isWechat) {
       this.getCurrentCity();
    }
    // this.getCurrentCity();
    this.getCities();
    this.getRecProjects();
    // this.InitHome();

    let mobile = localStorage.getItem("tel");
    let userAgent = this.myBrowser();
    let cookie = this.getCookie('UM_distinctid');
    let ip = localStorage.getItem("ip");
    localStorage.ip = ip;
    let record_time = new Date();
    record_time = this.formatTime(record_time);
    localStorage.enter_time = record_time;
    let os_type = this.osType();
    let present_url = document.location.href;

    if (present_url.indexOf("?") > 0) {
      present_url = present_url.substr(0, present_url.indexOf("?"));
    }
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
      // let enter_url = window.location.href;
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

      }); 
			next();
	},
  filters:{
    imgUrl(url){
      return config.file_show_url + url;
    }
  },
  watch:{
    cityId(newVale,oldValue){
      // this.getCoverList();
      // this.getNewList();
    }
  },
  methods:{
    
    upDateCity(){
      this.city = localStorage.cityname ? localStorage.cityname : '杭州市';
      this.cityId = localStorage.cityid ? localStorage.cityid : 975;
    },
    goPage(key){
       if (key == 'building') {
          let mobile = localStorage.getItem("tel");
          let userAgent = this.myBrowser();
          let cookie = this.getCookie('UM_distinctid');
          let ip = localStorage.getItem("ip");
          let record_time = new Date();
          record_time = this.formatTime(record_time);     localStorage.enter_time = record_time;
          let os_type = this.osType();
          let type = 'homebutton004';
          let version = '3.0.0';

          this.common.request.logPost('/addLog', {
            logtype: 'mobile_homepage_module_click',
            user_id: mobile || null,
            user_agent: userAgent,
            cookie: cookie,
            ip_addr: ip,
            os_type: os_type,
            type: type,
            record_time: record_time,
            version: version,
          }).then(result => {
              //   
          });   
       } 


        this.$router.push(key);
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
              // this.loadData();
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
                    // $('.choose_city').text(item.areaName);
                  }
                })
              });
           })
        }
        // else {
        //   this.loadData();
        // }
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

    goDetail(item, index){

      let mobile = localStorage.getItem("tel");
      let userAgent = this.myBrowser();
      let cookie = this.getCookie('UM_distinctid');
      let ip = localStorage.getItem("ip");
      let record_time = new Date();
      record_time = this.formatTime(record_time);     localStorage.enter_time = record_time;
      let os_type = this.osType();
      let type = 'AD001';
      let version = '3.0.0';
      let project_id = item.projguid;
      let project_name = item.projname;
      let position = index + 1;

      this.common.request.logPost('/addLog', {
        logtype: 'mobile_homepage_ad_module_click',
        user_id: mobile || null,
        user_agent: userAgent,
        cookie: cookie,
        ip_addr: ip,
        os_type: os_type,
        type: type,
        project_id: project_id,
        project_name: project_name,
        position: position,
        record_time: record_time,
        version: version,
      }).then(result => {
          //   
      });   

      localStorage.buildsave=true;   
      localStorage.setItem('type','');
      // $('#main').scrollTop(0);
      this.$router.push('/buildingdetail/building/' + item.projguid  + '/'+ (sessionStorage.scrolltop ? sessionStorage.scrolltop : 0)+ '/'+ item.synid);

      
    },
    toggleFollow(e, item,index){
        e.stopPropagation();
        if(localStorage.token){
          if(item.attentionFlg){
            MessageBox.confirm('确定取消收藏?').then(action => {
              this.common.request.post('/myHome/deleteAttention', {buildingId: item.projguid}).then(data => {
                item.attentionFlg = false;
                setTimeout(function () {
                  Toast({
                    message: '取消收藏成功',
                    duration: 1000
                  });
                },1000)

              });
              this.$emit('refresh',index)
            }).catch(err =>{
              console.log(err);
            });
          }else{
            this.common.request.post('/myHome/addAttention', {buildingId: item.projguid}).then(data => {
              item.attentionFlg = true;
              setTimeout(function(){
                Toast({
                  message: '收藏成功',
                  duration: 1000
                });
              },1000)
            });
          }
        }else{
          MessageBox.confirm('您尚未登录，请先进行登录?').then(action => {
            localStorage.clear();
            location.href = '#/login';
          }).catch(err =>{
            console.log(err);
          });
        }
    },
    goActivityList(contentType){

      let mobile = localStorage.getItem("tel");
      let userAgent = this.myBrowser();
      let cookie = this.getCookie('UM_distinctid');
      let ip = localStorage.getItem("ip");
      let record_time = new Date();
      record_time = this.formatTime(record_time);     localStorage.enter_time = record_time;
      let os_type = this.osType();
      let type = '1004';
      let version = '3.0.0';

      if (contentType === 0) {
        type = 'homebutton004';
      } else if (contentType === 1) {
        type = 'homebutton003';
      } else if (contentType === 4) {
        type = 'homebutton001';
      } else if (contentType === 3) {
        type = 'homebutton002';
      }

      this.common.request.logPost('/addLog', {
        logtype: 'mobile_homepage_module_click',
        user_id: mobile || null,
        user_agent: userAgent,
        cookie: cookie,
        ip_addr: ip,
        os_type: os_type,
        type: type,
        record_time: record_time,
        version: version,
      }).then(result => {
          //   
      });   


      this.$router.push('/building_activity_list/'+contentType);
    },
    goChooseCity(key){
      localStorage.changecity=false;
      this.$router.push(key+'/home');
    },
    getCities(){
      this.common.request.post('/home/cityList').then(data => {
        this.cities = data;
      });    
    },
    getCurrentCity() {	
      var param = {
        "url": location.href.split("#")[0]
      };
      var _this = this;
      this.common.request.post('/home/getWxSignature', param).then(data => {
        wx.config({
                     // debug: true,
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
                if(_this.city != "" && localStorage.changecity == "true") {

                  _this.InitHome();
                } else {
                  if(_this.city != "" && _this.city == cityname) {

                    _this.InitHome();
                    localStorage.changecity = true;
                    return;
                  } else {

                    if(!_this.city) {
                      $.each(_this.cities, function(index, item) {
                        if(cityname.indexOf(item.areaName) > -1) {
                          _this.setCurrentCity(item.id, item.areaName);
                          _this.cityId = item.id;
                          _this.city = item.areaName;
                          _this.InitHome();

                          return false;
                        }
                      });
                      if(_this.cityId == "") {
                        MessageBox.alert('当前城市无列表请手动选择!').then(action => {
                          _this.$router.push('/choosecity/home')
                        });
                      } else {
                        _this.InitHome();
                      }
                    } else {
                      MessageBox.confirm('当前定位城市跟选择的城市不一致，是否切换!').then(action => {
                        if(action == "confirm") {
                          $.each(_this.cities, function(index, item) {
                            if(cityname.indexOf(item.areaName) > -1) {
                              _this.setCurrentCity(item.id, item.areaName);
                              _this.cityId = item.id;
                              _this.city = item.areaName;
                              _this.bocurrentcity = true;
                              _this.InitHome();
                              // return false;
                            }
                          });
                          _this.$router.push('/home');
                        }

                        if(!_this.cityId || !_this.city || !_this.bocurrentcity) {
                          MessageBox.alert('当前城市无列表请手动选择!').then(action => {
                            _this.$router.push('/choosecity/home');
                          });
                        } else {
                          _this.InitHome();
                        }
                      }, action => {

                        _this.InitHome();
                      });
                    }
                  }
                }
              });

            },
            cancel: function(res) {
              Toast('用户拒绝授权获取地理位置');
            },
            fail: function(res) {
              // MessageBox.alert('定位失败请手动选择!').then(action => {
              //    _this.$router.push('/choosecity/home');
              // });
              Toast(JSON.stringify(res));
            }
          });
        });
      });
    },

    getRecProjects() {
      this.common.request.get('/recommend/selectRecProjects').then(data => {

        // console.log('=recommend==', data)
        this.builds = data;
        if (this.builds) {
          for (var i in this.builds) {
            if (this.builds[i].salepoint) {
              this.builds[i].salepoint = this.builds[i].salepoint.split("、");
            }
          }
        }
        // this.salePointList = this.builds.
      });
    },
    InitHome(){
      this.getCoverList();
      this.getNewList();
    },
   },
  components:{
    'mt-swipe':Swipe,
    'mt-swipe-item':SwipeItem,
    'my-banner':Banner,
    'my-title':Title,
    'my-scroll':Scroll,
    'my-information':Information,
    'my-zixun': Zixun,
    'my-search':Search
  }
}
</script>

<style scoped>
@import './home.css';
</style>
