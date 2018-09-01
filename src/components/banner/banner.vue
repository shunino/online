<template>
  <div>
    <div class="banner" style="position: relative;" v-bind:style="{height:height,width:width}">
      <!-- <swipe v-if='data.length > 0' :auto="4000"  :show-indicators="true">   
        <swipe-item v-for="item in data">
          <a>
            
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
      </swipe> -->

      <swipe  :auto="4000"  :show-indicators="true">   
        <swipe-item>
          <a>
            <img src="../../assets/banner.png" height="100%" width="100%" class="pull-left">
          </a>
        </swipe-item>
        <swipe-item>
          <a>
            <img src="../../assets/pic1.png" height="100%" width="100%" class="pull-left">
          </a>
        </swipe-item>
      </swipe>
    </div>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  export default {
    name: 'banner',
    props: ['data','width','height'],
    created(){
    },
    mounted(){
      $('')
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
  .banner img{
    width: 100%;
  }
  .content .mint-swipe-indicators .is-active {
    background: #0EB375 !important;
  }
  .content .mint-swipe-indicator {
    width: 17px !important;
    height: 4px !important;
    background: #F4F4F5 !important;
    opacity: 1;
    border-radius: 100px !important;
    margin: 0 3px;
  }
  .no_margin{
    margin:0 !important;
  }
  .no_margin .mint-swipe-indicator {
    width: 17px !important;
    height: 4px !important;
    background: #F4F4F5 !important;
    opacity: 1;
    border-radius: 100px !important;
    margin: 0px !important;
  }
  .banner .mint-swipe-indicator.is-active{
    opacity: 1 !important;
  }
</style>
