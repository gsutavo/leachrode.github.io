var globBackImg = new Image();
globBackImg.src = "img/mazegameui.png";

/**
 * Called onload by the body of the html document. Initialises the size of the canvas, draws the initial
 * image and adds EventListeners.
 */
function setup() {	
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext("2d");
	var backgroundImg = globBackImg;

	document.getElementById("gameCanvas").width = 750;
	document.getElementById("gameCanvas").height = 500;
	
	ctx.drawImage(backgroundImg, 0, 0);
	gameCanvas.addEventListener("mousedown", feedback);
}

/**
 * Called on mousedown on the game canvas.
 *
*/
function feedback() {

}