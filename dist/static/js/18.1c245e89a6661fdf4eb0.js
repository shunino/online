webpackJsonp([18],{100:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAYAAAAFQMh/AAAAAXNSR0IArs4c6QAABOhJREFUSA2tVmtoXEUU/uZmN2XrtiFCKtFGayUFbS0SglhBJZqY7AYF//VHa4tV00dotLubZCOabUWaZDcFqaVYkIZWimJLKpq7eQiirRFb/whWaqSP9KVE8UFimmz23vGbu91bbrKJeexAsnPOnPm+c86cOXcEJg89EKCqDlJcgubaBF/L5ckm2ZCFA0QPfACJlyBEElK6IPArFmEdnmkfdNhlQdBsDD34ZooUA8jBKupbKBdiTJxE/z6PbZelSYq4u/5RRthMzD/gdlWgMnYJ1e1hRn4ckI/g7+utWeKzYVLEpvEuNTnQtO2oaL1ir7pzXma6r1KuhXIui0NDd7CcKX2M0X0LX/QTB3ZF6z+Ua7guoJyT0lkTDuO5CRoMbLK2aHgr41Z/e5xO6ZZzPcENGW3modQgJKPFOIq8X0+7X2i7rEo3BAswO1HzjMVyRnMeqyOJaYl9bT9zrZOFVozeUFbOWmMENwh6z4yR6KEHaFNgOWaIPOt3gf/YJMQZkq5nkZUS66wDr68hDwmDV0luoY2y/QYo+sphM0+BqZYnrL2m2DIFYyJ5hOs11P8FDbtwn/dp+HeOT7Gbh0LgXCQXg8OX2Zvz4ML9bB5DNo4evM5I85HrKuT9Vlcra0NLFZVgA5GLkcQbDmQpeyl7kDSec+izIDDVHMu8+3l+N3i1tqGr4WEbVyDKucGq34ue4B22PguTFHFpZJR3OUACN4TRgS8jLgvb3/4THTrIdC+HIWJZ4LMhUsRK9MU+IvlJkpTg5r/1toXHG+b8IqS5FfH65239Aie3iRWQR9tG8j9J3szUrrGwyyIjcLk2cs6UG0fRV/+gpV/gPydxWfQ3praOhZYLQ3biVGO+hV/Z2g+hvc6jWMp7/Tn6Gu6dlldGNMQbV9D5GT8omRf14CFufIXt9Ass9vpQFklaRF3BA3RqO7Nylb6Vo3rvgMMBPVwAOcEGI1VWLvLu70FV7AiDkQ47Cs6I06vLineQ9BQBynFzeF9aDX+0lqT7GXkRkPgOesBnr1mTid0WqeArBlgJEx3Qg6fRFVYvGsfIHLEyUd4jwXaKFfSvFtVRRntr6KEmZuRtS1JXzuONIDGylMdzhboheJasxPhoCUxT3YgSBjFKPTFih28h0P+ZRjy4ll6f5v32knwHIz5om8dDfpjyQ0aYz1ReoH6AJMyACJAglSV1LUdHQtzfzAAW0e49+Lx1EBFzZmLF0hN4kvXcxY1ePo3CfKW02OTdTYUwEwdI+EJKJwZZE2tYEyO2jZqoZ5NpHLeOSIhjxNjw/8S3N8a58U563Qp/rNEJHCqhc+u49in8bdcca2mht/5utt5eYqxmVppmR6w2q3ttsHerJy/EUdzl3QrV8eYyVIaMxDmmfixzVWcCq4z9yHN+InWeciOGhs/MvZkki1hVS+j4tdkTK2f80Qus4FKSd1opmzDPQg+9mMnPKTr18THNz1gPLl7i3bNP9WQkPfgaK7qNDrgZQTfcYieejf4y2cyS46HN7PV8HrPzCTTD375n/sQK0apW8zCjeIiSQQeOQcs5hCpPP9As+VF5nM69w/WnrHWhNTJr1lduYcSK/Pv33fh9oJYvmDAJUg9CIcYsIinT3/DzyNFeRVWU3TA1Fk6cRlIPBRPrrT+BtXSCb3b8wHroQEHxxyitmUibqt//APIIrjtSbPDjAAAAAElFTkSuQmCC"},158:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o(0),r=(o.n(i),o(21));e.default={name:"process",mixins:[r.a],data:function(){return{tel:"",advice:""}},created:function(){document.title="意见反馈",this.tel=localStorage.tel},mounted:function(){var t=localStorage.getItem("tel"),e=this.myBrowser(),o=this.getCookie("UM_distinctid"),i=localStorage.getItem("ip"),r=new Date;r=this.formatTime(r),localStorage.enter_time=r;var n=this.osType(),a=document.location.href;this.common.request.logPost("/addLog",{logtype:"mobile_visit",user_id:t||null,user_agent:e,cookie:o,ip_addr:i,os_type:n,present_url:a,record_time:r,version:"3.0.0"}).then(function(t){})},beforeRouteLeave:function(t,e,o){var i=localStorage.getItem("tel"),r=this.myBrowser(),n=this.getCookie("UM_distinctid"),a=localStorage.getItem("ip"),s=this.osType(),l=localStorage.getItem("enter_time"),d=new Date;d=this.formatTime(d);var c=window.location.host+t.path,m=window.location.href;m.indexOf("?")>0&&(m=m.substr(0,m.indexOf("?")));this.common.request.logPost("/addLog",{logtype:"mobile_visit_time",user_id:i||null,user_agent:r,cookie:n,ip_addr:a,os_type:s,enter_url:c,leave_url:m,enter_time:l,leave_time:d,version:"3.0.0"}).then(function(t){}),o()},deactivated:function(){this.$destroy(!0)},methods:{submit:function(){var t=this;if(""==this.tel||!/^1[1-9]\d{9}$/.test(this.tel))return void o.i(i.Toast)("请填写正确的手机号");var e={tel:this.tel,title:"意见反馈",content:this.advice};this.common.request.post("/myHome/feedback",e).then(function(e){o.i(i.Toast)("您的意见我们会积极采纳,感谢您的参与!"),t.$router.go(-1)})}},components:{"mt-header":i.Header,"mt-button":i.Button}}},191:function(t,e,o){e=t.exports=o(55)(!1),e.i(o(223),""),e.push([t.i,"",""])},223:function(t,e,o){e=t.exports=o(55)(!1),e.push([t.i,".suggest{font-family:\\\\5FAE\\8F6F\\96C5\\9ED1;padding:0 .2rem}.mint-header{background:#fff!important;color:#000!important;border-bottom:1px solid #d1d1d1}.mint-header-title{font-size:20px;padding-bottom:10px}.mint-header .mint-button{font-size:.2rem;font-weight:400;padding-top:8px}.suggest-content{border:1px solid #d1d1d1;display:block;width:100%;margin:.2rem auto .4rem;resize:none;border-radius:0;outline:none;-webkit-appearance:none}.title{font-size:.2rem;line-height:.6rem}label{font-weight:400}.title img{height:.2rem;margin-right:.1rem}.inputbox{width:100%;height:.6rem;border-top:none;border-top:1px solid #f2f2f2;border-bottom:1px solid #f2f2f2}.inputbox input{height:.6rem;background:none;border:none}.btn{padding:10px}.btn-primary,.btn-primary:hover{background:#37ab6a;border:1px solid #37ab6a}.submit_btn{font-size:14px;line-height:40px;border-radius:5px;display:block;height:40px;text-align:center;background:#00b96d;color:#fff;margin-top:.5rem}.submit_btn:hover{color:#fff}",""])},255:function(t,e,o){var i=o(191);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o(56)("495f9f7d",i,!0)},349:function(t,e,o){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"suggest"},[o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.advice,expression:"advice"}],staticClass:"suggest-content",attrs:{placeholder:"请留下您的宝贵意见，我们将尽快解决。",rows:"8"},domProps:{value:t.advice},on:{input:function(e){e.target.composing||(t.advice=e.target.value)}}}),t._v(" "),o("div",{staticClass:"inputbox title"},[t._m(0),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],staticClass:"col-xs-7 text-right",domProps:{value:t.tel},on:{input:function(e){e.target.composing||(t.tel=e.target.value)}}})]),t._v(" "),o("a",{staticClass:"submit_btn",attrs:{href:"javascript:void(0)",type:"button"},on:{click:t.submit}},[t._v("提交")])])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"col-xs-5"},[i("img",{attrs:{src:o(100)}}),t._v("\n\t\t\t\t电话\n\t\t\t")])}]}},88:function(t,e,o){function i(t){o(255)}var r=o(7)(o(158),o(349),i,"data-v-cf82e56e",null);t.exports=r.exports}});