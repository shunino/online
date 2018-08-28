<template>
	
  <ul class="nav">
  	 <li :id="n|filter" v-for="n in parseInt(splitlength)"  :class="{ active: n==1 }" :style="{width: width + 'px' }"></li>
  </ul>
</template>
<script>
  export default {
    name: 'navprocess',
    data() {
		return {
			width:"10"
		}
	},
    props: ['splitlength'],
    
    created:function(){	;
    	this.width=innerWidth/this.splitlength;
    	
    },
    mounted(){
    	
    	for(var index=1;index<this.splitlength;index++){
    		$("#split"+index).css("border-right","2px solid white");
    		
    	}
    },
    filters:{
    	filter(n){
    		return "split"+n;
    	}
    },
    methods: {
      setProcess:function(index){
      	 $(".nav").find("li:eq("+(index-1)+")").addClass("active");
      }
    }
  }
</script>
<style scoped>
  @import './navprocess.css';
</style>
