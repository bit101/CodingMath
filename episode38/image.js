
window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var points = [],
		sticks = [],
		forms = [],
		images = [],
		bounce = 0.9,
		gravity = 0.5,
		friction = 0.999;

	points.push({
		x: 100,
		y: 100,
		oldx: 100 + Math.random() * 100 - 50,
		oldy: 100 + Math.random() * 100 - 50
	});
	points.push({
		x: 420,
		y: 100,
		oldx: 420,
		oldy: 100
	});
	points.push({
		x: 420,
		y: 340,
		oldx: 420,
		oldy: 340
	});
	points.push({
		x: 100,
		y: 340,
		oldx: 100,
		oldy: 340
	});

	sticks.push({
		p0: points[0],
		p1: points[1],
		length: distance(points[0], points[1]),
		color: "red",
		width: 5
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
	sticks.push({
		p0: points[0],
		p1: points[2],
		length: distance(points[0], points[2]),
		hidden: true
	});

	forms.push({
		path: [
			points[0],
			points[1],
			points[2],
			points[3]
		],
		color: "green"
	});
	images.push({
		path: [
			points[0],
			points[1],
			points[2],
			points[3]
		],
		img: loadImage("cat.jpg")
	});

	function loadImage(url) {
		var img = document.createElement("img");
		img.src = url;
		return img;
	}

	function distance(p0, p1) {
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	update();

	function update() {
		updatePoints();
		for(var i = 0; i < 5; i++) {
			updateSticks();
			constrainPoints();
		}
		context.clearRect(0, 0, width, height);
		// renderPoints();
		// renderSticks();
		// renderForms();
		renderImages();
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
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
			context.beginPath();
			context.arc(p.x, p.y, 5, 0, Math.PI * 2);
			context.fill();
		}
	}

	function renderSticks() {
		for(var i = 0; i < sticks.length; i++) {
			var s = sticks[i];
			if(!s.hidden) {
				context.beginPath();
				context.strokeStyle = s.color ? s.color : "black";
				context.lineWidth = s.width ? s.width : 1;
				context.moveTo(s.p0.x, s.p0.y);
				context.lineTo(s.p1.x, s.p1.y);
				context.stroke();
			}
		}
	}

	function renderForms() {
		for(var i = 0; i < forms.length; i++) {
			var f = forms[i];
			context.beginPath();
			context.fillStyle = f.color;
			context.moveTo(f.path[0].x, f.path[0].y);
			for(var j = 1; j < f.path.length; j++) {
				context.lineTo(f.path[j].x, f.path[j].y);
			}
			context.fill();
		}
	}

	function renderImages() {
		for(var i = 0; i < images.length; i++) {
			var img = images[i];
			if(img.img) {
				context.save();
				context.translate(img.path[0].x, img.path[0].y);

				var w = distance(img.path[1], img.path[0]),
					h = distance(img.path[3], img.path[0]),
					dx = img.path[1].x - img.path[0].x,
					dy = img.path[1].y - img.path[0].y,
					angle = Math.atan2(dy, dx);

				context.rotate(angle);
				context.drawImage(img.img, 0, 0, w, h);
				context.restore();
			}
		}
	}

};