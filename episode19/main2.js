window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		p0 = {
			x: utils.randomRange(0, width),
			y: utils.randomRange(0, height)
		},
		p1 = {
			x: utils.randomRange(0, width),
			y: utils.randomRange(0, height)
		},
		p2 = {
			x: utils.randomRange(0, width),
			y: utils.randomRange(0, height)
		},
		p3 = {
			x: utils.randomRange(0, width),
			y: utils.randomRange(0, height)
		},
		maxT = 0,
		pFinal = {};


	draw();

	function draw() {
		context.clearRect(0, 0, width, height);
		context.beginPath();
		context.moveTo(p0.x, p0.y);
		for(var t = 0; t <= maxT; t += 0.01) {
			utils.cubicBezier(p0, p1, p2, p3, t, pFinal);
			context.lineTo(pFinal.x, pFinal.y);
		}
		context.stroke();
		maxT += 0.01;
		if(maxT > 1) {
			maxT = 0;
		}

		requestAnimationFrame(draw);
	}
};