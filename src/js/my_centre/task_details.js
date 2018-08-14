$(function(){
    let id = getUrlParms("id");
  console.log(id);
  detail(id);
    $(".grab").click(function(){
        add(id);
    })
})
function detail(id){
    ajax_post("/operation/BusinessCommodity/detail/search",{
        "id":id
    },function(res){
        if(res.code == 200){
          console.log(res);
          let data = res.data;
          $('.proCon>h5').text(data.keyword)
          $('.goodsCapital-total').text('¥' + data.goodsCapitalTotal)
          $('.taskMessage .id').text(data.id)
          $('.return .amount').text(data.goodsCapitalTotal)
          if(!data.valueAdd){
            $('.service .amount').text(data.laborPrice)
          }else{
            $('.service .amount').text(data.laborPrice - data.bountyPrice)
          }
          $('.extra .amount').text(data.bountyPrice)
          let service = $('.service .amount').text()-0;
          let extra = $('.extra .amount').text()-0;
          let return1 = $('.return .amount').text()-0;
          $('.aggregate .total').text(service+extra+return1)
          switch(data.category){
            case 1:
              $('.category').text(`手机淘宝浏览任务`)
              break;
            case 2:
              $('.category').text(`手机天猫浏览任务`)
              break;
            case 3:
              $('.category').text(`电脑淘宝浏览任务`)
              break;
            case 4:
              $('.category').text(`电脑天猫浏览任务`)
              break;
            case 5:
              $('.category').text(`手机美丽说浏览任务`)
              break;
            case 6:
              $('.category').text(`手机京东浏览任务`)
              break;
            case 7:
              $('.category').text(`手机蘑菇街浏览任务`)
              break;
          }
        }
    })
}
function add(businessCommodityId){
    ajax_post("/operation/clientOrder/save",{
        "businessCommodityId":businessCommodityId
    },function(res){
        if(res.code == 200){
            layer.msg(res.msg);
        }else{
            layer.msg(res.msg);
        }
    })
}