
window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var p0 = {
			x: width / 2,
			y: height - 50
		},
		p1 = {
			x: width / 2,
			y: 50
		},
		branchAngleA,
		branchAngleB,
		trunkRatio = 0.35,
		tA = Math.PI,
		tAS = 0.01,
		tB = 0,
		tBS = 0.01437;


	function randomRange(min, max) {
		return min + Math.random() * (max - min);
	}


	draw();

	function draw() {
		context.clearRect(0, 0, width, height);
		branchAngleA = Math.cos(tA += tAS) * Math.PI / 2;
		branchAngleB = Math.cos(tB += tBS) * Math.PI / 2;

		tree(p0, p1, 8);
		requestAnimationFrame(draw);
	}

	function tree(p0, p1, limit) {
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y,
			dist = Math.sqrt(dx * dx + dy * dy),
			angle = Math.atan2(dy, dx),
			branchLength = dist * (1 - trunkRatio),
			pA = {
				x: p0.x + dx * trunkRatio,
				y: p0.y + dy * trunkRatio
			},
			pB = {
				x: pA.x + Math.cos(angle + branchAngleA) * branchLength,
				y: pA.y + Math.sin(angle + branchAngleA) * branchLength,
			},
			pC = {
				x: pA.x + Math.cos(angle + branchAngleB) * branchLength,
				y: pA.y + Math.sin(angle + branchAngleB) * branchLength,
			};

		context.beginPath();
		context.moveTo(p0.x, p0.y);
		context.lineTo(pA.x, pA.y);
		context.stroke();

		if(limit > 0) {
			tree(pA, pC, limit - 1);
			tree(pA, pB, limit - 1);
		}
		else {
			context.beginPath();
			context.moveTo(pB.x, pB.y);
			context.lineTo(pA.x, pA.y);
			context.lineTo(pC.x, pC.y);
			context.stroke();
		}
	}
};