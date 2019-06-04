!function(){
	//1.拼接数据
	$.ajax({
		url:'../php/taobaodata.php',
		dataType:'json'
	}).done(function(data){
		var $html='<ul>';
		console.log(data);
		$.each(data,function(index,value){
			$html+=`
				<li>
					<a href="details.html?sid=${value.sid}" target="_blank">
						<img src="${value.url}" />
						<h4>${value.titile}</h4>
						<p>¥${value.price}</p>
					</a>
				</li>
			`;
		});
		$html+='</ul>';
		$('.goodslist').html($html);
	});
}();


