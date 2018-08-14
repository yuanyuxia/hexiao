$(function(){
    $(".btn").click(function(){
        var phone = $.trim($("#phone").val());
        var phone_verification = new RegExp('^1[0-9]{10}$');
        if(phone == ""){
            layer.msg('手机号不能为空~');
            return false;
        }
        if(phone_verification.test(phone) == false){
            layer.msg('请输入有效的11位手机号~');
            return false;
        }
        window.location.href = '/home/register_two.html?phone='+phone;
    });
});