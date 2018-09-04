<template>
  <div class="searchfilter_box">
   <div class='my_search' @click="searchHover()">
        <div class="city">杭州<img src="../../assets/search_up.png" ></div>
        <mt-search
          v-model="value"
          cancel-text="取消"
          placeholder="搜索"
          @keyup.native.enter="search(value)"
          >
        </mt-search>
        <div class='filter' v-on:click.stop="filter()" ><img src="../../assets/icon-filter.png"></div>
  </div>
  <div class="search_recommend">
    <div class="local">
      <div class="title">本地楼盘<img @click="delRecommend()" class="search_del" src="../../assets/search_del.png" > </div>
      <div class="local_list">
        <span class="search_tag" @click="searchTag($event)"><span class="tag_txt">dfdfd</span><img v-on:click.stop="delTag($event)" class="search_dell" src="../../assets/search_dell.png" ></span>
      </div>
    </div>
    <div class="hot">
      <div class="title">热门推荐</div>
      <div class="hot_list">
        <span class="search_tag" @click="searchTag($event)"><span class="tag_txt">dfdfd</span></span>
      </div>
    </div>
  </div>
  <my-filter :showFilter="showFilter" v-on:filterStatusChange="filterStatusChange" :data="filterData"></my-filter>
</div>
</template>
<script>
import { Search } from 'mint-ui';
import Filter from '../../components/filter/filter.vue';
  export default {
    name: 'searchfilter',
    props: [],
    data(){
      return {
        showFilter:false,
        filterData:[]
      }
    },
    methods: {
      goto:function(link){
        
      },
      searchHover:function(){
        if($('.searchfilter_box .my_search .mint-searchbar-cancel').is(':visible')){
          $('.search_recommend').hide();
          $('.search_pass').show();
          $('.searchfilter_box .my_search .mint-search').css({width:'2.80rem'});
        }else{
          $('.searchfilter_box .my_search .mint-search').css({width:'3.66rem'});
          $('.search_recommend').show();
          $('.search_tag').show();
          $('.search_pass').hide();
        }  
      },
      search:function(val){
        alert(val);
      },
      delRecommend:function(){
        $('.search_recommend').hide();
      },
      delTag:function(em){
        em.stopPropagation;
        var e = em.currentTarget;
        $(e).parent().hide();
      },
      searchTag:function(em){
        var e = em.currentTarget;
        var txt = $(e).find('.tag_txt').text();
        console.log(txt);
      },
      filter:function(){
        console.log('ddd');
        console.log(this);
        console.log(this.showFilter);
        this.showFilter = true;
      },
      filterStatusChange:function(val){
        this.showFilter = val;
      },
      loadData(params, cb){
        console.log(params);
        console.log(cb);
        return;
        // if(params){
        //   $.extend(this.searchParams, params);
        // }
        // var _this=this;

        // if(localStorage.cityid){
          
        //   this.searchParams.city = localStorage.cityid
        //   this.common.request.post('/home/bannerList', {cityId:  localStorage.cityid}).then(data => {
        //       this.bannerResource = data;
        //   });
          
        //   // this.getContentList();
        //   // this.getActivityList();
        //   this.getProjectList();
        //   this.getAreaList();
        // }
        // if(cb){
        //   cb();
        //}
      }
    },
    components:{
    'mt-search':Search,
    'my-filter':Filter
    }
  }
</script>
<style scoped>
  @import './searchfilter.css';
</style>
