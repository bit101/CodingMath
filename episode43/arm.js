var Arm = Arm || {
	x: 0,
	y: 0,
	length: 100,
	angle: 0,
	parent: null,

	create: function(x, y, length, angle) {
		var obj = Object.create(this);
		obj.init(x, y, length, angle);
		return obj;
	},

	init: function(x, y, length, angle) {
		this.x = x;
		this.y = y;
		this.length = length;
		this.angle = angle;
	},

	getEndX: function() {
		var angle = this.angle,
			parent = this.parent;
		while(parent) {
			angle += parent.angle;
			parent = parent.parent;
		}
		return this.x + Math.cos(angle) * this.length;
	},

	getEndY: function() {
		var angle = this.angle,
			parent = this.parent;
		while(parent) {
			angle += parent.angle;
			parent = parent.parent;
		}
		return this.y + Math.sin(angle) * this.length;
	},

	render: function(context) {
		context.strokeStyle = "#000000";
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.getEndX(), this.getEndY());
		context.stroke();
	}


};