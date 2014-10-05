window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,

		target = {
			x: width,
			y: Math.random() * height
		},

		position = {
			x: 0,
			y: Math.random() * height
		},

		ease = 0.1,
		easing = true;

	update();

	document.body.addEventListener("click", function(event) {
		target.x = event.clientX;
		target.y = event.clientY;
		if(!easing) {
			easing = true;
			update();
		}
	});

	function update() {
		context.clearRect(0, 0, width, height);

		context.beginPath();
		context.arc(position.x, position.y, 10, 0, Math.PI * 2, false);
		context.fill();

		easing = easeTo(position, target, ease);

		if(easing) {
			requestAnimationFrame(update);
		}
	}

	function easeTo(position, target, ease) {
		var dx = target.x - position.x,
			dy = target.y - position.y;
		position.x += dx * ease;
		position.y += dy * ease;
		if(Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
			position.x = target.x;
			position.y = target.y;
			console.log("stop");
			return false;
		}
		return true;
	}

};