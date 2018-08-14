$(function () {
    min_height();
    //查看全部跳转
    $('.get-all-data').on('click',function(){
      window.location.href = '/mission/my_mission.html?status=-1&operateClassification=-1&type=-1'
    })
    userInfo();
})
function userInfo() {
    ajax_get("/auth/user/info", {}, function (res) {
        console.log(res);
        storage.set('userInfo',res.data)
        if(res.code!== 200){
          layer.msg(res.msg);
        }else{
          const userInfo = res.data;
        //用户名字
        $(".messageT .fl h5").text(userInfo.nickName);
        //用户ID
        $(".messageT .fl p").text("ID:"+userInfo.id);
        //用户头像
        // $(".messageT .fr img").attr("src",res.)
          $('.remain_rebate').text(userInfo.amount)
        }
    })
}