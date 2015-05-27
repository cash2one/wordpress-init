
window.onload=function(){
 	var liTop2 = $('#product-tab li').height();
 	var X2=$('#product-tab li').position().top; 
 	var Y2=$('#product-tab li').position().left; 
 	var liWidth2 = $('#product-tab li').find("a").width();
 	var href = window.location.href.split('/');
 	var post_id_s = href[href.length-1];
 	var post_id_arr = post_id_s.split("?");//英文后面的问号
	var post_id = post_id_arr[0];
		// console.log(post_id);

 	// console.log($('#product-tab li').position().top);	
	$("#border").css("top",X2+liTop2+"px");
	$("#border").css("left",Y2+"px");
	$("#border").css("width",liWidth2+"px");

	$('#product-tab li').mouseover(function(e){	
		var data = {};
 		var left = "left";
 		var top = "top";
		var width = "width";
 
		var X = $(this).position().top;
		var Y = $(this).position().left;
		var liTop = $(this).height();
		var liWidth = $(this).find("a").width();

		data[left] = Y+"px";
		data[top] = X+liTop+"px";
		data[width] = liWidth+"px";
	
		$("#border").animate(data,100);
	});
	
	$('#'+post_id).trigger("mouseover");	

}  
    
