var globBackImg = new Image();
globBackImg.src = "img/lighthouse.png";
var curColour, curCustomColour;
var cachedImageData, pixels;

/**
 * Called onload by the body of the html document. Initialises the size of the canvas, draws the initial
 * image and adds EventListeners to the colour selector and canvas.
 */
function setup() {
	var colourPicker = document.getElementById("colourPicker");

	colourPicker.addEventListener("change", pickCustomColor);
	
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext("2d");
	var backgroundImg = globBackImg;

	document.getElementById("gameCanvas").width = 500;
	document.getElementById("gameCanvas").height = 650;
	
	ctx.drawImage(backgroundImg, 0, 0);
	gameCanvas.addEventListener("mousedown", feedback);
	ctx.font = "35px Arial";
	ctx.strokeText("Colour the lighthouse", 10, 32);
	
	curColour = [86, 199, 184];
	
	cachedImageData = ctx.getImageData(0, 0, gameCanvas.width, gameCanvas.height);
}

function getR(x, y) {
	return cachedImageData.data[(((y * 500 * 4) + x * 4) + 0)];
}

function setR(x, y, newR) {
	cachedImageData.data[(((y * 500 * 4) + x * 4) + 0)] = newR;
}

function getG(x, y) {
	return cachedImageData.data[(((y * 500 * 4) + x * 4) + 1)];
}

function setG(x, y, newG) {
	cachedImageData.data[(((y * 500 * 4) + x * 4) + 1)] = newG;
}

function getB(x, y) {
	return cachedImageData.data[(((y * 500 * 4) + x * 4) + 2)];
}

function setB(x, y, newB) {
	cachedImageData.data[(((y * 500 * 4) + x * 4) + 2)] = newB;
}

/**
 * Called when a touch is detected. Determines whether it is a colour selection, a colour application, or
 * whether it should be ignored because it is in the uncolourable banner at the top
 */
function feedback(event) {
	var x = event.offsetX;
	var y = event.offsetY;
	
	if (y < 550 && !(y < 48 && x < 345)) {
		fastFlood(x, y, curColour);
	} else {
		pickUpColor(x,y, curColour);
	}
}

function clickTest(x, y, colour) {
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext("2d");

	cachedImageData.data[(((y * 500 * 4) + x * 4) + 0)] = colour[0];
	cachedImageData.data[(((y * 500 * 4) + x * 4) + 1)] = colour[1];
	cachedImageData.data[(((y * 500 * 4) + x * 4) + 2)] = colour[2];
	
	var check = cachedImageData;
	
	ctx.putImageData(cachedImageData, 0, 0);
}

/**
 * The main method to flood the chosen colour from a given point outwards until it meets a black edge.
 * Rather than doing this recursively (to avoid risk of stack overflow), this makes use of a queue. The point
 * where the flood begins is pushed to the queue then the front item is pulled from the queue until the queue
 * is empty. For each item, the pixels to the left and right of it are coloured until walls are reached, then
 * sufficient points on the row above and below to ensure the whole area is filled are pushed to the queue.
 *
 * This method (using a flood algorithm in general) is a little slow for a couple of the larger areas of the
 * picture but it extensible, any picture could be loaded in instead of the lighthouse drawing and it
 * would still work just as well. It also creates some fuzziness around the areas where paint decided to
 * use anti-aliasing but that's a graphical issue (those edges could be cleaned up in Photoshop relatively
 * easily).
 */
 function fastFlood(x, y, colour) {
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext("2d");
	var startData = [getR(x,y), getG(x,y), getB(x,y)];
	var pixW = [];
	var	pixE = [];
	var curPix;
	var Q = [];
	
	if (!(startData[0] === curColour[0] && startData[1] === curColour[1] && startData[2] === curColour[2])) {
		if (!(startData[0] === 0 && startData[1] === 0 && startData[2] === 0)) {
			Q.push([x,y]);
			
			while (Q.length) {
				curPix = Q.shift();
				pixW[0] = curPix[0] - 1;
				pixW[1] = curPix[1];
				pixE[0] = curPix[0];
				pixE[1] = curPix[1];
				
				var lookAbove = true;
				var lookBelow = true;
				
				while (isSameColorAsData(pixW[0], pixW[1], startData) && pixW[0] > 0 && pixW[0] < 500
				&& pixW[1] > 0 && pixW[1] < 650) {
					if (lookAbove){
						if (isSameColorAsData(pixW[0], pixW[1]-1, startData)) {
							Q.push([pixW[0], pixW[1] - 1]);
							lookAbove = false;
						}
					} else {
						if (!isSameColorAsData(pixW[0], pixW[1] - 1, startData)) {
							lookAbove = true;
						}
					}
					
					if (lookBelow){
						if (isSameColorAsData(pixW[0], pixW[1]+1, startData)) {
							Q.push([pixW[0], pixW[1] + 1]);
							lookBelow = false;
						}
					} else {
						if (!isSameColorAsData(pixW[0], pixW[1] + 1, startData)) {
							lookBelow = true;
						}
					}
					
					setR(pixW[0], pixW[1], curColour[0]);
					setG(pixW[0], pixW[1], curColour[1]);
					setB(pixW[0], pixW[1], curColour[2]);
					
					pixW[0] = pixW[0] - 1;
				}
				
				while (isSameColorAsData(pixE[0], pixE[1], startData) && pixE[0] > 0 && pixE[0] < 500
				&& pixE[1] > 0 && pixE[1] < 650) {
					if (lookAbove){
						if (isSameColorAsData(pixE[0], pixE[1] - 1, startData)) {
							Q.push([pixE[0], pixE[1] - 1]);
							lookAbove = false;
						}
					} else {
						if (!isSameColorAsData(pixE[0], pixE[1] - 1, startData)) {
							lookAbove = true;
						}
					}
					
					if (lookBelow){
						if (isSameColorAsData(pixE[0], pixE[1] + 1, startData)) {
							Q.push([pixE[0], pixE[1] + 1]);
							lookBelow = false;
						}
					} else {
						if (!isSameColor(pixE[0], pixE[1] + 1, startData)) {
							lookBelow = true;
						}
					}
					
					setR(pixE[0], pixE[1], curColour[0]);
					setG(pixE[0], pixE[1], curColour[1]);
					setB(pixE[0], pixE[1], curColour[2]);
					
					pixE[0] = pixE[0] + 1;
				}
			}
		}
	}
 
	ctx.putImageData(cachedImageData, 0, 0);
 }

/**
 * Called when a change is detected in the colour input below the canvas. Sets the current colour to the
 * rgb value of the hex colour currently in the input, then fills the custom colour button with that colour
 * (this takes two floods, one inside the star and one for the remainder of the button). The only colour
 * you cannot select is black as this breaks the flooding implementation (slowly turns the whole screen
 * into one single block)
 */
function pickCustomColor() {
	var colourPicker = document.getElementById("colourPicker");	
	var red = hexToRgb(colourPicker.value).r;
	var green = hexToRgb(colourPicker.value).g;
	var blue = hexToRgb(colourPicker.value).b;
	
	if (!(red === 0 && green === 0 && blue === 0)) {
		curColour = [red, green, blue];
		fastflood(420, 620, curColour);
		fastflood(400, 580, curColour);
	}
}

/**
 * Converts a hex colour to it's constituent red, green and blue values (this code was taken from a stack
 * overflow discussion because I'm lazy, I could have created it myself but it seemed slightly unnecessary
 * when it wasn't part of the requirements for this task)
 */
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/**
 * Called when the player selects a colour at the bottom of the canvas. The current colour is set to that
 * colour so they can paint with it. The slightly odd checks about whether or not the selected colour is
 * white are to prevent the user from picking the colour of the white background by accident. If I was
 * doing this with nice graphics (and was going to put a texture across the background rather than white)
 * I would instead check whether the press was inside one of the predefined buttons but as putting a
 * background texture on is outside the remit of this task I decided to go with the lazy-but effective
 * approach
 */
function pickUpColor(x, y) {
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext("2d");
	var newColour = ctx.getImageData(x, y, 1, 1);

	if (newColour.data[0] === 255 && newColour.data[1] === 255 && newColour.data[2] === 255) {
		var testColour = ctx.getImageData(420, 620);
		if (testColour.data[0] === 255 && testColour.data[1] === 255 && testColour.data[2] === 255) {
			curColour=[newColour.data[0],newColour.data[1],newColour.data[2]];
		}
	} else {
		curColour=[newColour.data[0],newColour.data[1],newColour.data[2]];
	}
}

/**
 * Checks that two pixels on the screen are the same colour. Used multiple times in the fast flood method to
 * check whether or not it should continue to progress in a given direction
 */
function isSameColor(pixOneX, pixOneY, pixTwoX, pixTwoY) {
	var pixelDataOne = [getR(pixOneX,pixOneY), getG(pixOneX,pixOneX), getB(pixOneX,pixOneX)];
	var pixelDataTwo = [getR(pixTwoX,pixTwoY), getG(pixTwoX,pixTwoX), getB(pixTwoX,pixTwoX)];
	
	if (pixelDataOne[0] === pixelDataTwo[0]) {
		if (pixelDataOne[1] === pixelDataTwo[1]) {
			if (pixelDataOne[2] === pixelDataTwo[2]) {
				return true;
			}
		}
	}
	
	return false;
}

function isSameColorAsData(pixOneX, pixOneY, compData) {
	var pixelDataOne = [getR(pixOneX,pixOneY), getG(pixOneX,pixOneY), getB(pixOneX,pixOneY)];
	
	if (pixelDataOne[0] === compData[0]) {
		if (pixelDataOne[1] === compData[1]) {
			if (pixelDataOne[2] === compData[2]) {
				return true;
			}
		}
	}
	
	return false;
}	