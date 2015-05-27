		//tab标签fixed代码
		function menuFixed(id){
			var obj = document.getElementById(id); 
			var _getHeight = obj.offsetTop;//获取顶部距离
			window.onscroll = function(){
				changePos(id,_getHeight); 
			} 
		}
		function changePos(id,height){ 
			var obj = document.getElementById(id); 
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
			if(scrollTop < height){ 
				obj.style.position = 'relative';
			}else{ 
				obj.style.position = 'fixed'; 
			} 
		} 
		window.onload = function(){ 
			if(screen.width>768){
				menuFixed('tabfix'); 
			}
			else if(screen.width<=768){
				$("#tabfix").hide();
				$("#tog-tab").click(function(){
					$("#tabfix").slideToggle("slow");
				});
				$("#tog-affix").affix({
        			offset: { 
            			top: 125 
     				}
    			});
    			$("#xs-togbg").affix({
        			offset: { 
            			top: 125 
     				}
    			});
    			$('#myTab li a').on("click",function(e){
    				$("#tabfix").hide();
    			});
			}
		}
