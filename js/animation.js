var wiz;

function preload() {

//create an animation from a sequence of numbered images
//pass the first and the last file name and it will try to find the ones in between
wiz = loadAnimation("img_files/WizStand_00.png", "img_files/WizStand_20.png");
  
}

function setup() {
  var myCanvas = createCanvas(362, 487);
	myCanvas.parent('walker');
}

function draw() {

  
  //specify the animation instance and its x,y position
  //animation() will update the animation frame as well
  animation(wiz, 362/2, 487/2);
}

