
window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var branchAngleA = randomRange(0, -Math.PI / 2);

	tree(width / 2 - 75, height, 150, 0, 12);

	function randomRange(min, max) {
		return min + Math.random() * (max - min);
	}

	function tree(x, y, size, angle, limit) {
		context.save();
		context.translate(x, y);
		context.rotate(angle);
		context.fillRect(0, 0, size, -size);

		// left branch
		var x0 = 0,
			y0 = -size,
			size0 = Math.abs(Math.cos(branchAngleA) * size),
			angle0 = branchAngleA;

		if(limit > 0) {
			tree(x0, y0, size0, angle0, limit - 1);
		}
		else {
			context.save();
			context.translate(x0, y0);
			context.rotate(angle0);
			context.fillRect(0, 0, size0, -size0);
			context.restore();
		}

		// right branch
		var x1 = x0 + Math.cos(angle0) * size0,
			y1 = y0 + Math.sin(angle0) * size0,
			size1 = Math.abs(Math.sin(branchAngleA) * size)
			angle1 = angle0 + Math.PI / 2;

		if(limit > 0) {
			tree(x1, y1, size1, angle1, limit - 1);
		}
		else {
			context.save();
			context.translate(x1, y1);
			context.rotate(angle1);
			context.fillRect(0, 0, size1, -size1);
			context.restore();
		}


		context.restore();
	}
};