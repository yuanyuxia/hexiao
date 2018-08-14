$(function () {
  min_height();
  let valueAdd = getUrlParms("valueAdd");
  valueAdd = parseInt(valueAdd);
  let page = 0;
  let category = 0;
  let type = 0;
  let length = 0;
  //普通任务
  if (valueAdd == 0) {
    $(".lg_common_task h2").text("普通任务");
    common_task(page,category,type)
  }else if (valueAdd == 1) {
    //赏金任务
    $(".lg_common_task h2").text("赏金任务");
    common_task(page,category,type)
  }else if (valueAdd == 2) {
    //回购任务
    $(".lg_common_task h2").text("回购任务");
    common_task(page,category,type)
    buyBack();
  } else {
    msg = "暂无任务~";
    layer.msg(msg);
  }
  $('.prev').on('click',function (){
    console.log(page);
    if(page!=0){
      page--;
    }else{
      layer.msg("已是第一页~");
      return;
    }
    common_task(page,category,type)
  })
  $('.next').on('click',function (){
    if(length==5){
      page+=1;
      console.log(page);
    }else if(length==0){
      layer.msg("已是最后一页~");
      return;
    }
    common_task(page,category,type)
  })
  function common_task(page,category,type) {
    let parse = {
      "page": page||1,
      "pageSize": 5,
      "type": type||0,
      "category": category||0,
      "valueAdd": valueAdd
    }
    console.log(parse);
    ajax_post("/operation/BusinessCommodity/list/search", parse, function (res) {
        console.log(res);

        // 获取成功
        if (res.code == 200) {
          length = res.data.list.length;
          if(!length){
            layer.msg("暂无数据，请稍后重试~");
            return;
          }
          // 第一次加载长度为每页的长度时上,下页显示
          if (res.data.list.length >= 5) {
            $(".mui-content-padded").show();
          }
          if (res.data.list.length > 0) {
            var html = "";
            res.data.list.forEach((item,index)=>{
              html +=
                `<li class="clearfix">
                    <a href="/my_centre/task_details.html?id=${item.id}">
                        <div class="proImg fl">
                            <img src="/src/images/mission/stencil.jpg">
                        </div>
                        <div class="proCon fr">
                            <h5>${item.keyword}</h5>
                            <div class="mission_site">
                            <i></i>`;
              switch(item.category){
                case 1:
                  html+=`<span>手机淘宝浏览任务</span>`;
                  break;
                case 2:
                  html+=`<span>手机天猫浏览任务</span>`;
                  break;
                case 3:
                  html+=`<span>电脑淘宝浏览任务</span>`;
                  break;
                case 4:
                  html+=`<span>电脑天猫浏览任务</span>`;
                  break;
                case 5:
                  html+=`<span>手机美丽说浏览任务</span>`;
                  break;
                case 6:
                  html+=`<span>手机京东浏览任务</span>`;
                  break;
                case 7:
                  html+=`<span>手机蘑菇街浏览任务</span>`;
                  break;
              }
              html+= `</div>
                        <div class="moneyBox clearfix">
                            <span class="fl">¥${item.laborPrice}</span>
                            <span class="fl hint">佣金</span>
                            <span class="fl">¥${item.goodsCapitalTotal}</span>
                            <span class="fl hint">商品价</span>
                            <div class="residue fr">剩余${item.remainNum}单</div>
                          </div>
                        </div>
                      </a>
                    </li>`;
            })
            $(".pro_list ul").html(html);
          }else{
            // $(".pro_list ul").html('');
            // layer.msg("已是最后一页~");
            return;
          }
        } else {
          layer.msg("请求失败~");
        }
      }
    );
  }

  switchover({
    nav_parent: ".taskBox ul",
    nav_label: "li",
    nav_class: "active"
  });
  switchover({
    nav_parent: ".platform ul",
    nav_label: "li",
    nav_class: "active"
  });
  $(".taskBox ul li").each(function () {
    $(this).click(function () {
      type = $(this).attr("data-id");
      console.log(type);
      // common_task()
      // common_task(1,category,type)
      // $(".selectBox").hide();
    });
  });
  $(".platform ul li").each(function () {
    $(this).click(function () {
      category = $(this).attr("data-id");
      console.log(category);

      // $(".selectBox").hide();
    });
  });
  $(".screen").click(function () {
    $(".selectBox").show();
    $("footer").hide();
    // PC端无法滚动
    $("body").css({
      overflow: "hidden"
    });
    // // 移动端无法滚动
    // $(".content,.bg").bind("touchmove", function (e) {
    //   e.preventDefault();
    // });
    // $(".screen").click(function () {
    //   $(".selectBox").show();
    //   $("footer").hide();
    //   // PC端无法滚动
    //   $("body").css({
    //     overflow: "hidden"
    //   });
    //   // 移动端无法滚动
    //   $(".content,.bg").bind("touchmove", function (e) {
    //     e.preventDefault();
    //   });
    });
    //筛选
    $(".accomplish").click(function (e) {

      $("footer").show();
      $("body").css({
        overflow: "visible"
      });

      common_task(1,category,type)
      $(".selectBox").hide();
      // msg = "暂无任务~";
      // common_task(msg, -1);
    });
    // 清除选项
    $(".empty").click(function () {
      type = 0;
      category = 0;
      $(".taskBox ul li").each(function () {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
        }
      });
      $(".platform ul li").each(function () {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
        }
      });
      common_task(1,category,type)
      $(".selectBox").hide();
    });
  //   // 点击上一页
  //   // $(".prev>a").click(function () {
  //   //   console.log(page);
  //   //
  //   //   msg = "已是第一页~";
  //   //   page--;
  //   //   common_task(  msg, 0);
  //   // });
  //   $('.prev').on('click',function(){
  //     console.log(page);
  //   })
  //   // 点击下一页
  //   $(".next").click(function () {
  //     msg = "已是最后一页~";
  //     page++;
  //     common_task(msg, 1);
  //   });
  // });

});
function buyBack() {
  ajax_post("/operation/clientOrder/searchMyTask", {}, function (res) {
    console.log(res);
    if (res.code == 200) {

    }
  })
}