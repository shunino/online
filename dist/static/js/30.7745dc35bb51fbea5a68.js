webpackJsonp([30],{159:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){var o=a(21);t.default={mixins:[o.a],data:function(){return{mapObj:{},projectName:this.$route.params.projectName,addressX:this.$route.params.addressx,addressY:this.$route.params.addressy}},created:function(){e(".menu").show(),document.title="周边概况"},mounted:function(){var e=localStorage.getItem("tel"),t=this.myBrowser(),a=this.getCookie("UM_distinctid"),o=localStorage.getItem("ip"),i=new Date;i=this.formatTime(i),localStorage.enter_time=i;var r=this.osType(),s=document.location.href;this.common.request.logPost("/addLog",{logtype:"mobile_visit",user_id:e||null,user_agent:t,cookie:a,ip_addr:o,os_type:r,present_url:s,record_time:i,version:"3.0.0"}).then(function(e){})},beforeRouteEnter:function(e,t,a){a(function(e){e.initMap()})},beforeRouteLeave:function(e,t,a){var o=localStorage.getItem("tel"),i=this.myBrowser(),r=this.getCookie("UM_distinctid"),s=localStorage.getItem("ip"),n=this.osType(),d=localStorage.getItem("enter_time"),l=new Date;l=this.formatTime(l);var p=window.location.host+e.path,c=window.location.href;c.indexOf("?")>0&&(c=c.substr(0,c.indexOf("?")));this.common.request.logPost("/addLog",{logtype:"mobile_visit_time",user_id:o||null,user_agent:i,cookie:r,ip_addr:s,os_type:n,enter_url:p,leave_url:c,enter_time:d,leave_time:l,version:"3.0.0"}).then(function(e){}),a()},watch:{$route:["updateParams"]},methods:{updateParams:function(){this.projectName=this.$route.params.projectName,this.addressX=this.$route.params.addressx,this.addressY=this.$route.params.addressy},initMap:function(){this.mapObj=new BMap.Map("allmap");var e=new BMap.Point(this.addressX,this.addressY),t=new BMap.Marker(e);this.mapObj.centerAndZoom(e,15),this.mapObj.addOverlay(t);var a={position:e,offset:new BMap.Size(10,-30)},o=new BMap.Label(this.projectName,a);o.setStyle({color:"#00B96D",fontSize:"12px",backGround:"#fff",height:"20px",lineHeight:"18px",fontFamily:"微软雅黑",padding:"0 10px",border:"1px solid #fff",maxWidth:"none"}),this.mapObj.addOverlay(o)}}}}.call(t,a(3))},178:function(e,t,a){t=e.exports=a(55)(!1),t.push([e.i,"#allmap[data-v-4f6af0ee]{width:100%;height:100%;padding-bottom:.48rem}",""])},242:function(e,t,a){var o=a(178);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a(56)("e7fac330",o,!0)},336:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{attrs:{id:"allmap"}})},staticRenderFns:[]}},89:function(e,t,a){function o(e){a(242)}var i=a(7)(a(159),a(336),o,"data-v-4f6af0ee",null);e.exports=i.exports}});