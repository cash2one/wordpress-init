$(window).scroll(function(){//注册滑动条滑动时的动作
    //滚动条到顶部的距离
	var scrTop = $(window).scrollTop();
	//回到顶部按钮距离窗口右侧的距离，
	var myWidth = ($(window).width() > $("#temp").width()) ?(($(window).width() - $("#temp").width())/2 - 80):0; 
 
	//窗口高度
	var windowTop = $(window).height();
 
	if ((windowTop-300)<scrTop){
		//滚动高度大于一页
		$(".goTop").css("top",(scrTop + windowTop -100)).css("right",myWidth).fadeIn("slow");
	}
	else{
		//滚动高度小于一页
		$(".goTop").css("top",(scrTop + windowTop -100)).css("right",myWidth).fadeOut("slow");
	}
});
 
//按钮被点击后，滑动到顶部。
$('#goToTop').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);});

   