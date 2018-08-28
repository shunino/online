<template>
  <div>
    <div class="banner" style="position: relative;">
      <swipe v-if='data.length > 0' :auto="4000"  :show-indicators="true">   
        <swipe-item v-for="item in data">
          <a>
            <!--<img v-lazy="fileurl+item.imageWechat" @click="goPage(item.bannerType,item.url)" height="100%"/> -->
            <img v-if="item.imageWechat != null && item.imageWechat !=''" :src="fileurl+item.imageWechat" @click="goPage(item.bannerType,item.url,item.buildingId)" height="100%"/>
          	<img v-else src="../../assets/banner.png" height="100%" width="100%" class="pull-left">
          </a>
        </swipe-item>
      </swipe>
      <swipe v-if='data.length == 0' :auto="4000"  :show-indicators="false">   
        <swipe-item>
          <a>
            <img src="../../assets/banner.png" height="100%" width="100%" class="pull-left">
          </a>
        </swipe-item>
      </swipe>
    </div>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  export default {
  	data(){
  		return {
		     fileurl:config.file_show_url
  		}
  	},
    name: 'banner',
    props: ['data'],
    created(){
    },
    filters: {
	    imgUrl(url) {
	      return config.file_show_url+url;
	    }
    },
    methods: {
      goPage(type,link,buildingId){
        let _this = this;
        let scrollTop = sessionStorage.scrolltop ? sessionStorage.scrolltop : 0;
        switch(type){
          	case "0":
          	 break;
          	case "1":
              _this.$router.push("/buildingdetail/building/"+link + '/' + scrollTop + '/' + buildingId);
          	 break;
          	case "2":
              _this.$router.push("/newsDetail/"+link);
          	 break;
          	case "3":
          	  location.href= 'http://' + link;
          	 break;
          }
      }
    },
    components:{
      'swipe': Swipe,
      'swipe-item': SwipeItem
    }
  }
</script>
<style>
  .banner{
    height: 1.875rem !important;
  }
  .banner img{
    width: 100%;
  }
  .banner .mint-swipe-indicator.is-active{
    opacity: 1 !important;
  }
</style>
