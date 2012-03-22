function Triangle(a, b, c) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.slopeAB = Math.abs((a[1] - b[1]) / (a[0] - b[0]));
	this.slopeAC = Math.abs((a[1] - c[1]) / (a[0] - c[0]));
	this.slopeBC = Math.abs((b[1] - c[1]) / (b[0] - c[0]));
};

Triangle.prototype.contains = function (x0, y0) {
	var x1 = this.a[0], x2 = this.b[0], x3 = this.c[0],
	    y1 = this.a[1], y2 = this.b[1], y3 = this.c[1],
	    b0 = 0, b1 = 0, b2 = 0, b3 = 0;
	
	b0 =  (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
	b1 = ((x2 - x0) * (y3 - y0) - (x3 - x0) * (y2 - y0)) / b0 ;
	b2 = ((x3 - x0) * (y1 - y0) - (x1 - x0) * (y3 - y0)) / b0;
	b3 = ((x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0)) / b0;
	return b1 > 0 && b2 > 0 && b3 > 0;
};