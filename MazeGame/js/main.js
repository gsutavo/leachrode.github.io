var cachedData;
var mazeGrid = {};
var playerX, playerY;

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
	
	var SubmitButton = document.getElementById("submit");
	SubmitButton.addEventListener("click", clickSubmit);
	
	for (var x = 0; x < 30; x++) {
		mazeGrid[x] = {}
		for (var y = 0; y < 20; y++) {
			mazeGrid[x][y] = "w";
		}
	}
	
	mazeGrid[3][5] = "p";
	playerX = 3;
	playerY = 5;
	mazeGrid[4][5] = "n";
	mazeGrid[5][5] = "n";
	mazeGrid[5][5] = "n";
	mazeGrid[5][5] = "n";
	
	cachedData = ctx.getImageData(0, 0, 750, 500);
	render();
}

function render() {
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext("2d");

	for (var x = 0; x < 30; x++) {
		for (var y = 0; y < 20; y++) {
			if (mazeGrid[x][y] === "w") {
				boxFill(x, y, true, false);
			} else if (mazeGrid[x][y] === "p") {
				boxFill(x, y, false, true);
			} else {
				boxFill(x, y, false, false);
			}
		}
	}
	
	ctx.putImageData(cachedData, 0, 0);
}

function boxFill(xCoord, yCoord, isWall, isPlayer) {
	for (var x = (25 * xCoord); x < (((xCoord + 1) * 25) - 1); x++) {
		for (var y = (25 * yCoord); y < (((yCoord + 1) * 25) - 1); y++) {
			if (isWall) {
				cachedData.data[(((y * 750 * 4) + x * 4) + 0)] = 0;
				cachedData.data[(((y * 750 * 4) + x * 4) + 1)] = 0;
				cachedData.data[(((y * 750 * 4) + x * 4) + 2)] = 0;
				cachedData.data[(((y * 750 * 4) + x * 4) + 3)] = 255;
			} else if (isPlayer) {
				cachedData.data[(((y * 750 * 4) + x * 4) + 0)] = 255;
				cachedData.data[(((y * 750 * 4) + x * 4) + 1)] = 0;
				cachedData.data[(((y * 750 * 4) + x * 4) + 2)] = 0;
				cachedData.data[(((y * 750 * 4) + x * 4) + 3)] = 255;
			} else {
				cachedData.data[(((y * 750 * 4) + x * 4) + 0)] = 255;
				cachedData.data[(((y * 750 * 4) + x * 4) + 1)] = 255;
				cachedData.data[(((y * 750 * 4) + x * 4) + 2)] = 255;
				cachedData.data[(((y * 750 * 4) + x * 4) + 3)] = 255;
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

function clickSubmit(event) {
	var command = document.getElementById("commandString");
	var inputString = command.value;
	command.value = "";
	
	for (var x = 0; x < inputString.length; x++) {
		if (inputString[x] === "L") {
			moveLeft();
		} else if (inputString[x] === "R") {
			moveRight();
		} else if (inputString[x] === "U") {
			moveUp();
		} else if (inputString[x] === "D") {
			moveDown();
		}
	}
	
	render();
	
	function moveLeft() {
		if (mazeGrid[playerX - 1][playerY] === "n") {
			mazeGrid[playerX - 1][playerY] = "p";
			mazeGrid[playerX][playerY] = "n";
			playerX = playerX - 1;
		}
		render();
	}
	
	function moveRight() {
		if (mazeGrid[playerX + 1][playerY] === "n") {
			mazeGrid[playerX + 1][playerY] = "p";
			mazeGrid[playerX][playerY] = "n";
			playerX = playerX + 1;
		}
		
		render();
	}
	
	function moveUp() {
		if (mazeGrid[playerX][playerY - 1] === "n") {
			mazeGrid[playerX][playerY - 1] = "p";
			mazeGrid[playerX][playerY] = "n";
			playerY = playerY - 1
		}
		render();
	}
	
	function moveDown() {
		if (mazeGrid[playerX][playerY + 1] === "n") {
			mazeGrid[playerX][playerY + 1] = "p";
			mazeGrid[playerX][playerY] = "n";
			playerY = playerY - 1
		}
		render();
	}
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