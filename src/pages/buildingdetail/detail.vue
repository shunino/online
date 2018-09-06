<template>
	<div class="build-detail" style="margin-bottom: 0.3rem;">
		<div class="detail-banner">
			<div class="main-pic-wrap"  @click='showBannerPic(album)'>
				<img class="main-pic" v-if="weEstateBanner && weEstateBanner != ''" v-bind:src="weEstateBanner[0]|imgfilter">
				<img class="main-pic" v-else src="../../assets/detai-main-pic.png"> 
        <span class="main-pic-num">1/4</span>
			</div>
			<div class="estate-detail">
				<div class="estate-header">
					<div class="name">
						<div>{{item.projname}}</div>
            <div class="tips_box">
              <span class="tips_left">地铁上盖综合体</span>
              <span class="tips_right">YOUNG系列</span>
            </div>
					</div>
				</div>
				<div class="estate-info">
					<div class="info-item price">
						<span class="info-item-title">均价: </span><span class="bold info-item-content" v-if='item.unitpriceshow && item.unitpriceshow !=null && item.unitpriceshow !=""'>{{item.unitpriceshow}}<span style='font-size:0.16rem;font-weight:500;'>元/㎡</span></span>
						<span v-else  class="bold">暂无价格</span>
						<img class="calculator info-item-arrows" src="../../assets/icon-calculator.png" height="40" width="40" @click='goPage("calculator")'>
					</div>
					<div class="info-item"><span class="info-item-title">开盘:  </span><span class="info-item-content">{{item.bgnsaledate}}</span><span class="info-item-arrows" @click='goPage("newOpening")'>&gt;</span></div>
					<div class="info-item"><span class="info-item-title">地址:  </span><span class="info-item-content">{{item.projectaddress}}</span><span class="info-item-arrows" @click="goPage('surrounding')">&gt;</span></div>
					<div class="info-item"><span class="info-item-title">动态:  </span><span class="info-item-content"><span class="info-item-content-tag">最新</span>{{item.projectaddress}}</span><span class="info-item-arrows" @click="goPage('dynamic')">&gt;</span></div>
				
				</div>
			</div>
		</div>
		<div class="container">
      <div class="detail bundle">
				<p class="d-title"><span>楼盘亮点</span></p>
				<div class='detail-content'>
          <wx-audio></wx-audio>
					<h4 v-if='brightSpots'>{{brightSpots.brightSpotTitle}}</h4>
					<div v-if='brightSpots' class='brightSpotSummary'>{{brightSpots.brightSpotSummary}}</div>
				</div>
        <div class="facility">
          <div class="facility-item">
            <span class="facility-item-pic"><img src="static/images/pause.png" /></span>
            <span class="facility-item-content">
              <span class="title">地铁</span>
              <span class="details">双地铁直达出行更方便</span>
            </span>
          </div>
          <div class="facility-item">
            <span class="facility-item-pic"><img src="static/images/pause.png" /></span>
            <span class="facility-item-content">
              <span class="title">公交</span>
              <span class="details">快速公交快速直达市区</span>
            </span>
          </div>
          <div class="facility-item">
            <span class="facility-item-pic"><img src="static/images/pause.png" /></span>
            <span class="facility-item-content">
              <span class="title">医院</span>
              <span class="details">浙二余杭园区医院配套</span>
            </span>
          </div>
          <div class="facility-item">
            <span class="facility-item-pic"><img src="static/images/pause.png" /></span>
            <span class="facility-item-content">
              <span class="title">商业</span>
              <span class="details">西溪印象城商业综合体</span>
            </span>
          </div>
        </div>
			</div>
			<div id="whjjr" class="agent bundle">
				<p class="d-title"><span>官方经纪人</span></p>
        <div class="tag-wrap">
          <span class="tag">专业服务</span>
          <span class="tag">绿城官方</span>
          <span class="tag">免费咨询</span>
          <span class="tag">户型分析</span>
        </div>
        <div class="agent-content">
            <div class="agent-content-item" v-for="(a, index) in agent" :key="index" v-if="index <= 2">
              <div class="agent-content-item-pic">
                <img v-if="a.photo" v-bind:src="a.photo|imgfilter">
                <img v-else src="../../assets/default-avator.png">
              </div>
              <div class="agent-content-item-name">
                <div class="name">{{a.username}}</div>
                <div class="grade">{{a.username}}</div>
              </div>
              <div class="agent-content-item-tel">
                <img src='static/assets/icon_phone_call@3x.png' />
              </div>
            </div>
            <div class="agent-content-btn" @click="goPage('agent')">
              <div class="agent-content-btn-text">查看全部官方顾问</div>
            </div>
        </div>
        
			</div>
			<div class="house bundle">
				<p class="d-title"><span>户型展示</span><span class="more">更多&gt;</span></p>
				<div class="row content-wrap">
          <div class="content-item" v-for="o in 5" :key="o" @click="goPage('houseTypeList')">
            <div class="pic-wrap">
              <img src="static/huxing.png" />
            </div>
            <div class="text-wrap">
              <span style="margin-right: 0.1rem">五房两卫三厅</span>
              <span><b>182</b>/㎡</span>
            </div>
            <div class="tags-wrap">
              <span class="tag-item">干湿分离</span>
              <span class="tag-item">户型方正</span>
            </div>
          </div>
				</div>
			</div>
			
			<div class='building-info bundle' v-show='item.aerialView'>
				<p class="d-title"><span>楼栋信息</span></p>
				<div class='content-wrap' @click='showBuildingSales'>
					<div class='building-info-wrap'  >
						<div class="building-info-content" id='buildingContent'>
							<img v-if='buildingInfo.aerialView' :src="buildingInfo.aerialView | imgfilter" width="100%" height="100%">
							<img v-else src='../../assets/shapan.png' width="100%" height="100%">
						</div>
					</div>
					<div  class="text-center" style="font-size: 0.15rem; line-height: .48rem;">共1栋在售</div>
					<div class="text-center agent-content-btn-text">查看详细楼栋信息</div>
				</div>
			</div>
			<div class='peripheral bundle'>
				<p class="d-title"><span>周边概况</span><span class="more">更多&gt;</span></p>
        <nav-bar v-model="mapActiveTab" class="nav-detail">
          <tab-item id="公交">公交</tab-item>
          <tab-item id="地铁">地铁</tab-item>
          <tab-item id="医院">医院</tab-item>
          <tab-item id="学校">学校</tab-item>
          <tab-item id="公园">公园</tab-item>
        </nav-bar>
				<div class='content-wrap'>
					<div class='map-pic' id='allmap'></div>
					<div class='map-desc'>免责条款：本网显示房屋位置、交通、医疗教育、商业等配套信息，来源于第三方网络数据，不作为要约，仅供参考，双方具体权利和义务应以法律规定及买卖合同。</div>
				</div>
			</div>
			<div class='building-details bundle'  style="border-bottom:0;">
				<p class="d-title"><span>楼盘详情</span><span class="more">查看全部&gt;</span></p>
				<div class='content-wrap'>
          <div class='d-items'>
						<div class='name'>开&nbsp;&nbsp;发&nbsp;&nbsp;商</div><div class='desc'>{{item.developunitname}}</div>
					</div>
          <div class='d-items'>
						<div class='name'>物业服务</div><div class='desc'>{{item.propertyunitname}}</div>
					</div>
          <div class='d-items'>
						<div class='name'>产权年限</div><div class='desc'>{{item.equity}}</div>
					</div>	
          <div class='d-items'>
						<div class='name'>规划户数</div><div class='desc'>{{item.totalroomnum}}</div>
					</div>					
				</div> 
			</div>
      <div class='building-details bundle'  style="border-bottom:0;">
				<p class="d-title"><span>更多楼盘</span></p>
				<div class='content-wrap'>		
          <my-scroll :builds="builds" />		
				</div> 
			</div>
		</div>
    <my-footer></my-footer>
		<!-- <div class="footer text-center">
      <div style="flex: 2">
        <span class="bottom-left">关注</span>
      </div>
      <div style="flex: 3">
        <span class="bottom-btn">预约看房</span>
      </div>
      <div style="flex: 3">
        <span class="bottom-btn">咨询售楼处</span>
      </div>
		</div> -->
    <!-- 相册大屏 -->
		<div id="overlay-building" class="overlay-building" style="display:none;">
			<div class="text-right" style="padding:10px 10px 0 0;color:#fff;"><span class="icon-close" id='icon-close'></span></div>
			<div class='building-info-wrap' id='building-info-wrap'>
				<div class="building-info-content" id='buildingSale'>
					<img v-if='buildingInfo.aerialView' :src="buildingInfo.aerialView | imgfilter" width="100%" height="100%">
					<img v-else src='../../assets/shapan.png' width="100%" height="100%">
					<div class='building-item' 
						v-for='(item, index) in buildingInfo.buildingInfoList' :key="index"
						:style='{top:item.newYaxis,left:item.newXaxis}' @click='goBuildingInfoDetail(item)'>
						<span class='building-num' v-if='item.buildingStatus == 1' :style='{background:"#3fb9bc",color:"#fff"}'>{{item.buildingName}}</span>
						<span class='building-num' v-if='item.buildingStatus == 2' :style='{background:"#ff8300",color:"#fff"}'>{{item.buildingName}}</span>
						<span class='building-num' v-if='item.buildingStatus == 3' :style='{background:"#f00",color:"#fff"}'>{{item.buildingName}}</span>
						<span v-if='item.buildingStatus == 1'>待售</span>
						<span v-if='item.buildingStatus == 2'>在售</span>
						<span v-if='item.buildingStatus == 3'>售罄</span>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
import { Navbar, TabItem } from "mint-ui";
import { Toast, MessageBox } from "mint-ui";
import wx from "weixin-js-sdk";
import PhotoSwipe from "photoswipe";
import "photoswipe/dist/photoswipe.css";
import util from "../../config/util";

import wxAudio from '@/components/wx-audio/wx-audio.vue'

import Scroll  from '@/components/scroll/scroll.vue';
import footer  from '@/components/footer/footer.vue';

export default {
  mixins: [util],
  data() {
    return {
      showFlag: false,// 是否显示全部置业顾问
      builds: [],// 更多楼栋
      type: this.$route.params.type,
      buildId: this.$route.params.buildId,
      synId: this.$route.params.synId,
      follow: false,
      item: {},
      activeTab: "agent",
      mapActiveTab: '公交',
      agent: [],
      house: [],
      mapObj: null,
      album: [],
      vrView: [],
      weEstateBanner: "",
      news: [
        {
          summary: "二期加推信息",
          date: "2017.05.18"
        },
        {
          summary: "一期进度汇报",
          date: "2017.05.16"
        }
      ],
      dialogShow: false,
      currentAgent: {},
      addressX: "",
      addressY: "",
      projectName: "",
      brightSpots: {},
      buildingInfo: {},
      infoScroll: "",
      shareHouseArea: ""
    };
  },
  created() {
    $(".menu").hide();
    document.title = "楼盘详情";
    this.initData();
  },
  beforeRouteLeave(to, from, next) {
    let mobile = localStorage.getItem("tel");
    let userAgent = this.myBrowser();
    let cookie = this.getCookie("UM_distinctid");
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
    let version = "3.0.0";

    this.common.request
      .logPost("/addLog", {
        logtype: "mobile_visit_time",
        user_id: mobile || null,
        user_agent: userAgent,
        cookie: cookie,
        ip_addr: ip,
        os_type: os_type,
        enter_url: enter_url,
        leave_url: leave_url,
        enter_time: enter_time,
        leave_time: leave_time,
        version: version
      })
      .then(result => {
        //
      });

    $(window).unbind("scroll");
    $("#__previewImage-container")
      .html("")
      .css("transform", "");
    next();
  },
  mounted() {
    this.getRecProjects();

    $(window)
      .unbind("scroll")
      .bind("scroll", this.watchScroll);
    $(window).scrollTop(0);
    if (localStorage.token) {
      this.common.request
        .post("/myHome/searchHistory", {
          buildingId: this.buildId,
          type: 0
        })
        .then(data => {});
    }
    sessionStorage.scrolltop = this.$route.params.scollTop;

    let mobile = localStorage.getItem("tel");
    let userAgent = this.myBrowser();
    let cookie = this.getCookie("UM_distinctid");
    let ip = localStorage.getItem("ip");
    let record_time = new Date();
    record_time = this.formatTime(record_time);
    localStorage.enter_time = record_time;
    let os_type = this.osType();
    let present_url = document.location.href;
    let version = "3.0.0";

    this.common.request
      .logPost("/addLog", {
        logtype: "mobile_visit",
        user_id: mobile || null,
        user_agent: userAgent,
        cookie: cookie,
        ip_addr: ip,
        os_type: os_type,
        present_url: present_url,
        record_time: record_time,
        version: version
      })
      .then(result => {
        //
      });
  },
  filters: {
    formatNewsDate(date) {
      return date ? date.split(" ")[0].replace("-g", ".") : "";
    },
    imgfilter(url) {
      return config.file_show_url + url;
    }
  },
  deactivated() {
    this.$destroy(true);
  },
  methods: {
    initData() {
      var _this = this;
      this.common.request
        .post("/estate/getEstateNews", {
          buildingId: this.synId,
          newsLimit: 2
        })
        .then(data => {
          this.news = data || [];
        });
      this.common.request
        .post("/estate/getProjectInfo", {
          buildingId: this.buildId
        })
        .then(data => {
          this.weEstateBanner = data.weEstateBanner;
          this.item = data ? data.admProject || {} : {};
          this.follow = this.item.attentionFlg;
          this.vrView = data ? data.admEstateView || [] : [];
          this.agent = data ? data.buildingBrokerEntity || [] : [];
          this.house = data ? data.admProjectHousePic || [] : [];
          this.addressX = data ? data.admProject.addressx : "";
          this.addressY = data ? data.admProject.addressy : "";
          this.projectName = data ? data.admProject.projname : "";
          this.album = data ? data.albumTypeList : "";
          this.shareHouseArea = data.houseAreas ? data.houseAreas : "";
          document.title = this.item.projname;
          var param = {
            url: location.href.split("#")[0]
          };
          _this.common.request
            .post("/home/getWxSignature", param)
            .then(data => {
              wx.config({
                //						debug: true,
                appId: data.appid, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.noncestr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: [
                  "checkJsApi",
                  "onMenuShareTimeline",
                  "onMenuShareAppMessage",
                  "onMenuShareQQ",
                  "onMenuShareWeibo",
                  "hideMenuItems",
                  "showMenuItems",
                  "getLocation",
                  "hideOptionMenu",
                  "showOptionMenu",
                  "closeWindow",
                  "scanQRCode",
                  "chooseImage",
                  "previewImage",
                  "uploadImage",
                  "downloadImage"
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });

              wx.ready(function() {
                //分享给朋友
                let begindate =
                  _this.item.bgnsaledate != null &&
                  _this.item.bgnsaledate != "null" &&
                  _this.item.bgnsaledate != ""
                    ? _this.item.bgnsaledate
                    : "暂无日期";
                let priceshow =
                  _this.item.unitpriceshow != null &&
                  _this.item.unitpriceshow != "null" &&
                  _this.item.unitpriceshow != ""
                    ? _this.item.unitpriceshow + "元/㎡"
                    : "暂无价格";
                let addressshow =
                  _this.item.projectaddress != null &&
                  _this.item.projectaddress != "null" &&
                  _this.item.projectaddress != ""
                    ? _this.item.projectaddress
                    : "暂无地址";
                wx.onMenuShareAppMessage({
                  title:
                    _this.item.projname +
                    ",开盘日期：" +
                    begindate +
                    ",均价：" +
                    priceshow,
                  link: location.href,
                  imgUrl: config.file_show_url + _this.weEstateBanner[0],
                  desc:
                    "面积：" + _this.shareHouseArea + "\n地址：" + addressshow,
                  success: function(res) {
                    Toast("分享成功！");
                  },
                  fail: function(res) {
                    Toast(JSON.stringify(res));
                  }
                });
                //分享朋友圈
                wx.onMenuShareTimeline({
                  title:
                    _this.item.projname +
                    ",开盘日期：" +
                    begindate +
                    ",均价：" +
                    priceshow,
                  link: location.href,
                  imgUrl: config.file_show_url + _this.weEstateBanner[0],
                  success: function(res) {
                    Toast("分享成功！");
                  },
                  fail: function(res) {
                    Toast(JSON.stringify(res));
                  }
                });
                //
              });
            });

          this.initMap();
          this.getBrightSpots();

          if (this.item.aerialView) {
            this.getAreaList();
          }
        });

      setTimeout(function() {
        if (localStorage.getItem("type") == "A") {
          $(window).scrollTop(localStorage.getItem("infoScroll") - 200);
        }
      }, 2000);
    },
    statisticalCall() {
      _czc.push([
        "_trackEvent",
        "联系置业顾问",
        "一键呼叫",
        localStorage.tel,
        "1"
      ]);
    },
    watchScroll() {
      let offset = $(window).scrollTop();
      // // debugger
      // function $$offsetTop(className) {
      //   return document.getElementsByClassName(className)[0].offsetTop;
      // }
      // function $$clientHeight(className) {
      //   return document.getElementsByClassName(className)[0].clientHeight;
      // }
      // function $$select(index) {
      //   $(".mint-tab-item")
      //     .eq(index)
      //     .addClass("is-selected")
      //     .siblings()
      //     .removeClass("is-selected");
      // }
      // function $$scrollRange(className) {
      //   return $$offsetTop(className) + $$clientHeight(className) - 80;
      // }
      // if (offset <= $$scrollRange("agent")) {
      //   this.activeTab = "agent";
      //   $$select(0);
      // } else if (offset <= $$scrollRange("detail")) {
      //   this.activeTab = "detail";
      //   $$select(1);
      // } else if (offset <= $$scrollRange("picture")) {
      //   this.activeTab = "picture";
      //   $$select(2);
      // } else if (offset <= $$scrollRange("house")) {
      //   this.activeTab = "house";
      //   $$select(3);
      // } else {
      //   this.activeTab = "house";
      //   $$select(3);
      // }
      let bannerHeight = $(".detail-banner").outerHeight();
      if (offset > bannerHeight) {
        // $(".nav-detail").addClass("is-fixed");
        // $("#whjjr").css("margin-top", 80);
        $(".footer").addClass("is-block");
      } else {
        // $(".nav-detail").removeClass("is-fixed");
        $(".footer").removeClass("is-block");
        // $("#whjjr").css("margin-top", 0);
      }

      this.infoScroll = offset;
    },
    getBrightSpots() {
      this.common.request
        .post("/estate/getBrightSpots", { synId: this.synId, limit: "1" })
        .then(data => {
          this.brightSpots = data ? data[0] : {};
        });
    },
    contactAgent(agent) {
      this.currentAgent = agent;
      this.dialogShow = true;
    },
    closeDialog(e) {
      let _con = $(".dialog-content"); // 设置目标区域
      if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        // Mark 1
        this.dialogShow = false;
      }
    },
    toggleFollow(e, item) {
      e.stopPropagation();
      // if(localStorage.token){
      if (item.attentionFlg) {
        MessageBox.confirm("确定取消收藏?").then(action => {
          this.common.request
            .post("/myHome/deleteAttention", { buildingId: item.projguid })
            .then(data => {
              item.attentionFlg = false;
              setTimeout(function() {
                Toast({
                  message: "取消收藏成功",
                  duration: 1000
                });
              }, 1200);
            });
        });
      } else {
        this.common.request
          .post("/myHome/addAttention", { buildingId: item.projguid })
          .then(data => {
            item.attentionFlg = true;
            setTimeout(function() {
              Toast({
                message: "收藏成功",
                duration: 1000
              });
            }, 1200);
          });
      }
      // }else{
      // 	MessageBox.confirm('您尚未登录，请先进行登录?').then(action => {
      // 	  localStorage.clear();
      // 	  location.href = '#/login';
      // 	}).catch(err =>{
      // 	  console.log(err);
      // 	});
      // }
    },
    doCall(e, call) {
      if (!call) {
        e.preventDefault();
        Toast({
          message: "案场暂无电话",
          duration: 1000
        });
      }
    },
    callAgent() {
      Toast({
        message: "该经纪人暂无电话",
        position: "top",
        duration: 1000
      });
    },
    goPage(page) {
      $(window).unbind("scroll");
      if (page == "order/orderhouse") {
        // $(window).unbind('scroll').bind('scroll', this.watchScroll)
        this.$router.push("/" +page +"/" +this.buildId +"/" +(this.item.isonline || "") +"/" +(this.item.synid || ""));
      } else if (page == "calculator") {
        this.$router.push("/" + page + "/" + this.item.totalpriceshow);
      } else if (page == "buildingnews") {
        this.$router.push("/" + page + "/" + this.buildId + "/" + this.synId);
      } else if (page == "consulting") {
        this.$router.push("/" + page + "/" + this.synId + "/" + this.buildId);
      } else if (page == "newOpening") {
        this.$router.push("/" + page);
      } else if (page == "dynamic") {
        this.$router.push("/" + page);
      } else if (page == "agent") {
        this.$router.push("/" + page + '/' + this.buildId);
      } else if (page == "houseTypeList") {
        this.$router.push("/" + page);
      }else if (page == "surrounding") {
        this.$router.push(
          "/surrounding/" +
            this.projectName +
            "/" +
            this.addressX +
            "/" +
            this.addressY
        );
        }else {
        this.$router.push("/" +page +"/" +this.buildId +"/" +(this.currentAgent.id || "") +"/" +(this.item.projname || "") +"/" +
            (this.currentAgent.synId || "") +"/" +(this.item.isonline || "") +"/" +(this.item.synid || "") +"/" +(this.item.brokerName || ""));
        _czc.push([
          "_trackEvent",
          "联系置业顾问",
          "请联系我",
          localStorage.tel,
          "1"
        ]);
      }
    },
    goNewsDetail(id) {
      this.$router.push("/buildingnewsdetail/" + id);
    },
    showAlbum(item) {
      let param = {
        buildingId: this.synId,
        typeId: item.id
      };
      this.common.request.post("/estate/getAlbumInWe", param).then(data => {
        let list = data.list;
        let items = [];
        let index = data.index;
        $.each(list, function(i, item) {
          items.push(config.file_show_url + item.uriWechat);
        });
        if (items.length == 0) {
          Toast({
            message: "该相册暂无照片",
            duration: 1000
          });
        } else {
          let obj = {
            urls: items,
            current: items[index]
          };
          previewImage.start(obj);
        }
      });
    },
    showBigHouse(index) {
      let items = this.house.map(item => {
        return [config.file_show_url + item.picWechat];
      });
      let obj = {
        urls: items,
        current: items[index]
      };
      previewImage.start(obj);
    },
    showBannerPic(item) {
      let items = [];
      $.each(item, function(index, picList) {
        $.each(picList.photosWe, function(index, pic) {
          if (pic.indexOf("?") > 0) {
            pic = pic.substring(0, pic.indexOf("?"));
          }
          items.push(config.file_show_url + pic);
        });
      });
      if (items.length == 0) {
        Toast({
          message: "该相册暂无照片",
          duration: 1000
        });
      } else {
        let obj = {
          urls: items,
          current: items[0]
        };
        previewImage.start(obj);
      }
    },
    showVrView() {
      Toast({
        message: "敬请期待",
        duration: 1000
      });
    },
    initMap() {
      var _this = this;
      this.mapObj = new BMap.Map("allmap");
      let point = new BMap.Point(this.addressX, this.addressY);
      let marker = new BMap.Marker(point); // 创建标注
      this.mapObj.centerAndZoom(point, 15);
      // this.mapObj.disableDragging();
      this.mapObj.addOverlay(marker);
      let opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMap.Size(10, -30) //设置文本偏移量
      };
      var local = new BMap.LocalSearch(this.mapObj, {renderOptions: {map: this.mapObj}});      
      local.search("银行");
      let label = new BMap.Label(this.projectName, opts); // 创建文本标注对象
      label.setStyle({
        color: "#00B96D",
        fontSize: "12px",
        backGround: "#fff",
        height: "20px",
        lineHeight: "18px",
        fontFamily: "微软雅黑",
        padding: "0 10px",
        border: "1px solid #fff",
        maxWidth: "none"
      });
      this.mapObj.addOverlay(label);
      label.addEventListener("click", function() {
        $(window).unbind("scroll");
        _this.$router.push(
          "/surrounding/" +
            _this.projectName +
            "/" +
            _this.addressX +
            "/" +
            _this.addressY
        );
      });
      this.mapObj.addEventListener("click", function() {
        $(window).unbind("scroll");
        _this.$router.push(
          "/surrounding/" +
            _this.projectName +
            "/" +
            _this.addressX +
            "/" +
            _this.addressY
        );
      });
    },
    getAreaList() {
      //获取鸟瞰图
      var _this = this;
      this.common.request
        .post("/estate/findBuildingAerialList", {
          synId: this.$route.params.synId
        })
        .then(data => {
          $.each(data.buildingInfoList, function(index, item) {
            item.newXaxis = item.xAxisPecent + "%";
            item.newYaxis = item.yAxisPecent + "%";
            return item;
          });
          this.buildingInfo = data;
        });
    },
    goBuildingInfoDetail(item) {
      if (this.item.isDisplay != 0) {
        if (item.buildingStatus == 2) {
          this.$router.push("/buildinginfo/" + item.buildingId + "/" + item.id);
          localStorage.setItem("infoScroll", this.infoScroll);
          localStorage.type = "A";
        } else if (item.buildingStatus == 1) {
          Toast("该楼盘暂未开售!");
        } else {
          Toast("该楼盘已售罄!");
        }
      }
    },
    showBuildingSales() {
      const BUILDWIDTH = 1200,
        BUILDHEIGHT = 475;
      $("#overlay-building").show();
      $("#buildingSale").css({
        width: BUILDWIDTH,
        height: BUILDHEIGHT
      });
      $("#building-info-wrap").css("margin-top", -237.5);
      $("#building-info-wrap").scrollLeft(334);
      $("#overlay-building").on("click", function(e) {
        let _con = $("#building-info-wrap"); // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
          // Mark 1
          $("#overlay-building").hide();
        }
      });

      $("#icon-close").on("click", function(e) {
        $("#overlay-building").hide();
      });
      function getDistance(p1, p2) {
        var x = p2.pageX - p1.pageX,
          y = p2.pageY - p1.pageY;
        return Math.sqrt(x * x + y * y);
      }
      let touch0, touch1, startX;
      $("#buildingSale").on("touchstart", function(e) {
        if (e.originalEvent.targetTouches.length >= 2) {
          touch0 = e.originalEvent.targetTouches[0];
          touch1 = e.originalEvent.targetTouches[1];
          startX = getDistance(touch0, touch1);
        }
      });
      $("#buildingSale").on("touchmove", function(e) {
        if (e.originalEvent.targetTouches.length >= 2) {
          let touch0 = e.originalEvent.targetTouches[0];
          let touch1 = e.originalEvent.targetTouches[1];
          let scale = getDistance(touch0, touch1) / startX;
          let buildingWidth = BUILDWIDTH * scale;
          let buildingHeight = BUILDHEIGHT * scale;
          if (scale > 1) scale = 1;
          if (scale < 0.5) scale = 0.5;
          if (buildingWidth > BUILDWIDTH) {
            buildingWidth = BUILDWIDTH;
            scale = 1;
          }
          if (buildingHeight > BUILDHEIGHT) {
            buildingHeight = BUILDHEIGHT;
            scale = 1;
          }
          if (buildingWidth < BUILDWIDTH / 2) {
            buildingWidth = BUILDWIDTH / 2;
            scale = 1;
          }
          if (buildingHeight < BUILDHEIGHT / 2) {
            buildingHeight = BUILDHEIGHT / 2;
            scale = 1;
          }
          $("#buildingSale").css({
            width: buildingWidth,
            height: buildingHeight
          });
          $("#building-info-wrap").css("margin-top", -buildingHeight / 2);
        }
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
  },
  watch: {
    // activeTab(newValue, oldValue) {
    //   function $$scrollTopValue(className) {
    //     return document.getElementsByClassName(className)[0].offsetTop - 50;
    //   }
    //   if (newValue != oldValue) {
    //     switch (newValue) {
    //       case "agent":
    //         $(window).scrollTop($$scrollTopValue("agent"));
    //         break;
    //       case "picture":
    //         $(window).scrollTop($$scrollTopValue("picture"));
    //         break;
    //       case "house":
    //         $(window).scrollTop($$scrollTopValue("house"));
    //         break;
    //       case "detail":
    //         $(window).scrollTop($$scrollTopValue("detail"));
    //         break;
    //     }
    //   }
    // }
    mapActiveTab(newValue, oldValue) {
      if (newValue != oldValue) {
        console.log(newValue)
      }
    }
  },
  components: {
    "nav-bar": Navbar,
    "tab-item": TabItem,
    wxAudio,
    'my-scroll': Scroll,
    'my-footer': footer
  }
};
</script>
<style scoped>
@import "./detail.css";
* {
  -webkit-overflow-scrolling: touch;
}
.overlay-building {
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  height: 100%;
  width: 100%;
}
.overlay-building .building-info-wrap {
  height: auto;
  width: 100%;
  position: absolute;
  top: 50%;
  margin-top: -237.5px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>