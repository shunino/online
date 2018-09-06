<template>
    <div>
        <div class="footer text-center">
			<!-- <div class="footer-bg" style="flex:0 0 25%;font-size:0.13rem;">
				<a :href="'tel:'+item.contactphone" @click="doCall($event, item.contactphone)">
					<img src="../../assets/icon-phone.png" width="20" height="20">
					<span class="consult">热线电话</span>
				</a>
			</div>
			<div class="footer-bg" style="flex: 0 0 25%;"  @click="goPage('consulting')">
			  <img src="../../assets/icon-consult.png" width="20" height="20">
			  <span class="consult">我要咨询</span>
		    </div>
			<div style="flex:2;" @click="goPage('order/orderhouse')">立即预约</div> -->
            <div style="flex: 2">
                <span class="bottom-left">关注</span>
            </div>
            <div style="flex: 3">
                <span class="bottom-btn">预约看房</span>
            </div>
            <div style="flex: 3">
                <span class="bottom-btn">咨询售楼处</span>
            </div>
		</div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
@import "./footer.css";
</style>