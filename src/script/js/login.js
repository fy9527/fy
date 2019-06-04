$(function() {
    //登陆tab切换
    $('.login span').on('click', function() {
        $(this).addClass('login-active').siblings().removeClass('login-active');
        $('.logintab').eq($(this).index()).css('display', 'block').siblings('.logintab').css('display', 'none')
        $('.free_regist').css('display', 'none');
    });


    //提交验证
    $('#subButton').on('click',
        function() {

            var username = $("#username").val();
            var password = $("#password").val();
            $.ajax({
                type: "get",
                url: "./php/login.php",
                data: {
                    username: username,
                    password: password
                },
                success: function(response) {
                    alert(response)
                }
            });
        }
    );

    $('#password').on('focus', function() {
        $('#passworderror').css('display', 'none');
    })

    //点击X删除表单value
    $('.icon-close').on('click', function() {
        var $num = $(this).index()
        $('input').eq($num - 2).val('')
    })
});