<template>
  <ul class="menu">
    <li class="home" :class="active == 'home' ? 'active' : ''" @click="goPage('home')"><label>首页</label></li>
    <li class="building" :class="active == 'building' ? 'active' : ''" @click="goPage('building')">楼盘</li>
    <li class="book" :class="active == 'book' ? 'active' : ''" @click="goPage('book')">房本</li>
    <li class="personal" :class="active == 'personal' ? 'active' : ''" @click="goPage('personal')">我的</li>
  </ul>
</template>
<script>
  export default {
    name: 'menu',
    props: ['active'],
    filters: {
    },
    methods: {
      goPage: function(key){
        this.$router.push('/' + key);
//      this.active=
      }
    }
  }
</script>
<style scoped>
  @import './menu.css';
</style>
