var cachedData;
var mazeGrid = [];

/**
 * Called onload by the body of the html document. Initialises the size of the canvas, draws the initial
 * image and adds EventListeners.
 */
function setup() {	
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext("2d");

	gameCanvas.width = 750;
	gameCanvas.height = 500;
	
	gameCanvas.addEventListener("mousedown", feedback);
	
	var LeftButton = document.getElementById("left");
	LeftButton.addEventListener("click", clickLeft);
	
	var RightButton = document.getElementById("right");
	RightButton.addEventListener("click", clickRight);
	
	var UpButton = document.getElementById("up");
	UpButton.addEventListener("click", clickUp);
	
	var DownButton = document.getElementById("down");
	DownButton.addEventListener("click", clickDown);
	
	for (var x = 0; x < 30; x++) {
		for (var y = 0; y < 20; y++) {
			mazeGrid[x][y] = 0;
		}
	}
	
	mazeGrid[5][5] = 1;
	
	cachedData = ctx.getImageData(0, 0, 750, 750);
	for (var x = 0; x < 30; x++) {
		for (var y = 0; y < 20; y++) {
			if (mazeGrid[x][y] === 0) {
				boxFill(x, y, true);
			} else {
				boxFill(x, y, false);
			}
		}
	}
	
	ctx.putImageData(cachedImageData, 0, 0);
}

function boxFill(xCoord, yCoord, isBlack) {
	for (var x = (75 * xCoord); x < (((xCoord + 1) * 75) - 1); x++) {
		for (var y = (75 * yCoord); y < (((yCoord + 1) * 75) - 1); y++) {
			if (isBlack) {
				cachedData.data[(((y * 500 * 4) + x * 4) + 0)] = 255;
				cachedData.data[(((y * 500 * 4) + x * 4) + 1)] = 255;
				cachedData.data[(((y * 500 * 4) + x * 4) + 2)] = 255;
			} else {
				cachedData.data[(((y * 500 * 4) + x * 4) + 0)] = 0;
				cachedData.data[(((y * 500 * 4) + x * 4) + 1)] = 0;
				cachedData.data[(((y * 500 * 4) + x * 4) + 2)] = 0;
			}
		}
	}
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