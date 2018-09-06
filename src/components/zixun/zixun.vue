<template>
  <div class="zixun_box">
  <img src="../../assets/home/zixun.png" class="zixun_bg">
   <div class='zixun'>
       <div class="zixun_lunbo">
          <dl class="text_list">
            <dd v-for="item in mydata">{{item.content}}</dd>
          </dl>
          <span class="zixun_more">更多</span>
       </div>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
  export default {
    name: 'zixun',
    props: ['name','link'],
    data(){
      return {
        mydata:[]
      }
    },
    created(){
        this.getList();
        setInterval(this.goUp,3000);
    },
    methods: {
      goUp:function(){
        //console.log('fff');
        $('.zixun_lunbo').find('.text_list').animate({top:'-0.15rem'},500,function(){
            $(".text_list").css({top:0});
            $(".text_list dd:first").insertAfter(".text_list dd:last")
        });
      },
      getList:function(){
          let self = this;
          let params = {
            pageLimit:4
          }
          this.common.request.post('/home/news/list', params).then(data => {
                  self.mydata = data; 
          }); 
      }
    }
  }
</script>
<style scoped>
  @import './zixun.css';
</style>
