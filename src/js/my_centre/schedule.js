$(function() {
  min_height();
  var clientId = getUrlParms("clientId");
  schedule(clientId);
  storage.set('clientId',clientId)
});
function schedule(clientId) {
  const URL = '/operation/clientOrder/reason';
  const params = {
    clientOrderId:clientId
  }
  ajax_post(URL,params,(res)=>{
    console.log(res);
    if(res.code!==200){
      layer.msg(res.msg)
    }else{
      $('.no').text(res.data.clientOrderOperation.clientOrderId);
      $('.paymentTime').text(dateFmt("yyyy-MM-dd hh:mm:ss", res.data.clientOrderOperation.paymentTime));
      $('.proCon>h5').text(res.data.keyWord)
      switch(res.data.category){
        case 1:
          $('.mission_site>span').text('手机淘宝浏览任务');
          break;
        case 2:
          $('.mission_site>span').text('手机天猫浏览任务');
          break;
        case 3:
          $('.mission_site>span').text('电脑淘宝浏览任务');
          break;
        case 4:
          $('.mission_site>span').text('电脑天猫浏览任务');
          break;
        case 5:
          $('.mission_site>span').text('手机美丽说浏览任务');
          break;
        case 6:
          $('.mission_site>span').text('手机京东浏览任务');
          break;
        case 7:
          $('.mission_site>span').text('手机蘑菇街浏览任务');
          break;
      }

      $('.moneys>.first').text(`佣金¥${res.data.laborUser-res.data.bountyUser}`)
      $('.moneys>.second').text(`商品价:¥${res.data.capitalUser}`)
      $('.moneys>.third').text(`赏金:¥${res.data.bountyUser}`)
    }
  // status (integer, optional): 操作到第几步了：
    // 0-仅接单
    // 1-已做过货币三家
    // 2-已做过目标预览
    // 3-已做过购买待商家确认
    // 4-商家确认过待发货
    // 5-商家确认发货待用户评价
    // 6-用户确认收款并好评
    // 7-商家确认任务结束
    switch(res.data.status){
      case 0:
      $('.await_order>.statusImg').html('');
      $('.await_commission>.statusImg').html('');
      $('.await_evaluate>.statusImg').html('');
      $('.await_return>.statusImg').html('');
        break;
      case 1:
        break;
      case 2:
        $('.await_commission>.statusImg').html('');
        $('.await_evaluate>.statusImg').html('');
        $('.await_return>.statusImg').html('');
        break;
      case 3:
        $('.await_evaluate>.statusImg').html('');
        $('.await_return>.statusImg').html('');
        break;
      case 4:
        break;
      case 5:
        $('.await_return>.statusImg').html('');
        break;
      case 6:
        break;
      case 7:
        break;
    }
  })
//   ajax_post(
//     "/operation/clientOrder/operationSearch",
//     {
//       clientId: clientId
//     },
//     function(res) {
//       console.log(res);
//       if (res.code == 200) {
//         switch (res.status) {
//           case 0:
//             undone(".await_order statusImg img"); //待下单
//             undone(".await_commission statusImg img"); //待发佣金
//             undone(".await_evaluate statusImg img"); //待评价
//             await_return(); //待返现
//             break;
//           case 1:
//             undone(".await_commission statusImg img"); //待发佣金
//             undone(".await_evaluate statusImg img"); //待评价
//             await_return(); //待返现
//             break;
//           case 2:
//             undone(".await_evaluate statusImg img"); //待评价
//             await_return(); //待返现
//             break;
//           case 3:
//             await_return(); //待返现
//             break;
//         }
//       }
//     }
//   );
// }
// function undone(obj) {
//   $(obj)
//     .eq(0)
//     .attr("src", "/src/images/my_centre/up_checked.png");
//   $(obj)
//     .eq(1)
//     .attr("src", "/src/images/my_centre/down_checked.png");
// }
// function await_return() {
//   $(".await_return statusImg img").attr(
//     "src",
//     "/src/images/my_centre/up_checked.png"
//   );
}
