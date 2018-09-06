<template>
   <div class='title_group'>
        <div class='title'>{{name}}</div>
        <div class='more' @click="goto(link)">
          <span class='more_house'>更多</span>
          <!-- <i class='icon-arrow-right'></i> -->
          <img src="../../assets/home/icon-arrow-right.png" width="10" height="16">
        </div>
      </div>
</template>
<script>
  export default {
    name: 'title',
    props: ['name','link'],
    methods: {
      goto:function(link){
        this.$emit('topMethod', link)
      }
    }
  }
</script>
<style scoped>
  @import './title.css';
</style>
