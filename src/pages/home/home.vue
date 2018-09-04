<template>
  <div class="home">
    <my-search />
    <div class="search_pass">
      <div class='content'>
        <my-banner height="1.9075rem" width="3.39rem" :data="banner1" />
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
        <my-banner height="0.955rem" width="3.75rem" :data="banner2" />
      </div>
      <my-title name="房产资讯" />
      <div class="home_new">
        <my-information />
      </div>
      <div style="height: 0.55rem;margin-top: 0.2365rem;"></div>
    </div>
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
import Searchfilter  from '../../components/searchfilter/searchfilter.vue';
export default {
  mixins: [util],
  data(){
    return {
      city:'',
      remyId:'',
      cities:[],
      isWechat: true,
      builds: [],
      banner1:[],
      banner2:[]
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm =>{
      vm.InitHome();
      // // vm.getNewList();

      // if(!(window.location.hash.split("?")[1]) ){
      //   vm.checkUser();
      // }
      // setTimeout(function(){
      //     if((!!window.location.hash.split("?")[1] && window.location.hash.split("?")[1].indexOf("onClient") > -1) && sessionStorage.getItem("initNum") == "1"){
      //         vm.checkUser();
      //     }
      // },1000)
    })
  },
  created(){
    $('.mint-indicator-mask').hide();
    $('.mint-indicator-wrapper').hide();
  },
  methods:{
    InitHome(){
      let self = this;
      let parms = {
        pageLimit:4
      }
      this.common.request.post('/home/banner/list', parms).then(data => {
             self.banner1 = data.pageListData; 
      });  

      this.common.request.get('/recommend/selectRecProjects').then(data => {
        self.builds = data;
        if (self.builds) {
          for (var i in self.builds) {
            if (self.builds[i].salepoint) {
              self.builds[i].salepoint = self.builds[i].salepoint.split("、");
            }
          }
        }
      });
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
    'my-search':Search,
    'my-searchfilter':Searchfilter
  }
}
</script>

<style scoped>
@import './home.css';
</style>
