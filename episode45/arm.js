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
		return this.x + Math.cos(this.angle) * this.length;
	},

	getEndY: function() {
		return this.y + Math.sin(this.angle) * this.length;
	},

	render: function(context) {
		context.strokeStyle = "#000000";
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.getEndX(), this.getEndY());
		context.stroke();
	},

	pointAt: function(x, y) {
		var dx = x - this.x,
			dy = y - this.y;
		this.angle = Math.atan2(dy, dx);
	},

	drag: function(x, y) {
		this.pointAt(x, y);
		this.x = x - Math.cos(this.angle) * this.length;
		this.y = y - Math.sin(this.angle) * this.length;
		if(this.parent) {
			this.parent.drag(this.x, this.y);
		}
	}


};