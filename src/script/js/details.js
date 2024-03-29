! function() {
    //1.获取sid
    var picid = location.search.split('=')[1];

    $.ajax({
        type: "get",
        url: "php/details.php",
        data: {
            id: picid
        },
        dataType: "json",
        success: function(response) {
            console.log(response)
            $('#spic img').attr('src', response[0].img)
        }
    });

    //3.放大镜效果
    ! function() {

        $('#sf').width($('#spic').width() * $('#bf').width() / $('#bpic').width());
        $('#sf').height($('#spic').height() * $('#bf').height() / $('#bpic').height());
        var bili = $('#bpic').width() / $('#spic').width();
        $('#spic').hover(function() {
            $('#sf').css('visibility', 'visible');
            $('#bf').css('visibility', 'visible');
            $(this).on('mousemove', function(ev) {
                var $left = ev.pageX - $('.goodsinfo').offset().left - $('#sf').width() / 2;
                var $top = ev.pageY - $('.goodsinfo').offset().top - $('#sf').height() / 2;
                if ($left < 0) {
                    $left = 0;
                } else if ($left >= $('#spic').width() - $('#sf').width()) {
                    $left = $('#spic').width() - $('#sf').width();
                }
                if ($top < 0) {
                    $top = 0;
                } else if ($top >= $('#spic').height() - $('#sf').height()) {
                    $top = $('#spic').height() - $('#sf').height();
                }
                $('#sf').css('left', $left);
                $('#sf').css('top', $top);
                $('#bpic').css('left', -$left * bili);
                $('#bpic').css('top', -$top * bili);
            });
        }, function() {
            $('#sf').css('visibility', 'hidden');
            $('#bf').css('visibility', 'hidden');
        });

        //点击小图切换
        $('#list ul').on('click', 'li', function() {
            var $imgurl = $(this).find('img').attr('src');
            $('#smallpic').attr('src', $imgurl);
            $('#bpic').attr('src', $imgurl);
        });

        //点击箭头进行切换
        var $num = 6; //放大镜显示6张。
        $('#right').on('click', function() {
            var $list = $('#list ul li'); //8
            if ($list.length > $num) {
                $num++;
                $('#left').css('color', '#333');
                if ($list.length == $num) {
                    $('#right').css('color', '#fff');
                }
                $('#list ul').animate({
                    left: -($num - 6) * $list.eq(0).innerWidth()
                })
            }
        });

        $('#left').on('click', function() {
            var $list = $('#list ul li'); //8
            if ($num > 6) {
                $num--;
                $('#right').css('color', '#333');
                if ($num <= 6) {
                    $('#left').css('color', '#fff');
                }
                $('#list ul').animate({
                    left: -($num - 6) * $list.eq(0).innerWidth()
                })
            }
        });
    }();


    var arrsid = []; //商品的sid
    var arrnum = []; //商品的数量
    function cookietoarray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) { //判断商品是第一次存还是多次存储
            arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
            arrnum = getcookie('cookienum').split(','); //cookie商品的num
        }
    }



    $('.p-btn a').on('click', function() { //点击加入购物车按钮。

        //判断当前的商品sid是否存在购物车(cookie)
        //判断当前的按钮对应的商品的sid和取出的cookie里面的sid进行比较

        //获取当前的按钮对应的商品的sid
        var $sid = $(this).parents('.goodsinfo').find('#smallpic').attr('sid');
        cookietoarray(); //获取已经存在的cookie值。

        if ($.inArray($sid, arrsid) != -1) { //商品存在，数量叠加 
            //先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
            var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val());
            arrnum[$.inArray($sid, arrsid)] = num;
            addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie

        } else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
            arrsid.push($sid); //将当前的id存入数组
            addcookie('cookiesid', arrsid.toString(), 10); //数组存入cookie
            arrnum.push($('#count').val());
            addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie
        }
    });

}();