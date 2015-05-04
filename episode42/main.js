window.onload = function() {
	var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	characterCanvas = document.getElementById("characterCanvas"),
	characterContext = characterCanvas.getContext("2d"),
	width = canvas.width = characterCanvas.width = window.innerWidth,
	height = canvas.height = characterCanvas.height = window.innerHeight,
	tileWidth = 60,
	tileHeight = 30,
	charX = 0.5,
	charY = 9.5;

	context.translate(width / 2, 50);
	characterContext.translate(width / 2, 50);

	var grid = [
		[15, 15, 15, 14, 13, 10, 3, 2, 1, 0],
		[15, 15, 14, 13, 10, 10, 3, 2, 1, 0],
		[15, 14, 13, 10, 10, 3, 3, 2, 1, 0],
		[14, 13, 10, 9, 3, 3, 2, 1, 0, 0],
		[13, 10, 9, 7, 3, 2, 1, 0, 0, 0],
		[10, 9, 7, 6, 3, 2, 1, 0, 0, 0],
		[9, 7, 6, 5, 3, 2, 1, 1, 1, 1],
		[7, 6, 5, 3, 3, 2, 2, 2, 2, 2],
		[6, 5, 5, 3, 3, 3, 3, 3, 3, 3],
		[5, 5, 5, 5, 5, 5, 5, 5, 5, 3]
	];

	var img = document.createElement("img");
	img.addEventListener("load", function() {
		draw();
	});
	img.src = "tileset.png";

	var character = document.createElement("img");
	character.addEventListener("load", function() {
		drawCharacter(character, charX, charY);
		document.body.addEventListener("keydown", moveCharacter);
	});
	character.src = "ball.png";

	function drawCharacter(image, x, y) {
		characterContext.clearRect(-width / 2, -50, width, height);
		characterContext.save();
		characterContext.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);  

		characterContext.drawImage(image, -image.width / 2, -image.height);

		characterContext.restore();		
	}

	function moveCharacter(event) {
		switch(event.keyCode) {
			case 37: // left
				if(canMove(charX - 1, charY)) {
					charX--;
					drawCharacter(character, charX, charY);
				}
				break;
			case 38: // up
				if(canMove(charX, charY - 1)) {
					charY--;
					drawCharacter(character, charX, charY);
				}
				break;
			case 39: // right
				if(canMove(charX + 1, charY)) {
					charX++;
					drawCharacter(character, charX, charY);
				}
				break;
			case 40: // down
				if(canMove(charX, charY + 1)) {
					charY++;
					drawCharacter(character, charX, charY);
				}
				break;

		}
	}

	function canMove(x, y) {
		x = Math.floor(x);
		y = Math.floor(y);
		if(y < 0 || y >= grid.length) {
			return false;
		}
		if(x < 0 || x >= grid[y].length) {
			return false;
		}
		var tile = grid[y][x];
		if(tile < 4 || tile > 14) {
			return false;
		}
		return true;
	}

	function draw() {
		for(var y = 0; y < grid.length; y++) {
			var row = grid[y];
			for(var x = 0; x < row.length; x++) {
				drawImageTile(x, y, row[x]);
			}
		}
	}

	function drawImageTile(x, y, index) {
		context.save();
		context.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2 - 11 + (index < 4 ? 5 : 0));  

		context.drawImage(img, index * tileWidth, 0, tileWidth, img.height,
			-tileWidth / 2, 0, tileWidth, img.height);
		
		context.restore();
	}

	function drawBlock(x, y, z) {
		var top = "#eeeeee",
			right = "#cccccc",
			left = "#999999";

		context.save();
		context.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);

		// draw top
		context.beginPath();
		context.moveTo(0, -z * tileHeight);
		context.lineTo(tileWidth / 2, tileHeight / 2 - z * tileHeight);
		context.lineTo(0, tileHeight - z * tileHeight);
		context.lineTo(-tileWidth / 2, tileHeight / 2 - z * tileHeight);
		context.closePath();
		context.fillStyle = top;
		context.fill();

		// draw left
		context.beginPath();
		context.moveTo(-tileWidth / 2, tileHeight / 2 - z * tileHeight);
		context.lineTo(0, tileHeight - z * tileHeight);
		context.lineTo(0, tileHeight);
		context.lineTo(-tileWidth / 2, tileHeight / 2);
		context.closePath();
		context.fillStyle = left;
		context.fill();

		// // draw right
		context.beginPath();
		context.moveTo(tileWidth / 2, tileHeight / 2 - z * tileHeight);
		context.lineTo(0, tileHeight - z * tileHeight);
		context.lineTo(0, tileHeight);
		context.lineTo(tileWidth / 2, tileHeight / 2);
		context.closePath();
		context.fillStyle = right;
		context.fill();


		context.restore();		
	}

	function randomColor() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return "rgb(" + r + "," + g + "," + b + ")";
	}	


	function drawTile(x, y, color) {
		context.save();
		context.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);

		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(tileWidth / 2, tileHeight / 2);
		context.lineTo(0, tileHeight);
		context.lineTo(-tileWidth / 2, tileHeight / 2);
		context.closePath();
		context.fillStyle = color;
		context.fill();

		context.restore();
	}
}