$(function(){
    // 已授权
    $(".loginBtn").click(function(){
        var username = $("#userName").val();
        var password = $("#password").val();
        var sessionId = storage.get("sessionId");
        sessionId = sessionId.replace("\"","").replace("\"","");
        sessionId = $.trim(sessionId);
        if(username == ""){
            layer.msg("账号不能为空");
            return false;
        }
        if(password == ""){
            layer.msg("密码不能为空");
            return false;
        }
        ajax_post("/auth/wechat_pub/login",{
            "sessionId":sessionId,
            "username":username,
            "password":password
        },function(res){
            if(res.code == 200){
                layer.msg("登录成功");
                setTimeout(function(){
                    window.location.href = "/"
                },2000)
            }else{
                layer.msg("账号或密码有误，请重新输入~");
            }
        })
    })
})