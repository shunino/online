
<template>
   <div class='building_group' v-if="builds.length > 0">
      <div class='building_item' v-for='(item,index) in builds' :key="item.id" @click='goDetail(item, index)'>
        <div class='building_picture'>
          <!-- <img v-bind:src="item.listpicwechat" class="build_bg"> -->
          <img v-if="item.bannerpicpc" v-bind:src="item.bannerpicpc | imgUrl"> 
          <img  v-else src="../../assets/pic_default.png" >
        </div>
        <div class='building_name'>
          <span class='name'>{{item.projname}}</span>
          <em class='icon_collect' :class="item.attentionFlg ? 'active' : ''" @click="toggleFollow($event, item,index)"></em>
        </div>
        <div class='address'>{{item.projectaddress}}</div>

        <div class='price_bg'>
            <span class="unitprice">约  <span class="price">{{item.unitpriceshow}}</span> 元/㎡</span>
        </div>

        <div class='build-tag'>
          <label v-for='(type, index) in item.salepoint' :key="index">{{type}}</label>
        </div>
      </div>
      <div class='building_item_more'>
        <div class='build_more'>加载更多</div>
      </div>
    </div>
</template>
<script>
  export default {
    name: 'title',
    props: ['builds','tt'],
    mounted(){
      window.addEventListener('scroll', this.handleScroll);
      console.log(this._props.builds)
    },
    methods: {
      goto:function(link){
        this.$emit('topMethod', link)
      },
      handleScroll:function(){
        // console.log('dd');
      }
    }
  }
</script>
<style scoped>
  @import './scroll.css';
</style>
