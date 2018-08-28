<template>
  <popup position="right" v-model="isVisible" :modal="true" :closeOnClickModal="true" class="filter-panel">
    <div class="filter-content">
      <div class="filter-block">
        <p>区域</p>
        <div v-for="d in data" class="col-xs-4">
          <input type="radio" name="area" class="" :value="d.id" :id="d.id" v-model="area"><label :for="d.id">{{d.areaName}}</label>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="filter-block">
        <p>购房预算</p>
        <div class="col-xs-4">
          <input type="radio" name="price" value="-80" id="price1" v-model="price"><label for="price1"><span class="font_w300">80</span>万以下</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="price" value="80-100" id="price2" v-model="price"><label for="price2"><span class="font_w300">80-100</span>万</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="price" value="100-120" id="price3" v-model="price"><label for="price3"><span class="font_w300">100-120</span>万</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="price" value="120-150" id="price4" v-model="price"><label for="price4"><span class="font_w300">120-150</span>万</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="price" value="150-200" id="price5" v-model="price"><label for="price5"><span class="font_w300">150-200</span>万</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="price" value="200-250" id="price6" v-model="price"><label for="price6"><span class="font_w300">200-250</span>万</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="price" value="250-350" id="price7" v-model="price"><label for="price7"><span class="font_w300">250-350</span>万</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="price" value="350-500" id="price8" v-model="price"><label for="price8"><span class="font_w300">350-500</span>万</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="price" value="500-" id="price9" v-model="price"><label for="price9"><span class="font_w300">500</span>万以上</label>
        </div>
        <div class="col-xs-6 first">
          <input type="tel" placeholder="最低价" class="text-left" v-model="_minPrice" @focus="priceFocus()">
        </div>
        <div class="col-xs-6">
          <input type="tel" placeholder="最高价" class="text-left" v-model="_maxPrice">
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="filter-block">
        <p>需求户型</p>
        <div class="col-xs-4">
          <input type="radio" name="house" value="1" id="house1" v-model="house"><label for="house1">一室</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="house" value="2" id="house2" v-model="house"><label for="house2">两室</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="house" value="3" id="house3" v-model="house"><label for="house3">三室</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="house" value="4" id="house4" v-model="house"><label for="house4">四室</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="house" value="5" id="house5" v-model="house"><label for="house5">四室以上</label>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="filter-block">
        <p>需求面积</p>
        <div class="col-xs-4">
          <input type="radio" name="size" value="-" id="size1" v-model="size"><label for="size1">不限</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="size" value="50" id="size2" v-model="size"><label for="size2"><span class="font_w300">50</span>㎡以下</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="size" value="50-70" id="size3" v-model="size"><label for="size3"><span class="font_w300">50-70</span>㎡</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="size" value="70-90" id="size4" v-model="size"><label for="size4"><span class="font_w300">70-90</span>㎡</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="size" value="90-120" id="size5" v-model="size"><label for="size5"><span class="font_w300">90-120</span>㎡</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="size" value="120-140" id="size6" v-model="size"><label for="size6"><span class="font_w300">120-140</span>㎡</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="size" value="140-160" id="size7" v-model="size"><label for="size7"><span class="font_w300">140-160</span>㎡</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="size" value="160-180" id="size8" v-model="size"><label for="size8"><span class="font_w300">160-180</span>㎡</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="size" value="180-200" id="size9" v-model="size"><label for="size9"><span class="font_w300">180-200</span>㎡</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="size" value="200-" id="size10" v-model="size"><label for="size10"><span class="font_w300">200</span>㎡以上</label>
        </div>

        <div class="clearfix"></div>
      </div>
      <div class="filter-block">
        <p>需求业态</p>
        <div class="col-xs-4">
          <input type="radio" name="type" value="null" id="type0" v-model="type"><label for="type0">不限</label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="type" value="1" id="type1" v-model="type"><label for="type1"><span class="font_w300">别墅/排屋</span></label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="type" value="2" id="type2" v-model="type"><label for="type2"><span class="font_w300">高层住宅</span></label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="type" value="3" id="type3" v-model="type"><label for="type3"><span class="font_w300">酒店式公寓</span></label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="type" value="4" id="type4" v-model="type"><label for="type4"><span class="font_w300">车库车位</span></label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="type" value="5" id="type5" v-model="type"><label for="type5"><span class="font_w300">商铺</span></label>
        </div>
        <div class="col-xs-4">
          <input type="radio" name="type" value="6" id="type6" v-model="type"><label for="type6"><span class="font_w300">其他</span></label>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="filter-btn text-center">
      <div class="col-xs-6" @click="doReset()">重置</div>
      <div class="col-xs-6 done" @click="doSearch()">完成</div>
    </div>
  </popup>
</template>
<script>
  import { Popup } from 'mint-ui';
  export default {
    name: 'filter',
    props: ['showFilter','data'],
    data(){
      return {
        isVisible: this.$props.showFilter,
        area: '',
        price: '',
        minPrice: '',
        maxPrice: '',
        house: '',
        size: '',
        type:''
      }
    },
    
    computed: {
      _minPrice:{
        get(){
          return this.price.split('-')[0] || '';
        },
        set(val){
          this.minPrice = val;
        }
      },
     _maxPrice: {
       get(){
         return this.price.split('-')[1] || '';
       },
       set(val){
         this.maxPrice = val;
       }
     },
      minHouseArea(){
        return this.size.split('-')[0] || '';
      },
      maxHouseArea(){
        return this.size.split('-')[1] || '';
      }
    },
    methods:{
      doReset(){
        this.area = '';
        this.price = '';
        this.house = '';
        this.size = '';
        this.type = '';
      },
      doSearch(){
      	this.isVisible = false;
        let model = {
          area: this.area,
          minPrice: (this.minPrice ? this.minPrice + '0000' : '') || (this._minPrice ? this._minPrice + '0000' : ''),
          maxPrice: (this.maxPrice ? this.maxPrice + '0000' : '') || (this._maxPrice ? this._maxPrice + '0000' : ''),
          houseType: this.house,
          minHouseArea: this.minHouseArea,
          maxHouseArea: this.maxHouseArea,
          roomType:this.type,
          pageNo: 1
        };
        this.$parent.listData = [];
        this.$parent.loadData(model, ()=>{
//        this.isVisible = false;
        });
      },
      priceFocus(){
        this.price = '';
      }
    },
    watch: {
      showFilter(newValue, oldValue){
        if(newValue != oldValue){
          this.isVisible = newValue;
        }
      },
      isVisible(newValue, oldValue){
        if(newValue != this.$props.showFilter){
          this.$emit('filterStatusChange', newValue);
        }
      }
    },
    components: {
      'popup': Popup
    }
  }
</script>
<style scoped>
  @import "./filter.css";
</style>
