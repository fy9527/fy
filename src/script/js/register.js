$(function() {
    $.validator.addMethod("regex",
        function(value, element, params) {
            var exp = new RegExp(params);
            return exp.test(value);
        }, "格式错误");

    //表单验证 用户名
    $('#form1').validate({
        rules: {
            username: {
                required: true,
                minlength: 6,
                maxlength: 25,
                regex: "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$"
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 20,
                regex: "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$"
            },
            repassword: {
                required: true,
                equalTo: '#password',
            },
            mobile: {
                required: true,
                regex: "^1[3578][0-9]{9}$"
            }
        },
        messages: {
            username: {
                required: '',
                minlength: '＊用户名长度只能在6-25个字符之间',
                remote: '＊用户名已被注册'
            },
            password: {
                required: '',
                minlength: '＊密码必须由6-20个字符组成，区分大小写',
                regex: '＊必须使用字母、数字组合'
            },
            repassword: {
                required: '',
                equalTo: '＊两次密码不一致',
            },
            mobile: {
                required: '',
                regex: "＊请输入正确的手机号码"
            }
        },
    });
    $('#subButton').on('click', function() {
        console.log(1)
        var username = $("#username").val();
        var password = $("#password").val();
        var mobile = $("#mobile").val();
        $.ajax({
            type: "post",
            url: "./php/reg.php",
            dataType: {
                username: username,
                password: password,
                mobile: mobile
            },
            success: function(response) {
                alert(response)
            }
        });
    });
});