'use strict';

const urlParams = getRequest();
const id = urlParams.id;
// console.log(params);
const url = '/operation/platformFinanceDetail/search';
const params = {
  id:id
}
ajax_post(url,params,(res)=>{
  if(res.code!==200){
    layer.msg(res.msg)
  }else{
    /**
     * {"code":200,"msg":"成功","data":{"id":-2,"cuid":4,"type":3,"amount":26.5,"createTime":1530200385024,"clientOrderId":9,"platformBankId":null,"checkResult":null,"status":null},"success":true}
     */

    console.log(res);
    let item = res.data;
    let targetStr = '';
    targetStr += `
    <li>${item.clientOrderId}</li>`;
    // type (integer, optional): 类型：1-充值；2-消费；-1：提现
      switch(item.type){
        case 1:
          targetStr+=`<li>本金</li>`
          break;
        case 2:
          targetStr+=`<li>劳务费用收入</li>`;
          break;
        case 3:
          targetStr+=`<li>赏金收入</li>`;
          break;
        case -1:
          targetStr+=`<li>提现</li>`;
          break;
        case -2:
          targetStr+=`<li>订单申诉撤回</li>`;
          break;
      }

      targetStr+=`
        <li>${item.amount}元</li>
        <li>${dateFmt("yyyy-MM-dd hh:mm:ss",item.createTime)}</li>
        `;
      $('.orderNum').html(targetStr)
  }
})