var _getCookie = function(name) { 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) {
        return unescape(arr[2]); 
    } else {
        return null; 
    }     
  } 
  
  
  // 判断操作系统类型
  var _osType = function(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf("iPhone") > -1){
      return "iPhone";
     }
  
    if (userAgent.indexOf("iPad") > -1){
      return "iPad";
    }
  
    if (userAgent.indexOf("Android") > -1){
      return "Android";
    }
    
    if (userAgent.indexOf("Windows Phone") > -1){
      return "Windows";
    }
  
    return 'Others';
  }

  // 判断浏览器类型
  var _myBrowser = function(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
  return "Chrome";
  }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}
  
  
  // 转换时间
  var _formatTime = function(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
  
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let t = date.getMinutes();
    t = t < 10 ? ('0' + t) : t;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + m + '-' + d + ' ' + h + ':' + t + ':' + s;
  };

  export default {
    methods: {
        getCookie: _getCookie,
        osType: _osType,
        myBrowser: _myBrowser,
        formatTime: _formatTime,
    }
}