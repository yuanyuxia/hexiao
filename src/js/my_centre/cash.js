'use strict';
$(function () {
  getUserInfo();
  $('.cashBtn').on('click', function () {
    if (!$('.cash-input').val()) {
      layer.msg('请输入合法的提现金额！');
      return false;
    }
    const amount = $('.amount').val() - $('.cash-input').val()
    if (amount < 0) {
      layer.msg('您的可用金额不足！');
      return false;
    }

    if (
      !($('.bank-id').val() &&
        $('.bank-belang').val() &&
        $('.realname').val() &&
        $('.phone').val())
    ) {
      layer.msg('请补全信息后提交！');
      return false;
    }
    const url = '/platformFinanceDetail/withdraw/save';
    const params = {
      amount: $('.cash-input').val(),
      platformBankId: $('.bank-id').val(),
      clientOrderId: ''
    }
    ajax_post(url, params, (res) => {
      if (res.code !== 200) {
        layer.msg(res.msg);
      } else {

      }
    })

  })
})

function getUserInfo() {
  ajax_get("/auth/user/info", {}, function (res) {
    // console.log(res);
    storage.set('userInfo', res.data)
    if (res.code !== 200) {
      layer.msg(res.msg);
    } else {
      console.log(res.data);
      const userInfo = res.data;
      //用户名字
      // $(".messageT .fl h5").text(userInfo.nickName);
      // //用户ID
      // $(".messageT .fl p").text("ID:"+userInfo.id);
      // //用户头像
      // // $(".messageT .fr img").attr("src",res.)
      $('.cash-input').attr("placeholder", `￥` + userInfo.amount);
      $('.amount').text(userInfo.amount)
    }
  })
}