import { Indicator, MessageBox, Toast } from 'mint-ui';
import md5 from 'md5';

function ajaxRequest(url, data, type){
  let deffered = $.Deferred();
  if(type == 'POST'){
    data = JSON.stringify(data);
  }
  // let _url = url.indexOf('http://') < 0 ? config.server + url : url;
  // console.log('==9==url', url, url.indexOf('http://') > 0 , url.indexOf('https://'))
  let _url = (url.indexOf('http://') < 0 && url.indexOf('https://') < 0 ) ? config.server + url :  url;
  $.ajax({
    url: _url,
    method: type,
    data: data,
    dataType: 'json',
    crossDomain: true,
    timeout:30000,
    beforeSend:(req)=>{
      Indicator.open({spinnerType: 'fading-circle'});
      req.setRequestHeader("Content-Type", 'application/json');
      if( localStorage.token){
        req.setRequestHeader("AuthorizationToken", localStorage.token);
      }
    },
    success:(response) => {
      if(response.result){
        deffered.resolve(response.objValue);
      }else{
      	if($(".mint-loadmore-bottom") && response.value.indexOf("没有查找到楼盘")>-1){
      		$(".mint-loadmore-bottom").hide();
      	}
        deffered.reject(response.value);
      }
      setTimeout(function(){
      	Indicator.close();
      },1000);
    },
    error:(e) => {
      deffered.reject(e.status);
      Indicator.close();
    }
  });
  deffered.fail(e => {
    handleError(e);
  });
  return deffered.promise();
}
function handleError(msg){
  if(msg.toString().indexOf('此账户在其他设备登录过') >-1){
    localStorage.clear();
  }

  if(msg.toString().indexOf('系统异常') >-1){
    location.href = '#/error';
    localStorage.errorMsg = msg;
  }

  if(msg.toString().indexOf("已过期")>0 || msg=="用户为空" || msg.toString().indexOf("token为空")>-1){
    MessageBox.confirm('您尚未登录，请先进行登录?').then(action => {
    	localStorage.clear();
      location.href = '#/login';
    }).catch(err =>{
      console.log(err);
    })
  }else{
    if(msg && msg !=0){
      setTimeout(function(){
        Toast({
          message: msg,
          duration: 1000
        })
      },1300)
    }else{
      setTimeout(function(){
        Toast({
          message: "网络异常，请重试！",
          duration: 1000
        })
      },1300)
    }
  }
}


function ajaxLogRequest(url, data, type){
  let deffered = $.Deferred();

  const appId = 'onlineSale';
  const appSecurect = 'e9178578-845f-486c-bd18-5011c7472f72';
  const time = new Date().getTime();
  let sign = md5(appId + time + appSecurect);
  let content = [];
  content.push(data);

  let jsonData = {
      appId,
      time,
      sign,
      content: content
  }

  if(type == 'POST'){
    jsonData = JSON.stringify(jsonData);
  }

  // let _url = 'https://partner-sso.gtdreamlife.com/api/logServer' + url; //测试环境log
  let _url = 'https://ideallife-sso.gtdreamlife.com/api/logServer' + url; //正式环境log

  $.ajax({
    url: _url,
    method: type,
    data: `jsonData=${jsonData}`,
    contentType: "application/x-www-form-urlencoded",
    dataType: 'json',
    crossDomain: true,
    timeout:30000,
    beforeSend:(req)=>{
      Indicator.open({spinnerType: 'fading-circle'});
      req.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
      if( localStorage.token){
        req.setRequestHeader("AuthorizationToken", localStorage.token);
      }
    },
    success:(response) => {
      if(response.result){
        deffered.resolve(response.objValue);
      }else{
        deffered.reject(response.value);
      }
      setTimeout(function(){
      	Indicator.close();
      },1000);
    },
    error:(e) => {
      deffered.reject(e.status);
      Indicator.close();
    }
  });
  deffered.fail(e => {
    // handleError(e);
  });
  return deffered.promise();
}

export default {
  request: {
    setToken(t){
      localStorage.token = t;
    },
    post(url, data){
      return ajaxRequest(url,data,'POST');
    },
    get(url, data){
      return ajaxRequest(url,data,'GET');
    },
    logPost(url, data) {
      return ajaxLogRequest(url,data,'POST');
    }
  }
}
