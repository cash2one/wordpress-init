;(function() {
    $(function() {
        $.fn.extend({
            'nav': function (con) {
                var $this = $(this), $nav = $this.find('.switch-tab'), t = (con && con.t) || 3000, a = (con && con.a) || 500, i = 0, autoChange = function () {
                    $nav.find('a:eq(' + (i + 1 === 3 ? 0 : i + 1) + ')').addClass('current').siblings().removeClass('current');
                    $this.find('.event-item:eq(' + i + ')').css('display', 'none').end().find('.event-item:eq(' + (i + 1 === 3 ? 0 : i + 1) + ')').css({
                        display: 'block',
                        opacity: 0
                    }).animate({
                        opacity: 1
                    }, a, function () {
                        i = i + 1 === 3 ? 0 : i + 1;
                    }).siblings('.event-item').css({
                        display: 'none',
                        opacity: 0
                    });
                }, st = setInterval(autoChange, t);
                $this.hover(function () {
                    clearInterval(st);
                    $('.switch-nav').toggleClass('hidden');
                    return false;
                }, function () {
                    st = setInterval(autoChange, t);
                    $('.switch-nav').toggleClass('hidden');
                    return false;
                }).find('.switch-nav>a').bind('click', function () {
                    var current = $nav.find('.current').index();
                    i = $(this).attr('class') === 'prev' ? current - 2 : current;
                    autoChange();
                    return false;
                }).end().find('.switch-tab>a').bind('click', function () {
                    i = $(this).index() - 1;
                    autoChange();
                    return false;
                });
                return $this;
            }
        });

        // banner slide
        $('#inner').nav({ t: 5000, a: 1000 });
        //news
        var $listGroup = $('.news-list').find('.list-group');
        var autoScroll = function() {
            $listGroup.animate({marginTop: '-41px'}, '2000', function() {
                $listGroup.css({marginTop: 0}).find('li:first').appendTo($listGroup);
            });
        }
        var newsScroll = setInterval(autoScroll, '2000');
        $listGroup.hover(function() {
            clearInterval(newsScroll);
        }, function() {
            newsScroll = setInterval(autoScroll, '2000');
        });

        //parnter
        // //图片数量
        // var linum = $('.partner-list').find('li').length,
        // //ul宽度
        //     w     = linum * 210;
        // $('.partner-list').css('width', w + 'px');
        // $('.prev').on('click', function() {
        //     var $scroll = $(".partner-wrapper>ul");
        //         $li = $scroll.find('li');
        //         if($scroll.css('marginLeft') == '0px') {
        //             $scroll.css({marginLeft:'-210px'}).find("li:last").prependTo($scroll);
        //         }
        //     //ul往右边移动210px
        //     $scroll.animate({marginLeft:"0"},1000,function(){
        //         //把最后一个li丢最前面去
        //         $scroll.css({marginLeft:'-210px'}).find("li:last").prependTo($scroll);
        //     });
        // });

        // $('.next').on('click', function() {
        //     var $scroll = $(".partner-wrapper>ul");
        //     //ul往左边移动210px
        //     if($scroll.css('marginLeft') == '-210px') {
        //         $scroll.css({marginLeft:0}).find("li:first").appendTo($scroll);
        //     }
        //     $scroll.animate({marginLeft:"-210px"},1000,function(){
        //         //把第一个li丢最后面去
        //         $scroll.css({marginLeft:0}).find("li:first").appendTo($scroll);
        //     });
        // });

        var options = {
            $AutoPlay: false,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
            $AutoPlaySteps: 5,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
            $AutoPlayInterval: 4000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
            $PauseOnHover: 1,                               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

            $ArrowKeyNavigation: true,                          //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
            $SlideDuration: 160,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
            $MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
            $SlideWidth: 210,                                   //[Optional] Width of every slide in pixels, default value is width of 'slides' container
            //$SlideHeight: 150,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
            $SlideSpacing: 3,                                   //[Optional] Space between each slide in pixels, default value is 0
            $DisplayPieces: 5,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
            $ParkingPosition: 0,                              //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
            $UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
            $PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
            $DragOrientation: 1,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

            $BulletNavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
                $Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
                $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 0,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
                $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
                $SpacingX: 0,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
                $SpacingY: 0,                                   //[Optional] Vertical space between each item in pixel, default value is 0
                $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
            },

            $ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
                $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 2,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 5                                       //[Optional] Steps to go for each navigation request, default value is 1
            }
        };

        var jssor_slider1 = new $JssorSlider$("slider1_container", options);

        //responsive code begin
        //you can remove responsive code if you don't want the slider scales while window resizes
        function ScaleSlider() {
            var bodyWidth = document.body.clientWidth;
            if (bodyWidth)
                jssor_slider1.$ScaleWidth(Math.min(bodyWidth, 1140));
            else
                window.setTimeout(ScaleSlider, 30);
        }
        ScaleSlider();

        $(window).bind("load", ScaleSlider);
        $(window).bind("resize", ScaleSlider);
        $(window).bind("orientationchange", ScaleSlider);
        //responsive code end
    });
})(jQuery);