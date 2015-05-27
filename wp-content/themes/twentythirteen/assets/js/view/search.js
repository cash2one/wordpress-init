$(function () {
	$('#search-tab').find('a').click(function(){
		$('#search-tab .li-active').removeClass('li-active');
		$(this).addClass('li-active');
	});
});