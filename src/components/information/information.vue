<template>
	<div class="news">
		<div class='item_group'>
			<div class="item" v-for="item in mydata" @click='goPage(item.url)'>	
					<div class="item_left">
							<img :src="item.image" width='100%' height="100%">
					</div>
        			<div class="item_right">
						<div class='name'>{{item.activityName}}</div>
						<div class='time'>4342342</div>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
	import util  from '../../config/util';
	export default {
		name: "news",
	    mixins: [util],
	    data(){
	      return {
	        mydata:[]
	      }
	    },
		created() {
			this.getList();
		},
		methods: {
			getList:function(){
		          let self = this;
		          let params = {
		            pageLimit:4
		          }
		          this.common.request.post('/activity/list', params).then(data => {
		                  self.mydata = data; 
		          }); 
		      },
		   	goPage:function(link){
		   		if(link=='') return;
            	window.location = link;
		   	}
		}
	}
</script>

<style scoped>
	@import "./information.css";
</style>
