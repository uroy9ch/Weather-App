// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();
$('#result').hide();
$('#notify').hide();


//var totalFrames = 18;
//var frameWidth = 174;
//var speed = 1.5;
//  
//var walkEase = new SteppedEase(totalFrames)
//var finalPosition = '-' + (frameWidth * totalFrames) + 'px 0px';
//
//var walkTL = new TimelineMax()
//walkTL.to('#walker', speed, {
//    backgroundPosition: finalPosition,
//    ease: walkEase,
//    repeat: -1
//});

var description;
var aqi; // integer
var color;

function showWeather() {
    console.log("weather");
	
	// Pull in zip code from 
	var zip = $('#zip').val();
	console.log(zip);
	
	var url = "http://api-beta.breezometer.com/baqi/?location="+zip+ "&key=3cb30094e7ef442cbf9e3b5f964ee6ae";
	

	var jqxhr = $.getJSON( url, function() {
	  console.log( "success" );
//		$('#notify').hide();
	})
	  .done(function() {
		console.log( "second success" );
	  })
	  .fail(function() {
		console.log( "error" );
		$('#notify').show();
	  })
	  .always(function() {
		console.log( "complete" );
	  });


	// Set another completion function for the request above
		jqxhr.complete(function() {
			// Do variable assignment here
//			console.log(jqxhr.responseJSON);
			description = jqxhr.responseJSON.breezometer_description;
			color = jqxhr.responseJSON.breezometer_color;
			aqi = jqxhr.responseJSON.breezometer_aqi;
			console.log("The weather is" + description + "air quality is" + aqi);
			
			if(aqi <= 50){
				console.log("Be sure to take your inhaler today")
			} else {
				console.log("ok weather");
			}

					// Use conditional logic here
	//		if (aqi < 50 ) { 
	//		console.log("whatever") 
	//		$("#content").html(...);
	//	};

			//hide logo div
			$('#logo').hide();
			$('#zip').hide();
			$('#goButton').hide();
			//show result div
			$('#result').show();
			$('#result').addClass('animated tada');

			//populate content div based on weather
			$('#description').html(description);
			$('#aqi').html("<span style='color: " + color + "'>Air Quality is: " + aqi + "</span>");
			
		});


	
	
}