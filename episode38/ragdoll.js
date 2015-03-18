
window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
		var count = 0;

	var points = [],
		sticks = [];
		gravity = 0.25,
		bounce = 0.9,
		friction = 0.999;

	points.push({
		x: 90,
		y: 100,
		oldx: 90 + Math.random() * 20 - 10,
		oldy: 100
	});
	points.push({
		x: 210,
		y: 100,
		oldx: 210,
		oldy: 100
	});
	points.push({
		x: 200,
		y: 300,
		oldx: 200,
		oldy: 300
	});
	points.push({
		x: 100,
		y: 300,
		oldx: 100,
		oldy: 300
	});
	// arms
	points.push({
		x: 10,
		y: 170,
		oldx: 10,
		oldy: 170
	});
	points.push({
		x: 290,
		y: 170,
		oldx: 290,
		oldy: 170
	});
	// legs
	points.push({
		x: 70,
		y: 400,
		oldx: 70,
		oldy: 400
	});
	points.push({
		x: 230,
		y: 400,
		oldx: 230,
		oldy: 400
	});
	// hands
	points.push({
		x: 10,
		y: 230,
		oldx: 10,
		oldy: 230
	});
	points.push({
		x: 290,
		y: 230,
		oldx: 290,
		oldy: 230
	});

	sticks.push({
		p0: points[0],
		p1: points[1],
		length: distance(points[0], points[1]),
		visible: true
	});
	sticks.push({
		p0: points[1],
		p1: points[2],
		length: distance(points[1], points[2]),
		visible: true
	});
	sticks.push({
		p0: points[2],
		p1: points[3],
		length: distance(points[2], points[3]),
		visible: true
	});
	sticks.push({
		p0: points[3],
		p1: points[0],
		length: distance(points[3], points[0]),
		visible: true
	});
	sticks.push({
		p0: points[0],
		p1: points[2],
		length: distance(points[0], points[2]),
		visible: false
	});
	// arms
	sticks.push({
		p0: points[0],
		p1: points[4],
		length: distance(points[0], points[4]),
		visible: true
	});
	// sticks.push({
	// 	p0: points[4],
	// 	p1: points[1],
	// 	length: distance(points[4], points[1]),
	// 	visible: false
	// });
	sticks.push({
		p0: points[1],
		p1: points[5],
		length: distance(points[1], points[5]),
		visible: true
	});
	// sticks.push({
	// 	p0: points[5],
	// 	p1: points[0],
	// 	length: distance(points[5], points[0]),
	// 	visible: false
	// });
	// legs
	sticks.push({
		p0: points[3],
		p1: points[6],
		length: distance(points[3], points[6]),
		visible: true
	});
	sticks.push({
		p0: points[6],
		p1: points[2],
		length: distance(points[6], points[2]),
		visible: false
	});
	sticks.push({
		p0: points[2],
		p1: points[7],
		length: distance(points[2], points[7]),
		visible: true
	});
	sticks.push({
		p0: points[7],
		p1: points[3],
		length: distance(points[7], points[3]),
		visible: false
	});
	// arms
	sticks.push({
		p0: points[4],
		p1: points[8],
		length: distance(points[4], points[8]),
		visible: true
	});
	sticks.push({
		p0: points[5],
		p1: points[9],
		length: distance(points[5], points[9]),
		visible: true
	});


	function distance(p0, p1) {
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y;
		return Math.sqrt(dx * dx + dy * dy);
	}


	update();

	function update() {
		updatePoints();

		for(var i = 0; i < 3; i++) {
			updateSticks();
			constrainPoints();
		}
		render();
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
			var p = points[i];
			if(p.x > width) {
				p.x = width;
				p.oldx = p.x + (p.x - p.oldx) * bounce;
			}
			else if(p.x < 0) {
				p.x = 0;
				p.oldx = p.x + (p.x - p.oldx) * bounce;
			}
			if(p.y > height) {
				p.y = height;
				p.oldy = p.y + (p.y - p.oldy) * bounce;
			}
			if(p.y < 0) {
				p.y = 0;
				p.oldy = p.y + (p.y - p.oldy) * bounce;
			}
		}
	}

	function updateSticks() {
		for(var i = 0; i < sticks.length; i++) {
			var s = sticks[i],
				dx = s.p1.x - s.p0.x,
				dy = s.p1.y - s.p0.y,
				dist = Math.sqrt(dx * dx + dy * dy);
				ratio = s.length / dist,
				midx = s.p0.x + dx / 2,
				midy = s.p0.y + dy / 2,
				offsetx = dx / 2 * ratio,
				offsety = dy / 2 * ratio;

			s.p0.x = midx - offsetx;
			s.p0.y = midy - offsety;
			s.p1.x = midx + offsetx;
			s.p1.y = midy + offsety;
		}
	}

	function render() {
		context.clearRect(0, 0, width, height);
		context.beginPath();
		for(var i = 0; i < sticks.length; i++) {
			var s = sticks[i];
			if(s.visible) {
				context.moveTo(s.p0.x, s.p0.y);
				context.lineTo(s.p1.x, s.p1.y);
			}
		}
		context.stroke(); 
	}

};