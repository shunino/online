<template>
	<div class="news">
		<div class='item_group'>
			<div class="item" @click='goNewsDetail(item.id);'>	
					<div class="item_left">
							<img src="../../assets/list-default.png" width='100%' height="100%">
					</div>
        			<div class="item_right">
						<div class='name'>4343434</div>
						<div class='time'>4342342</div>
					</div>
			</div>
			<div class="item" @click='goNewsDetail(item.id);'>	
					<div class="item_left">
							<img src="../../assets/list-default.png" width='100%' height="100%">
					</div>
        			<div class="item_right">
						<div class='name'>4343434</div>
						<div class='time'>4342342</div>
					</div>
			</div>
			<div class="item" @click='goNewsDetail(item.id);'>	
					<div class="item_left">
							<img src="../../assets/list-default.png" width='100%' height="100%">
					</div>
        			<div class="item_right">
						<div class='name'>4343434</div>
						<div class='time'>4342342</div>
					</div>
			</div>
			<div class="item" @click='goNewsDetail(item.id);'>	
					<div class="item_left">
							<img src="../../assets/list-default.png" width='100%' height="100%">
					</div>
        			<div class="item_right">
						<div class='name'>4343434</div>
						<div class='time'>4342342</div>
					</div>
			</div>
			<div class="item" @click='goNewsDetail(item.id);'>	
					<div class="item_left">
							<img src="../../assets/list-default.png" width='100%' height="100%">
					</div>
        			<div class="item_right">
						<div class='name'>4343434</div>
						<div class='time'>4342342</div>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import { Swipe, SwipeItem } from 'mint-ui';
	import { Loadmore } from 'mint-ui';
	import util  from '../../config/util';
	export default {
		name: "news",
	    mixins: [util],
		created() {
			document.title = "资讯";
		},
		
		methods: {
			updateTitle(){
				document.title = "资讯";
			},
			updateParems(){
			
			},
			getList() {
				
			},
			goNewsDetail(newsId) {
			
			},
			loadBottom(){
				
			}
		},
		components: {
			'load-more': Loadmore,
			// 'mt-swipe':Swipe,
			// 'mt-swipe-item':SwipeItem
		}
	}
</script>

<style scoped>
	@import "./information.css";
</style>
