<template>
  <div class="building">
   <my-searchfilter />
   <div class="search_pass">
    <load-more  :bottom-method="handleBottomChange"  :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" id='loadmoreList'>
      <build-list v-bind:data="listData" v-bind:btns="listBtns"></build-list>
    </load-more>
  </div>
  </div>
</template>
<script>
  import Banner from '../../components/banner/banner.vue';
  import { Loadmore,MessageBox,Swipe, SwipeItem } from 'mint-ui';
  import BuildList from '../../components/build-list/build-list.vue';
  import Searchfilter from '../../components/searchfilter/searchfilter.vue';
  import util  from '../../config/util';
  export default {
     mixins: [util],
    data(){
      return {
        allLoaded: false,
        filterData: [],
        listData: [],//列表数据
        searchParams: {
          area: '',
          city: '',
          // contentValue: this.$route.params ? parseInt(this.$route.params.type) || '': '',
          contentValue: 0,
          minPrice: '',
          maxPrice: '',
          houseType: '',
          minHouseArea: '',
          maxHouseArea: '',
          name: this.$route.params ? this.$route.params.name || '': '',
          pageNo: 1
        }
      }
    },
    created(){
      this.getProjectList();
    	$(".menu").show();
      document.title="楼盘";
      if(window.location.hash.split("?")[1]){
        //this.checkUser();
        $('#main').css('padding-bottom',0).addClass('isMenu');
      }
    },
    mounted(){
    },
    beforeRouteLeave: function(to, from, next) {
    },
    methods:{
      goPage(key){
        this.$router.push(key);
      },
      // goActivityList(contentType){
      //   this.$router.push('/building_activity_list/'+contentType);
      // },
      search(){
        $('.search input[type=search]').blur();
         this.$router.push('/buildinglist/1/'+this.searchParams.name)
      },
      loadData(params, cb){
        if(params){
          $.extend(this.searchParams, params);
        }
        var _this=this;

        if(localStorage.cityid){
          
          this.searchParams.city = localStorage.cityid
          this.common.request.post('/home/bannerList', {cityId:  localStorage.cityid}).then(data => {
              this.bannerResource = data;
          });
          
          // this.getContentList();
          // this.getActivityList();
          this.getProjectList();
          this.getAreaList();
        }
        if(cb){
          cb();
        }
      },
      getProjectList(){
            var _this = this;
            var list = _this.listData;
            // console.log(this.searchParams)
            $(".mint-loadmore-bottom .mint-loadmore-text").text("正在加载...");
            this.common.request.post('/estate/getProjects', this.searchParams).then(data => {

              if (data && data.admProject) {
              	if(data.admProject.length == 0 && this.searchParams.pageNo == 1){
              		$(".mint-loadmore-bottom").hide();
                	$('#noData').show();
                }else{

                    list.push.apply(list,data.admProject);
                    _this.listData = list;
                    $(".mint-loadmore-bottom").show();
                    $('#noData').hide();
                    if(data.total <= 10*this.searchParams.pageNo){
      	              _this.allLoaded = true;
      	              $(".mint-loadmore-bottom .mint-loadmore-text").text("更多楼盘, 敬请期待!");
      	            }else{
      	              _this.allLoaded = false;
      	              $(".mint-loadmore-bottom .mint-loadmore-text").text("上拉加载更多");
      	            }
                }
              }
            })
          },
      handleBottomChange(){
      		  this.searchParams.pageNo ++;
      		  this.loadData(null, ()=>{
      		    this.$refs.loadmore.onBottomLoaded();
      		  });
      		}
    },
    components:{
      'build-list': BuildList,
      'load-more': Loadmore,
      'my-searchfilter': Searchfilter,
    }
  }
</script>
<style scoped>
  @import "./building.css";
</style>
