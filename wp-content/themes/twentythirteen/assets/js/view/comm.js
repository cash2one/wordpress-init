;(function() {
    $(function() {
        // banner slideDown、slideUp
        var $htHeaderSub   = $('.ht-header-sub'),
            $menuListConin = $('.menu-list-conin'),
            $htNavbar      = $('#ht-navbar'),
            $htNavbarNav   = $('#navbar'),
            $logo          = $('.logo'),
            logoSrc        = $logo.attr('src'),
            logoSrcImg     = logoSrc.substring(0, logoSrc.lastIndexOf('/'));

        // 共用sildeUp
        var fnSlideUp = function() {
            $htHeaderSub.slideUp(function() {
                $htNavbar.removeClass('toggle');
                $logo.attr('src', logoSrc);
            });
            $menuListConin.slideUp();
            $htNavbarNav.find('li').removeClass('hover');
        }
        $htNavbarNav.find('li').hover(function() {
            var $this              = $(this);
            var nIndex             = $this.index();
            var menuListConinIndex = $menuListConin[nIndex];
            $logo.attr('src', logoSrcImg + '/ht_blue_logo.png');

            if(typeof(menuListConinIndex) != 'undefined') {
                if(!$htHeaderSub.is(':animated')) {
                    $htHeaderSub.slideDown();
                    if(!$this.hasClass('hover')) {
                        $(menuListConinIndex).siblings().css('display', 'none');
                    }
                    $this.addClass('hover').siblings().removeClass('hover');
                    $htNavbar.addClass('toggle');
                    $(menuListConinIndex).fadeIn().siblings().fadeOut();
                }
            }else {
                fnSlideUp();
            }
        }, function() {});

        $htNavbar.on('mouseleave', function() {
            fnSlideUp();
        });
    });
})(jQuery);