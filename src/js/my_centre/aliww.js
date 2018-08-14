$(function () {
    min_height();
    $("#lg_upload_tb").height(imgHeight);
    $("#lg_upload_ali").height(imgHeight);
    $(".name").click(function () {
        layer.prompt({
            title: '请输入旺旺名',
            formType: 2
        }, function (text, index) {
            layer.close(text);
            layer.msg('旺旺名为：' + text);
            $(".name .fr span").text(text);
        });
    })
    $(".nameId").click(function () {
        layer.prompt({
            title: '请输入旺旺ID',
            formType: 2
        }, function (text, index) {
            layer.close(text);
            layer.msg('旺旺id为：' + text);
            $(".nameId .fr span").text(text);
        });
    })
    $(".nameqq").click(function () {
        layer.prompt({
            title: '请输入QQ号',
            formType: 2
        }, function (text, index) {
            layer.close(text);
            layer.msg('QQ号为：' + text);
            $(".nameqq .fr span").text(text);
        });
    })
    $(".phone").click(function () {
        layer.prompt({
            title: '请输入收货手机号',
            formType: 2
        }, function (text, index) {
            layer.close(text);
            layer.msg('收货手机号为：' + text);
            $(".phone .fr span").text(text);
        });
    })
    $(".postcode").click(function () {
        layer.prompt({
            title: '请输入邮编',
            formType: 2
        }, function (text, index) {
            layer.close(text);
            layer.msg('邮编为：' + text);
            $(".postcode .fr span").text(text);
        });
    })
    sites();
    uploading_tb();
    uploading_ali();
    $(".submit").click(function(){
        var wwId = $(".nameId .fr span").text();//旺旺ID
        if(wwId == "未填写"){
            layer.msg("请填写旺旺ID~");
            return false;
        }
        var wwName = $(".name .fr span").text();//旺旺名称
        if(wwName == "未填写"){
            layer.msg("请填写旺旺名称~");
            return false;
        }
        var qqNum = $(".nameqq .fr span").text();//QQ号
        if(qqNum == "未填写"){
            layer.msg("请填写QQ号~");
            return false;
        }
        var phone = $(".phone .fr span").text();//手机号
        if(phone == "未填写"){
            layer.msg("请填写手机号~");
            return false;
        }
        var region = $("#sel_city").text();//所在地址
        if(region == "未填写"){
            layer.msg("请填写所在地址~");
            return false;
        }
        var address = $("#sites").val();//详细地址
        if(address == ""){
            layer.msg("请填写详细地址~");
            return false;
        }
        var picture = "";//支付宝账户截图
        var pictureWang = "";//淘宝旺旺账号截图
        var parms = {
            "wwId":wwId,
            "wwName":wwName,
            "qqNum":qqNum,
            "phone":phone,
            "region":region,
            "address":address,
            "picture":picture,
            "pictureWang":pictureWang
        }
        aliww(parms);
    })
})

function sites() {
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
        title: '地址选择'
    });

    picker.on('picker.select', function (selectedVal, selectedIndex) {
        var text1 = first[selectedIndex[0]].text;
        var text2 = second[selectedIndex[1]].text;
        var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';

        nameEl.innerText = text1 + ' ' + text2 + ' ' + text3;
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
var imgWidth = $(".example_img").width();
var imgHeight = $(".example_img").height();
function uploading_tb() {
    var $list = $(".uploader-list-tb");
    var thumbnailWidth = imgWidth; //缩略图高度和宽度 （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档  
    var thumbnailHeight = imgHeight;
    var uploader = WebUploader.create({

        // swf文件路径
        swf: '/src/libs/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: 'http://webuploader.duapp.com/server/fileupload.php',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#lg_upload_tb',

        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        fileNumLimit: 3,
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        pick: {
            id: $("#lg_upload_tb"), // id
            multiple: false // false  单选 
        },
    });
    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<div class="remove"><i>×</i></div>' +
                '<img>' +
                '</div>'
            ),
            $img = $li.find('img');
        // $list为容器jQuery实例
        $list.append($li);

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
        if ($(".uploader-list-tb .file-item").length >= 1) {
            $("#lg_upload_tb").hide();
        } else {
            $("#lg_upload_tb").show();
        }
        $(".remove").each(function () {
            $(this).click(function () {
                var id = $(this).parent().attr("id");
                uploader.removeFile(id);
                $(this).parent().remove();
                if ($(".uploader-list-tb .file-item").length >= 1) {
                    $("#lg_upload_tb").hide();
                } else {
                    $("#lg_upload_tb").show();
                }
            })
        })
        $info = $('<p class="error"></p>');
        showError = function (code) {
            switch (code) {
                case 'exceed_size':
                    text = '文件大小超出';
                    break;

                case 'interrupt':
                    text = '上传暂停';
                    break;

                default:
                    text = '上传失败，请重试';
                    break;
            }

            $info.text(text).appendTo($li);
        };

    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>')
                .appendTo($li)
                .find('span');
        }

        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file) {
        $('#' + file.id).addClass('upload-state-done');
    });

    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function (file) {
        var $li = $('#' + file.id),
            $error = $li.find('div.error');

        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').remove();
    });
    // 所有文件上传成功后调用        
    uploader.on('uploadFinished', function () {
        //清空队列
        uploader.reset();
    });
}
function uploading_ali() {
    var $list = $(".uploader-list-tb");
    var thumbnailWidth = imgWidth; //缩略图高度和宽度 （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档  
    var thumbnailHeight = imgHeight;
    var uploader = WebUploader.create({

        // swf文件路径
        swf: '/src/libs/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: 'http://webuploader.duapp.com/server/fileupload.php',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#lg_upload_ali',

        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        fileNumLimit: 3,
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        pick: {
            id: $("#lg_upload_ali"), // id
            multiple: false // false  单选 
        },
    });
    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<div class="remove"><i>×</i></div>' +
                '<img>' +
                '</div>'
            ),
            $img = $li.find('img');
        // $list为容器jQuery实例
        $list.append($li);

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
        if ($(".uploader-list-ali .file-item").length >= 1) {
            $("#lg_upload_ali").hide();
        } else {
            $("#lg_upload_ali").show();
        }
        $(".remove").each(function () {
            $(this).click(function () {
                var id = $(this).parent().attr("id");
                uploader.removeFile(id);
                $(this).parent().remove();
                if ($(".uploader-list-ali .file-item").length >= 1) {
                    $("#lg_upload_ali").hide();
                } else {
                    $("#lg_upload_ali").show();
                }
            })
        })
        $info = $('<p class="error"></p>');
        showError = function (code) {
            switch (code) {
                case 'exceed_size':
                    text = '文件大小超出';
                    break;

                case 'interrupt':
                    text = '上传暂停';
                    break;

                default:
                    text = '上传失败，请重试';
                    break;
            }

            $info.text(text).appendTo($li);
        };

    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>')
                .appendTo($li)
                .find('span');
        }

        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file) {
        $('#' + file.id).addClass('upload-state-done');
    });

    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function (file) {
        var $li = $('#' + file.id),
            $error = $li.find('div.error');

        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').remove();
    });
    // 所有文件上传成功后调用        
    uploader.on('uploadFinished', function () {
        //清空队列
        uploader.reset();
    });
}
function aliww(parms){
    ajax_post("/auth/user/binding/save",parms,function(res){
        if(res.code == 200){
            layer.msg(res.msg);
            setTimeout(function(){
                window.location.href = "/my_centre/my.html";
            },2000)
        }else{
            layer.msg(res.msg);            
        }
    })
}