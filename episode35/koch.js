
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
	context.translate(width / 2, height / 2);

	koch(p0, p1, 5);
	koch(p1, p2, 5);
	koch(p2, p0, 5);

	function koch(p0, p1, limit) {
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y,
			dist = Math.sqrt(dx * dx + dy * dy),
			unit = dist / 3,
			angle = Math.atan2(dy, dx),
			pA = {
				x: p0.x + dx / 3,
				y: p0.y + dy / 3
			},
			pC = {
				x: p1.x - dx / 3,
				y: p1.y - dy / 3
			},
			pB = {
				x: pA.x + Math.cos(angle - Math.PI / 3) * unit,
				y: pA.y + Math.sin(angle - Math.PI / 3) * unit
			};

		if(limit > 0) {
			koch(p0, pA, limit - 1);
			koch(pA, pB, limit - 1);
			koch(pB, pC, limit - 1);
			koch(pC, p1, limit - 1);
		}
		else {
			context.beginPath();
			context.moveTo(p0.x, p0.y);
			context.lineTo(pA.x, pA.y);
			context.lineTo(pB.x, pB.y);
			context.lineTo(pC.x, pC.y);
			context.lineTo(p1.x, p1.y);
			context.stroke();
		}
	}

};