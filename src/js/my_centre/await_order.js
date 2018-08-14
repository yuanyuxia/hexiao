$(function(){
    $(".require").click(function () {
        if ($(".require i").hasClass("pull_down")) {
            $(".require i").addClass("pull_up").removeClass("pull_down");
            $(".uploadImg").slideUp();
            return;
        }
        if ($(".require i").hasClass("pull_up")) {
            $(".require i").addClass("pull_down").removeClass("pull_up");
            $(".uploadImg").slideDown();
            return;
        }
    })
    upload();
    $("#ctlBtn").click(function(){
        // var clientOrderId = getUrlParms("id");//任务ID
        var clientOrderId = JSON.parse(storage.get("clientId"));//任务ID
      console.log(clientOrderId);
      if(clientOrderId == ""){
            layer.msg("请输入订单编号~");
            return false;
        }
        var orderPayPicture1 = "";//收货并好评图片
        var parme = {
            "clientOrderId":clientOrderId,
            "orderPayPicture1":orderPayPicture1
        }
        order(parme);
    })
})
function upload() {
    var $list = $(".uploader-list");
    var thumbnailWidth = 78; //缩略图高度和宽度 （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档  
    var thumbnailHeight = 78;
    var uploader = WebUploader.create({

        // swf文件路径
        swf: '/src/libs/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: 'http://webuploader.duapp.com/server/fileupload.php',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#lg_upload',

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
            id: $("#lg_upload"), // id
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
        if ($(".uploader-list .file-item").length >= 3) {
            $("#lg_upload").hide();
        } else {
            $("#lg_upload").show();
        }
        $(".remove").each(function () {
            $(this).click(function () {
                var id = $(this).parent().attr("id");
                uploader.removeFile(id);
                $(this).parent().remove();
                if ($(".uploader-list .file-item").length >= 3) {
                    $("#lg_upload").hide();
                } else {
                    $("#lg_upload").show();
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
function order(parms){
    ajax_post("/operation/clientOrder/place",parms,function(res){
        if(res.code == 200){
            layer.msg(res.msg);
            setTimeout(function(){
                window.location.href = "/my_centre/schedule.html?clientId="+parms.clientOrderId;
            },2000)
        }else{
            layer.msg(res.msg);            
        }
    })
}