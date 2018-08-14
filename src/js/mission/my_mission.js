$(function(){
    min_height();
    let urlParams = getRequest();
  // console.log(urlParams);
  let params = null;
    let page = 1;
    // console.log(params);
    urlParams.page = page;
    params =urlParams
    // params.type = urlParams.type-0;
    // params.status= urlParams.status-0;
    // params.operateClassification= urlParams.operateClassification-0;
    // params.pageSize = 5;
  // console.log(params);
  getMission(params)

    if($('.missions>ul>li').length<params.pageSize){
      $('.mui-content-padded').hide();
    }
    $('.prev').on('click',()=>{
      if(page<=1){
        layer.msg('已是第一页~')
        page=1;
        return;
      }else{
        page--;
        params.page = page;
        getMission(params)
      }
    })

    $('.next').on('click',()=>{
      let length = $('.missions>ul>li').length;
      // console.log(length);
      // console.log(params.pageSize);
      if(length<params.pageSize){
        layer.msg('已是最后一页~')
        return;
      }else{
        page++;
        params.page = page;
        getMission(params)
      }
    })
  function getMission({page,status,operateClassification,type}){
    const URL = '/operation/clientOrder/myOrderList/search';
    /*
    * status:
    * 状态：-1 全部 0-仅接单 1-已做过货币三家 2-已做过目标预览 3-已做过购买待商家确认     4-商家确认过待发货 5-商家确认发货待用户评价 6-用户确认收款并好评 7-商家确认任务结束
    * operateClassification:
    * 状态：-1 全部 0-非次日任务；1-次日任务；2-购物车任务；3-回购任务
    * type:
    * 状态：-1 全部 0-常规任务；1-赏金任务
    * */
    params = {
      page:page-0,
      pageSize:3,
      status:status-0,
      operateClassification:operateClassification-0,
      type:type-0
    }
    console.log(params);
    ajax_post(URL,params,(res)=>{
      if(res.code!==200){
        layer.msg(res.msg)
      }else{
        console.log(res);
        let html = ``;
        let dataList = res.data.list;
        if(dataList.length){
          dataList.forEach((item,index)=>{
            html+=`<li>
                     <a href="../my_centre/schedule.html?clientId=${item.id}">
                    <div class="title">`;
            switch(item.type){
              case 0:
                html+=`<h4 class="fl">常规任务</h4>`
                break;
              case 1:
                html+=`<h4 class="fl">赏金任务</h4>`
                break;
            }
            switch(item.status){
              case 0:
                html+=`<div class="status fr">仅接单</div>`
                break;
              case 1:
                html+=`<div class="status fr">已做过货币三家</div>`
                break;
              case 2:
                html+=`<div class="status fr">已做过目标预览</div>`
                break;
              case 3:
                html+=`<div class="status fr">已做过购买待商家确认</div>`
                break;
              case 4:
                html+=`<div class="status fr">商家确认过待发货</div>`
                break;
              case 5:
                html+=`<div class="status fr">商家确认发货待用户评价</div>`
                break;
              case 6:
                html+=`<div class="status fr">用户确认收款并好评</div>`
                break;
              case 7:
                html+=`<div class="status fr">商家确认任务结束</div>`
                break;
            }
            html+=`</div>
                    <div class="proBox clearfix">
                        <div class="proImg">
                            <img src="/src/images/mission/stencil.jpg" alt="">
                        </div>
                        <div class="proCon">
                            <h5>${item.keyWord}</h5>
                            <div class="mission_site">
                                <i></i>`;
            switch(item.category){
              case 1:
                html+=`<span> 手机淘宝浏览任务</span>`;
                break;
              case 2:
                html+=`<span> 手机天猫浏览任务</span>`;
                break;
              case 3:
                html+=`<span> 电脑淘宝浏览任务</span>`;
                break;
              case 4:
                html+=`<span> 电脑天猫浏览任务</span>`;
                break;
              case 5:
                html+=`<span> 手机美丽说浏览任务</span>`;
                break;
              case 6:
                html+=`<span> 手机京东浏览任务</span>`;
                break;
              case 7:
                html+=`<span> 手机蘑菇街浏览任务</span>`;
                break;
            }
            html+=`</div>
                            <div class="moneys">
                                <span>佣金:¥${item.laborUser-item.bountyUser}</span>
                                <span>商品价:¥${item.capitalUser}</span>
                                <br>`
            if(item.type==1){
              html+=`<span>赏金:¥${item.bountyUser}</span>`
            };
            html+=`</div>
                        </div>
                    </div>
                    </a>
                </li>`
          })
          $('.missions>ul').html(html)
        }else{
          layer.msg('暂无数据了~');
          $('.mui-content-padded').hide();
          return;
        }
      }
    })
  }
})
