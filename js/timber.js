/**
*	Timber
*	Version: 1.0
*	URL: @ThemeMountain
*	Description: Components
*	Requires: jQuery 1.10+
*	Author: ThemeMountain
*	Copyright: Copyright 2014 ThemeMountain
*	License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

$( document ).ready( function(){
	
	'use strict';

	/**
	*	Side Navigation 
	*/

	// Reference classes
	var siteWrapper = '.wrapper';							// Site wrapper
	var content = '.content';								// Container container
	var header = '.header';									// Header
	var nav = '.navigation';
	var sideNav = '.side-navigation-wrapper';				// Side navigation
	var sideNavShow = '#side-nav-show a';					// Side nav show button.
	var sideNavHide = '#side-nav-hide a';					// Side nav hide button.
	var revealEl = '.reveal-side-navigation';				// Reveal element (containers that slide to reveal sidenav)		
	var revealLeft = '.element-reveal-left';				// Reveal left class
	var revealRight = '.element-reveal-right';				// Reveal right class
	var showLeft = '.element-show-left';					// Show left class
	var showRight = '.element-show-right';					// Show right class
	var cntOverlay = '.content-side-navigation-screen';		// Content overlay screen
	var cntSpeed = 500;										// Content animation speed 
	var cntEasing = 'easeInOutQuint';						// Transition timing function, accepts cubic-bezier
	
	var sideNavigation = {
		init: function(){

			// Nav active
			$( 'body' ).data( 'aux-nav', false );
			
			// Determine menu position
			var menuPosition = $( sideNav ).hasClass( 'enter-right' ) ? 'right' : 'left';

			// Add appropriate direction class based on CSS 
			// transition support and side nav position
			var reveal;
			if( tSupport ){
				reveal = menuPosition === 'left' ? revealLeft : revealRight;
			}else{
				reveal = menuPosition === 'left' ? showLeft : showRight;
				$( sideNav ).addClass( 'hide' );
			}
			reveal = reveal.split('.').join('');

			// Toggle buttons and actions
			$( sideNavShow ).on( 'click', function( event ){
				event.preventDefault();
				if( !$( sideNav ).hasClass( 'active') ){
					
					// Renable transitions in case
					// window has been resized
					transitions.state( true );

					// Nav active
					$( 'body' ).data( 'aux-nav', true );
					
					// Add classes
					if( tSupport ){
						$( revealEl ).addClass( reveal ).css({ transitionDuration: cntSpeed + 'ms', transitionTimingFunction: easingArray[ cntEasing ] });
						$( sideNav ).addClass( 'active' ).css({ transitionDuration: cntSpeed + 'ms', transitionTimingFunction: easingArray[ cntEasing ] });
					}else{
						$( siteWrapper ).addClass( reveal );
						$( sideNav ).removeClass( 'hide' ).addClass( 'active' );
					}

					// On transition update nav status
					auxNavigation.state( true );

					// On transition end remove listener
					$( sideNav ).on( transitionEnd, function( event ){
						if( event.target !== $( this )[0] ) return false;
						event.stopPropagation();
						$( this ).off( transitionEnd );
					});

					// Add content screen
					// click and swipe event
					var contentScreen =  $( '<a href="#" />' ).addClass( cntOverlay.split('.').join('') ).appendTo( $( siteWrapper ) );
					$( contentScreen ).on( 'click', function( event ){
						event.preventDefault();
						sideNavigation.closeNav( reveal );
					});
					$( contentScreen ).swipeIt({
						preventTouchOn: sideNav,
						onSwipeEnd: function( swipe ) {
							if( menuPosition === 'right' ){
								if( swipe === 'left' ){
									sideNavigation.closeNav( reveal );
								}
							}else{
								if( swipe === 'right' ){
									sideNavigation.closeNav( reveal );
								}
							}
						}
					});
				}else{
					sideNavigation.closeNav( reveal );
				}
			});

			// sideNav close button
			$( sideNavHide ).on( 'click', function( event ){
				event.preventDefault();
				sideNavigation.closeNav( reveal );
			});

			// Window event
			$( window ).on( 'resize', function(){
				if( $( 'body' ).data( 'aux-nav' ) ){
					auxNavigation.state( true );
				}else{
					auxNavigation.state( false );
				}
			});
		},
		closeNav: function( revealClass ){

			if( tSupport ){

				// Reenable transitions
				transitions.state( true );

				// Remove classes
				$( revealEl ).removeClass( revealClass );
				$( sideNav ).removeClass( 'active' );
				
				// On transition update nav status
				$( sideNav ).on( transitionEnd, function( event ){
					if( event.target !== $( this )[0] ) return false;
					event.stopPropagation();
					auxNavigation.state( false );
					$( this ).off( transitionEnd );
				});
			}else{
				$( siteWrapper ).removeClass( revealClass );
				$( sideNav ).addClass( 'hide' ).removeClass( 'active' );
			}

			// Nav inactive
			$( 'body' ).data( 'aux-nav', false );

			// Delete overlay
			$( siteWrapper ).find( cntOverlay ).remove();
		}
	};

	/**
	*	Overlay Navigation 
	*/

	var overlayNav = '.overlay-navigation-wrapper';				// Overlay navigation
	var overlayNavShow = '#overlay-nav-show a';					// Overlay nav show button.
	var overlayNavHide = '#overlay-nav-hide a';					// Overlay nav hide button.
	var overlaySpeed = 500;										// Content animation speed 
	var overlayEasing = 'easeInOutQuint';						// Transition timing function, accepts cubic-bezier

	var overlayNavigation = {
		init: function(){

			// Toggle button actions
			$( overlayNavShow ).on( 'click', function( event ){
				event.preventDefault();

				// Nav active
				$( 'body' ).data( 'aux-nav', true );

				// Add classes
				if( tSupport ){
					$( overlayNav ).addClass( 'active' ).css({ top: 0, transitionDuration: overlaySpeed + 'ms', transitionTimingFunction: easingArray[ overlayEasing ] });
				}else{
					$( overlayNav ).addClass( 'active' ).css({ top: 0 });
				}

				// On transition update nav status
				$( overlayNav ).on( transitionEnd, function( event ){
					if( event.target !== $( this )[0] ) return false;
					event.stopPropagation();
					auxNavigation.state( true );
					$( this ).off( transitionEnd );
				});
			});

			// overlayNav close button
			$( overlayNavHide ).on( 'click', function( event ){
				event.preventDefault();
				overlayNavigation.closeNav();
			});

			// Window event
			$( window ).on( 'resize', function(){
				if( $( 'body' ).data( 'aux-nav' ) ){
					auxNavigation.state( true );
				}else{
					auxNavigation.state( false );
				}
			});
		},
		closeNav: function(){
			if( tSupport ){
				$( overlayNav ).removeClass( 'active' );

				// On transition update nav status
				$( overlayNav ).on( transitionEnd, function( event ){
					if( event.target !== $( this )[0] ) return false;
					event.stopPropagation();
					auxNavigation.state( false );
					$( overlayNav ).css({ top: '-100%' });
					$( this ).off( transitionEnd );
				});
			}else{
				$( overlayNav ).removeClass( 'active' ).css({ top: '-100%' });
			}

			// Nav inactive
			$( 'body' ).data( 'aux-nav', false );
		}
	};

	/**
	*	Sub menu toggle
	*/

	var menuContainer = '.side-navigation-wrapper, .overlay-navigation-wrapper';	// Containers
	var subMenu = '.sub-menu';														// Sub menu
	var subMenuParentLink = '.contains-sub-menu';									// Sub menu parent link

	var toggleSubMenu ={
		init: function(){
			
			// Toggle sub menus
			$( menuContainer ).find( subMenuParentLink ).each( function(){
				$( this ).on( 'click', function( event ) {
					event.preventDefault();

					// Renable transitions in case
					// window has been resized
					transitions.state( true );

					// Loop through and add 
					// heights of child elements
					var subMenuItems = $( this ).siblings( subMenu ).children();
					var subMenuHeight = 0;
					subMenuItems.each(function(){
					    subMenuHeight += $( this ).outerHeight();
					});

					// Set height of menu
					if( $( this ).siblings( subMenu ).hasClass( 'open' )){
						$( this ).closest( menuContainer ).find( subMenu ).css({ height: 0 }).removeClass( 'open' );
					} else {
						$( this ).closest( menuContainer ).find( subMenu ).css({ height: 0 }).removeClass( 'open' );
						$( this ).siblings( subMenu ).css({ height: subMenuHeight  + 'px' });
						$( this ).siblings( subMenu ).addClass( 'open' );
					}
				});
			});
		}
	};

	/**
	*	Aux nav state
	*/

	var auxNavigation = {
		state: function( active ){
			if( !mobile ){
				if( active ){
					$( 'body' ).addClass( 'aux-navigation-active' );
				}else{
					if( !$( 'body' ).data( 'aux-nav' ) ) $( 'body' ).removeClass( 'aux-navigation-active' );
				}
			}else{
				if( active ){
					$( 'body' ).addClass( 'aux-navigation-active' );
				}else{
					$( 'body' ).removeClass( 'aux-navigation-active' );
				}
			}
		}
	};

	/**
	*	Transition Status
	*/

	// Elements to prevent transition on while resizing window
	var transitionEl = '.header *, .reveal-side-navigation, .side-navigation-wrapper';

	var transitions = {
		init: function(){
			if( !mobile ){
				$( window ).on( 'scroll', function(){
					transitions.state( true );
				});
			}
			$( window ).on( 'resize', function(){
				transitions.state( false );
			});
		},
		state: function( active ){
			if( active ){
				$( transitionEl ).removeClass( 'no-transition' );
			}else{
				$( transitionEl ).addClass( 'no-transition' );
			}
		}
	};

	/**
	*	To Top
	*/

	// Threshold before 
	// button appears
	var thresHold = 300;

	// Scroll to top button
	// class ref
	var toTopButton = '.scroll-to-top';

	// Scroll to top speed
	var sttSpeed = 600;

	var scrollToTop = {
		init: function(){
			$( window ).on( 'scroll', function(){
				if ( $( toTopButton ).is( '[data-no-hide]' ) ) return false;
				if ( $( this ).scrollTop() > thresHold ) {
					$( toTopButton ).fadeIn( sttSpeed );
				} else {
					$( toTopButton ).fadeOut( sttSpeed );
				}
			});
			$( toTopButton ).on( 'click', function( event ){
				event.preventDefault();
				scrollToTop.scrollUp();
			});
		},
		scrollUp: function(){
			$( 'html, body' ).animate({ scrollTop : 0 }, sttSpeed );
		}
	};

	/**
	*	Framework Components
	*/

	// Tab class
	var tabs = '.tabs';
	
	// Accodion class and 
	// open/close icon ref
	var accordion = '.accordion';
	var accIconOpen = 'icon-plus';
	var accIconClose = 'icon-minus';
	
	// Dismissable Element
	// and fadeout speed
	var dismissable = '.box.dismissable';
	var dismSpeed = 300;
	var dismEasing = 'swing';

	// Dropdown element
	// and fadeout speed
	var dropdown = '.dropdown';
	var ddSpeed = 300;
	var ddEasing = 'swing';
	
	// Thumb and overlay class
	// thumb rollover speed
	var thumb = '.thumbnail';
	var tmbOverlay = '.overlay-info';
	var ovlSpeed = 400;
	var ovlEasing = 'swing';

	var components = {
		init: function(){
			components.tabs();
			components.accordions();
			components.dismissable();
			components.dropdown();
			components.rollovers();
			components.thumbnailRatio();
		},
		tabs: function(){
			$( tabs ).each( function(){
				var tabLink = $( this ).find('li a');
				tabLink.each( function(){
					$( this ).on( 'click', function(){
						var tabRef = $( this ).attr( 'href' );
						var tabContent = $( this ).closest( '.tabs' ).find( tabRef );
						$( this ).closest( '.tab-nav' ).find( '.active' ).removeClass( 'active' );
						$( this ).parent().addClass( 'active' );
						$( this ).closest( '.tabs' ).find( '.content.active' ).removeClass( 'active' );
						tabContent.addClass( 'active' );
						return false;
					});
					if($( this ).parent().hasClass( 'active' )){
						$( this ).closest( '.tabs' ).find($( this ).attr( 'href' )).addClass( 'active' );
					}
				});
			});
		},
		accordions: function(){
			$( accordion ).each( function(){
				var accLink = $( this ).find( 'li a' );
				accLink.each( function(){
					
					// Add Toggle icon
					if($( this ).closest( accordion ).is( '[data-toggle-icon]' )){
						if(!$( this ).find( 'span' ).length && !$( this ).parent().hasClass( 'active' )){
							$( this ).prepend('<span class="' + accIconOpen + '" />');
						}else if(!$( this ).find( 'span' ).length && $( this ).parent().hasClass( 'active' )){
							$( this ).prepend( '<span class="' + accIconClose +'" />' );
						}
					}		
					$( this ).on( 'click', function(){
						var accRef = $( this ).attr( 'href' );
						var accContent = $( this ).closest( accordion ).find( accRef );
						
						// Toggle all
						if(!$( this ).closest( accordion ).is( '[data-toggle-multiple]' )){
							$( this ).closest( accordion ).find( 'li.active' ).not( $( this ).parent() ).removeClass( 'active' );
							$( this ).closest( accordion ).find( '.content.active' ).not( accContent ).removeClass( 'active' );
						}
						
						// Toggle current
						$( this ).parent().toggleClass( 'active' );
						accContent.toggleClass( 'active' );
						
						// Toggle icon
						if($( this ).find( '.' + accIconClose ).length){
							$( this ).find( '.' + accIconClose ).removeClass( accIconClose ).addClass( accIconOpen );
						}else if($( this ).find( '.' + accIconOpen ).length){
							if(!$( this ).closest( accordion ).is( '[data-toggle-multiple]' )){
								$( this ).closest( 'ul' ).find( '.' + accIconClose ).removeClass( accIconClose ).addClass( accIconOpen );
							}
							$( this ).find( '.' + accIconOpen ).removeClass( accIconOpen ).addClass( accIconClose );
						}
						return false;
					});
					if($( this ).parent().hasClass( 'active' )){
						$( this ).parent().find( '.content' ).addClass( 'active' );
					}
				});
			});
		},
		dismissable: function(){
			$( dismissable ).each( function(){
				if( !$( this ).find( '.close' ).length ){
					$( this ).prepend( '<a href="" class="close icon-cancel" />' );
				}
				$( this ).find( '.close' ).on( 'click', function( event ){
					event.preventDefault();
					if( tSupport ){	
						$( this ).parent()
										.css({ 
											transitionProperty: 'opacity', 
											opacity: 0, transitionDuration: dismSpeed + 'ms', 
											transitionTimingFunction: easingArray[ dismEasing ] 
										})
										.on( transitionEnd, function( event ){
											event.stopPropagation();
											if( event.target !== $( this )[0] ) return false;
											$( this ).remove();
										});
					}else{
						$( this ).parent().animate({ opacity: 0 }, ovlSpeed, dismEasing, function(){
							$( this ).remove();
						});
					}
				});
			});
		},
		dropdown: function(){
			$( dropdown ).each( function(){
				$( this ).find( '.button, button' ).each( function(){
					$( this ).on( 'click', function( event ){
						event.preventDefault();
						var dropdownList = $( this ).parent().children( '.dropdown-list' );
						if( $( this ).parent().hasClass( 'disabled' ) ) return false;
						$( '.dropdown-list' ).not( $( dropdownList ) ).removeClass( 'active' );
						if( $( dropdownList ).hasClass( 'active' ) ){
							$( dropdownList ).removeClass( 'active' );
						}else{
							$( dropdownList ).addClass( 'active' );
						}
					});
					$( this ).parent().children( '.dropdown-list' ).find( 'li a' ).on( 'click', function( event ){
						event.preventDefault();
						$( '.dropdown-list' ).removeClass( 'active' );
					});
				});
			});
		},
		rollovers: function(){
			if( tSupport ){
				$( tmbOverlay ).css({ transitionDuration: ovlSpeed + 'ms', transitionTimingFunction: easingArray[ ovlEasing ] });
			}else{
				$( thumb ).find( '.overlay-link' ).mouseenter( function() {
					$( this ).find( tmbOverlay ).css({ opacity: 0 }).stop().animate({ opacity: 1 }, ovlSpeed, ovlEasing );
				})
				.mouseleave( function() {
					$( this ).find( tmbOverlay ).stop().animate({ opacity: 0 }, ovlSpeed, ovlEasing );
				});
			}
		},
		thumbnailRatio: function(){
			$( window ).on( 'resize', function(){
				$( thumb ).each( function(){
					if( $( this ).find( '.caption-over-outer' ).length ){
						var img = $( this ).find( 'img' );
						var refW = img.attr( 'width' );
						var refH = img.attr( 'height' );
						var imgW = $( this ).find( 'img' ).width();
						var ratio = refW >= refH ? refW / refH : refH / refW;
						var height = refW >= refH ? imgW / ratio : imgW  * ratio;
						$( this ).find( '.caption-over-outer' ).css({ opacity: 1 });
						$( this ).css({ height: height + 'px' });
					}
				});
			}).resize();
		}
	};

	/**
	*	Transition Support and Prefixing
	*/
	var t = document.body || document.documentElement;
	var s = t.style;
	var tSupport = s.transition !== undefined || s.WebkitTransition !== undefined || s.MozTransition !== undefined || s.MsTransition !== undefined || s.OTransition !== undefined;
	var property = [ 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ];
	var prefix;
	for( var i in property ){
		if( s[ property[ i ] ] !== undefined ){
			prefix = '-' + property[ i ].replace( 'Transform', '' ).toLowerCase();
		}
	}
	var transitionTimingFunction = prefix + '-transition-timing-function';
	var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
	if( tSupport ) document.getElementsByTagName( 'body' )[0].className+=' transition-support';

	// Easing Array
	// For converting jQuery easing types
	// to Cubic Bezier format for CSS3 transitons
	var easingArray = {
		'linear':'cubic-bezier(0, 0, 1, 1)',
		'swing':'cubic-bezier(0.42, 0, 0.58, 1)',
		'easeOutCubic':'cubic-bezier(.215,.61,.355,1)',
		'easeInOutCubic':'cubic-bezier(.645,.045,.355,1)',
		'easeInCirc':'cubic-bezier(.6,.04,.98,.335)',
		'easeOutCirc':'cubic-bezier(.075,.82,.165,1)',
		'easeInOutCirc':'cubic-bezier(.785,.135,.15,.86)',
		'easeInExpo':'cubic-bezier(.95,.05,.795,.035)',
		'easeOutExpo':'cubic-bezier(.19,1,.22,1)',
		'easeInOutExpo':'cubic-bezier(1,0,0,1)',
		'easeInQuad':'cubic-bezier(.55,.085,.68,.53)',
		'easeOutQuad':'cubic-bezier(.25,.46,.45,.94)',
		'easeInOutQuad':'cubic-bezier(.455,.03,.515,.955)',
		'easeInQuart':'cubic-bezier(.895,.03,.685,.22)',
		'easeOutQuart':'cubic-bezier(.165,.84,.44,1)',
		'easeInOutQuart':'cubic-bezier(.77,0,.175,1)',
		'easeInQuint':'cubic-bezier(.755,.05,.855,.06)',
		'easeOutQuint':'cubic-bezier(.23,1,.32,1)',
		'easeInOutQuint':'cubic-bezier(.86,0,.07,1)',
		'easeInSine':'cubic-bezier(.47,0,.745,.715)',
		'easeOutSine':'cubic-bezier(.39,.575,.565,1)',
		'easeInOutSine':'cubic-bezier(.445,.05,.55,.95)',
		'easeInBack':'cubic-bezier(.6,-.28,.735,.045)',
		'easeOutBack':'cubic-bezier(.175, .885,.32,1.275)',
		'easeInOutBack':'cubic-bezier(.68,-.55,.265,1.55)'
	};

	// Reaload if cached
	window.onpageshow = function( event ) {
		if ( event.persisted ) {
			$( 'body' ).addClass( 'page-fade-reset' )
					   .removeClass( 'page-fade-out' );
		}
	};

	// Add mobile class
	// Mobile Check
	var mobile = false;
	if( navigator.userAgent.match(/Android/i) || 
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i) || 
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) || 
		navigator.userAgent.match(/BlackBerry/i) || 
		navigator.userAgent.match(/Windows Phone/i) ){
			mobile = true;
			document.getElementsByTagName( 'body' )[0].className+=' mobile';
	}

	// Webkit
	var isWebkit = 'WebkitAppearance' in document.documentElement.style;
	if( isWebkit ) document.getElementsByTagName( 'body' )[0].className+=' webkit';

	// Safari Hack
	var isSafari = /constructor/i.test( window.HTMLElement );
	if( isSafari ) document.getElementsByTagName( 'body' )[0].className+=' safari-browser';

	// IE Hack
	var isIE = document.all && document.addEventListener || '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
	if( isIE ) document.getElementsByTagName( 'body' )[0].className+=' ie-browser';

	// Init
	sideNavigation.init();
	overlayNavigation.init();
	toggleSubMenu.init();
	transitions.init();
	scrollToTop.init();
	components.init();
});