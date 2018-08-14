$(function(){
    var code = $("#phoneCode").val();
    var newPs = $("#newPs").val();
    captcha(code,newPs);
})
var phone;
//获取验证码
function sendsms(e) {
    /*发送验证码功能*/
    var reg_phone = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    phone = $("#phone").val();
    if(phone == ""){
        layer.msg("手机号不能为空~");
        return false;   
    }
    if(!reg_phone.test(phone)){
        layer.msg('请输入有效的11位手机号码');
        return false;
    }
    ajax_post("/auth/vcode/reset", {
        "phone": phone
    }, function (res) {
        if(res.code == 0){
            layer.msg(res.msg);
        }else{
            layer.msg(res.msg);
        }
    })
    countdown(e);
}
//倒计时函数
var time = 60;
function countdown(e) {
    if (time == 0) {
        e.setAttribute("onclick", "sendsms(this)");
        $(".gain").html("获取验证码");
        time = 60;
    } else {
        e.removeAttribute("onclick");
        $(".gain").html(time + "s");
        time--;
        setTimeout(function () {
            countdown(e)
        }, 1000)
    }
}

function captcha(code,password){
    ajax_post("/auth/password/reset",{
        "username":phone,
        "code":code,
        "password":password
    },function(res){
        if(res.code == 200){
            layer.msg(res.msg);
            setTimeout(function(){
                window.location.href = "/home/login.html"
            },2000)
        }else{
            layer.msg(res.msg);
        }
    })
}
