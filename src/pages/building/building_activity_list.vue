<template>
  <div class='building_activity_list'>
    <div class='activity_pic' v-for='item in picList'>
    <!--<img v-if='item.imageWechat != null && item.imageWechat != ""' :src="item.imageWechat | imgUrl" width="100%" height='100%'> -->
      <div style="height:100%;">
        <img v-if='param.contentValue == 1' src="../../assets/ljdc.jpg" width="100%" height='100%'>
        <img v-if='param.contentValue == 4' src="../../assets/greentown.jpg" width="100%" height='100%'>
        <img v-if='param.contentValue == 3' src="../../assets/newopen.jpg" width="100%" height='100%'>
      </div>
      <!-- <p>{{item.contentName}}</p> -->
    </div>
    <div class='activity_pic' v-if='picList.length == 0'>
      <div style="height:100%;">
        <img v-if='param.contentValue == 1' src="../../assets/ljdc.jpg" width="100%" height='100%'>
        <img v-if='param.contentValue == 4' src="../../assets/greentown.jpg" width="100%" height='100%'>
        <img v-if='param.contentValue == 3' src="../../assets/newopen.jpg" width="100%" height='100%'>
      </div>
    </div>
    <load-more  :bottom-method="handleBottomChange"  :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
	    <build-list v-bind:data="listData" v-bind:btns="listBtns"></build-list>
	  </load-more> 
  </div>
</template>

<script>
import BuildList from '../../components/build-list/build-list.vue';
import { Loadmore } from 'mint-ui';
import util  from '../../config/util';
export default {
	mixins: [util],
  data(){
    return {
      listData:[],
      listBtns: ['contact', 'appoint'],
      allLoaded:false,
      picList:[],
      param:{
        "pageNo": 1,
        "contentValue": '',
        "area": "",
        "city":  '',
        "minPrice": "",
        "maxPrice": "",
        "houseType": "",
        "minHouseArea": "",
        "maxHouseArea": "",
        "name": ""
      }
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm =>{
      vm.updataStatus();
    })
  },
  created(){
  },
  mounted(){
    this.getList();
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
    '$route':['getList']
  },
  filters: {
    imgUrl(url) {
      return config.file_show_url + url;
    }
  },
  methods:{
    updataStatus() {
      if(this.$route.params.type == 0 ) {
        document.title = '本地楼盘';
      } else if(this.$route.params.type == 1){
        document.title = '旅居地产';
      } else if(this.$route.params.type == 4){
        document.title = '绿城小镇';
      } else {
        document.title = '最新开盘';
      }
      this.param.city = localStorage.cityid;
      this.listData = [];
    },
    getList(){
      var _this = this;
      _this.param.contentValue = this.$route.params.type;
      this.param.city = localStorage.cityid;
      this.common.request.post('/estate/getProjects', this.param).then(data => {
        if (data && data.admProject != null) {
          if(data.admProject.length<10){
            $(".mint-loadmore-bottom").text("更多楼盘, 敬请期待!");
            $('.mint-loadmore-bottom').css('color','#ABABAB');
          }
          // console.log('===data.admProject===', data.admProject)
          if(this.param.pageNo == 1){
            this.listData = data.admProject;
          }else{
            $.each(data.admProject, (i, item) =>{
              this.listData.push(item);
            });
          }
          if(this.param.pageNo == Math.ceil(data.total/10)){
            this.allLoaded = true;
          }
        }
      })
      this.common.request.post('/home/contentList', {cityId: localStorage.cityid}).then(data => {
        _this.picList = [];
        data.forEach(function(item,index){
          if(item.contentConfig == 1){
            if(item.contentType == _this.param.contentValue){
              _this.picList.push(item);
            }
          }
        })
      });
    },
    handleTopChange(){
      this.param.pageNo = 1;
      this.allLoaded = false;
      this.getList(null, ()=>{
        this.$refs.loadmore.onTopLoaded();
      });
    },
    handleBottomChange(){
      this.param.pageNo ++;
      this.getList(null, ()=>{
        this.$refs.loadmore.onBottomLoaded();
      });
    }
  },
  components:{
    'build-list': BuildList,
    'load-more': Loadmore,
  }
}
</script>

<style scoped>
.activity_pic{
  height: 1.875rem;
  position:relative;
}

.activity_pic p{
  position: absolute;
  top: 0;
  font-size: 0.2rem;
  padding: 0.2rem;
}

.container{
  padding-bottom: 0.6rem;
}
</style>
