
window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	context.translate(width / 2, height / 2);
	var p0 = {
			x: 0,
			y: -321
		},
		p1 = {
			x: 278,
			y: 160
		},
		p2 = {
			x: -278,
			y: 160
		};

	sierpinski(p0, p1, p2, 8);

	function sierpinski(p0, p1, p2, limit) {
		if(limit > 0) {
			var pA = {
					x: (p0.x + p1.x) / 2,
					y: (p0.y + p1.y) / 2
				},
				pB = {
					x: (p1.x + p2.x) / 2,
					y: (p1.y + p2.y) / 2
				}, 
				pC = {
					x: (p2.x + p0.x) / 2,
					y: (p2.y + p0.y) / 2
				};

			sierpinski(p0, pA, pC, limit - 1);
			sierpinski(pA, p1, pB, limit - 1);
			sierpinski(pC, pB, p2, limit - 1);
		}
		else {
			drawTriangle(p0, p1, p2);
		}
	}

	function drawTriangle(p0, p1, p2) {
		context.beginPath();
		context.moveTo(p0.x, p0.y);
		context.lineTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.fill();
	}

};