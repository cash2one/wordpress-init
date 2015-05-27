//AJAX实现动态加载内容。
//加载第一个子分类文章
//如添加一个分类有5处数字3处字母和1个ajax请求链接需要更改
$(document).ready(function(){
	var page=new Array(2,2,2,2,2,2,2,2,2,2,2);//支持十个tab分页，要增加更多需添加数组元素
	function fnAjax(div_id,but,url,lang){
		if(lang=="Load more"){
		mydivcon=$.ajax({url:url+page[0]+"?lang=en",async:false});//url是分类链接；2是子分类链接
		}else{
		mydivcon=$.ajax({url:url+page[0],async:false});//url是分类链接；2是子分类链接			
		}
		var divid=document.getElementById(div_id);
		var butid=document.getElementById(but);
		$("#"+div_id).html(divid.innerHTML+mydivcon.responseText);//将获取到的内容加在DIV
		if(mydivcon.responseText.length<100){
			if(lang=="Load more"){
			butid.innerHTML="There's no more!";
			}else{
			butid.innerHTML="没有更多了！";//当获取内容字段小于100(没用更多内容获取)
			}
		}
	}

	$(".load").on('click',function (){
		var lang=$(this).attr('language');
		var a=$(this).attr('order');//获取当前TAB页排序
		var name=$(this).attr('nicename');//当前TAB页别名
		var cname=$(this).attr('cname');//当前tab自定义分类法别名
		var cname_arr= cname.split('_');
		var link=cname_arr[0]+'/'+cname+'/'+name+'/page/';//
		page[0]=page[a];//page为分类页
		var saveid=new Array("div_show_"+a,"load_but_"+a);//需要修改的DIV和按钮ID
		fnAjax(saveid[0],saveid[1],link,lang);
		page[a]++;
	});
});