 function setup() {
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx = gameCanvas.getContext("2d");

	gameCanvas.width = 750;
	gameCanvas.height = 500;
	
	var cachedData = ctx.getImageData(0, 0, 750, 500);
	
	for (var x = 0; x < cachedData.data.length / 4; x++) {
		cachedData.data[x*4] = 255;
		cachedData.data[x*4+1] = 0;
		cachedData.data[x*4+2] = 0;
		cachedData.data[x*4+3] = 255;
	}
	
	ctx.putImageData(cachedData, 0, 0);
	
	var testData = ctx.getImageData(0, 0, 750, 500);
	var x;
 }