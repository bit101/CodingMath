window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		p0 = {
			x: 100,
			y: 500
		},
		p1 = {
			x: 600,
			y: 200
		},
		pA = {},
		t = 0;

	context.scale(1.5, 1.5);
	context.font = "16px Arial";
	draw();

	document.body.addEventListener("click", function() {
		draw();
	});

	function draw() {
		context.clearRect(0, 0, width, height);

		context.beginPath();
		context.arc(p0.x, p0.y, 4, 0, Math.PI * 2, false);
		context.fill();
		
		context.beginPath();
		context.arc(p1.x, p1.y, 4, 0, Math.PI * 2, false);
		context.fill();

		pA.x = utils.lerp(t, p0.x, p1.x);
		pA.y = utils.lerp(t, p0.y, p1.y);
		
		context.beginPath();
		context.arc(pA.x, pA.y, 4, 0, Math.PI * 2, false);
		context.fill();

		context.beginPath();
		context.moveTo(p0.x, p0.y);
		context.lineTo(pA.x, pA.y);
		context.stroke();

		labelPointLeft(p0, "p0");
		labelPointLeft(p1, "p1	");
		labelPoint(pA, "pA");
		labelT();

		t += .1;
		t = Math.min(t, 1);

	}

	function labelPoint(p, name) {
		context.fillText(name, p.x + 10, p.y + 10);
		context.fillText("x: " + Math.round(p.x), p.x + 10, p.y + 25);
		context.fillText("y: " + Math.round(p.y), p.x + 10, p.y + 40);
	}

	function labelPointLeft(p, name) {
		context.fillText(name, p.x - 40, p.y - 40);
		context.fillText("x: " + Math.round(p.x), p.x - 40, p.y - 25);
		context.fillText("y: " + Math.round(p.y), p.x - 40, p.y - 10);
	}

	function labelT() {
		context.fillText("t = " + utils.roundToPlaces(t, 1), 200, 250);
	}

};