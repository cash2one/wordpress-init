var thisId = window.location.hash.substr(1,1);
var tab_bot= document.getElementById("tab_bot_"+thisId);
if(tab_bot!=null){
	tab_bot.click();
}

$(".anchor").on('click',function (){
	var href=$(this).attr("href").substr(-1,1);
	var tab_bot= document.getElementById("tab_bot_"+href);
	if(tab_bot!=null){
		tab_bot.click();
	}
});