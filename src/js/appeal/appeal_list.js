$(function () {
    min_height();
    msg = "暂无申诉~";
    appeal_lists(msg, -1);
    // 点击上一页
    $(".prev").click(function () {
        msg = "已是第一页~"
        page--;
        appeal_lists(msg, 0);
    })
    // 点击下一页
    $(".next").click(function () {
        msg = "已是最后一页~"
        page++;
        appeal_lists(msg, 1);
    })
})
var page = 1;
var msg = "";
function appeal_lists(msg, tage) {
    ajax_get("/general/appeal/list/search", {
        "page": page,
        "pageSize": 10,
        "type": 1
    }, function (res) {
        console.log(res);
        // 获取成功
        if (res.code == 200) {
            // 第一次加载长度为每页的长度时上,下页显示
            if (res.data.list.length >= 10) {
                $(".mui-content-padded").show();
            }
            if (res.data.list.length > 0) {
                var html = "";
                $.each(res.data.list, function (index, item) {
                    html += '<li class="clearfix">'
                    if (item.status == 0) {
                        html += '<a href="/appeal/appeal_course.html?id='+item.id+'"></a>';
                    } else if (item.status == 1) {
                        html += '<a href="/appeal/appeal_succeed.html?id='+item.id+'"></a>';
                    } else if (item.status == -1) {
                        html += '<a href="/appeal/appeal_loser.html?id='+item.id+'"></a>';
                    }
                    html += '<div class="appealBox fl">' +
                        '<p class="serial">订单编号: ' + item.orderId + '</p>' +
                        '<p class="time">' + dateFmt("yyyy-MM-dd hh:mm:ss", item.createTime) + '</p>' +
                        '</div>' +
                        '<div class="status fr">'
                    if (item.status == 0) {
                        html += '<span class="course">申诉中 </span>';
                    } else if (item.status == 1) {
                        html += '<span class="successful">申诉成功 </span>';
                    } else if (item.status == -1) {
                        html += '<span class="loser">申诉失败 </span>';
                    }
                    html += '<i class="jiantou"></i>' +
                        '</div>' +
                        '</li>'
                })
                $(".appeal_lists ul").html(html);
            } else {
                layer.msg(msg);
                // 如果点击上一页为空时page++还原
                if (tage == 0) {
                    page++;
                }
                // 如果点击下一页为空时page--还原
                if (tage == 1) {
                    page--;
                }
                // 默认
                if (tage == -1) {
                    return false;
                }
            }
        } else {
            layer.msg("请求失败~")
        }
    })
}