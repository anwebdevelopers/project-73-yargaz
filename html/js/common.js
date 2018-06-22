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
    $('.tabs').each(function() {
        $(this).prepend('<div class="tabs__buttons"></div>');
        $(this).find('.tabs__button').appendTo('.tabs__buttons');
        $(this).children('.tabs__section').not(':first').hide();
        $(this).children('.tabs__buttons').on('click', '.tabs__button:not(.active)', function() {
            $(this).addClass('active').siblings().removeClass('active').closest('.tabs').children('.tabs__section').stop().slideUp(300).eq($(this).index()).stop().slideDown(300);
        }).children('.tabs__button').first().addClass('active');
    });

    /*******************************************************/
    //YANDEX MAP
    /*******************************************************/
    if (typeof ymaps === 'object') {
        ymaps.ready(function() {
            var myMap;
            myMap = new ymaps.Map('map', {
                    center: [57.631844, 39.869668],
                    zoom: 14,
                    controls: [],
                    behaviors: ['drag', 'dblClickZoom', 'rightMouseButtonMagnifier', 'multiTouch']
                }, {
                    searchControlProvider: 'yandex#search'
                }),
            myMap.controls.add('zoomControl', {
                size: 'small',
                position: {
                    top: 'auto',
                    left: 10,
                    bottom: 50
                }
            }),
            myMap.geoObjects.add(new ymaps.Placemark([57.631844, 39.869668], {
                hintContent: '',
                balloonContent: ''
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/icon-map.svg',
                iconImageSize: [31, 44],
                iconImageOffset: [-16, -44]
            }));
            function disableDrag() {
                var w = $(window).width();
                w <= 992 ? myMap.behaviors.disable('drag') : myMap.behaviors.enable('drag');
            }
            disableDrag();
            $(window).resize(disableDrag);
        });
    }

});
