
window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var points = [],
		sticks = [],
		bounce = 0.9,
		gravity = 0.5,
		friction = 0.999;

	points.push({
		x: 100,
		y: 100,
		oldx: 100 + Math.random() * 30 - 15,
		oldy: 100 + Math.random() * 30 - 15
	});
	points.push({
		x: 200,
		y: 100,
		oldx: 200,
		oldy: 100
	});
	points.push({
		x: 200,
		y: 200,
		oldx: 200,
		oldy: 200
	});
	points.push({
		x: 100,
		y: 200,
		oldx: 100,
		oldy: 200
	});

	sticks.push({
		p0: points[0],
		p1: points[1],
		length: distance(points[0], points[1])
	});
	sticks.push({
		p0: points[1],
		p1: points[2],
		length: distance(points[1], points[2])
	});
	sticks.push({
		p0: points[2],
		p1: points[3],
		length: distance(points[2], points[3])
	});
	sticks.push({
		p0: points[3],
		p1: points[0],
		length: distance(points[3], points[0])
	});
	// sticks.push({
	// 	p0: points[0],
	// 	p1: points[2],
	// 	length: distance(points[0], points[2])
	// });

	function distance(p0, p1) {
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	update();

	function update() {
		updatePoints();
			constrainPoints();
		// for(var i = 0; i < 5; i++) {
			updateSticks();
		// }
		renderPoints();
		renderSticks();
		requestAnimationFrame(update);
	}

	function updatePoints() {
		for(var i = 0; i < points.length; i++) {
			var p = points[i],
				vx = (p.x - p.oldx) * friction;
				vy = (p.y - p.oldy) * friction;

			p.oldx = p.x;
			p.oldy = p.y;
			p.x += vx;
			p.y += vy;
			p.y += gravity;
		}
	}

	function constrainPoints() {
		for(var i = 0; i < points.length; i++) {
			var p = points[i],
				vx = (p.x - p.oldx) * friction;
				vy = (p.y - p.oldy) * friction;

			if(p.x > width) {
				p.x = width;
				p.oldx = p.x + vx * bounce;
			}
			else if(p.x < 0) {
				p.x = 0;
				p.oldx = p.x + vx * bounce;
			}
			if(p.y > height) {
				p.y = height;
				p.oldy = p.y + vy * bounce;
			}
			else if(p.y < 0) {
				p.y = 0;
				p.oldy = p.y + vy * bounce;
			}
		}
	}

	function updateSticks() {
		for(var i = 0; i < sticks.length; i++) {
			var s = sticks[i],
				dx = s.p1.x - s.p0.x,
				dy = s.p1.y - s.p0.y,
				distance = Math.sqrt(dx * dx + dy * dy),
				difference = s.length - distance,
				percent = difference / distance / 2,
				offsetX = dx * percent,
				offsetY = dy * percent;

			s.p0.x -= offsetX;
			s.p0.y -= offsetY;
			s.p1.x += offsetX;
			s.p1.y += offsetY;
		}
	}

	function renderPoints() {
		context.clearRect(0, 0, width, height);
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
			context.beginPath();
			context.arc(p.x, p.y, 5, 0, Math.PI * 2);
			context.fill();
		}
	}

	function renderSticks() {
		context.beginPath();
		for(var i = 0; i < sticks.length; i++) {
			var s = sticks[i];
			context.moveTo(s.p0.x, s.p0.y);
			context.lineTo(s.p1.x, s.p1.y);
		}
		context.stroke();
	}
};