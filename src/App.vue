<template>
	<div id="main">
		
		<keep-alive>
			<router-view>
			</router-view>
		</keep-alive>

		<!--</transition>-->
	
		<ul class="menu" v-if="bshow">
			<li class="home" :class="active == 'home' ? 'active' : ''" @click="goPage('home')">首页</li>
			<li class="building" :class="active == 'houses' ? 'active' : ''" @click="goPage('building')">楼盘</li>
			<!-- <li class="consulting" :class="active == 'consulting' ? 'active' : ''" @click="goPage('consulting')">资讯</li> -->

			<li class="information" :class="active == 'information' ? 'active' : ''" @click="goPage('information')">资讯</li>
			<li class="personal" :class="active == 'personal' ? 'active' : ''" @click="goPage('personal')">我的</li>
		</ul>
	</div>
</template>

<script>
	import "mint-ui/lib/style.min.css";
	import util  from './config/util';
	export default {
		mixins: [util],
		data() {
			return {
				active: "home",
				bshow: false
			}
		},

		mounted() {
			if(!window.location.hash.split("?")[1]){
				this.bshow = true;
			}
			document.oncontextmenu=new Function("event.returnValue=false"); 
	        document.onselectstart=new Function("event.returnValue=false"); 
		},
		methods: {
			goPage: function(key) {
                let mobile = localStorage.getItem("tel");
				let userAgent = this.myBrowser();
				let cookie = this.getCookie('UM_distinctid');
				let ip = localStorage.getItem("ip");
				let record_time = new Date();
				record_time = this.formatTime(record_time);     localStorage.enter_time = record_time;
				let os_type = this.osType();
				let type = 'hometab001';
				let version = '3.0.0';

				if (key == 'building') {
					type = 'hometab002'
				} else if (key == 'information') {
					type = 'hometab003'
				} else if (key == 'personal') {
					type = 'hometab004'
				} else {
					type = 'hometab001'
				}

				this.common.request.logPost('/addLog', {
					logtype: 'mobile_homepage_tab',
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

				this.$router.push('/' + key);
				sessionStorage.clear();	
				$('#main').scrollTop(0);
			}
		},
		watch: {
			"$route": function() {
				
				var routerurl = location.href;
				if(routerurl.indexOf("home") > 0 || routerurl.indexOf("building") > 0 || routerurl.indexOf("information") > 0 || routerurl.indexOf("personal") > 0) {
					if(routerurl.indexOf("home") > 0) {
						document.title="首页";
						this.active = "home";
					}
					if(routerurl.indexOf("building") > 0) {
						document.title="楼盘";
						this.active = "houses";
					}
					if(routerurl.indexOf("information") > 0) {
						document.title="资讯";
						this.active = "information";
					}
					if(routerurl.indexOf("personal") > 0) {
						document.title="我的";
						this.active = "personal";
					}
					$(".menu").show();
				}
			}
		},
		created() {
			if(localStorage.lastDate) {
				let mill = localStorage.lastDate;
				let now = new Date().valueOf();
				let offset = new Date().setHours(0, 0, 0, 0);
				if(now - offset < 24 * 60 * 60 * 1000) {
					//today, do nothing
				} else if(offset - mill < 24 * 60 * 60 * 1000) {
					//yesterday, combo
					localStorage.lastDate = now;
					localStorage.comboDays = parseInt(localStorage.comboDays) + 1;
				} else {
					//yesterday before, reset
					localStorage.lastDate = now;
					localStorage.comboDays = 1;
				}
			} else {
				localStorage.lastDate = new Date().valueOf();
				localStorage.comboDays = 1;
			}


		},
		components: {}
	}
</script>

<style>
	@import "../vendor/bootstrap/bootstrap.css";
	@import "../vendor/slicons/css/simple-line-icons.css";
	@import "../vendor/fontawesome/css/font-awesome.min.css";
	@import "../static/zoom.css";
	@import "components/menu/menu.css";
	.app-enter-active {
		/*transition: opacity 0.3s;*/
		transition: all .2s ease;
	}
	
	.app-enter {
		transform: translateX(100%);
		opacity: 0;
	}
	
	.no-data {
		padding-top: 0.2rem;
		font-size: 0.2rem;
	}
	
	.mint-toast {
		z-index: 9999 !important;
	}

	body{
		-webkit-overflow-scrolling:touch;
	}
	
	#main {
		height: 100%;
		padding-bottom: 0.48rem;
		-webkit-overflow-scrolling:touch;
	}
</style>