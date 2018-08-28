<template>
  <div class='consulting'>
    <div class='consulting-content'>
      <div v-show="pickshow" class="select_mask"></div>
      <div class='consulting_header'>
        <img src="../../assets/consulting-bg2x.png" width='100%' height='100%'>
        <div class='consulting_staff'>
          <div class='choose_estate' @click="showpicker"><span id="buildingName" style="margin-right: 5px;vertical-align:text-bottom;"></span><i class='icon-arrow-down'></i></div>
          <div class='staff_info'>
            <div class='avatar'>
              <img v-if='voiceInfo.photo' :src="voiceInfo.photo | voiceFilter">
              <img v-else src="../../assets/avatar.png">
            </div>
            <div class='desc'>
              <div class='name'>{{voiceInfo.dealName}}</div>
              <div class='job'>{{voiceInfo.job}}</div>
              <div class='motto'>{{voiceInfo.remarks}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class='consulting-info'>
        <div class='progress-bar'>
          <div class='progress-percent'></div>
        </div>
        <audio v-show='voiceInfo.voicePath !=null && voiceInfo.voicePath !="" && voiceInfo.voicePath != "underfined"' :src="voiceInfo.voicePath | voiceFilter" ref="audio" @timeupdate='updateTime' @canplay='canplay'></audio>
        <!-- <audio src="../../../static/test2.mp3" ref="audio" @timeupdate='updateTime'></audio>  -->
        <div class='play_time'>{{currentTime}}/{{totalTime}}</div>
        <div class='program-info'>
          <button class='com_btn' :class="{ pause: playBtn }" @click='playOrpause'></button>
          <span class='show_num'>{{voiceInfo.title}}</span>
        </div>
      </div>
      
      <load-more :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
        <div class='consulting_list'>
          <div class='list_item' v-for='item in askList'>
            <div class='splitline'></div>
            <div class='desc_wrap'>
              <div class='ask'>{{item.content}}</div>
              <p class='answer'>{{item.answerContent}}</p>
            </div>
            <div class='status'>
              <div>
              <img v-if='item.photo !=null && item.photo !="null" && item.photo !=""' class='avatar' :src="item.photo | voiceFilter">
              <img v-else class='avatar' src="../../assets/default-avatar.jpg">
              <span>{{item.name}}</span>
              </div>
              <div v-if='item.cDate'>
              <i class='icon-clock'></i>&nbsp;&nbsp;{{item.cDate.substring(0,10)}}
              </div>
            </div>
          </div>
          <div id="noData" class="text-center no-data" style="display: none;color: #ABABAB;fontSize: 12px;">暂无其他提问！</div>
        </div>
      </load-more>
    </div>  

    <mt-picker v-show="pickshow" valueKey='projName' :slots="slots" :showToolbar='true' @change="onValuesChange" class='consulting_picker'>
      <div class="toolbar">
        <span class="col-xs-3" style="color: #a9a9a9;" @click="picker_cancel">取消</span>
        <span class="col-xs-3 col-xs-offset-6" style="color: #37ab6a;" @click="sure_picker">确定</span>
      </div>
    </mt-picker>
    
    <div class='contact_wrap'>
      <button class='btn' @click='goPage'>我要提问</button>
      <button class='btn' @click='call($event)'>
        <a :href="'tel:'+tel" style="color:#fff;background: #00B573;text-decoration:none;">咨询电话</a>
      </button>
    </div>
    
  </div>
</template>

<script>
import { Picker,Toast,Loadmore } from 'mint-ui';
import util  from '../../config/util';
export default {
  mixins: [util],
  data(){
    return{
      nearParam:{
        cityId: localStorage.cityid ? localStorage.cityid : 975,
        addressx:localStorage.addressx ? localStorage.addressx : 120.2,
        addressy:localStorage.addressy ? localStorage.addressy : 30.3,
        projectId:this.$route.params.buildingId ? this.$route.params.buildingId : ''
      },
      slots:[{
        flex: 1,
        values: [],
        className: 'slot1',
        textAlign: 'center',
        defaultIndex:1
        }
      ],
      tel:'',
      pickshow: false,
      buildingList:[],
      buildingName:'',
      buildingId:'',
      projId:'',
      findListParam:{
        "pageNo":1,
        "projectId":''
      },
      askList:[],
      voiceInfo:{},
      totalTime:'',
      currentTime:'',
      playBtn:false,
      audio:{},
      precent:'',
      synId:this.$route.params.synId,
      projName:this.$route.params.buildingName,
      buildPick:'',
      allLoaded:false
      
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm =>{
      vm.askList = [];
      vm.findListParam.pageNo = 1;
      vm.updateRouteParam();
      if(!(window.location.hash.split("?")[1])){
         vm.getBuildList();
      }
    })
  },
  filters:{
    voiceFilter(url){
      return config.file_show_url+url;
    }
  },
  created(){
    document.title = '咨询';
    if(window.location.hash.split("?")[1]){
      this.checkUser();
    }
  },
  mounted(){
    if($('#main').hasClass('isMenu')){
      $('.contact_wrap').css('bottom',0);
    }
    if(window.location.hash.split("?")[1]){
      $('#main').css('padding-bottom',0);
      $('.contact_wrap').css('bottom',0);
    }

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
  watch:{
    '$route':['updateRouteParam'],
    buildingName(newValue,oldValue){
      this.askList = [];
    }
  },
  methods:{
    checkUser(){
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
        this.nearParam.cityId = data.cityId;
        this.getBuildList();
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
    updateRouteParam(){
      var _this = this;
      $('#main').scrollTop(0);
      _this.nearParam.cityId = localStorage.cityid ? localStorage.cityid : 975;
      if(this.$route.params.buildingId){
        _this.nearParam.projectId = this.$route.params.buildingId;
        // console.log(_this.nearParam.projectId)
      }else{
        _this.nearParam.projectId = '';
      }
    },
    call(e){
      e.stopPropagation();
      if(!this.tel){
        Toast('该楼盘暂无咨询电话');
      }
    },
    goPage(){
      this.$router.push('/question/'+this.findListParam.projectId + '/' + this.buildingName +'/'+this.projId)
    },
    getBuildList(){//查询楼盘列表
      var _this =this;
      _this.slots[0].values = [];
      this.common.request.post('/advisor/nearstProject',this.nearParam ).then(data => {
        if(data.projName !=null){
          this.slots[0].values.unshift(data);
        }else{ 
          data.projName = ' ';
          this.slots[0].values.unshift(data);
        }
        this.common.request.post('/advisor/findProjectByCityId',this.nearParam ).then(result => {
          $.each(result,function(index,item){
            if(data.synId != item.synId){
               _this.slots[0].values.push(item);
            }
          })
          if(data.synId){
            this.chooseProject(data.synId);
          }else{
            $(".mint-loadmore-bottom").hide();
            $('#noData').show();
          }
        })
      })
    },
    findPageListByProId(id){
      var _this = this;
      $(".mint-loadmore-bottom .mint-loadmore-text").text("正在加载...");
      this.common.request.post('/advisor/findPageListByProId',id ).then(data => {
      	  if (data && data.questionList) {
          	if(data.questionList.length == 0 && this.findListParam.pageNo == 1){
          		this.askList = data.questionList;
          		$(".mint-loadmore-bottom").hide();
            	$('#noData').show();
            }else{
              $(".mint-loadmore-bottom").show();
              $('#noData').hide();
              $.each(data.questionList, (i, item) =>{
                _this.askList.push(item);
              });
              if(data.total <= 10*this.findListParam.pageNo){
	              _this.allLoaded = true;
                $('.mint-loadmore-spinner').hide();
	              $(".mint-loadmore-bottom .mint-loadmore-text").text("暂无其他提问！");
                $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
	            }else{
	            	 // this.askList = data.questionList;
	              _this.allLoaded = false;
                $('.mint-loadmore-spinner').hide();
	              $(".mint-loadmore-bottom .mint-loadmore-text").text("上拉加载更多");
                // $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
	            }            	
            }
          	
     
          }
      })
    },
    getVoice(id,fn){
      this.common.request.post('/advisor/advisoryVoice',id ).then(data => {
        this.voiceInfo = data ? data : {};
        if(data && data.voicePath){
        	!!fn && fn();
        }
      })
    },
    onValuesChange(picker,values){
    	if(values[0]){
    		this.buildingName = values[0].projName;
	    	this.buildingId = values[0].synId;
        this.projId = values[0].buildingId;
        this.totalTime = '00:00';
        if(values[0].contactphone){
          this.tel =  values[0].contactphone;
        }else{
          this.tel = '';
        }
        if(this.nearParam.projectId){
          $('#buildingName').text(this.buildingName);
        }else{
          if(!$('#buildingName').text()){
            $('#buildingName').text(this.buildingName);
          }else{
            $('#buildingName').text(this.buildingName);
          }
        }
    	}
    },
    showpicker() {
      $('body').on('touchmove', function(event) {
          event.preventDefault();
      });
      this.pickshow = true;
    },
    picker_cancel(){
      $('body').unbind();
      this.pickshow = false;
    },
    sure_picker(){
      $('body').unbind();
      this.pickshow = false;
      $('#buildingName').text(this.buildingName);
      this.chooseProject(this.buildingId);
    },
    mp3Play(){
      $('.progress-percent').css('width',0);
      this.playBtn = false;
      this.audio = this.$refs.audio;
      this.totalTime = this.formatTime(this.audio.duration);
      this.currentTime = this.formatTime(this.audio.currentTime);
    },
    formatTime(time){
      if(time == null || time == '' || isNaN(time)) return "00:00";
      let m = Math.floor(time / 60);
      let s = Math.floor(time % 60);
      if(m<10) m = "0"+m;
      if(s<10) s = "0"+s;
      return m +":"+s;
    },
    playOrpause(){
      this.playBtn = !this.playBtn;
      if(this.voiceInfo.voicePath){
        if(this.playBtn){
          this.audio.play();
        }else{
          this.audio.pause();
        }
      }else{
        this.playBtn = false;
        Toast('该楼盘下暂无语音信息!');
      }

    },
    updateTime(){
      this.currentTime = this.formatTime(this.audio.currentTime);
      let progress = (this.audio.currentTime/this.audio.duration)*$('.progress-bar').width();
      $('.progress-percent').css('width',progress);
      if(this.currentTime == this.totalTime){
        this.audio.pause();
        this.playBtn = false;
        this.currentTime = "00:00";
        $('.progress-percent').css('width',0);
      }
    },
    canplay(){
      this.totalTime = this.formatTime(this.audio.duration);
    },
    loadBottom(){
      this.findListParam.pageNo ++;
      this.findPageListByProId(this.findListParam, ()=>{
        this.$refs.loadmore.onBottomLoaded();
      });
    },
    chooseProject(projectId){
    	var _this = this;
    	this.findListParam.projectId = projectId;
	    this.findPageListByProId(this.findListParam);
	    this.getVoice(this.findListParam,function(){
		   	_this.mp3Play();
				_this.canplay();
	    });
    }
  },
  components:{
    "mt-picker":Picker,
    'load-more':Loadmore
  }
}
</script>

<style scoped>
  @import "./consulting.css";
</style>