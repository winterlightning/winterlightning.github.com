(function($) {
	  $.fn.swfGallery = function(options) {
			var myID = this.parent().attr("id")
			var settings = {
				swf: 'swfs/image_slider.swf',
				width: '100%',
				height: '540',
				allowFullscreen: 'true',
				bgcolor:'#E6E7E8',
				container_width:'960',
			}
			if ( options ) { 
				$.extend( settings, options );
			}
			
			//alert(settings.flashvars.i)
			
			var hasFlash = false
			try {
				var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
				if(fo) hasFlash = true;
			}catch(e){
				if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) hasFlash = true;
			}
			
			if(hasFlash == true){
				this.flash({
					swf: 'swfs/image_slider.swf',
					width: settings.width,
					height: settings.height,
					allowFullscreen: settings.allowFullscreen,
					bgcolor: settings.bgcolor,
					flashvars: settings.flashvars
				})
				
			}else{
				
				var imageContainer = document.createElement('div');
				imageContainer.innerHTML = [
					'<div id="container" style="margin:0 auto; position:relative; text-align:left; width:960px; background:#E6E7E8; height:550px;border:thin #CCC 1px;"><div id="mf_slider_'+myID+'"><ul></ul></div></div>'
				]
					
				this.children().remove();
				this.html(imageContainer.firstChild);
					
				var temp = new Array();
				temp = settings.flashvars.i.split(",");
				
				$.each(temp, function() {
						$('#mf_slider_'+myID+' ul').append('<li style="width:'+settings.container_width+'px; height:'+settings.height+'overflow:hidden;"><img src="'+settings.flashvars.directory+this+'"/></li>')
				
			   	})
				//return here for better mobile optimization
				this.append('<script> $(document).ready(function(){$("#mf_slider_'+myID+'").easySlider({auto: false, continuous: true});});</script>')
			}
	
	  };
})( jQuery );

/*
<script>
                        $(window).load(function(){
								//alert(hasFlash)
								$('#flipbook .flash_widescreen').swfGallery({
									id:'flipbook',
									width:'100%',
									height:'550',
									allowFullscreen: 'true',
									bgcolor: '#E6E7E8',
									flashvars: {
                                    	i: 'flipbook_1.jpg,flipbook_2.jpg,flipbook_3.jpg,flipbook_4.jpg,flipbook_5.jpg',
										directory: 'imgs/',
										s:'inside',
										motion_blur:'true'
										
                                       
                                    }
									
								})
								//MOBILE FALLBACK
								$("#mf_slider_flipbook").easySlider({
									auto: false, 
									continuous: true
								});
							});
                    </script>
<div id="container" style="margin:0 auto; position:relative; text-align:left; width:960px; background:#E6E7E8; height:550px;border:thin #CCC 1px;">
                        <div id="mf_slider_flipbook">
                            <ul>				
                                <li style="width:960px; height:550px; overflow:hidden;"><img src="imgs/flipbook_1.jpg" alt="" /></li>
                                <li style="width:960px; height:550px; overflow:hidden;"><img src="imgs/flipbook_2.jpg" alt="" /></li>
                                <li style="width:960px; height:550px; overflow:hidden;"><img src="imgs/flipbook_3.jpg" alt="" /></li>
                                <li style="width:960px; height:550px; overflow:hidden;"><img src="imgs/flipbook_4.jpg" alt="" /></li>
                                <li style="width:960px; height:550px; overflow:hidden;"><img src="imgs/flipbook_5.jpg" alt="" /></li>
                            </ul>
                        </div>
                    </div>*/