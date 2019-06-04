if (getcookie('username')) {
    $('.register span').html(getcookie('username'))
    $('.register a').eq(0).html('[注销]')
        .attr({
            href: 'http://localhost/projectname/src/index.html'
        })
        .on('click', function() {
            delcookie('username');
        })
        .siblings('a').css('display', 'none')

}