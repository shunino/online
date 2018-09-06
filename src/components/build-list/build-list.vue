<template>
  <div class="build-list">
    <div v-for="(item,index) in data" class="list-item" :id="item.projguid" @click="goDetail(item)">
      <div class='build-pic'>      
        <!-- <img v-if="item.bannerpicpc" v-bind:src="item.bannerpicpc|imgfilter" class="pull-left"> -->
        <img v-if="item.listpicwechat" v-bind:src="item.listpicwechat|imgfilter" class="pull-left">
        <img v-else src="../../assets/pic-beauful.png" class="pull-left">
      </div>
      <div class="build-info">
        <div class="build-title">
          <span class="name">{{item.projname}}</span>
          <em class="pull-right icon-collect" :class="item.attentionFlg ? 'active' : ''" @click="toggleFollow($event, item,index)"></em>
        </div>
        <div class="build-detail2">
        	<div class="address">
            {{item.projectaddress|adressfilter}}
        	</div>
        	<div class="price-wrap">
        	  <span style="padding-right:0.15rem;">
              <!-- <span class="unitprice">{{item.unitpriceshow|filterPrice}} <span v-if='item.unitpriceshow' style="font-size:10px;">元/㎡</span> </span> -->
              <span :class="item.unitpriceshow ? 'unitprice' : 'noprice'">{{item.unitpriceshow|filterPrice}} <span v-if='item.unitpriceshow' style="font-size:10px;">元/㎡</span> </span>
            </span>
            <!-- <span>{{item.totalpriceshow|filterPrice}} <span v-if='item.totalpriceshow'>万起</span></span> -->
        	</div>  
        </div>
        <div class="build-tag">
        	<label v-for="n in item.typeAndColor" v-if='n.buildingType != null && n.buildingType !=""'>{{n.buildingType}}</label>
        </div>
      </div>
    </div>
     <div id="noData" style="width: 100%;height: 4rem;z-index: 999;display: none;">
    	<p style="text-align: center;margin-top:1rem;margin-bottom: 2rem;">暂无数据</p>
    <!--	<img src="../../assets/nodata.png" style="width: 100%;"/>-->
    </div> 
  </div>
</template>
<script>
  import {Toast, MessageBox } from 'mint-ui';
  export default {
    name: 'buildList',
    props: ['data', 'btns'],
    methods: {
      goDetail(item){
      	localStorage.buildsave=true;   
        localStorage.setItem('type','');
        $('#main').scrollTop(0);
        this.$router.push('/buildingdetail/building/' + item.projguid  + '/'+ (sessionStorage.scrolltop ? sessionStorage.scrolltop : 0)+ '/'+ item.synid);
      },
     
      toggleFollow(e, item,index){
        e.stopPropagation();
        if(localStorage.token){
          if(item.attentionFlg){
            MessageBox.confirm('确定取消收藏?').then(action => {
              this.common.request.post('/myHome/deleteAttention', {buildingId: item.projguid}).then(data => {
                item.attentionFlg = false;
                setTimeout(function () {
                  Toast({
                    message: '取消收藏成功',
                    duration: 1000
                  });
                },1000)

              });
              this.$emit('refresh',index)
            }).catch(err =>{
              console.log(err);
            });
          }else{
            this.common.request.post('/myHome/addAttention', {buildingId: item.projguid}).then(data => {
              item.attentionFlg = true;
              setTimeout(function(){
                Toast({
                  message: '收藏成功',
                  duration: 1000
                });
              },1000)
            });
          }
        }else{
          MessageBox.confirm('您尚未登录，请先进行登录?').then(action => {
            localStorage.clear();
            location.href = '#/login';
          }).catch(err =>{
            console.log(err);
          });
        }

      },
      gotopage(page){
      	localStorage.buildsave=true;
      	let buildindId = item.buildingId || item.id;
      	this.$router.push(page+ buildindId);
      },
      btnClick(e, type, item){
      	localStorage.buildsave=true;
        e.stopPropagation();
        if(type == 'contact'){
          if(!item.contactphone){
            e.preventDefault();
            Toast({
              message: '案场暂无电话',
              duration: 1000
            });
          }
          _czc.push(['_trackEvent', '联系房源','联系案场','1']);
        }else if(type == 'appoint'){
        	 e.preventDefault();
          let buildindId = item.projguid;
          this.$router.push('/order/orderhouse/' + buildindId+"/"+item.isonline+"/"+item.synid);
          _czc.push(['_trackEvent', '联系房源','我要预约','1']);
        }else{
          console.log('order');
        }
      }
    },
    filters: {
    	houseType(houseType){
    		if(houseType==null){
    			return "";
    		}else{
    			return houseType+"|";
    		}
    	},
      getImgSrc(b){
        return '../../assets/icon-' + b + '.png';
      },
      adressfilter(address){
      	if(address){
      		if(address.length<14){
	      		 return address;
	      	}else{
	      		return address.substr(0,12)+"...";
	      	}
      	}
      	
      },
      imgfilter(imgurl){
     	  return config.file_show_url+imgurl;
      },
      houseArea(area){
      	 if(area==null){
      	 	  return "";
      	 }else{
      	 	   var areas=area.split("-");
      	 	   
      	 	  return parseInt(areas[0])+"-" +parseInt(areas[1])+"m²";
      	 }
      },
      filterPrice(price){
      	 if(price==null){
      	 	  return "暂无价格";
      	 }else{
      	 	  return parseInt(price);
      	 }
      }
    },
    components:{
    }
  }
</script>
<style scoped>
  @import './build-list.css';
</style>
