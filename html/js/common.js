$(function() {

    'use strict';

    var $window = $(window);

    /*******************************************************/
    //MENU
    /*******************************************************/
    var $headerNav = $('.header__nav'),
        $headerAdditionalNav = $('.header__additional-nav'),
        $buttonMenuMobile = $('.header__button-menu');
    $buttonMenuMobile.click(function(e) {
        e.stopPropagation();
        $(this).toggleClass('active');
        $headerAdditionalNav.fadeToggle(200).css('display', 'flex');
        if ($window.width() <= 992) $headerNav.slideToggle(200);
    });
    $window.resize(function() {
        $buttonMenuMobile.removeClass('active');
        $headerNav.removeAttr('style');
        $headerAdditionalNav.removeAttr('style');
    });

    /*******************************************************/
    //SUBMENU MOBILE
    /*******************************************************/
    $headerNav.find('a').click(function(e) {
        if ($window.width() <= 992) {
            var $this = $(this),
                $ul = $this.prev('ul'),
                $li = $this.closest('li');
            if ($ul.length && !$li.hasClass('active')) {
                e.preventDefault();
                $ul.slideDown(300);
                $li.addClass('active').siblings().removeClass('active').find('ul').slideUp(300);
            }
        }
    });
    $window.resize(function() {
        $headerNav.find('ul, li').removeAttr('style').removeClass('active');
    });

    /*******************************************************/
    //SLIDER
    /*******************************************************/
    $('.slider').addClass('owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        nav: true,
        navText: '',
        autoplayTimeout: 10000,
        autoplay: true,
        smartSpeed: 600
    });

});
