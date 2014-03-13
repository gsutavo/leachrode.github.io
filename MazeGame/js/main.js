var cachedData;
var mazeGrid = {};
var playerX, playerY, initPlayerX, initPlayerY;

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
		mazeGrid[x] = {};
		for (var y = 0; y < 20; y++) {
			mazeGrid[x][y] = "w";
		}
	}
	
	mazeGrid[3][5] = "p";
	playerX = 3;
	playerY = 5;
	initPlayerX = 3;
	initPlayerY = 5;
	mazeGrid[4][5] = "n";
	mazeGrid[5][5] = "n";
	mazeGrid[5][6] = "n";
	mazeGrid[5][7] = "n";
	mazeGrid[6][7] = "n";
	mazeGrid[6][8] = "n";
	mazeGrid[7][8] = "g";
	
	cachedData = ctx.getImageData(0, 0, 750, 500);
	render();
}

/**
 * Updates the cached data based on the current formation of the maze and then pushes
 * it to the canvas.
 *
 */
function render() {
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext("2d");

	for (var x = 0; x < 30; x++) {
		for (var y = 0; y < 20; y++) {
			boxFill(x, y, mazeGrid[x][y]);
		}
	}
	
	ctx.putImageData(cachedData, 0, 0);
}

/**
 * Colours a 25 by 25 colour box based on the object contained in that area of the maze.
 *
 */
function boxFill(xCoord, yCoord, letter) {
	for (var x = (25 * xCoord); x < (((xCoord + 1) * 25) - 1); x++) {
		for (var y = (25 * yCoord); y < (((yCoord + 1) * 25) - 1); y++) {
			if (letter === "w") {
				cachedData.data[(((y * 750 * 4) + x * 4) + 0)] = 0;
				cachedData.data[(((y * 750 * 4) + x * 4) + 1)] = 0;
				cachedData.data[(((y * 750 * 4) + x * 4) + 2)] = 0;
				cachedData.data[(((y * 750 * 4) + x * 4) + 3)] = 255;
			} else if (letter === "p") {
				cachedData.data[(((y * 750 * 4) + x * 4) + 0)] = 255;
				cachedData.data[(((y * 750 * 4) + x * 4) + 1)] = 0;
				cachedData.data[(((y * 750 * 4) + x * 4) + 2)] = 0;
				cachedData.data[(((y * 750 * 4) + x * 4) + 3)] = 255;
			} else if (letter === "n") {
				cachedData.data[(((y * 750 * 4) + x * 4) + 0)] = 255;
				cachedData.data[(((y * 750 * 4) + x * 4) + 1)] = 255;
				cachedData.data[(((y * 750 * 4) + x * 4) + 2)] = 255;
				cachedData.data[(((y * 750 * 4) + x * 4) + 3)] = 255;
			} else if (letter === "g") {
				cachedData.data[(((y * 750 * 4) + x * 4) + 0)] = 255;
				cachedData.data[(((y * 750 * 4) + x * 4) + 1)] = 215;
				cachedData.data[(((y * 750 * 4) + x * 4) + 2)] = 0;
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

/**
 * Processes the content of the submit button
 *
 */
function clickSubmit(event) {
	var command = document.getElementById("commandString");
	var inputString = command.value;
	command.value = "";
	
	var counter = 0;
	var steps = inputString.length;
	processNext();
	
	function processNext() {	
		if (inputString[counter] === "L") {
			moveLeft();
		} else if (inputString[counter] === "R") {
			moveRight();
		} else if (inputString[counter] === "U") {
			moveUp();
		} else if (inputString[counter] === "D") {
			moveDown();
		}
		counter++;
		if (counter < steps) {
			setTimeout(processNext, 300);
		} else {
			setTimeout(function() {
				mazeGrid[playerX][playerY] = "n";
				
				playerX = initPlayerX;
				playerY = initPlayerY;
				
				mazeGrid[playerX][playerY] = "p";
				
				render();
			}, 5000);
		}
	}
	
	function moveLeft() {
		if (mazeGrid[playerX - 1][playerY] === "n") {
			mazeGrid[playerX - 1][playerY] = "p";
			mazeGrid[playerX][playerY] = "n";
			playerX = playerX - 1;
		} else if (mazeGrid[playerX - 1][playerY] === "g") {
			alert("You win!");
		}
		render();
	}
	
	function moveRight() {
		if (mazeGrid[playerX + 1][playerY] === "n") {
			mazeGrid[playerX + 1][playerY] = "p";
			mazeGrid[playerX][playerY] = "n";
			playerX = playerX + 1;
		} else if (mazeGrid[playerX + 1][playerY] === "g") {
			alert("You win!");
		}
		render();
	}
	
	function moveUp() {
		if (mazeGrid[playerX][playerY - 1] === "n") {
			mazeGrid[playerX][playerY - 1] = "p";
			mazeGrid[playerX][playerY] = "n";
			playerY = playerY - 1
		} else if (mazeGrid[playerX][playerY - 1] === "g") {
			alert("You win!");
		}
		render();
	}
	
	function moveDown() {
		if (mazeGrid[playerX][playerY + 1] === "n") {
			mazeGrid[playerX][playerY + 1] = "p";
			mazeGrid[playerX][playerY] = "n";
			playerY = playerY + 1
		} else if (mazeGrid[playerX][playerY + 1] === "g") {
			alert("You win!");
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