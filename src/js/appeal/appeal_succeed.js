$(function(){
    var id = getUrlParms("id"); 
    course(id);
})
function course(id){
    ajax_get("/general/appeal/detail/search",{
        "id":id
    },function(res){
        console.log(res);
        if(res.code == 200){
            $(".cause p").text(res.data.content);//申诉原因
            $(".orders .fr").text(res.data.orderId);//订单编号
            $(".time .fr").text(dateFmt("yyyy-MM-dd hh:mm:ss", res.data.createTime));//申请时间
            $(".message span").text(res.data.title);
        }
    })
}