<template>
	<div class="setting">
		<div class="inputbox">
			<h5>头像</h5>
			<span class="input-right">
				<form id="uploadForm" enctype="multipart/form-data" style="display: inline-block;">
					<input name="file" id="imgupload" @change="onFileChange" type="file" accept="image/jpeg,image/jpg,image/png" style="display: none;"/>

					<img v-if='imgname !=null && imgname !="null" && imgname !=""' @click="pickimg" :src="imgname|imgUrl" style="height: .5rem;width:.5rem;border-radius: 50%;"/>
					<img v-else @click="pickimg" src="../../assets/default-avatar.jpg" style="width:.5rem;height: .5rem;border-radius: 50%;"/>
					<i class="icon-arrow-right" style="color: #a9a9a9;"></i>
                </form>
	 			
	 		</span>
		</div>
		<div class="inputbox">
			<h5 class="">昵称</h5>
			<span class="input-right">
	 			<input class="text-right" placeholder="请输入您的昵称" style="line-height: 50px;width:80%;font-size: 14px;" v-model="name">
				<i class="icon-arrow-right" style="color: #a9a9a9;"></i>
	 		</span>
		</div>
		<div class="inputbox">
			<h5>密码</h5>
			<span class="input-right">
	 			<span class="text-right"style="line-height: 50px;width:80%;position:relative;top:1px;font-size: 14px;" @click="gotoPage('/modifypwd')">修改密码</span>
				<i class="icon-arrow-right" style="color: #a9a9a9;position:relative;top:1px;"></i>
	 		</span>
		</div>
		<div class="inputbox">
			<h5>手机号</h5>
			<span class="input-right">
	 			<input class="text-right" disabled placeholder="请输入您的手机号" style="line-height: 50px;width:80%;font-size: 14px;" v-model="tel">
				<!-- <i class="icon-arrow-right" style="color: #a9a9a9;"></i> -->
	 		</span>
		</div>
        
        	<a href="javascript:void(0)" style="color: white;text-align:center;background:#00B96D;display:block;height:40px;line-height:40px;;margin-left:15%;margin-top: .5rem;width: 70%;border-radius: 5px;" @click="submit">保存</a>
        	<a href="javascript:void(0)" style="color:#00B96D;text-align:center;display:block;height:40px;line-height:40px;font-size：14px;margin-left:15%;margin-top: .2rem;width: 70%;border-radius: 5px;border:1px solid #00B96D;" @click="logout">退出</a>
		
		
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Field } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import util  from '../../config/util';
	export default {
		name: "setting",
		mixins: [util],
		data() {
			return {
				tel: "",
				name: "",
				imgname: "",
				images: ""

			}
		},
		deactivated(){
		    this.$destroy(true)
		},
		created() {
			 $(".menu").hide();
			document.title = "个人设置";
			this.imgname= (localStorage.headimg !=null && localStorage.headimg != "null" ) ? localStorage.headimg : "";
			this.name = (localStorage.nickName=="null"?"" :localStorage.nickName );
			this.tel = localStorage.tel;
		},
		mounted() {
			let mobile = localStorage.getItem("tel");
			let userAgent = this.myBrowser();
			let cookie = this.getCookie('UM_distinctid');
			let ip = localStorage.getItem("ip");
			let record_time = new Date();
			record_time = this.formatTime(record_time);     localStorage.enter_time = record_time;
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
		filters:{
			imgUrl(url){
				return config.file_show_url+url;
			}
		},
		methods: {
            gotoPage(page){
            	this.$router.push(page);
            },
			submit() {
				// if(this.tel == "" || !(/^1[1-9]\d{9}$/).test(this.tel)) {
				// 	Toast('请填写正确的手机号');
				// 	return;
				// }

				if(this.name == "") {
					Toast('请输入昵称');
					return;
				}
				var param = {
					"id": localStorage.userId,
					"head": this.imgname,
					"nickName": this.name,
					"tel": this.tel

				};
				this.common.request.post("/myHome/modifyPersonalInfo", param).then(data => {
					localStorage.nickName = this.name;
					localStorage.tel = this.tel;
					setTimeout(function(){
						Toast({
							message: '修改个人信息成功',
							duration: 1000
						});
					},1000)
					setTimeout(() => {
						this.$router.push("/personal");
					}, 2000);
				});

			},
			components: {
				"mt-field": Field
			},
			logout() {
				MessageBox.confirm('确定退出吗？').then(action => {
					this.common.request.post("/wechat/logout/"+localStorage.token).then(data => {
						var  cityname=localStorage.cityname;
						localStorage.clear();
						localStorage.changecity=false;
						localStorage.cityname=cityname;
						this.common.request.setToken("");
						this.$router.push("/login");
					});
				}).catch(err =>{
					console.log(err);
				})
			},
			pickimg() {
				$("#imgupload").click();
			},
			
			onFileChange(e) {
				var _this = this;
				var files = e.target.files || e.dataTransfer.files;
				
				if(!files.length) return;
				var patn = /\.jpg$|\.jpeg$|\.png$|\.gif$/i;
				if(!patn.test($("#imgupload").val())) {
					Toast("请选择合适格式的图片");
					$("#imgupload").val("");
					return;
				}
				var formData = new FormData();
				formData.append('filename', files[0].name);
				formData.append('file',  files[0]);
				Indicator.open('正在上传');
				console.log(formData)
				$.ajax({
				    url: config.server + "/wechat/fileupload",
				    type: 'POST',
				    cache: false,
				    data: formData,
				    processData: false,
				    contentType: false,
				    beforeSend:(req)=>{
				      if( localStorage.token){
				        req.setRequestHeader("AuthorizationToken", localStorage.token);
				      }
				    }
				}).done(function(res) {
					Indicator.close();
					if(res.result){
						_this.imgname=res.value;
						localStorage.headimg=_this.imgname;
					}else{
						Toast(res.objValue);
					}
					
				}).fail(function(res) {
					Indicator.close();
					Toast("图片上传失败!");
				});
			}
		}
	}
</script>

<style scoped>
	@import "./setting.css";
</style>