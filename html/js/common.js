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


    /*******************************************************/
    //SERVICES TABS
    /*******************************************************/
    $('.services-home__tabs').each(function() {
        $(this).prepend('<div class="services-home__buttons"></div>');
        $(this).find('.services-home__title').appendTo('.services-home__buttons');
        $(this).children('.services-home__section').not(':first').hide();
        $(this).children('.services-home__buttons').on('click', '.services-home__title:not(.active)', function() {
            $(this).addClass('active').siblings().removeClass('active').closest('.services-home__tabs').children('.services-home__section').stop().slideUp(300).eq($(this).index()).stop().slideDown(300);
        }).children('.services-home__title').first().addClass('active');
    });

});
