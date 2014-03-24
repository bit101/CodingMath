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
		t = 0,
		direction = 0.01,
		pFinal = {};


	draw();

	function draw() {
		context.clearRect(0, 0, width, height);

		context.beginPath();
		context.moveTo(p0.x, p0.y);
		context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
		context.stroke();

		utils.cubicBezier(p0, p1, p2, p3, t, pFinal);
		context.beginPath();
		context.arc(pFinal.x, pFinal.y, 10, 0, Math.PI * 2, false);
		context.fill();

		t += direction;
		if(t > 1 || t < 0) {
			direction = -direction;
		}

		requestAnimationFrame(draw);
	}
};