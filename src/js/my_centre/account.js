/**
 * 我的账户
 * author:zxl
 */
'use strict'

let userInfo = JSON.parse(storage.get('userInfo'));
console.log(userInfo);
$('.accNum').text(userInfo.amount);
