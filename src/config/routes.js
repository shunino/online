import { MessageBox } from 'mint-ui';
function verifyLogin(route, redirect, next){
  // console.log('====route', route.path.indexOf('/order/orderhouse') > -1);
  if(localStorage.token || (route.path.indexOf('/order/orderhouse') > -1)){
    next();
  }else{
    localStorage.token="";
    MessageBox.confirm('您尚未登录，请先进行登录?').then(action => {
    	if(action=="confirm"){
    		next('/login')
    	}
		}
    ).catch(err => {
      console.log(err);
    })

  }
}



export default [
  {
    path: '/',
    redirect: '/home',
    name:'home'
  },
  {
    path: '/login',
    component: resolve => require(['../pages/login/login.vue'], resolve),
    meta: {
      keepAlive: false 
    }
    
  },
  {
    path: '/richtext/:IndexId',
    component: resolve => require(['../pages/richtext/richtext.vue'], resolve)
  },
  {
    path: '/modifypwd',
    component: resolve => require(['../pages/modifypwd/modifypwd'], resolve),
    meta: {
      keepAlive: false 
    }
  },
  
  {
    path: '/setting',
    component: resolve => require(['../pages/setting/setting.vue'], resolve),
    beforeEnter: verifyLogin,
    meta: {
      keepAlive: false 
    }
  },
  {
    path: '/register',
    component: resolve => require(['../pages/register/register.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },
  {
    path: '/news',
    component: resolve => require(['../pages/news/news.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },
  {
    path: '/contact/:buildingId/:brokerId/:estatebuilding/:synId/:isOnline/:projectSynId',
    component: resolve => require(['../pages/contact/contact.vue'], resolve),
    beforeEnter: verifyLogin,
    meta: {
      keepAlive: false 
    }
  },

  {
    path: '/precontact/:buildingId/:brokerId/:estatebuilding/:synId/:isOnline/:projectSynId',
    component: resolve => require(['../pages/precontact/precontact.vue'], resolve),
    beforeEnter: verifyLogin,
    meta: {
      keepAlive: false 
    }
  },
  {
    path: '/order/orderhouse/:buildingId/:isOnline/:projectSynId/:brokerId?',
    component: resolve => require(['../pages/orderhouse/orderhouse.vue'], resolve),
    beforeEnter: verifyLogin,
    meta: {
      keepAlive: false 
    }
  },
  {
    path: '/suggest',
    component: resolve => require(['../pages/suggest/suggest.vue'], resolve),
    beforeEnter: verifyLogin,
    meta: {
      keepAlive: false 
    }
  },
  {
    path: '/home',
    component: resolve => require(['../pages/home/home.vue'], resolve),
    meta: {
      keepAlive: true 
    }
  },
  {
    path: '/forgetpwd',
    component: resolve => require(['../pages/forgetpwd/forgetpwd.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },
  {
    path: '/personal',
    component: resolve => require(['../pages/personal/personal.vue'], resolve),
    // beforeEnter: verifyLogin,
    meta: {
      keepAlive: true 
    }
  },{
    path: '/building/:type?/:name?',
    component: resolve => require(['../pages/building/building.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/buildingdetail/:type/:buildId/:scollTop/:synId',
    component: resolve => require(['../pages/buildingdetail/detail.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/building_activity_list/:type',
    component: resolve => require(['../pages/building/building_activity_list.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/buildinglist/:searchType?/:searchName?',
    component: resolve => require(['../pages/buildinglist/buildinglist.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/buildingnews/:buildId/:synId',
    component: resolve => require(['../pages/buildingnews/buildingnews.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/buildingnewsdetail/:newsId',
    component: resolve => require(['../pages/buildingnewsdetail/buildingnewsdetail.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/newsDetail/:newsId',
    component: resolve => require(['../pages/newsDetail/newsDetail.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/information/:synId?/:buildingId?',
    component: resolve => require(['../pages/information/information.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/consulting/:synId?/:buildingId?',
    component: resolve => require(['../pages/consulting/consulting.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/choosecity/:type',
    component: resolve => require(['../pages/choosecity/choosecity.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/calculator/:totalPrice?',
    component: resolve => require(['../pages/calculator/calculator.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/map',
    component: resolve => require(['../pages/map/map.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/question/:synId/:buildingName/:buildingId?',
    component: resolve => require(['../pages/question/question.vue'], resolve),
    beforeEnter: verifyLogin,
    meta: {
      keepAlive: false 
    }
  },{
    path: '/surrounding/:projectName/:addressx/:addressy',
    component: resolve => require(['../pages/surrounding/surrounding.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/buildinginfo/:buildingId/:buildingInfoId',
    component: resolve => require(['../pages/buildinginfo/buildinginfo.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/appoint',
    component: resolve => require(['../pages/appoint/appoint.vue'], resolve),
    beforeEnter: verifyLogin,
    meta: {
      keepAlive: false 
    }
  },{
    path: '/concern',
    component: resolve => require(['../pages/concern/concern.vue'], resolve),
    beforeEnter: verifyLogin,
    meta: {
      keepAlive: false 
    }
  },{
    path: '/record',
    component: resolve => require(['../pages/record/record.vue'], resolve),
    beforeEnter: verifyLogin,
    meta: {
      keepAlive: false 
    }
  },{
    path: '/activitydetail/:id',
    component: resolve => require(['../pages/activitydetail/activitydetail.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/error',
    component: resolve => require(['../pages/error/error.vue'], resolve),
    meta: {
      keepAlive: false 
    }
  },{
    path: '/newOpening',// 最新开盘
    component: resolve => require(['../pages/newOpening/newOpening.vue'], resolve),
    meta: {
      keepAlive: true 
    }
  },{
    path: '/dynamic',// 动态详情
    component: resolve => require(['../pages/dynamic/dynamic.vue'], resolve),
    meta: {
      keepAlive: true 
    }
  },{
    path: '/agent/:buildId',// 官方经纪人
    component: resolve => require(['../pages/agent/agent.vue'], resolve),
    meta: {
      keepAlive: true 
    }
  },{
    path: '/houseTypeList',// 户型列表
    component: resolve => require(['../pages/houseTypeList/houseTypeList.vue'], resolve),
    meta: {
      keepAlive: true 
    }
  }
]
