$(document).foundation();
$('#result').hide();
$('#notify').hide();
$('#resetbutton').hide();

var description;
var aqi; // integer
var color;

var wiz, frog, frogInhale; // Will hold animations
var ranShowWeather;

function preload() {

	//create an animation from a sequence of numbered images
	//pass the first and the last file name and it will try to find the ones in between
	wiz = loadAnimation("img_files/WizStand_00.png", "img_files/WizStand_20.png");
	frog = loadAnimation("img_files/gwfrog_01.png", "img_files/gwfrog_04.png");
	frogInhale = loadAnimation("img_files/froginhale_01.png", "img_files/froginhale_10.png");
}

function setup() {
	//  var wizardCanvas = createCanvas(362, 487);
	//	wizardCanvas.parent('walker');
	var myCanvas = createCanvas(windowWidth, windowHeight);
	//	myCanvas.parent('wizcontainer');
	myCanvas.parent('canvas-wrapper');

	ranShowWeather = false;
}

function draw() {


	// specify the animation instance and its x,y position
	// animation() will update the animation frame as well
	if (ranShowWeather){
		clear();

		// Show animation based on AQI
		if (aqi	<= 50) {
			animation(frogInhale, windowWidth/2, windowHeight/3.5);
		} else {
			animation(frog, windowWidth/2, windowHeight/3.5);
		}

	} else {
		animation(wiz, windowWidth/2, windowHeight/3.5);
	}


}


function windowResized() {
	clear();
}

function showWeather() {
	//hide logo div
	$('#logo').hide();
	$('#zip').hide();
	$('#goButton').hide();

	ranShowWeather = true;

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

		//show result div
		$('#result').show();
		$('#resetbutton').show();
		$('#animatedResult').addClass('animated tada');

		//populate content div based on weather
		$('#description').html(description);
		$('#aqi').html("<span style='color: " + color + "'>Air Quality is: " + aqi + "</span>");

	});
}

function reset () {
	$('#logo').show();
	$('#zip').show();
	$('#goButton').show();
	$('#result').hide();
	$('#resetbutton').hide();
	
	setup();
}