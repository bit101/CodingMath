var vector = {
	_x: 1,
	_y: 0,

	create: function(x, y) {
		var obj = Object.create(this);
		obj.setX(x);
		obj.setY(y);
		return obj;
	},

	setX: function(value) {
		this._x = value;
	},

	getX: function() {
		return this._x;
	},

	setY: function(value) {
		this._y = value;
	},

	getY: function() {
		return this._y;
	},

	setAngle: function(angle) {
		var length = this.getLength();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getAngle: function() {
		return Math.atan2(this._y, this._x);
	},

	setLength: function(length) {
		var angle = this.getAngle();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getLength: function() {
		return Math.sqrt(this._x * this._x + this._y * this._y);
	},

	add: function(v2) {
		return vector.create(this._x + v2.getX(), this._y + v2.getY());
	},

	subtract: function(v2) {
		return vector.create(this._x - v2.getX(), this._y - v2.getY());
	},

	multiply: function(val) {
		return vector.create(this._x * val, this._y * val);
	},

	divide: function(val) {
		return vector.create(this._x / val, this._y / val);
	},

	addTo: function(v2) {
		this._x += v2.getX();
		this._y += v2.getY();
	},

	subtractFrom: function(v2) {
		this._x -= v2.getX();
		this._y -= v2.getY();
	},

	multiplyBy: function(val) {
		this._x *= val;
		this._y *= val;
	},

	divideBy: function(val) {
		this._x /= val;
		this._y /= val;
	},
	
	drawLineVector: function(context,x,y,scale,color,thickness){    /* This function draws a line vector, whose length is proportional to its magnitude of the invoking vector */
		var unit_vector = vector.create(1,0)                        /* It Takes canvas context, x,y coordinates, scale, color and thickness as inputs */
		unit_vector.setAngle(this.getAngle());                      /* Git Username: ckiran2508 */
		unit_vector.setX(scale*this.getX());
		unit_vector.setY(scale*this.getY());
		let head_x=x+unit_vector.getX()
		let head_y=y+unit_vector.getY()
		context.beginPath();
		context.moveTo(x,y);
		context.lineTo(head_x,head_y);
		context.strokeStyle = color;
		context.lineWidth=thickness;
		context.stroke();
		context.closePath();
		context.strokeStyle = "black";
	},

	drawArrowVector: function(context,x,y,scale,color,thickness){  /* This function draws a line vector with arrow head at its tip, whose length is proportional to its magnitude of the invoking vector */
		if(this.getLength() > 0){                                  /* It Takes canvas context, x,y coordinates, scale, color and thickness as inputs */
			this.drawLineVector(context,x,y,scale,color,thickness)
			let head_x = x+ (this.getX() * scale)
			let head_y = y+ (this.getY() * scale)
			let top_vector = vector.create(7,0)
			top_vector.setAngle(this.getAngle() - 2.35) 
			let bottom_vector = vector.create(7,0)
			bottom_vector.setAngle(this.getAngle() + 2.35)    
			top_vector.drawLineVector(context,head_x,head_y,1,color,thickness)
			bottom_vector.drawLineVector(context,head_x,head_y,1,color,thickness)
			}
	}

};