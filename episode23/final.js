window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		fl = 300,
		cards = [],
		numCards = 200,
		centerZ = 1000,
		baseAngle = 0,
		rotationSpeed = 0.01;


	for(var i = 0; i < numCards; i += 1) {
		var card = {
			angle: utils.randomRange(0, Math.PI * 2),
			radius: utils.randomRange(100, 1100),
			y: utils.randomRange(2000, -2000)
		};
		card.x = Math.cos(card.angle + baseAngle) * card.radius;
		card.z = centerZ + Math.sin(card.angle + baseAngle) * card.radius;
		cards.push(card);
	}

	context.translate(width / 2, height / 2);
	context.fillStyle = "white";

	document.body.addEventListener("mousemove", function(event) {
		rotationSpeed = (event.clientX - width / 2) * 0.00005;
		ypos = (event.clientY - height / 2) * 2;
	});

	update();

	function update() {
		baseAngle += rotationSpeed;
		cards.sort(zsort);
		context.clearRect(-width / 2, -height / 2, width, height);
		for(var i = 0; i < numCards; i += 1) {
			var card = cards[i],
				perspective = fl / (fl + card.z);

			context.save();
			context.scale(perspective, perspective);
			context.translate(card.x, card.y);
			context.globalAlpha = utils.map(card.y, 2000, -2000, 1, 0);

			context.beginPath();
			context.arc(0, 0, 40, 0, Math.PI * 2, false);
			context.fill();

			context.restore();

			card.x = Math.cos(card.angle + baseAngle) * card.radius;
			card.z = centerZ + Math.sin(card.angle + baseAngle) * card.radius;
			card.y -= 10;

			if(card.y < -2000) {
				card.y = 2000;
			}
		}
		requestAnimationFrame(update);
	}

	function zsort(cardA, cardB) {
		return cardB.z - cardA.z;
	}
};