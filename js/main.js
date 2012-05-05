//$(document).ready(function(){
var hasFlash = false;
$(window).load(function(){
	
				
	$( 'body' ).fadeIn(750,'easeOutQuad');
			
			var currentItem = "";
			var folio_thumbs = $('.portfolio_thumbs .thumb');
			folio_thumbs.hover( function () {
				$(this).find('.overlay').fadeIn(300);
				$(this).css('cursor','pointer');
				$("p", $(this)).css('color','#ff3300').animate()
								
			}, function () {
				$(this).find('.overlay').fadeOut(135);
				$(this).css('cursor','auto');
				$("p", $(this)).css('color','#414042').fadeIn(500);
			});	
			
			folio_thumbs.click( function(e) { 
				var hash = '#' + $(this).attr('id');
				hash = hash.replace('_thumb','')
				window.location = hash
				
			});
			
			$('#close_btn').click( function(e) { 
				$('#portfolio_items').slideToggle(750, 'easeOutExpo');	
				
			});
			$('#close_btn').hover( function () {
				$(this).css('cursor','pointer');
				$("p", $(this)).css('color','#ff3300').animate()
								
			}, function () {
				$(this).css('cursor','auto');
				$("p", $(this)).css('color','#414042').fadeIn(500);
			});	
			
			$(window).hashchange( function(){
				var hash = location.hash
				//alert(hash)
				//document.title = 'The hash is ' + ( hash.replace( /^#/, '' ) || 'blank' ) + '.';
				if( hash != ""){
					$.scrollTo('#portfolio', 500, 'easeOutExpo');				
					if($('#portfolio_items').is(":visible")){
						if ($("#portfolio_items article.item selected")) {
							currentItem = $("#portfolio_items article.selected")
							currentItem.removeClass("selected");
							currentItem.fadeOut(500, "easeOutExpo", function () {
								$(hash).fadeIn(500, 'easeOutExpo');			
							});
							
						} else {
							
							$(hash).fadeIn(500, 'easeOutExpo');
						}	
						$(hash).addClass("selected");
										
					}else{
						if ($("#portfolio_items article.item selected")) {
							currentItem = $("#portfolio_items article.selected")
							currentItem.removeClass("selected");
							currentItem.css('display','none');
						}
						$(hash).addClass("selected");
						$(hash).css('display','block');
						
						$('#portfolio_items').slideToggle(1000, 'easeOutExpo').delay(1000);
						
						
					}	
				}
				
			})
			$(window).hashchange();
			
			
			getTwitters('twitter', {
				id: 'marcfolio', 
				count: 1, 
				enableLinks: true, 
				ignoreReplies: true,
				template: '<\article class="normal_width"><\h1>%text%<\/h1><\p>Tweeted by <\a href="http://twitter.com/%user_screen_name%">%user_screen_name%<\/a> %time%<\/p><\/artcile><\header><\/header>',
    		});	
		});