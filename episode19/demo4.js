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
			x: 100,
			y: 300
		},
		p2 = {
			x: 1000,
			y: 400
		},
		pA = {},
		pB = {},
		pFinal = {},
		t = 0,
		maxT = 0;

	context.scale(1.5, 1.5);
	context.font = "16px Arial";
	draw();

	document.body.addEventListener("click", function() {
		draw();
	});

	function draw() {
		context.clearRect(0, 0, width, height);

		context.strokeStyle = "#ccc";
		context.beginPath();
		context.moveTo(p0.x, p0.y);
		context.lineTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.stroke();

		context.beginPath();
		context.arc(p0.x, p0.y, 4, 0, Math.PI * 2, false);
		context.fill();
		
		context.beginPath();
		context.arc(p1.x, p1.y, 4, 0, Math.PI * 2, false);
		context.fill();

		context.beginPath();
		context.arc(p2.x, p2.y, 4, 0, Math.PI * 2, false);
		context.fill();


		context.strokeStyle = "red";
		context.beginPath();
		context.moveTo(p0.x, p0.y);

		for(t = 0; t <= maxT; t += .1) {
			pA.x = utils.lerp(t, p0.x, p1.x);
			pA.y = utils.lerp(t, p0.y, p1.y);
		
			pB.x = utils.lerp(t, p1.x, p2.x);
			pB.y = utils.lerp(t, p1.y, p2.y);

			pFinal.x = utils.lerp(t, pA.x, pB.x);
			pFinal.y = utils.lerp(t, pA.y, pB.y);
		
			context.lineTo(pFinal.x, pFinal.y);
		}
		context.stroke();

		context.beginPath();
		context.strokeStyle = "gray";
		context.moveTo(pA.x, pA.y);
		context.lineTo(pB.x, pB.y);
		context.stroke();

		context.beginPath();
		context.arc(pA.x, pA.y, 4, 0, Math.PI * 2, false);
		context.fill();

		context.beginPath();
		context.arc(pB.x, pB.y, 4, 0, Math.PI * 2, false);
		context.fill();

		context.fillStyle = "red";
		context.beginPath();
		context.arc(pFinal.x, pFinal.y, 4, 0, Math.PI * 2, false);
		context.fill();
		context.fillStyle = "black";



		// labelPointLeft(p0, "p0");
		// labelPointLeft(p1, "p1");
		// labelPointLeft(p2, "p2");
		// labelPoint(pA, "pA");
		// labelPoint(pB, "pB");
		labelT();

		maxT += .1;
		maxT = Math.min(t, 1);

	}

	function labelPoint(p, name) {
		context.fillStyle = "black";
		context.fillText(name, p.x + 10, p.y + 10);
		context.fillText("x: " + Math.round(p.x), p.x + 10, p.y + 25);
		context.fillText("y: " + Math.round(p.y), p.x + 10, p.y + 40);
	}

	function labelPointLeft(p, name) {
		context.fillStyle = "gray";
		context.fillText(name, p.x - 40, p.y - 40);
		context.fillText("x: " + Math.round(p.x), p.x - 40, p.y - 25);
		context.fillText("y: " + Math.round(p.y), p.x - 40, p.y - 10);
	}

	function labelT() {
		context.fillText("t = " + utils.roundToPlaces(maxT, 1), 200, 250);
	}

};