$(function(){
    min_height();
    let userInfo = JSON.parse(storage.get('userInfo'));
    console.log(userInfo);
    $('.nickname').text(userInfo.nickName);
    $('.phone-num').text(userInfo.phone);
    $('.birthday-text').text(userInfo.birthday);
    $('.inviter-id').text(userInfo.inviter);
})