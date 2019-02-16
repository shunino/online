import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import App from './App.vue';
import routes from './config/routes';
import Menu from './components/menu/menu.vue';
import VueKeepScrollPlugin from "vue-keep-scroll-plugin";
import store from './store/store'

// import axios from 'axios';
// import VueAxios from 'vue-axios';
import common from './config/common';
import cityletter from './config/cityletter';
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: 'http://cdn.uehtml.com/201402/1392662591495_1140x0.gif',
  attempt: 1,
  listenEvents: [ 'scroll', 'mousewheel' ]
});

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
Vue.use(VueKeepScrollPlugin); 
Vue.prototype.common = common;
Vue.prototype.cityletter = cityletter;
Vue.prototype.setCurrentCity = (cid, cname) => {
	localStorage.cityid=cid;
	localStorage.cityname=cname;
}
Vue.component('Menu', Menu);

//const scrollBehavior = (to, from, savedPosition) => {
//	console(savedPosition);
//	 return {x:0,y:1000};
//}
// Vue.use(VueAxios, axios);
const router = new VueRouter( {
	// mode: 'history',
//scrollBehavior,
//saveScrollPosition: true,
  routes
});

new Vue({
	
  router,
  el: '#app',
  store,
  render: (h) => h(App)
});
