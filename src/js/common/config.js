/** 全局插件 **/
document.write("<script language=javascript src='/src/js/common/base64.js'></script>");
$.extend({
    GetWXCode:function(UrlHosts){
        if(window.localStorage.getItem("uData")){
            window.localStorage.removeItem('uData');
        }
        var urlhost = (UrlHosts)?UrlHosts:window.location.href;
        window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd290b001c53b493c&redirect_uri="+codeHandler.encode("www.xwz.com:8080")+"&response_type=code&scope=snsapi_userinfo#wechat_redirect";
    }
});