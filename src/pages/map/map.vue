<template>
	<div class='map'>
		<div id='container'></div>
		<div class="map-filter">
      <span style="color:#00B96D;float:left;font-size:0.15rem;" @click="goList()">列表
		    <img src="../../assets/icon-list-green.png">
      </span>
		  <input type="search" placeholder="输入楼盘名称" class="map-search text-center" v-model="searchParams.name" v-on:keyup.13="search()" @focus="inputFocus(true)" @focusout="inputFocus(false)"/>
		</div>
	</div>
</template>

<script>
// import Filter from '../../components/filter/filter.vue';
import {Toast} from 'mint-ui';
import util  from '../../config/util';
export default {
	mixins: [util],
	data(){
		return {
			pointArr:[],//存数省经纬度数组
			map:{},
			searchParams: {
			  provinceId: '',
			  name: ''
			}
		}
	},
	beforeRouteEnter(to,from,next){
		next(vm =>{
			vm.initMap();
			vm.updataStatus();
		})
	},
	beforeRouteLeave(to,from,next){
    
		  let mobile = localStorage.getItem("tel");
      let userAgent = this.myBrowser();
      let cookie = this.getCookie('UM_distinctid');
      let ip = localStorage.getItem("ip");
      let os_type = this.osType();
      let enter_time = localStorage.getItem("enter_time");
      let leave_time = new Date();
      leave_time = this.formatTime(leave_time);
      let enter_url = window.location.host + to.path;
      let leave_url = window.location.href;
      if (leave_url.indexOf("?") > 0) {
        leave_url = leave_url.substr(0, leave_url.indexOf("?"));
      }
      let version = '3.0.0';

      this.common.request.logPost('/addLog', {
        logtype: 'mobile_visit_time',
        user_id: mobile || null,
        user_agent: userAgent,
        cookie: cookie,
        ip_addr: ip,
        os_type: os_type,
        enter_url: enter_url,
        leave_url: leave_url,
        enter_time: enter_time,
        leave_time: leave_time,
        version: version,
      }).then(result => {
      //   
      }); 
	
		next();
		this.searchParams.provinceId = '';
		this.searchParams.name = '';
	},
	created(){

	},
	mounted(){
    // this.initMap();
    let mobile = localStorage.getItem("tel");
		let userAgent = this.myBrowser();
		let cookie = this.getCookie('UM_distinctid');
		let ip = localStorage.getItem("ip");
		let record_time = new Date();
    record_time = this.formatTime(record_time);     
    localStorage.enter_time = record_time;
		let os_type = this.osType();
		let present_url = document.location.href;
		let version = '3.0.0';

		this.common.request.logPost('/addLog', {
			logtype: 'mobile_visit',
			user_id: mobile || null,
			user_agent: userAgent,
			cookie: cookie,
			ip_addr: ip,
			os_type: os_type,
			present_url: present_url,
			record_time: record_time,
			version: version,
		}).then(result => {
			  
		});   
	},
	methods:{
		updataStatus(){
			document.title = '地图找房';
		},
		initMap(){
			this.map = new BMap.Map("container");
			this.map.centerAndZoom(new BMap.Point(103.554332,38.977962), 4);
			this.map.enableScrollWheelZoom();
			//this.map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_SMALL}));
			this.map.setMapStyle({
				styleJson:[
                    {
                      "featureType": "road",
                      "elementType": "all",
                      "stylers": {
                                "visibility": "off"
                      }
                    },
                    {
                      "featureType": "administrative",
                      "elementType": "all",
                      "stylers": {
                                "visibility": "off"
                      }
                    },
                    {
                      "featureType": "boundary",
                      "elementType": "all",
                      "stylers": {
                                "visibility": "off"
                      }
                    },
					{
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                              "visibility": "off"
                    }
					}
                  ]
			});

			this.getProvincePoint();
			this.addDistrict(this.map, '中国', true, '#FFF', '#DDD');
		},
		addDistrict(map, districtName, isCountry, inColor, outColor) {
			var blist = [];
			var districtLoading = 0;
			//使用计数器来控制加载过程
			districtLoading++;
			var bdary = new BMap.Boundary();
			bdary.get(districtName, function (rs) {       //获取行政区域
				var _this = this;
				var count = rs.boundaries.length; //行政区域的点有多少个
				if (count === 0) {
				  // alert('未能获取当前输入行政区域');
				  return;
				}
				for (var i = 0; i < count; i++) {
				  blist.push({ points: rs.boundaries[i], name: districtName });
				};
				//加载完成区域点后计数器-1
				districtLoading--;
				if (districtLoading == 0) {
				  //全加载完成后画端点
				  //包含所有区域的点数组
				  var pointArray = [];

				  /*画遮蔽层的相关方法
				   *思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，并全部连到西北角。
				   *      这样就做出了一个经过多次西北角的闭合多边形*/
				  //定义中国东南西北端点，作为第一层
				  var pNW = { lat: 79.0, lng: 13.0 }
				  var pNE = { lat: 79.0, lng: 166.0 }
				  var pSE = { lat: 1, lng: 166.0 }
				  var pSW = { lat: -1.0, lng: 13.0 }
				  //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
				  var pArray = [];
				  pArray.push(pSE);
				  pArray.push(pNE);
				  pArray.push(pNW);
				  pArray.push(pSW);
				  pArray.push(pSE);
				  //循环添加各闭合区域
				  for (var i = 0; i < blist.length; i++) {
					//添加显示用标签层
					  if(isCountry == false || i == 0 || i == 9) {
              //添加多边形层并显示
              var ply = new BMap.Polygon(blist[i].points, { strokeWeight: 1, strokeColor: "#000000", fillOpacity: 0.6, fillColor:inColor}); //建立多边形覆盖物
              map.addOverlay(ply);

              //将点增加到视野范围内
              var path = ply.getPath();
              pointArray = pointArray.concat(path);
              //将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
              pArray = pArray.concat(path);
              pArray.push(pArray[0]);
            }
				  }

				  //限定显示区域，需要引用api库
				  //var boundply = new BMap.Polygon(pointArray);
				  //BMapLib.AreaRestriction.setBounds(map, boundply.getBounds());
				  //map.setViewport(pointArray);    //调整视野
				  //添加遮蔽层

				  var plyall = new BMap.Polygon(pArray, { strokeOpacity: 0.0000001, strokeColor: "#000000", strokeWeight: 0.00001, fillColor: outColor, fillOpacity: 1 }); //建立多边形覆盖物
          //map.addOverlay(plyall);
				}
			});
		},
		getProvincePoint(currentProvince){
			var _this = this;
			_this.pointArr = [];
			this.common.request.get('/home/provinceListForMap', {}).then(data=>{
				for(let i=0;i<data.length;i++){
					let proName = data[i].provinceName;
					let proId = data[i].provinceId
		    	// 创建地址解析器实例
					var myGeo = new BMap.Geocoder();
			    myGeo.getPoint(proName, function(point){
						_this.pointArr.push({x:point.lng,y:point.lat,provincename:proName,provinceId:proId})
      		}, proName);
				}
      })
      this.showProviceArea(_this.pointArr, currentProvince)
		},
		showProviceArea(arr, currentProvince){
			var _this = this;
			setTimeout(function(){

        var longitude = localStorage.addressx;
        var latitude = localStorage.addressy;
        var geoPoint = new BMap.Point(longitude, latitude);
        var geocoder = new BMap.Geocoder();

        geocoder.getLocation(geoPoint, function(rs) {
          var addComp = rs.addressComponents;
          currentProvince = addComp.province;

  				for(let i = 0;i<arr.length;i++){

  					let point = new BMap.Point(arr[i].x,arr[i].y);
  					var labelText = arr[i].provincename;

            let opts = {
              position : point,    // 指定文本标注所在的地理位置
              offset   : new BMap.Size(-20, -73)    //设置文本偏移量
            }
            if(labelText == '内蒙古自治区') labelText = labelText.replace("古自治区","");
            if(labelText == '广西壮族自治区') labelText = labelText.replace("壮族自治区","");
            if(labelText == '西藏自治区') labelText = labelText.replace("自治区","");
            if(labelText == '宁夏回族自治区') labelText = labelText.replace("回族自治区","");
            if(labelText == '新疆维吾尔自治区') labelText = labelText.replace("维吾尔自治区","");
            labelText = labelText.replace("省","");
            labelText = labelText.replace("市","");
            let label = new BMap.Label(labelText, opts);  // 创建文本标注对象
            var css = {
              color : "#FFF",
              fontSize : "12px",
              //background:'url(/salesportal/wechat/static/mark1.png) no-repeat',
              background:'url(/static/mark1.png) no-repeat',
              width :"42px",
              height : "46px",
              fontFamily:"微软雅黑",
              maxWidth: "inherit",
              paddingTop:"10px",
              border:"0",
              textAlign:"center"
            };
            if(currentProvince == arr[i].provincename) {
              css = {
                color : "#FFF",
                fontSize : "20px",
                //background:'url(/salesportal/wechat/static/mark2.png) no-repeat',
                background:'url(/static/mark2.png) no-repeat',
                width :"66px",
                height : "69px",
                fontFamily:"微软雅黑",
                maxWidth: "inherit",
                paddingTop:"20px",
                border:"0",
                textAlign:"center"
            }
          }
          label.setStyle(css);
					label.proviceId = arr[i].provinceId;
          _this.map.addOverlay(label);

				  label.addEventListener('click',function(){
				  	var proId = $(this)[0].proviceId;
            var proName = $(this)[0].content;
				  	_this.getCityPoint(proId,proName)
				  });
				}
        });
			},600);
		},
		goList(){
		  this.$router.go(-1);
		},
    goPage(){
      this.$router.push('/building');
    },
		getCityPoint(proId,proName){
			var _this = this;
      _this.map.clearOverlays();
      this.addDistrict(_this.map, proName, false, "#888", "#DDD");
	  	_this.common.request.post('/home/cityListForMap', {provinceId: proId}).then(data => {
	  	 	var cityArr = [];
	  	 	for(let i=0;i<data.length;i++){
	  	 		let cityName = data[i].cityName;
	  	 		let cityId = data[i].cityId;
          let cityList = data[i].projectList;
					var myGeo = new BMap.Geocoder();
			    myGeo.getPoint(cityName, function(point){
						cityArr.push({x:point.lng,y:point.lat,cityName:cityName,cityId:cityId,cityList:cityList})
      		}, cityName);
	  	 	}
	  	 	setTimeout(function(){

          _this.map.centerAndZoom(proName, 7);
          //_this.map.centerAndZoom(new BMap.Point(120.116168,29.433517), 8);
          for(let i=0;i<cityArr.length;i++){
            var cityitem = cityArr[i].cityList;
            var cityItemName = "";
            if(cityitem.length > 3){
              cityitem.length = 3;
              for(let i=0;i<cityitem.length;i++){
                cityItemName += "<div>"+cityitem[i].projectName+"</div>"
              }
              cityItemName +="<div>查看更多楼盘></div>"
            }else{
              for(let i=0;i<cityitem.length;i++){
                cityItemName += "<div>"+cityitem[i].projectName+"</div>"
              }
            }

            // var labelText = "<div>"+cityArr[i].cityName+cityItemName+"</div><div style='float: left;position: absolute;margin-left: -11px;margin-top: -2px;'><img src='/salesportal/wechat/static/qipao_r.png'/></div>";

            var labelText = "<div>"+cityArr[i].cityName+cityItemName+"</div><div style='float: left;position: absolute;margin-left: -11px;margin-top: -2px;'><img src='/static/qipao_r.png'/></div>";

            let point = new BMap.Point(cityArr[i].x,cityArr[i].y);
            let opts = {
              position : point,    // 指定文本标注所在的地理位置
              offset   : new BMap.Size(-90, -73)    //设置文本偏移量
            }
            let label = new BMap.Label(labelText, opts);  // 创建文本标注对象

            label.cityName = cityArr[i].cityName;
            label.setStyle({
               color : "#111",
               fontSize : "12px",
               backGround:'#fff',
               height : "auto",
               lineHeight : "18px",
               fontFamily:"微软雅黑",
               padding:"12px 10px 5px 10px",
               border:"1px solid #fff",
               maxWidth:"none",
               textAlign:"center",
               width:'140px',
               borderRadius:'10px'
            });
            label.cityId = cityArr[i].cityId;
            _this.map.addOverlay(label);
            label.addEventListener('click',function(){
              var cityId = $(this)[0].cityId;
              var cityName = $(this)[0].cityName;
              localStorage.cityid = cityId;
              localStorage.cityname = cityName
              _this.$router.push('/buildinglist');
            })

            _this.searchParams.provinceId = proId;
            // _this.search(1);
          }

	  	 	},500)

	  	});
		},

		inputFocus(status){
		  if(status){
		    $('.menu').hide();
		  }else{
		    $('.menu').show();
		  }
		},
		search(type){
			var _this =this;
      $('.BMapLabel').each(function(index,item){
        if(!_this.searchParams.provinceId){
          //item.style.background = 'url(/salesportal/wechat/static/mark1.png) no-repeat';
          item.style.width = '42px';
          item.style.height = '46px';
          item.style.fontSize = '12px'
          item.style.paddingTop = '10px';
          item.style.background = 'url(/static/mark1.png) no-repeat';//本地测试用
        }
      })
			this.common.request.post('/home/findForMap', this.searchParams).then(data=>{
        if(data && data.length > 0){
          $.each(data,function(index,searchitem){
            $('.BMapLabel').each(function(index,item){
              if(!_this.searchParams.provinceId){
                if(_this.searchParams.name){
                  if(searchitem.provinceName.indexOf(item.innerText) > -1){
                    item.style.background = 'url(/salesportal/wechat/static/mark2.png) no-repeat';
                    // item.style.background = 'url(/static/mark2.png) no-repeat';
                    item.style.width = '66px';
                    item.style.height = '69px';
                    item.style.fontSize = '20px';
                    item.style.paddingTop = '20px';
                    item.style['background-size'] = '66px 69px';
                  }
                }else{
                  //item.style.background = 'url(/salesportal/wechat/static/mark1.png) no-repeat';
                  item.style.background = 'url(/static/mark1.png) no-repeat';
                }
              }
            })
          })
        }else{
          Toast('未查询到楼盘');
        }
			})
		}
	},
	components: {
	  // 'filter-panel': Filter
	}
}
</script>

<style scoped>
  @import "./map.css";
</style>
