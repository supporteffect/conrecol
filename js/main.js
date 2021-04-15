$(document).ready(function() {

	var $menu = $('#menu'),
        $ladrillo = $('.ladrillo'),
        $scrollbar = $('.scrollbar'),
		$body = $('body'),
        $contactForm = $('.contactForm'),
        $trabajar = $('.trabajar'),
        $file = $('.file'),
	    timer;

   $(window).on('load', function(){

        $('.loader').fadeOut(1500, function(){

            if ( Cookies.get('video') == undefined ) {

                $('.ver-video').trigger('click');

                Cookies.set('video', 'autoplay');

                console.log('no cookie');

            } else {

                console.log('cookie!');

            }

            var mapDiv = document.getElementById('map');
           var map = new google.maps.Map(mapDiv, {
              center: {lat: 7.0809899, lng: -73.1238273},
              zoom: 17,
              scrollwheel: false,
              styles: [ { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#e9e9e9" }, { "lightness": 17 } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" }, { "lightness": 20 } ] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" }, { "lightness": 17 } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#ffffff" }, { "lightness": 18 } ] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [ { "color": "#ffffff" }, { "lightness": 16 } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" }, { "lightness": 21 } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#dedede" }, { "lightness": 21 } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 } ] }, { "elementType": "labels.text.fill", "stylers": [ { "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#f2f2f2" }, { "lightness": 19 } ] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [ { "color": "#fefefe" }, { "lightness": 20 } ] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 } ] } ]
           });

           var marker = new google.maps.Marker({
              icon: 'img/marker.png',
              position: new google.maps.LatLng(7.0811944,-73.123683),
              map: map,
              title: 'Visítanos'
           });

        });
        $body.addClass('loaded');

   }); 



    $('.ham').on('click', function(){
        $body.toggleClass('showMenu');
    }); 

	window.addEventListener('resize', function(event){
        timer && clearTimeout(timer);
        timer = setTimeout(function(){
       
       		windowResize();	
           
        }, 500);
    });

    function windowResize () {
    	var w_h = $(window).height(),
    		menu_w = $menu.height();
    	$menu.css('margin-top', ( ( w_h - menu_w ) / 2 ) + 'px' );	
    }

    windowResize();

    $('.ladrillo .block').on('click', function(){
        var $this = $(this),
            state = $this.data('state');
        
        $this.addClass('active').siblings().removeClass('active');
        $this.parent().removeClass('first second third').addClass(state+ ' opened');   
 
    });

    $('.ladrillo .icon-plus').on('click', function(e){
         var $this = $(this),
             $section = $this.parents('section'),
             $block = $this.parents('.block'),
             state = $block.data('state');
         
         if($section.hasClass(state)) {
             $section.removeClass('first second third opened');
             $block.removeClass('active');
         } else {
             $section.removeClass('first second third');
             $section.addClass(state+ ' opened');
             $block.addClass('active').siblings().removeClass('active');
         } 

         e.stopPropagation();
    });

    $scrollbar.perfectScrollbar({
        includePadding : false,
        suppressScrollX : true,
        includePadding : true,
        wheelSpeed: 0.8
    });

    $ladrillo.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(e) {
        var $target = $(e.target);

        if ( $target.hasClass('scrollbar') ) {

            $target.perfectScrollbar('update');

        }

    }); 

    $('.shuffle span:last-child').on('click', function(){
        $(this).parent().addClass('trabaja');
        $contactForm.find('input[name="profesion"]').attr('placeholder', 'Profesión...');
        $file.fadeIn();
    });

    $('.shuffle span:first-child').on('click', function(){
        $(this).parent().removeClass('trabaja');
        $contactForm.find('input[name="profesion"]').attr('placeholder', 'Empresa...');
        $file.fadeOut();
    });

    $trabajar.on('click', function(){
        $(this).toggleClass('active');
    });

    var w_w = $(window).width();

    if ( w_w > 780 ) {
        var noScroll = false;
    } else {
        var noScroll = '.ladrillo';
    }  

	/*
	* Plugin intialization
	*/
	$('#pagepiling').pagepiling({
		menu: '#menu',
		anchors: ['inicio', 'quienes-somos', 'servicios', 'calidad', 'clientes', 'donde-estamos', 'contacto'],
	    navigation: false,
        normalScrollElements: noScroll,
        onLeave: function(index, nextIndex, direction){

            var $opened = $('.ladrillo.opened');

            $body.removeClass('showMenu');

            setTimeout(function(){

                $opened.removeClass('opened first second third');
                $opened.find('.active').removeClass('active');

            }, 1000);  

        }
	});

    if ( w_w > 780 ) {

    	$('nav').on('mouseenter', function(){
    		$body.addClass('hoverMenu');
    	});

    	$('nav').on('mouseleave', function(){
    		$body.removeClass('hoverMenu');
    	});

    }

    $('#contact-form').ajaxForm(function(responseText) { 
        alert(responseText); 
        $('#contact-form')[0].reset();
    }); 

    $('.ver-video').magnificPopup({
       type: 'iframe',
           iframe: {
               patterns: {
                   youtube: {
                       index: 'youtube.com', 
                       id: 'v=', 
                       src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
                    }
               }
           }   
     });


});
