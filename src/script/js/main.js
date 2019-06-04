// 首页幻灯片轮播图
$(function() {
    var $box = $('.slideshow_warp');
    var $ullist = $('.slideshow_warp ul');
    var $pics = $('.slideshow_warp ul li');
    var $btns = $('.slideshow_warp ol li');
    var $left = $('.prev');
    var $right = $('.next');
    var $firstpic = $pics.first().clone();
    var $lastpic = $pics.last().clone();
    var $liwidth = $pics.eq(0).outerWidth();
    $ullist.append($firstpic);
    $ullist.prepend($lastpic);
    var $lisize = $('.slideshow_warp ul li').size();
    var $num = 0;
    var $bstop = true;
    $ullist.css({
        width: $liwidth * $lisize,
        left: -$liwidth
    });
    $btns.on('click', function() {
        $num = $(this).index();
        tabswitch();
    });
    $right.on('click', function() {
        if ($bstop) {
            $bstop = false;
            $num++;
            if ($num > $btns.size() - 1) {
                $btns.eq(0).addClass('navactive').siblings('li').removeClass('navactive');
            }
            tabswitch();
        }
    });

    $left.on('click', function() {
        $num--;
        tabswitch();
    });

    $left.css('display', 'none');
    $right.css('display', 'none');

    function tabswitch() {
        $btns.eq($num).addClass('navactive').siblings().removeClass('navactive');
        $ullist.animate({
            left: -$liwidth * ($num + 1)
        }, 100, function() {
            if (parseInt($ullist.css('left')) == -$liwidth * ($btns.size() + 1)) {
                $ullist.css('left', -$liwidth + 'px');
                $num = 0;
            }
            if (parseInt($ullist.css('left')) == 0) {
                $ullist.css('left', -$liwidth * $btns.size() + 'px');
                $num = $btns.size() - 1;
            }
            $bstop = true;
        });
    };

    var $autoplaytimer = setInterval(function() {
        $right.click();
    }, 5000);



    $box.hover(function() {
        $left.css('display', 'block');
        $right.css('display', 'block');
        clearInterval($autoplaytimer);
    }, function() {
        $left.css('display', 'none');
        $right.css('display', 'none');
        $autoplaytimer = setInterval(function() {
            $right.click();
        }, 5000);
    });
});
//鼠标移入 图片变大

$(function() {
    var $pics = $('.double_ad img');
    $pics.on('mouseover', function() {
        $(this).addClass('doubleimgactive')
    });
    $pics.on('mouseout', function() {
        $(this).removeClass('doubleimgactive')
    });
});
//右侧滚动新闻
$(function() {
    var $box = $('.buyinfo_list');
    var $list = $('.buyinfo_list ul');
    var $liHeight = $('.buyinfo_list li').outerHeight();
    var $num = 0;
    var $cloneli = $('.buyinfo_list li').clone();
    $cloneli.appendTo($list);
    var timer = setInterval(function() {
        $num++;
        $list.css('top', -$num * $liHeight + 'px');
        if ($num > $('.buyinfo_list li').size() / 2 - 1) {
            $num = 0;
        }
    }, 2000);
});
//好货市场
//鼠标移入时显示详情
$(function() {
    var $box = $('.marketlist');
    $box.on('mouseover', 'a', function() { //采用事件委托
        $(this).find('.hide_market').show();
        $(this).find('.mkname').stop(true).animate({
            height: 0
        });
    })
    $box.on('mouseout', 'a', function() {
        $(this).find('.hide_market').hide();
        $(this).find('.mkname').stop(true).animate({
            height: 40
        });
    })

});
//好货头条轮播图
$(function() {
    var $box1 = $('.headerlines-slide');
    var $ullist = $('.headerlines-slide .slide');
    var $pics = $('.headerlines-slide .slide li');
    var $btns = $('.headerlines-slide .headerlines-ol li');
    var $firstpic = $pics.first().clone();
    var $lastpic = $pics.last().clone();
    var $liwidth = $pics.eq(0).outerWidth();
    $ullist.append($firstpic);
    $ullist.prepend($lastpic);
    var $lisize = $('.slideshow_warp ul li').size();
    var $num = 0;
    var $bstop = true;
    $ullist.css({
        width: $liwidth * $lisize,
        left: -$liwidth
    });
    $btns.on('click', function() {
        $num = $(this).index();
        tabswitch();
    });

    function tabswitch() {
        $btns.eq($num).addClass('fiex-active').siblings().removeClass('fiex-active');
        $ullist.animate({
            left: -$liwidth * ($num + 1)
        }, 100, function() {
            if (parseInt($ullist.css('left')) <= -$liwidth * $btns.size()) {
                $ullist.css('left', -$liwidth + 'px');
                $num = 0;
            }
            $bstop = true;
        });
    };

    var $timer = setInterval(function() {
        if ($bstop) {
            $bstop = false;
            $num++;
            if ($num > 4) {
                $btns.eq(0).addClass('fiex-active').siblings('li').removeClass('fiex-active');
            }
            tabswitch();
        }
    }, 5000);

    $box1.hover(function() {
        clearInterval($timer);
    }, function() {
        $timer = setInterval(function() {
            if ($bstop) {
                $bstop = false;
                $num++;
                if ($num > 4) {
                    $btns.eq(0).addClass('fiex-active').siblings('li').removeClass('fiex-active');
                }
                tabswitch();
            }
        }, 5000);
    });
});
//底部tab切换
$(function() {
    var $tab = $('.link_tab ul li');
    var $box = $('.link_more');
    $tab.on('click', function() {
        $(this).addClass('link-active').siblings().removeClass('link-active');
        $box.eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
    });
});

//好货市场数据库渲染
// ! function() {
//     //1.拼接数据
//     $.ajax({
//         url: './php/taobaodata.php',
//         dataType: 'json'
//     }).done(function(data) {
//         var $html = '<ul>';
//         console.log(data);
//         $.each(data, function(index, value) {
//             $html += `
// 				<li>
// 					<a href="details.html?sid=${value.sid}" target="_blank">
// 						<img src="${value.url}" />
// 						<h4>${value.titile}</h4>
// 						<p>¥${value.price}</p>
// 					</a>
// 				</li>
// 			`;
//         });
//         $html += '</ul>';
//         $('.goodslist').html($html);
//     });
// }();
// var $ulist = $('.marketlist ul');
// $ulist.html($str);
//懒加载
$("img.lazy").lazyload({
    effect: "fadeIn"
});