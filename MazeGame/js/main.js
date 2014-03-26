var cachedData;
var mazeGrid = {};
var playerX, playerY, initPlayerX, initPlayerY;
var numberLevel = 1;

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
	
	var leftButton = document.getElementById("left");
	leftButton.addEventListener("click", clickLeft);
	
	var rightButton = document.getElementById("right");
	rightButton.addEventListener("click", clickRight);
	
	var upButton = document.getElementById("up");
	upButton.addEventListener("click", clickUp);
	
	var downButton = document.getElementById("down");
	downButton.addEventListener("click", clickDown);
	
	var forLeftButton = document.getElementById("forleft");
	forLeftButton.addEventListener("click", clickForLeft);
	
	var forRightButton = document.getElementById("forright");
	forRightButton.addEventListener("click", clickForRight);
	
	var forUpButton = document.getElementById("forup");
	forUpButton.addEventListener("click", clickForUp);
	
	var forDownButton = document.getElementById("fordown");
	forDownButton.addEventListener("click", clickForDown);
	
	var submitButton = document.getElementById("submit");
	submitButton.addEventListener("click", clickSubmit);
	
	var stopForButton = document.getElementById("stopForButton");
	stopForButton.addEventListener("click", clickStopFor);

	
	updateGrid(1);
	cachedData = ctx.getImageData(0, 0, 750, 500);
	render();
}

/**
* Updates the MazeGrid, Player position and Player initial position.
* Used when the level is clear. Receives a Level Clear boolean.
*
*/

function updateGrid(levelClear){
	if(levelClear > 0){
		for (var x = 0; x < 30; x++) {
		mazeGrid[x] = {};
		for (var y = 0; y < 20; y++) {
			mazeGrid[x][y] = "w";
			}
		}
		if(numberLevel == 1){
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
		}
		if(numberLevel == 2){
			readStageFile();
			/*
			mazeGrid[5][5] = "p";
			playerX = 5;
			playerY = 5;
			initPlayerX = 5;
			initPlayerY = 5;
			mazeGrid[4][5] = "n";
			mazeGrid[3][5] = "n";
			mazeGrid[2][5] = "n";
			mazeGrid[2][6] = "n";
			mazeGrid[2][7] = "n";
			mazeGrid[2][8] = "n";
			mazeGrid[1][8] = "g";			
			*/
		}
		
	}
	
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
 * Called on clicking the stop for button on the input panel
 *
 */
function clickStopFor(event) {
	var command = document.getElementById("commandString");
	var numTimes = document.getElementById("forNum");
	var forCommand = document.getElementById("forInstr");
	if(!(isNaN(numTimes.value))) {
		var number = numTimes.value;
		command.value = command.value + number;
		command.value = command.value + forCommand.value;
		command.value = command.value + "*";
		forCommand.value = "";
		numTimes.value = "";
	} else {
		numTimes.value = "That's not a number";
	}
}
 
/**
 * Processes the content of the submit button
 *
 */
function clickSubmit(event) {
	var command = document.getElementById("commandString");
	var inputString = command.value;
	command.value = "";
	var commandString = "";
	
	for (var x = 0; x < inputString.length; x++) {
		if (!(isNaN(inputString[x]))) {
			var ast = findMatchAst(inputString, x + 1);
			inputString = inputString.substring(0, x) + copy(inputString.substring(x + 1, ast), inputString[x]) + inputString.substring(ast + 1);
			x++
		}
	}
	
	function copy(input, num) {
		var output = "";
		
		for (var x = 0; x < num; x++) {
			output = output + input;
		}
		
		return output;
	}
	
	function findMatchAst (searchString, start) {
		var numToSkip = 0;
		
		for (var x = start; x < searchString.length; x++) {
			if (!(isNaN(searchString[x]))) {
				numToSkip++;
			} else if (searchString[x] === "*") {
				if (numToSkip === 0) {
					return x;
				} else {
					numToSkip--;
				}
			}
		}
	}
	
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
			//Just for testing purposes
			numberLevel++;
			updateGrid(1);
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

function clickForLeft(event) {
	var command = document.getElementById("forInstr");
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

function clickForRight(event) {
	var command = document.getElementById("forInstr");
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

function clickForUp(event) {
	var command = document.getElementById("forInstr");
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

function clickForDown(event) {
	var command = document.getElementById("forInstr");
	command.value = command.value + "D";
}

/*
* Read file based on function taken from: 
* http://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html#fbid=Xyk8F7-GRic
* 
*/
function readStageFile() {

    var f = target.files[0]; 
     if (!f) {
        alert("Failed to load stage file");
    } else if (!file.type.match('stage1.txt')) {
		for(var i = 0; !file.type.match('stage1.txt'); i++){
		 f = target.files[i];	
		}
    } else {
      var r = new FileReader();

      r.onload = function(e) { 
	      var contents = e.target.result;
	for (var x = 0; x < 30; x++) {
		for (var y = 0; y < 20; y++) {
			mazeGrid[x][y] = contents.substr((x*30)+y,1);
		}
       }
      r.readAsText(f);
  }
