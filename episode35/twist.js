
window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;



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
	var a = 0,
		b = 0,
		r = 0,
		tx, ty;

	draw();
	function draw() {
		context.clearRect(0, 0, width, height);
		context.save();
		context.translate(width / 2, height / 2);
		context.rotate(r += 0.01);
		tx = .5 + Math.sin(a += .045) * .25;
		ty = .5 + Math.sin(b += .045) * .25;
		sierpinski(p0, p1, p2, 7);
		context.restore();
		requestAnimationFrame(draw);
	}

	function sierpinski(p0, p1, p2, limit) {
		if(limit > 0) {
			var pA = {
				x: p0.x + (p1.x - p0.x) * tx,
				y: p0.y + (p1.y - p0.y) * ty
			},
			pB = {
				x: p1.x + (p2.x - p1.x) * tx,
				y: p1.y + (p2.y - p1.y) * ty
			},
			pC = {
				x: p2.x + (p0.x - p2.x) * tx,
				y: p2.y + (p0.y - p2.y) * ty
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