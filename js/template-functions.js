/**
*	Template Functions
*	Version: 1.0.1;
*	Author: ThemeMountain
*	Copyright: ThemeMountain
*/

$( document ).ready( function(){

	'use strict';

	/**
	*	Template Functions
	*/

	// Header
	var header = '.header';
	var headerAnimated = '.header-animated';
	var headerSticky = '.header-sticky';
	var headerBackground = '.header-background';
	var headerCompact = '.header-compact';
	var headerHeadIn = '.header-in';
	var headerHeadOut = '.header-out';
	var headerInitPosition = '.header-positioned';
	
	// Equalize
	var equalizeContainer = '.equalize';
	
	// Parallax
	var parallaxContainer = '.parallax';

	// Fullscreen
	var fsSectionWrapper = '.fullscreen-sections-wrapper';
	var fsSection = '.fullscreen-section';

	// Scroll to Section
	var scrollLink = '.scroll-link';

	// Page scroll params
	var pageScrollSpeed = 1000;
	var pageEasing = 'easeInOutQuart';
	var pageThreshold = 0.6; //0.5-1

	// Masonry Grid
	var msnryGrid = '.masonry-grid';
	var msnryGridItem = '.grid-item';
	var msnryFilterMenu = '.portfolio-filter-menu';
	var msnryFilterLink = '.portfolio-filter-menu a';
	var msnryTransDuration = '0.7s';
	var msnryTransResize = false;

	// Videos
	var selectors = ['.video-container iframe', '.video-container object'];
	var players = ['www.youtube.com', 'player.vimeo.com'];
	var mejsPlayers = '.mejs-container audio, .mejs-container video';

	// Content Slider
	var contentSlider = '.content-slider';

	// Full Width Slider
	var fullScreenSlider = '.tm-slider-container.fullscreen';

	// Full Width Slider
	var fullWidthSlider = '.full-width-slider';

	// Logo Slider
	var logoSlider = '.logo-slider';

	// Hero Slider
	var heroSlider = '.hero-slider';

	// Testimonial Slider
	var testimonialSlider = '.testimonial-slider';

	// Team Type 3 - Slider
	var teamThreeSlider = '.team-slider';

	// Portoflio Type 6 - Slider
	var portfolioSixSlider = '.portfolio-recent-slider';
	var psSliderPrev = '.previous-portfolio-recent-slider';
	var psSliderNext = '.next-portfolio-recent-slider';

	// Lightbox
	var lightbox = '#tm-lightbox';
	var ligthboxLink = '.lightbox-link';

	// Common form element classes
	// used for signup and contact forms
	var formElement = '.form-element';
	var formResponse = '.form-response';
	var formHoneypot = '.form-honeypot';
	var formSubmit = '.form-submit';

	// Signup specific class
	// references and messages
	var signupForm = '.signup-form';
	var signupRequired = '.required-field';
	var signupFormSending = 'Please wait.';
	var signupFormSendingButton = 'Sending...';
	var signupFormSuccess = 'You have been added to our list!';
	var signupFormError = 'Oh boy an error occurred, please try again.';
	var signupFormSubscribed ='You are already subscribed to our list';
	var signupFormFillFields = 'Please fill out required fields.';
	var signupFormValidEmail = 'Please enter a valid email address.';

	// Contact specific class
	// references and messages
	var contactForm = '.contact-form';
	var contactRequired = '.required-field';
	var contactFormSending = 'Please wait.';
	var contactFormSendingButton = 'Sending...';
	var contactFormSuccess = 'Thank you, your email has been received!';
	var contactFormError = 'Oh boy an error occurred, please try again.';
	var contactFormFillFields = 'Please fill out required fields.';
	var contactFormValidEmail = 'Please enter a valid email address.';

	// Google Map
	var mapIcon = 'images/assets/map-marker.png';
	var mapIconW = 45; // Half of actual width
	var mapIconH = 53; // Half of actual height
	var mapLat = 40.742787;
	var mapLong = -73.996560;
	var mapZoomLevel = 14;
	var mapZoomMseWheel = false;
	var mapTypeCtrl = false;
	var mapPanCtrl = false;
	var mapZoomCtrl = true;
	var mapScaleCtrl = true;
	var mapStreetViewCtrl = false;
	var mapGrayScale = true;

	// Page Fade
	var pageFadeLocation = true;
	var page = 'body';
	var launchLink = '.fade-location, .logo a, .footer-logo a, .navigation a, .side-navigation a, .overlay-navigation a, [class*="portfolio-"] .overlay-link, .post-media .overlay-link, .post-content h2 a, .post-read-more a, .pagination-previous, .pagination-next';
	var excludeLink = '.no-page-fade, .mail-link, .lightbox-link, .contains-sub-menu, .blog .pagination-previous, .blog .pagination-next, .disabled, .scroll-link';

	// Transition End
	var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
	
	var templateFunctions = {
		init: function(){
			// Header
			templateFunctions.siteHeader();
			// Equalize
			templateFunctions.equalize( 480 );
			// Parallax
			templateFunctions.parallax( '.parallax.fixed-height', true, false, true );
			templateFunctions.parallax( '.parallax.fullscreen', true, true, true );
			// Fullscreen sections
			templateFunctions.fullScreenSection();
			// Masonry
			templateFunctions.masonry();
			// Sliders - seperate calls for 
			// ease of use - alternatively merge and pass parameters
			templateFunctions.logoSlider();
			templateFunctions.heroSlider();
			templateFunctions.testimonialSlider();
			templateFunctions.teamThreeSlider();
			templateFunctions.portfolioSixSlider();
			templateFunctions.contentSlider();
			templateFunctions.fullScreenSlider();
			templateFunctions.fullWidthSlider();
			// Lightbox
			templateFunctions.lightbox();
			// Counter
			templateFunctions.counter( '.stat', '.stat-counter', false );
			// Horizon
			templateFunctions.horizon( '.horizon', '.parallax .horizon', 'easeInOutQuint', false, 1 );
			// Video
			templateFunctions.videos();
			templateFunctions.mediaElement();
			// Signup
			templateFunctions.signupForm();
			// Contact
			templateFunctions.contactForm();
			// Eanable placeholder behaviour for old browsers
			templateFunctions.enablePlaceHolder();
			// Google Map
			if( document.getElementById( 'map-canvas' ) ) google.maps.event.addDomListener( window, 'load', templateFunctions.googleMap );
			// Page Fade
			templateFunctions.pageFade();
			// Scroll To section
			templateFunctions.scrollToSection();
		},
		equalize: function( breakpoint ){
			// Use images loaded if equalize
			// objects contain iamges
			imagesLoaded( $( equalizeContainer ), function() {
				$( equalizeContainer ).equalizeHeights({
					clearUnder: breakpoint
				});
			});
		},
		parallax: function( container, scale, fullscreen, fade ){
			$( container ).snowBridge({
				scaleContainer: scale,
				scaleUnder: 960,
				scaleMinHeight: 214,
				fullscreen: fullscreen,
				fadeInOut: fade,
				fadeThreshold: 0.5,
				retinaSupport: true,
				parallaxFactor: 0.6,
				onLoaded: function(){
					templateFunctions.horizon( '.horizon', '', 'easeInOutQuint', false, 1 );
				}
			});
		},
		horizon: function( element, exclude, easing, loop, threshold ){
			$( element ).not( exclude ).horizon({
				easing: easing,
				recurring: loop,
				threshold: threshold
			});
		},
		counter: function( container, element, loop ){
			$( element ).counter();
			$( container ).horizon({
				recurring: loop,
				inView: function(){	
					$( element ).each( function(){
						var c = $( this ).data( 'counter' );
						c.startCounter();
					});
				},
				outOfView: function(){
					if( !loop ) return false;
					$( element ).each( function(){
						var c = $( this ).data( 'counter' );
						c.clearCounter();
					});
				}
			});
		},
		contentSlider: function(){
			$( contentSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				forceFit: false,
				scaleMinHeight: 'auto',
				carousel: false,
				lazyLoad: true,
				navShowOnHover: false
			});
		},
		fullScreenSlider: function(){
			$( fullScreenSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				fullscreen: true,
				captionScaling: false,
				lazyLoad: true,
				navPagination: false,
				navShowOnHover: true,
				respectRatio: false
			});
		},
		fullWidthSlider: function(){
			$( fullWidthSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				forceFit: false,
				fullwidth: true,
				scaleUnder: 960,
				captionScaling: true,
				lazyLoad: true,
				navPagination: false,
				navShowOnHover: true,
				respectRatio: false
			});
		},
		logoSlider: function(){
			$( logoSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: true,
				carousel: true,
				carouselVisible: 5,
				carouselScaleHeight: false,
				navArrows: false,
				navPagination: true,
				showProgressBar: false,
				navShowOnHover: false
			});
		},
		heroSlider: function(){
			$( heroSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				carousel: true,
				carouselVisible: 1,
				captionScaling: false,
				forceFit: true,
				scaleUnder: 480,
				fullwidth: true,
				navArrows: false
			});
		},
		testimonialSlider: function(){
			$( testimonialSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 900,
				autoAdvance: false,
				fullwidth: true,
				scaleUnder: 0,
				navArrows: false,
				navPagination: true,
				navShowOnHover: false,
				retinaSupport: false
			});
		},
		teamThreeSlider: function(){
			$( teamThreeSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 900,
				autoAdvance: false,
				carousel: true,
				carouselVisible: 3,
				carouselScaleHeight: true,
				lazyLoad: false,
				navArrows: false,
				navPagination: true,
				navShowOnHover: false,
				retinaSupport: false
			});
		},
		portfolioSixSlider: function(){
			$( portfolioSixSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 900,
				autoAdvance: false,
				carousel: true,
				carouselVisible: 3,
				carouselScaleHeight: true,
				lazyLoad: false,
				navArrows: false,
				navPagination: false,
				navShowOnHover: false,
				retinaSupport: true
			});

			//API call for prev/next buttons
			var portfolioSixSliderAPI = $( portfolioSixSlider ).data( 'avalancheSlider' );
			$( psSliderPrev ).on( 'click', function( event ){
				event.preventDefault();
				portfolioSixSliderAPI.prevSlide();
			});
			$( psSliderNext ).on( 'click', function( event ){
				event.preventDefault();
				portfolioSixSliderAPI.nextSlide();
			});
		},
		lightbox: function(){
			$( ligthboxLink ).summitLightbox({
				lightboxAnimation: 'slideInTop',
				contentAnimation: 'slide',
				slideAmount: 100,
				easing: 'swing',
				speed: 350
			});
		},
		videos: function(){
			fluidvids.init({
			  selector: selectors,
			  players: players
			});
		},
		mediaElement: function(){
			$( mejsPlayers ).each( function(){
				var isAudio = false;
				if( $( this ).is( 'audio' ) ) isAudio = true;
				$( this ).mediaelementplayer({
					features: isAudio ? ['playpause','progress','volume','fullscreen'] : ['playpause','progress','current','duration','tracks','volume','fullscreen'],
					videoWidth: '100%',
					videoHeight: '100%',
					audioWidth: '100%',
					videoVolume: 'vertical',
					audioVolume: 'horizontal'
				});
			});
		},
		siteHeader: function(){
			var winW;
			var winH;
			var headerWrapperH;
			var thresholdBkg; 
			var thresholdHeight; 
			var thresholdSticky; 
			var thresholdHeadIn ;
			var thresholdHeadOut;
			var lastPos = 0;
			var currentPos;
			var breakpoint = 960;
			var headerWrapper = $( header );

			// Strip '.'
			headerAnimated = headerAnimated.split('.').join('');
			headerSticky = headerSticky.split('.').join('');
			headerBackground = headerBackground.split('.').join('');
			headerCompact = headerCompact.split('.').join('');
			headerHeadIn = headerHeadIn.split('.').join('');
			headerHeadOut = headerHeadOut.split('.').join('');
			headerInitPosition = headerInitPosition.split('.').join('');

			// Get data references
			function updateHeaderData(){
				 winW = $( window ).width();
				 winH = $( window ).height();
				 headerWrapperH = Math.ceil( headerWrapper.outerHeight() );
				 thresholdBkg = headerWrapper.data( 'bkg-threshold' ) === 'window-height' ? winH - headerWrapperH : headerWrapper.data( 'bkg-threshold' ); 
				 thresholdHeight = headerWrapper.data( 'compact-threshold' ) === 'window-height' ? winH - headerWrapperH : headerWrapper.data( 'compact-threshold' ); 
				 thresholdSticky = headerWrapper.data( 'sticky-threshold' ) === 'window-height' ? winH - headerWrapperH : headerWrapper.data( 'sticky-threshold' ); 
				 thresholdHeadIn = headerWrapper.data( 'helper-in-threshold' );
				 thresholdHeadOut = headerWrapper.data( 'helper-out-threshold' );
			}

			// Desktop - on scroll 
			// Swap header classes for animation
			$( window ).on( 'scroll', function(){
				
				// Check device
				if ( $( 'body' ).hasClass( 'mobile' ) || winW < breakpoint ) return false;

				// Sticky
				if ( thresholdSticky && $( this ).scrollTop() >= thresholdSticky || thresholdSticky === 0 ) {
					$( header ).addClass( headerSticky );
					if ( thresholdHeadIn && thresholdHeadOut) $( header ).addClass( headerInitPosition );
				}else{
					$( header ).removeClass( headerSticky );
					if ( thresholdHeadIn && thresholdHeadOut) $( header ).removeClass( headerInitPosition );
				}

				// Background
				if ( thresholdBkg && $( this ).scrollTop() >= thresholdBkg ) {
					$( header ).addClass( headerBackground );
				} else {
					$( header ).removeClass( headerBackground );
				}

				// Compact
				if ( thresholdHeight && $( this ).scrollTop() >= thresholdHeight ) {
					$( header ).addClass( headerCompact );
				} else {
					$( header ).removeClass( headerCompact );
				}

				// Helpers - generic classes for extra styling/animation
			 	currentPos = $(this).scrollTop();

			   // Scrolling down
			   if ( currentPos > lastPos ){
					if ( thresholdHeadIn && $( this ).scrollTop() >= thresholdHeadIn ) {
						$( header ).addClass( headerHeadIn );
					}
					$( header ).removeClass( headerHeadOut );

				// Scrolling up
			   }else if( currentPos < lastPos ){
					if ( thresholdHeadIn && $( this ).scrollTop() <= thresholdHeadIn ) {
						$( header ).removeClass( headerHeadIn );
						$( header ).removeClass( headerHeadOut );	
			  		}
					if ( thresholdHeadIn && $( this ).scrollTop() >= thresholdHeadIn && $( this ).scrollTop() <= thresholdHeadOut ) {
						$( header ).addClass( headerHeadOut );
						$( headerHeadOut ).on( transitionEnd, function( event ){
							event.stopPropagation();
							if( event.target !== $( this )[0] ) return false;
							$( header ).removeClass( headerHeadOut );
						});
					}
			  	}
			   lastPos = currentPos;
			});

			// Desktop - on resize
			$( window ).on( 'resize', function(){
				
				// Update width and height
				updateHeaderData();

				// Check device
				if ( $( 'body' ).hasClass( 'mobile' ) ) return false;

				// Height
				if( winW > breakpoint ){
					headerWrapper.css({ height: headerWrapper.outerHeight() + 'px' });
				}

				if ( winW > breakpoint && $( window ).scrollTop() >= thresholdSticky ) {
					$( header ).addClass( headerSticky );
					if ( thresholdHeadIn && thresholdHeadOut) $( header ).addClass( headerInitPosition );
				}else{
					$( header ).removeClass( headerSticky );
					if ( thresholdHeadIn && thresholdHeadOut) $( header ).removeClass( headerInitPosition );
				}
		
				// Background
				if( winW > breakpoint && $( window ).scrollTop() < thresholdBkg ){
					$( header ).removeClass( headerBackground );
				}else if(winW > breakpoint && $( window ).scrollTop() > thresholdBkg ){
					$( header ).addClass( headerBackground );
				}

				// Compact
				if( winW > breakpoint && $( window ).scrollTop() < thresholdHeight ){
					$( header ).removeClass( headerCompact );
				}else if(winW > breakpoint && $( window ).scrollTop() > thresholdHeight ){
					$( header ).addClass( headerCompact );
				}
				if( winW < breakpoint ) {
					$( header ).removeClass( headerCompact );
				}
			});

			// Desktop - on startup
			if( !$( 'body' ).hasClass( 'mobile' ) ){

				// Update width and height
				$( window ).one( 'load', function(){
					updateHeaderData();
					if ( winW > breakpoint ) {
						headerWrapper.css({ height: headerWrapperH + 'px' });
					}

					// Add animation class to header
					$( header ).addClass( headerAnimated );
				});
				if( winW > breakpoint && $( window ).scrollTop() > thresholdBkg ){
					$( header ).addClass( headerBackground );
				}
				if( winW > breakpoint && $( window ).scrollTop() > thresholdHeight ){
					$( header ).addClass( headerCompact );
				}
			}
		},
		fullScreenSection: function(){

			// Fullscreen section nav
			var fsNavigation = function(){
				var sectionId;

				// Check there is more than one section
				// and that window is greater that 960
				if( $( fsSectionWrapper ).children().length > 1 ){

					if ( $( 'body' ).hasClass( 'mobile' ) ) return false;
					var nav = !$( fsSectionWrapper ).hasClass( 'no-navigation' ) ? true : false;
					var pagination;
				
					// Build nav
					if( nav ){
						pagination = $( '<div>' ).addClass( 'fs-pagination' ).appendTo( $( fsSectionWrapper ) );
						for( var i = 1; i < $( fsSectionWrapper ).children().length; i++ ) {
							sectionId = $( fsSectionWrapper ).children().eq( i-1 ).attr( 'id' );
							$( fsSectionWrapper ).find( '#' + sectionId ).data( 'index', i );
							$( fsSectionWrapper ).find( pagination ).append( '<a href="#'+ sectionId + '" id="fs-pagination-' + i + '" data-index="' + i + '" class="fs-bullet-nav" />' );
						}

						// Position based on height and show
						$( window ).on( 'resize', function(){
							positionNav();
						});

						var positionNav = function(){
							$( pagination ).css({ marginTop: -$( pagination ).outerHeight() / 2 + 'px', opacity: 1 });
						};
						positionNav();
							
						// On click
						var fsNav = $( fsSectionWrapper ).find( '.fs-bullet-nav' );
						fsNav.each( function(){
							$( this ).on( 'click', function( event ){
								event.preventDefault();
								if( $( this ).hasClass( 'active' ) ) return false;
								var index = parseFloat( $( this ).data( 'index' ) );
								sectionId =  $( this ).attr( 'href' );
								templateFunctions.scrollPage( sectionId, 0 );
							});
						});
					}

					// Check visibility of sections
					$( window ).on( 'scroll', function(){
						$( fsSectionWrapper ).find( fsSection ).each( function(){
							requestScroll( $( this ) );
						});
					});
					var requestScroll = function( element ){
						if ( !element.data( 'scrolling' ) ) {
							requestAnimationFrame( function () {
								updateElementState( element );
							});
							element.data( 'scrolling', true );
						}
					};
					var updateElementState = function( element ){

						// Swap
						if( templateFunctions.isElementVisible( element, pageThreshold ) && nav ){
							$( pagination ).css({ opacity: 1 });
							var index = $( fsSectionWrapper ).find( element ).data( 'index' );
							pagination.find( '.active' ).removeClass( 'active' );
							pagination.find( '#fs-pagination-' + index ).addClass( 'active' );
						}

						// Hide nav if no fullscreen section are in view
						if( nav ){
							if( $( window ).scrollTop() > $( fsSectionWrapper ).outerHeight() - ( $( window ).height()/2 + $( pagination ).outerHeight() / 2 ) ){
								$( pagination ).css({ opacity: 0, visibility: 'hidden' });
							}else{
								$( pagination ).css({ opacity: 1, visibility: 'visible' });
							}
						}
						element.data( 'scrolling', false );
					};

					// Set active on startup
					$( fsSectionWrapper ).find( fsSection ).each( function(){
						requestScroll( $( this ) );
					});
				}
			};

			// Fullscreen sections mobile
			var winH = $( window ).height();
			$( window ).on( 'resize', function(){
				winH = $( this ).height();
				setFsSectionHeight();
			});
			var setFsSectionHeight = function(){
				if( $( 'body' ).hasClass( 'mobile' ) ){
					$( fsSection ).each( function(){
						$( this ).find( '.background-image' ).css({ height: winH + 'px', minHeight: winH + 'px' });
					});
				}
			};

			fsNavigation();
			setFsSectionHeight();
		},
		scrollToSection: function(){
			var sectionsArray = [];
			$( scrollLink ).each( function(){

				// Push section IDs into array for later use
				sectionsArray.push( $( this ).attr( 'href' ) );

				// Scroll on click
				$( this ).on( 'click', function( event ){
					event.preventDefault();
					var section = $( this ).attr( 'href' );
					var offset = $( this ).data( 'offset' ) ? $( this ).data( 'offset' ) : 0;
					templateFunctions.scrollPage( section, offset );
				});
			});

			// Check visibility of sections
			$( window ).on( 'scroll', function(){
				$.each( sectionsArray, function( index, sectionId ) {
				 	requestScroll( $( sectionId ) );
				 	
				});
			});
			var requestScroll = function( element ){
				if ( !element.data( 'scrolling' ) ) {
					requestAnimationFrame( function () {
						updateElementState( element );
					});
					element.data( 'scrolling', true );
				}
			};
			var updateElementState = function( element ){

				// Swap current link if it's in 
				// the main menu
				if( templateFunctions.isElementVisible( element,pageThreshold ) ){
					var sectionId = element.attr( 'id' );
					var mainMenu = $( 'a[href="#' + sectionId + '"]' ).closest( 'header' );
					if( mainMenu ){
						$( 'a[href="#' + sectionId + '"]' ).closest( 'header' ).find( 'li' ).removeClass( 'current' );
						$( 'a[href="#' + sectionId + '"]' ).parent().addClass( 'current' );
					}
				}
				element.data( 'scrolling', false );
			};
		},
		isElementVisible: function( element, threshold ){
			var winH = $( window ).height();
			var winTop = $( window ).scrollTop();
			var winBottom = winTop + $( window ).height();
			var offsetTop = element.offset().top;
			var elH = element.height();
			var elBottom = ( offsetTop + element.outerHeight() - ( winH * threshold ) );
			var elTop = offsetTop + ( winH * threshold );

			// If visible add class
			if( winBottom >= elTop && winTop <= elBottom ){
				element.addClass( 'in-view' );
			}else{
				element.removeClass( 'in-view' );
			}
			return ( winBottom >= elTop && winTop <= elBottom );
		},
		scrollPage: function( target, offset ){
			$( 'html, body' ).animate({ scrollTop: $( target ).offset().top + offset }, pageScrollSpeed, pageEasing ); 
		},
		masonry: function(){
			var colWidth;

			// Check grid type and set width accordingly
			if( $( msnryGrid ).closest( '.section-block' ).is( '.portfolio-5, .portfolio-6, .masonry-set-dimensions' ) ){
				if( $( msnryGrid ).closest( '.section-block' ).is( '.full-width.no-margins') ){
					templateFunctions.masonryWrapperWidth();
				}
				colWidth = templateFunctions.masonryColWidth();
				templateFunctions.masonryThumbSizes( templateFunctions.masonryColWidth() );
			}else{
				colWidth = '.grid-sizer';
			}

			// Call masonry once images have loaded
			imagesLoaded( $( msnryGrid ), function() {
				$( msnryGrid ).isotope({
					filter: '*',
					itemSelector: '.grid-item',
					isResizeBound: msnryTransResize ? true : false,
					transitionDuration: msnryTransDuration,
					masonry: {
						// Specify grid item reference 
						// Class added to the item selector.
						columnWidth: colWidth
					}
				});

				// Show grid once called
				$( msnryGrid ).css({ visibility: 'visible', opacity: 1 });

				// On resize
				$( window ).on( 'resize', function(){
					if( $( msnryGrid ).closest( '.section-block' ).is( '.full-width.no-margins') ){
						templateFunctions.masonryWrapperWidth();
					}
					templateFunctions.masonryThumbSizes( templateFunctions.masonryColWidth() );
					if( !msnryTransResize ){
						$( msnryGrid ).removeClass( 'filtering' );
						$( msnryGrid )
									.isotope({
										transitionDuration: 0,
										masonry: {
											columnWidth: colWidth !== '.grid-sizer' ? templateFunctions.masonryColWidth() : '.grid-sizer'
										}
									})
									.isotope('layout')
									.isotope({
										transitionDuration: msnryTransDuration
									});
					}else{
						$( msnryGrid )
									.isotope({
										transitionDuration: msnryTransDuration,
										masonry: {
											columnWidth: colWidth !== '.grid-sizer' ? templateFunctions.masonryColWidth() : '.grid-sizer'
										}
									});
					}
				});
			});

			// Filtering
			$( msnryFilterLink ).on( 'click', function( event ) {
				event.preventDefault();
				$( this ).closest( msnryFilterMenu ).find( '.active' ).removeClass( 'active' );
				$( this ).addClass( 'active' );
				var filterValue = $( this ).attr( 'data-filter' );
				$( msnryGrid ).addClass( 'filtering' ).isotope({ filter: filterValue });
			});
		},
		masonryWrapperWidth: function(){
			var gridWidth = Math.ceil( $( window ).width() * 1.002 );
			$( msnryGrid ).css({ maxWidth: gridWidth + 'px', width: gridWidth + 'px' });
		},
		masonryColWidth: function(){
			var colWidth;
			var winW = $( window ).width();
			var gridWidth = $( msnryGrid ).closest( '.section-block' ).is( '.full-width.no-margins' ) ?  Math.ceil( winW * 1.002 ) : $( msnryGrid ).width();
			
			// Calculate column width
			if( $( msnryGrid ).hasClass( 'content-grid-2') ) colWidth = winW >= 480 ? gridWidth / 2 : gridWidth / 1;
			if( $( msnryGrid ).hasClass( 'content-grid-3') ) colWidth = winW > 768 ? gridWidth / 3 : winW <= 768 && winW >= 480 ? gridWidth / 2 : gridWidth / 1;
			if( $( msnryGrid ).hasClass( 'content-grid-4') ) colWidth = winW > 960 ? gridWidth / 4 : winW <= 960 && winW >= 768 ? gridWidth / 3 : winW <= 767 && winW >= 480 ? gridWidth / 2 : gridWidth / 1;
			if( $( msnryGrid ).hasClass( 'content-grid-5') ) colWidth = winW > 1140 ? gridWidth / 5 : winW <= 1140 && winW >= 960 ? gridWidth / 4 : winW <= 960 && winW >= 768 ? gridWidth / 3 : winW <= 768 && winW >= 480 ? gridWidth / 2 : gridWidth / 1;
			if( $( msnryGrid ).hasClass( 'content-grid-6') ) colWidth = winW > 1140 ? gridWidth / 6 : winW <= 1140 && winW >= 960 ? gridWidth / 4 : winW <= 960 && winW >= 768 ? gridWidth / 3 : winW <= 768 && winW >= 480 ? gridWidth / 2 : gridWidth / 1;

			// Base values
			colWidth =  Math.floor( colWidth );
			return colWidth;
		},
		masonryThumbSizes: function( width ){
			var height;
			var winW = $( window ).width();
			var multiplier = 2;
			var gutter = !$( '.portfolio-5, .masonry-set-dimensions' ).hasClass( 'no-margins' ) ? 10 : 0;
			var imgRatio = !$( msnryGrid ).closest( '.section-block' ).is( '.portfolio-5, .masonry-set-dimensions' ) ? 1 : $( msnryGrid ).is( '[data-grid-ratio]' ) ? parseFloat( $( msnryGrid ).data( 'grid-ratio' ) ) : 1.5;

			// Calculate reference height
			height = Math.floor( ( ( width - gutter ) / imgRatio ) + gutter );

			// Set dimensions
			if( winW > 480 ){

				// Grid type 5
				if( $( msnryGrid ).closest( '.section-block' ).is( '.portfolio-5, .masonry-set-dimensions' ) ){
					$( msnryGrid ).find( msnryGridItem ).each( function(){
						if( $( this ).hasClass( 'large' ) ){
							if( !$( this ).hasClass( 'portrait' ) ){
								$( this ).css({ 
									width: Math.floor( width * multiplier ) + 'px', 
									height: Math.floor( height * multiplier ) + 'px' 
								});
							}else{
								$( this ).css({ 
									width: Math.floor( width * multiplier ) + 'px', 
									height: Math.floor( height * ( multiplier * 2 ) ) + 'px'
								});
							}
						}else{ 
							if( $( this ).hasClass( 'portrait' ) ){
								$( this ).css({ 
									width: width + 'px', 
									height: Math.floor( ( height * multiplier ) ) + 'px'
								});
							}else{
								$( this ).css({ 
									width: width + 'px', 
									height: height + 'px' 
								});
							}
						}
					});

				// Grid type 6
				}else if( $( msnryGrid ).closest( '.section-block' ).is( '.portfolio-6' ) ){
					$( msnryGrid ).find( msnryGridItem ).each( function(){
						if( $( this ).hasClass( 'horizontal' ) ){	
							if( $( this ).hasClass( 'two-third' ) ){
								if( $( this ).children( '.item-description' ).length ){
									$( this ).css({ 
										width: Math.floor( width * ( multiplier + 1 ) ) + 'px', 
										height: Math.floor( height ) + 'px' 
									});
								}else{
									$( this ).addClass( 'no-description' ).css({ 
										width: Math.floor( width * multiplier ) + 'px', 
										height: Math.floor( height ) + 'px' 
									});
								}
							}else{
								$( this ).css({ 
									width: Math.floor( width * multiplier ) + 'px', 
									height: Math.floor( height ) + 'px' 
								});
							}
						}else if( $( this ).hasClass( 'vertical' ) ) { 
							if( $( this ).hasClass( 'two-third' ) ){
								if( $( this ).children( '.item-description' ).length ){
									$( this ).css({ 
										width: width + 'px', 
										height: Math.floor( width * ( multiplier + 1 ) ) + 'px' 
									});
								}else{
									$( this ).css({ 
										width: width + 'px', 
										height: Math.floor( height * multiplier ) + 'px' 
									});
								}
							}else{
								$( this ).css({ 
									width: width + 'px', 
									height: Math.floor( height * multiplier ) + 'px' 
								});
							}
						}else{
							$( this ).css({ 
								width: width + 'px', 
								height: Math.floor( height ) + 'px' 
							});
						}
					});
				}
			}else{

				// Clear width and height
				$( msnryGrid ).find( msnryGridItem ).each( function(){
					if( $( msnryGrid ).closest( '.section-block' ).is( '.portfolio-5, .portfolio-6, .masonry-set-dimensions' ) && $( this ).find( 'iframe, video, .tm-slider-container').length ){
						$( this ).css({ 
							width: width + 'px', 
							height: height + 'px' 
						});
					}else{
						$( this ).css({ 
							width: '', 
							height: '' 
						});
					}
				});
			}
		},
		signupForm: function(){
			$( signupForm ).submit( function( event ){

				event.preventDefault();
				
				// References
				var form = $( this );
				var responseMessage = form.parent().find( formResponse );
				var fromElements = form.find( formElement );
				var emailField = form.find( 'input[type="email"]' );
				var honeypot = form.find( formHoneypot );
				var submit = form.find( formSubmit );

				// Check action, method and 
				// serialize input
				var formUrl = form.attr( 'action' );
				var formMethod = form.attr( 'method' ); 
				var formData = form.serialize();

				// Validation flags
				var emptyFields = false;
				var filledFields = false;
				var validEmail = false;

				// Clear error class
				signupRequired = signupRequired.split('.').join('');
				fromElements.removeClass( signupRequired );

				// Empty fields
				fromElements.each( function(){
					if( $( this ).attr( 'required' ) ){
						if( !$( this ).val() ){
							emptyFields = true;
							$( this ).addClass( signupRequired );
							responseMessage
											.hide()
											.text( signupFormFillFields )
											.fadeIn( 200 );
						}
					}
				});
				if ( !emptyFields ) filledFields = true;

				// Invalid email
				if( emailField.val() && !templateFunctions.isValidEmail( emailField.val() ) ){
					responseMessage
									.hide()
									.text( signupFormValidEmail )
									.fadeIn( 200 );
					emailField.addClass( signupRequired );
				}else{
					validEmail = true;
				}

				// Check honeypot
				if( honeypot.val() !== '' ) return false;

				// If empty fields and invalid
				// email merge messages
				if( emptyFields && emailField.val() && !templateFunctions.isValidEmail( emailField.val() ) ){
					responseMessage
									.hide()
									.text( signupFormFillFields + ' ' + signupFormValidEmail )
									.fadeIn( 200 );
				}
				if( filledFields && validEmail ){

					// Change submit text
					var submitValue = $( submit ).val();
					$( submit )
								.css({ width: $( submit ).outerWidth() + 'px' })
								.val( signupFormSendingButton )
								.attr( 'disabled', true );

					// Sending Message
					responseMessage
									.hide()
									.text( signupFormSending )
									.fadeIn( 200 );
				 
					// Send
					$.ajax({
							url: formUrl,
							type: formMethod,
							data: formData,
							success: function( data ){
								if( data === 'success' ) {
									// Set success message
									responseMessage.text( signupFormSuccess );
									responseMessage
													.delay( 1500 )
													.fadeOut( 200 );
									fromElements.val('');
								} else {
									// Set error message
									responseMessage
													.hide()
													.text( data )
													.fadeIn( 200 );
								}
							}, 
							error: function(){

								// Set error message
								responseMessage
												.hide()
												.text( signupFormError )
												.fadeIn( 200 );	
								
							},
							complete: function(){
								
								// Revert button value
								$( submit )
											.css({ width: '' })
											.val( submitValue )
											.attr( 'disabled', false );
							}
						});
				}
			});
		},
		contactForm: function(){
			$( contactForm ).submit( function( event ){

				event.preventDefault();
				
				// References
				var form = $( this );
				var responseMessage = form.parent().find( formResponse );
				var fromElements = form.find( formElement );
				var emailField = form.find( 'input[type="email"]' );
				var honeypot = form.find( formHoneypot );
				var submit = form.find( formSubmit );

				// Check action, method and 
				// serialize input
				var formUrl = form.attr( 'action' );
				var formMethod = form.attr( 'method' ); 
				var formData = form.serialize();

				// Validation flags
				var emptyFields = false;
				var filledFields = false;
				var validEmail = false;

				// Clear error class
				contactRequired = contactRequired.split('.').join('');
				fromElements.removeClass( contactRequired );

				// Empty fields
				fromElements.each( function(){
					if( $( this ).attr( 'required' ) ){
						if( !$( this ).val() ){
							emptyFields = true;
							$( this ).addClass( contactRequired );
							responseMessage
											.hide()
											.text( contactFormFillFields )
											.fadeIn( 200 );
						}
					}
				});
				if ( !emptyFields ) filledFields = true;

				// Invalid email
				if( emailField.val() && !templateFunctions.isValidEmail( emailField.val() ) ){
					responseMessage
									.hide()
									.text( contactFormValidEmail )
									.fadeIn( 200 );
					emailField.addClass( contactRequired );
				}else{
					validEmail = true;
				}

				// Check honeypot
				if( honeypot.val() !== '' ) return false;

				// If empty fields and invalid
				// email merge messages
				if( emptyFields && emailField.val() && !templateFunctions.isValidEmail( emailField.val() ) ){
					responseMessage
									.hide()
									.text( contactFormFillFields + ' ' + contactFormValidEmail )
									.fadeIn( 200 );
				}
				if( filledFields && validEmail ){

					// Change submit text
					var submitValue = $( submit ).val();
					$( submit )
								.css({ width: $( submit ).outerWidth() + 'px' })
								.val( contactFormSendingButton )
								.attr( 'disabled', true );

					// Sending Message
					responseMessage
									.hide()
									.text( contactFormSending )
									.fadeIn( 200 );
				 
					// Send
					$.ajax({
							url: formUrl,
							type: formMethod,
							data: formData,
							success: function( data ){
								if( data === 'success' ){

									// Set success message
									responseMessage.text( contactFormSuccess );
									responseMessage
													.delay( 1500 )
													.fadeOut( 200 );
									fromElements.val('');

								}else{

									// Set error message
									responseMessage
													.hide()
													.text( contactFormError )
													.fadeIn( 200 );
								}
							},
							complete: function(){
								
								// Revert button value
								$( submit )
											.css({ width: '' })
											.val( submitValue )
											.attr( 'disabled', false );
							}
						});
				}
			});
		},
		isValidEmail: function( email ){
			var addressCheck = new RegExp( /^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i );
			return addressCheck.test( email );
		},
		enablePlaceHolder: function(){
			$( 'input, textarea' ).placeholder();
		},
		googleMap: function(){

			// Check grayscale option
			var grayscale = mapGrayScale ? -100 : 0;

			// Map options
			var mapOptions = {
				zoom: mapZoomLevel,
				center: new google.maps.LatLng( mapLat, mapLong ),
				mapTypeControl: mapTypeCtrl,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				panControl: mapPanCtrl,
				panControlOptions: {
					position: google.maps.ControlPosition.TOP_LEFT
				},
				zoomControl: mapZoomCtrl,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.SMALL,
					position: google.maps.ControlPosition.LEFT_TOP
				},
				scrollwheel: mapZoomMseWheel,
				scaleControl: mapScaleCtrl, 
				streetViewControl: mapStreetViewCtrl,
				streetViewControlOptions: {
					position: google.maps.ControlPosition.LEFT_TOP
				},
				// Add styles as necessary
				styles:[ { stylers:[ { saturation: grayscale } ] } ]
			};
			
			// Set Icon reference and size
			var icon = new google.maps.MarkerImage( mapIcon, null, null, null, new google.maps.Size( mapIconW, mapIconH ) );

			// Get map wrapper id
			var map = new google.maps.Map( document.getElementById( 'map-canvas' ), mapOptions );

			// Set Lat/Long
			var mapLatLng = new google.maps.LatLng( mapLat, mapLong );

			// Add marker
			var locationMarker = new google.maps.Marker({
				position: mapLatLng,
				map: map,
				icon: icon
			});

			// On resize event center map
			google.maps.event.addDomListener( window, 'resize', function() {
				var mapCenter = map.getCenter();
				google.maps.event.trigger( map, 'resize' );
				map.setCenter( mapCenter ); 
			});
		},
		pageFade: function(){
			if( !pageFadeLocation ) return false;
			$( launchLink ).not( excludeLink ).on( 'click', function( event ) {
				event.preventDefault();
				var location = this.href;
				if( $( 'body' ).hasClass( 'transition-support' ) ){
					$( page )
							.addClass( 'page-fade-out' )
							.on( transitionEnd, function( event ){
								event.stopPropagation();
								if( event.target !== $( this )[0] ) return false;
								templateFunctions.goToNewPage( location );
							});
				}else{
					templateFunctions.goToNewPage( location );
				}
			});
		},
		goToNewPage: function( location ) {
			window.location = location;
		}
	};

	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel 
	// MIT license
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}
		if ( !window.requestAnimationFrame )
		window.requestAnimationFrame = function( callback, element ) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
				var id = window.setTimeout( function() { callback(currTime + timeToCall); }, 
				timeToCall);
				lastTime = currTime + timeToCall;
				return id;
		};
		if ( !window.cancelAnimationFrame )
			window.cancelAnimationFrame = function( id ) {
				clearTimeout( id );
			};
	}());

	// Initiate
	templateFunctions.init();
});