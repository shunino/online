<template>
  <div class="zixun_box">
  <img src="../../assets/home/zixun.png" class="zixun_bg">
   <div class='zixun'>
       <div class="zixun_lunbo">
          <dl class="text_list">
            <dd>颠三倒四的法规规定共商国是个歌手歌手歌手是分身乏术分身乏术v 的分身乏术的分身乏术服务</dd>
            <dd>谁都是吃吃吃</dd>
            <dd>呜呜呜单位</dd>
            <dd>恶毒的时代</dd>
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
    created(){
        setInterval(this.goUp,3000);
    },
    methods: {
      goUp:function(){
        //console.log('fff');
        $('.zixun_lunbo').find('.text_list').animate({top:'-0.15rem'},500,function(){
            $(".text_list").css({top:0});
            $(".text_list dd:first").insertAfter(".text_list dd:last")
        });
      }
    }
  }
</script>
<style scoped>
  @import './zixun.css';
</style>
