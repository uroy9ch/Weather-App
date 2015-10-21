// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var weather = {};
var aqi; // integer

function showWeather() {
    console.log("weather");
	
	// Pull in zip code from 
	var zip = $('#zip').val();
	console.log(zip);
	
	var url = "http://api-beta.breezometer.com/baqi/?location="+zip+ "&key=3cb30094e7ef442cbf9e3b5f964ee6ae";
	

	var jqxhr = $.getJSON( url, function() {
	  console.log( "success" );
	})
	  .done(function() {
		console.log( "second success" );
	  })
	  .fail(function() {
		console.log( "error" );
	  })
	  .always(function() {
		console.log( "complete" );
	  });


	// Set another completion function for the request above
		jqxhr.complete(function() {
		// Do variable assignment here
		description = jqxhr.responseJSON.breezometer_description;
		aqi = jqxhr.responseJSON.breezometer_aqi;
			console.log("weather is" + description + "api is" + aqi);
	});
	
	// Use conditional logic here
//		if (aqi < 50 ) { 
//		console.log("whatever") 
//		$("#content").html(...);
//	};
	
	
	//populate content div based on weather
	
	
	
}