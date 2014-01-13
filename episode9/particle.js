var particle = {
	position: null,
	velocity: null,
	gravity: null,

	create: function(x, y, speed, direction, grav) {
		var obj = Object.create(this);
		obj.position = vector.create(x, y);
		obj.velocity = vector.create(0, 0);
		obj.velocity.setLength(speed);
		obj.velocity.setAngle(direction);
		obj.gravity = vector.create(0, grav || 0);
		return obj;
	},

	accelerate: function(accel) {
		this.velocity.addTo(accel);
	},

	update: function() {
		this.velocity.addTo(this.gravity);
		this.position.addTo(this.velocity);
	}
};