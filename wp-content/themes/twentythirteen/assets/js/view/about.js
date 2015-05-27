$(function () {
	/*创建百度地图*/
	
	//创建和初始化地图函数
    function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMarker();//向地图中添加marker
    }
    
    //创建地图函数：
    function createMap(){
        var map = new BMap.Map("mapwrapper");//在百度地图容器中创建一个地图
        var point = new BMap.Point(120.07020,30.31030);//定义一个中心点坐标
        map.centerAndZoom(point,15);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
        // var mapStyle={  
        //     style : "googlelite" 
        // };  
        // map.setMapStyle(mapStyle);
    }
    
    //地图事件设置函数：
    function setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.disableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.disableKeyboard();//禁用键盘上下左右键移动地图，默认禁用(可不写)
    }
    
    //地图控件添加函数：
    function addMapControl(){
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_ZOOM});
    map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
    map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    }
    

    var href = window.location.href;
    var info_height;
    if(href.indexOf("lang=en") <= 0) {
        var markerArr = [{title:"浙江网新恒天软件有限公司",content:"浙江省杭州市西湖区西园一路18号J1写字楼",point:"120.07004|30.31003",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
         ];
         info_height = 30;
    }
    else {
        var markerArr = [{title:"Zhejiang Insigma Hengtian Software Ltd",content:"Building J1, No.18 Xiyuan 1st Road, West Lake District, Hangzhou 310030, China",point:"120.07004|30.31003",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
         ];
         info_height = 100;
    }
    //标注点数组
    
    //创建marker
    function addMarker(){
        for(var i=0;i<markerArr.length;i++){
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0,p1);
            var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point,{icon:iconImg});
            var iw = createInfoWindow(i);
            var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
            marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
               borderColor:"#808080",
               color:"#333",
               cursor:"pointer"
            });
            
            (function(){
                var index = i;
                var _iw = createInfoWindow(i);
                var _marker = marker;
                _marker.addEventListener("click",function(){
                    this.openInfoWindow(_iw);
                });
                _iw.addEventListener("open",function(){
                    _marker.getLabel().hide();
                });
                _iw.addEventListener("close",function(){
                    _marker.getLabel().show();
                });
                label.addEventListener("click",function(){
                    _marker.openInfoWindow(_iw);
                });
                if(!!json.isOpen){
                    label.hide();
                    _marker.openInfoWindow(_iw);
                }
                _marker.openInfoWindow(_iw);
            })();
        }
    }
    //创建InfoWindow
    function createInfoWindow(i){
        var json = markerArr[i];
        var opts = {
            width : 250,     // 信息窗口宽度
            height: info_height     // 信息窗口高度           
        };
        
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>",opts);
        return iw;
    }
    //创建一个Icon
    function createIcon(json){
    	//Icon(url:String, size:Size[, opts:IconOptions])
        var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)});
        return icon;
    }
	
    initMap();//创建和初始化地图
    
	//添加滚动式导航
	$('#about-tab li a').on("click",function(e){
		var tab = $($(this).attr("tab-id"));
		var offset = tab.offset().top - tab.parent().offset().top +　$('#affix-banner').height() +　$('#header').height() + 50;

		// console.log(offset);
		$('body').animate({
			scrollTop: offset
		},750,"swing",function(){
			// console.log("success");
		})
		
	});
	
	var fixed = false,  //用来判断导航条是否固定
		tab_position,  //记录tab在absolute时候的位置
		tab_menu = $("#about-tab"),  //tab菜单
 		tab_bg = $(".tab-bg"),	    //fixed住时的tab背景
 		content_position = new Array(), //记录各个区域的位置
 		current_tab;
 	
 	//初始化各个区域的位置	
	function init() {
		tab_menu.find("li a").each(function(index,element){
			var tab_id = $(this).attr("tab-id");
			var tab = $(tab_id);
			var temp = {
				id: tab_id,
				position:　tab.offset().top
			}
			content_position.push(temp);
		});
		
		current_tab = content_position[0].id;
	}

	//监听函数
	function spyAffix(){
		//滚动条位置
		var scroll_position = $(window).scrollTop();
		//对导航条进行监听
		if(scroll_position - tab_menu.offset().top >= 0 && fixed == false) {
			
			tab_position = tab_menu.offset().top;
			tab_bg.show();
			tab_menu.parent().removeClass("absolute");
			tab_menu.parent().addClass("fixed");
			fixed = true;
			
		}
		if(scroll_position- tab_position < 0 && fixed == true){
			tab_menu.parent().removeClass("fixed");
			tab_menu.parent().addClass("absolute");
			tab_bg.hide();	
			fixed = false;
		}
		//对当前content进行监听
		for(index in content_position) {
			//到达指定区域时
			var height = $(content_position[index].id).height();
			if(scroll_position - content_position[index].position >= -30 &&
				scroll_position -  content_position[index].position - height < -30) {
				
				if(content_position[index].id != current_tab) {
					
					current_tab = content_position[index].id;
					tab_menu.find("li a").each(function(index,element){
						if($(this).attr("tab-id") == current_tab) {
							tab_menu.find("li").removeClass("active");
							$(this).parent().addClass("active");
						}
						
					});
					
					
				}
				break;		
			}	
		}
	}
	
	//初始化
	init();
	
	//监听头部导航位置
	setInterval(spyAffix, 1);
	
	//屏幕分辨率<=768px时二级导航的效果
	if(screen.width<=768){
		$("#about-tabfix").hide();
		$("#about-togtab").click(function(){
			$("#about-tabfix").slideToggle("slow");
		});
		$("#tab-affix").affix({
        	offset: { 
            	top: 125 
     		}
    	});
    	$("#xs-togbg").affix({
        	offset: { 
            	top: 125 
     		}
    	});
        $('#about-tab li a').on("click",function(e){
            var tab = $($(this).attr("tab-id"));
            var offset = tab.offset().top - tab.parent().offset().top +　$('#affix-banner').height() +　$('#header').height() + 50;

            // console.log(offset);
            $('body').animate({
                scrollTop: offset
            },750,"swing",function(){
                // console.log("success");
            })
            $("#about-tabfix").hide();
        });
	}


	$('.detali-trigger').popover({
		template:'<div class="popover">\
					<div class="popover-inner">\
						<h6 class="popover-title"></h6>\
						<div class="popover-content">\
							<p></p>\
						</div>\
					</div>\
				   </div>',
		container:'.detail'
	});
    // .on("mouseenter", function () {
    //     var _this = this;
    //     $(this).popover("show");
    //     $(this).siblings(".popover").on("mouseleave", function () {
    //         $(_this).popover('destroy');
    //     });
    // }).on("mouseleave", function () {
    //     var _this = this;
    //     setTimeout(function () {
    //         if (!$(".popover:hover").length) {
    //             $(_this).popover("destroy")
    //         }
    //     }, 100);
    // });	
	//标签点击时的状态
	$('.detail').on('mouseenter',function(){
		$(this).popover('show');
        $(this).addClass('active');
        // $(this).find('.caret-right').css("display","inline-block");
	});
    $('.detail').on('mouseleave',function(){
        $(this).popover('hide');
        $(this).removeClass('active');
        // $(this).find('.caret-right').css("display","none");
    });

	//标签hover时的状态
/*	$("h5").hover( 
  		function(){ 
  			$(this).addClass('active');
  			$(this).find('.caret-right').css("display","inline-block");
   			
  		},
  		function(){
  			$(this).removeClass('active');
  			$(this).find('.caret-right').css("display","none");

  		}
 	);*/
	
});

