<template>
   <div class='my_search'>
        hhhh
  </div>
</template>
<script>
import { MessageBox, Swipe, SwipeItem, Toast } from 'mint-ui';
  export default {
    name: 'search',
    props: ['name','link'],
    methods: {
      goto:function(link){
        this.$emit('topMethod', link)
      }
    }
  }
</script>
<style scoped>
  @import './search.css';
</style>
