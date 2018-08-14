$(function () {
    phone = getUrlParms("phone");
    $(".telephone").text(phone);
    $(".register").click(function () {
        var sessionId = storage.get("sessionId");
        sessionId = sessionId.replace("\"","").replace("\"","");
        sessionId = $.trim(sessionId);
        // 验证码
        var code = $("#verify").val();
        //密码
        var password = $("#password").val();
        // 确认密码
        var confirmPassword = $("#confirmPassword").val();
        console.log(typeof(password));
        if($.trim(password) != $.trim(confirmPassword)){
            layer.msg("两次密码不一致~");
            return false;
        }
        //邀请人ID
        var inviter = $("#inviter").val();
        //出生年月日
        var sel_city = $("#sel_city").text();
        ajax_post("/auth/wechat_pub/register", {
            "sessionId":sessionId,
            "username":phone,
            "password":password,
            "confirmPassword":confirmPassword,
            "birthday":sel_city,
            "code":code
        }, function (res) {
            if(res.code == 200){
                window.location.href = "/home/register_succees.html";
            }else{
                layer.msg(res.msg);
            }
        })
    })
    times();
})
var phone;
function sendsms(e) {
    /*发送验证码功能*/
    countdown(e);
    ajax_post("/auth/vcode/register", {
        "phone": phone
    }, function (res) {
        console.log(res);
        if(res.code == 0){
            layer.msg(res.msg);
        }else{
            layer.msg(res.msg);
            return false;
        }
    })
}
//倒计时函数
var time = 60;
function countdown(e) {
    if (time == 0) {
        e.setAttribute("onclick", "sendsms(this)");
        $(".gain").html("获取验证码");
        time = 60;
    } else {
        e.removeAttribute("onclick");
        $(".gain").html(time + "s");
        time--;
        setTimeout(function () {
            countdown(e)
        }, 1000)
    }
}
function times() {
    var nameEl = document.getElementById('sel_city');
    var first = []; /* 省，直辖市 */
    var second = []; /* 市 */
    var third = []; /* 镇 */
    var selectedIndex = [0, 0, 0]; /* 默认选中的地区 */
    var checked = [0, 0, 0]; /* 已选选项 */
    function creatList(obj, list) {
        obj.forEach(function (item, index, arr) {
            var temp = new Object();
            temp.text = item.name;
            temp.value = index;
            list.push(temp);
        })
    }

    creatList(city, first);

    if (city[selectedIndex[0]].hasOwnProperty('sub')) {
        creatList(city[selectedIndex[0]].sub, second);
    } else {
        second = [{
            text: '',
            value: 0
        }];
    }

    if (city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
        creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
    } else {
        third = [{
            text: '',
            value: 0
        }];
    }

    var picker = new Picker({
        data: [first, second, third],
        selectedIndex: selectedIndex,
        title: '时间选择'
    });

    picker.on('picker.select', function (selectedVal, selectedIndex) {
        var text1 = first[selectedIndex[0]].text;
        var text2 = second[selectedIndex[1]].text;
        var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';

        nameEl.innerText = text1 + '-' + text2 + '-' + text3;
        if ($("#sel_city").text() != "") {
            $(".initialDay").hide();
        } else {
            $(".initialDay").show();
        }
    });

    picker.on('picker.change', function (index, selectedIndex) {
        if (index === 0) {
            firstChange();
        } else if (index === 1) {
            secondChange();
        }

        function firstChange() {
            second = [];
            third = [];
            checked[0] = selectedIndex;
            var firstCity = city[selectedIndex];
            if (firstCity.hasOwnProperty('sub')) {
                creatList(firstCity.sub, second);

                var secondCity = city[selectedIndex].sub[0]
                if (secondCity.hasOwnProperty('sub')) {
                    creatList(secondCity.sub, third);
                } else {
                    third = [{
                        text: '',
                        value: 0
                    }];
                    checked[2] = 0;
                }
            } else {
                second = [{
                    text: '',
                    value: 0
                }];
                third = [{
                    text: '',
                    value: 0
                }];
                checked[1] = 0;
                checked[2] = 0;
            }

            picker.refillColumn(1, second);
            picker.refillColumn(2, third);
            picker.scrollColumn(1, 0)
            picker.scrollColumn(2, 0)
        }

        function secondChange() {
            third = [];
            checked[1] = selectedIndex;
            var first_index = checked[0];
            if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
                var secondCity = city[first_index].sub[selectedIndex];
                creatList(secondCity.sub, third);
                picker.refillColumn(2, third);
                picker.scrollColumn(2, 0)
            } else {
                third = [{
                    text: '',
                    value: 0
                }];
                checked[2] = 0;
                picker.refillColumn(2, third);
                picker.scrollColumn(2, 0)
            }
        }

    });
    picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
        // 在这里把客户选中的省市区发送给后台
        console.log(selectedVal);
        console.log(selectedIndex);
    });

    nameEl.addEventListener('click', function () {
        picker.show();
    });
}
