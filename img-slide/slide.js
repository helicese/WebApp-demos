// (function(){
// 	var btnIndex = 0;
// 	$('.img-container ul').click($('.nav-btn'),function(item){
// 		btnIndex = parseInt($(item.target).attr('data-index'));
// 		slide(btnIndex);
// 	});

// 	function slide(arg) {
// 		if(typeof(arg) === 'number'){
// 			btnIndex = arg;
// 			changeBtn(btnIndex);
// 			$('.img-list').animate({'left': -arg*510}, 500, function(){});		
// 		}
// 		else {
// 			if(btnIndex == 2)
// 				btnIndex = 0;
// 			else
// 				btnIndex += 1;
// 			changeBtn(btnIndex);
// 			$('.img-list').animate({'left': "-=510"}, 500, function(){
// 				if($('.img-list').css('left') === '-1530px')
// 					$('.img-list').css('left', "0px");	
// 			});
// 		}
// 	}
// 	function changeBtn(index){
// 		$($('.nav-btn')[index]).addClass('active').siblings().removeClass('active');
// 	}

// 	setInterval(function(){
// 		slide();
// 	}, 3000);
// })();

function slidePlugin() {
	this.timeInterval = 3000;
	this.timeDuration = 500;
	this.imgIndex = 0;
	this.imgListDom = $('<div class="img-list"></div>');
	this.btnDom = $('<ul></ul>');
	// this.dom
};
slidePlugin.prototype = {
	// var _this = this;
	init: function(dom, imgList){
		console.log(this.imgIndex);
		$.each(imgList,function(index, item){
			$('<img src="'+item+'">').appendTo(this.imgListDom);
			$('<li class="nav-btn" data-index="'+ index +'">'+ index +'</li>').appendTo(btnDom);
		})
		this.imgListDom.appendTo(dom);
		this.btnDom.appendTo(dom);
	}
}

var test = new slidePlugin();
test.init($('.img-container'), ["./img/main1.jpg","./img/main2.jpg","./img/main3.jpg"]);
