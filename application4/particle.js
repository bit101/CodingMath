var particle = {
	x: 0,
	y: 0,
	vx: 0, 
	vy: 0,
	mass: 1,
	radius: 0,
	bounce: -1,
	friction: 1,
	gravity: 0,

	create: function(x, y, speed, direction, grav) {
		console.log("x: ", x);
		var obj = Object.create(this);
		this.x = x;
		this.y = y;
		this.vx = Math.cos(direction) * speed;
		this.vy = Math.sin(direction) * speed;
		obj.gravity = grav || 0;
		return obj;
	},

	accelerate: function(ax, ay) {
		this.vx += ax;
		this.vy += ay;
	},

	update: function() {
		this.vx *= this.friction;
		this.vy *= this.friction;
		this.vy += this.gravity;
		this.x += this.vx;
		this.y += this.vy;
	},

	angleTo: function(p2) {
		return Math.atan2(p2.y - this.y, p2.x - this.x);
	},

	distanceTo: function(p2) {
		var dx = p2.x - this.x,
			dy = p2.y - this.y;

		return Math.sqrt(dx * dx + dy * dy);
	},

	gravitateTo: function(p2) {
		var dx = this.x - p2.x,
			dy = this.y - p2.y,
			distSQ = dx * dx + dy * dy,
			distance = Math.sqrt(distSQ),
			force = p2.mass / distSQ,
			ax = dx / distance * force,
			ay = dy / distance * force;

		this.vx += ax;
		this.vy += ay;
	}
};