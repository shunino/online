webpackJsonp([23],{153:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){var o=i(0),n=(i.n(o),i(21));e.default={mixins:[n.a],data:function(){return{param:{buildingId:this.$route.params.synId,buildingName:this.$route.params.buildingName,title:"",content:""},question:""}},created:function(){},mounted:function(){var t=localStorage.getItem("tel"),e=this.myBrowser(),i=this.getCookie("UM_distinctid"),o=localStorage.getItem("ip"),n=new Date;n=this.formatTime(n),localStorage.enter_time=n;var r=this.osType(),a=document.location.href;this.common.request.logPost("/addLog",{logtype:"mobile_visit",user_id:t||null,user_agent:e,cookie:i,ip_addr:o,os_type:r,present_url:a,record_time:n,version:"3.0.0"}).then(function(t){})},beforeRouteEnter:function(t,e,i){i(function(t){t.updateStatus()})},beforeRouteLeave:function(t,e,i){var o=localStorage.getItem("tel"),n=this.myBrowser(),r=this.getCookie("UM_distinctid"),a=localStorage.getItem("ip"),s=this.osType(),u=localStorage.getItem("enter_time"),d=new Date;d=this.formatTime(d);var l=window.location.host+t.path,m=window.location.href;m.indexOf("?")>0&&(m=m.substr(0,m.indexOf("?")));this.common.request.logPost("/addLog",{logtype:"mobile_visit_time",user_id:o||null,user_agent:n,cookie:r,ip_addr:a,os_type:s,enter_url:l,leave_url:m,enter_time:u,leave_time:d,version:"3.0.0"}).then(function(t){}),i()},methods:{updateStatus:function(){document.title="我要提问",this.param.buildingName=this.$route.params.buildingName,this.param.buildingId=this.$route.params.synId,t(".menu").hide()},submit:function(){var t=this;if(""==this.question)return void i.i(o.Toast)("请输入问题描述!");this.param.title=this.asktitle,this.param.content=this.question,this.common.request.post("/advisor/addAdvisory",this.param).then(function(e){setTimeout(function(){i.i(o.Toast)({message:"咨询成功",duration:1e3})},2e3),setTimeout(function(){t.$router.push("/consulting/"+t.$route.params.synId+"/"+t.$route.params.buildingId)},1e3)})}}}}.call(e,i(3))},172:function(t,e,i){e=t.exports=i(55)(!1),e.i(i(219),""),e.push([t.i,"",""])},219:function(t,e,i){e=t.exports=i(55)(!1),e.push([t.i,".question{font-family:\\\\5FAE\\8F6F\\96C5\\9ED1;padding:0 .2rem}.ask-title{margin:.2rem}.ask-title input{width:100%;border:1px solid #d1d1d1}.mint-header{background:#fff!important;color:#000!important;border-bottom:1px solid #d1d1d1}.mint-header-title{font-size:20px;padding-bottom:10px}.mint-header .mint-button{font-size:.2rem;font-weight:400;padding-top:8px}.question-content{border:1px solid #d1d1d1;display:block;width:100%;margin:.2rem auto;resize:none;border-radius:0;outline:none;-webkit-appearance:none}.title{font-size:.2rem;line-height:.6rem}label{font-weight:400}.title img{height:.2rem;margin-right:.1rem}.inputbox{width:100%;height:.6rem;border-top:none}.inputbox input{height:.6rem;background:none;border:none}.btn{padding:10px}.btn-primary,.btn-primary:hover{background:#37ab6a;border:1px solid #37ab6a}.submit_btn{font-size:14px;line-height:40px;border-radius:5px;display:block;height:40px;text-align:center;background:#00b96d;color:#fff;margin-top:.2rem}.submit_btn:hover{color:#fff}.tel,.tel-num{font-size:.2rem}.tel-num{padding:0 .1rem}",""])},236:function(t,e,i){var o=i(172);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);i(56)("f65c0410",o,!0)},330:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"question"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.question,expression:"question"}],staticClass:"question-content",attrs:{placeholder:"请在此输入您的问题，我们将竭尽全力为您解答!",rows:"8"},domProps:{value:t.question},on:{input:function(e){e.target.composing||(t.question=e.target.value)}}}),t._v(" "),i("a",{staticClass:"submit_btn",attrs:{href:"javascript:void(0)",type:"button"},on:{click:t.submit}},[t._v("提交")])])},staticRenderFns:[]}},83:function(t,e,i){function o(t){i(236)}var n=i(7)(i(153),i(330),o,"data-v-321cc03f",null);t.exports=n.exports}});