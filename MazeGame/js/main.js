var globBackImg = new Image();
globBackImg.src = "img/mazegameui.png";
var cachedData;

/**
 * Called onload by the body of the html document. Initialises the size of the canvas, draws the initial
 * image and adds EventListeners.
 */
function setup() {	
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext("2d");
	var backgroundImg = globBackImg;

	gameCanvas.width = 750;
	gameCanvas.height = 500;
	
	ctx.drawImage(backgroundImg, 0, 0);
	gameCanvas.addEventListener("mousedown", feedback);
	
	var LeftButton = document.getElementById("left");
	LeftButton.addEventListener("click", clickLeft);
	
	var RightButton = document.getElementById("right");
	RightButton.addEventListener("click", clickRight);
	
	var UpButton = document.getElementById("up");
	UpButton.addEventListener("click", clickUp);
	
	var DownButton = document.getElementById("down");
	DownButton.addEventListener("click", clickDown);
	
	cachedData = ctx.getImageData(0, 0, 750, 750);
	prompt();
}

/**
 * Called on mousedown on the game canvas.
 *
 */
function feedback(event) {

}

/**
 * Called on clicking the left button on the input panel
 *
 */
function clickLeft(event) {
	var command = document.getElementById("commandString");
	command.value = command.value + "L";
}

/**
 * Called on clicking the right button on the input panel
 *
 */
function clickRight(event) {
	var command = document.getElementById("commandString");
	command.value = command.value + "R";
}

/**
 * Called on clicking the up button on the input panel
 *
 */
function clickUp(event) {
	var command = document.getElementById("commandString");
	command.value = command.value + "U";
}

/**
 * Called on clicking the down button on the input panel
 *
 */
function clickDown(event) {
	var command = document.getElementById("commandString");
	command.value = command.value + "D";
}