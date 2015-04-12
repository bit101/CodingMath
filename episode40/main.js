
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
		branchAngleA = randomRange(-Math.PI / 2, Math.PI / 2),
		branchAngleB = randomRange(-Math.PI / 2, Math.PI / 2),
		trunkRatio = randomRange(0.25, 0.75);

	function randomRange(min, max) {
		return min + Math.random() * (max - min);
	}

	tree(p0, p1, 8);

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
		branchAngleA += randomRange(-0.02, 0.02);
		branchAngleB += randomRange(-0.02, 0.02);
		trunkRatio += randomRange(-0.02, 0.02);
	}
};