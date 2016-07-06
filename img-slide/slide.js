(function(){
	var btnIndex = 2;
	$('.nav-btn').each(function(index, item){
		$(item).click(function(item){
			slide(index);
		});
	});

	function slide(arg) {
		if(typeof(arg) === 'number'){
			btnIndex = arg;
			changeBtn(btnIndex);
			$('.img-list').animate({'left': -1020+arg*510}, 500, function(){});		
		}
		else {
			if(btnIndex == 0)
				btnIndex = 2;
			else
				btnIndex -= 1;
			changeBtn(btnIndex);
			$('.img-list').animate({'left': "-=510"}, 500, function(){
				if($('.img-list').css('left') === '-1530px')
					$('.img-list').css('left', "0px");	
			});
		}
	}
	function changeBtn(index){
		$($('.nav-btn')[index]).addClass('active').siblings().removeClass('active');
	}

	setInterval(function(){
		slide();
	}, 3000);
})();