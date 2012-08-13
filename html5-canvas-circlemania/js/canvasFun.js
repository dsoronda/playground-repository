(function() {

	var $ = document.querySelectorAll.bind(document),
		$canvas = $("canvas")[0],
		context = $canvas.getContext("2d"),
		TwoPI = Math.PI * 2,
		canvasWidth = $canvas.width,
		halfSize = canvasWidth / 2,
		quoterSize = canvasWidth / 4, 
		circles = [];
		
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();		
	
	function randomizeColor() {
		var r = Math.random() * 255,
			g = Math.random() * 255,
			b = Math.random() * 255,
			builder = [ 'rgb(', ~~r + ',', ~~g + ',', ~~b + ')' ];
		return builder.join(' ');
	}
	
	function Circle(x, y, r, color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color || randomizeColor();
		this.drawn = false;
	}
	
	Circle.prototype.isPointInsideCircle = function(x, y) {
		var vecX = this.x - x, vecY = this.y - y,
			length = Math.sqrt(vecX * vecX + vecY * vecY);
		return length <= this.r;
	};
	
	Circle.prototype.draw = function() {
		if (!this.drawn) {
			context.fillStyle = this.color;
			context.beginPath();
			context.arc(this.x, this.y, this.r, 0, TwoPI, true); 
			context.closePath();
			context.fill();
			this.drawn = true;
		}
	};
	
	Circle.prototype.invalidateCircleArea = function() {
		var fi = 2 * this.r;
		context.clearRect(this.x - this.r, this.y - this.r, fi, fi);
	};
	
	function firstStep() {
		circles.push(new Circle(quoterSize, quoterSize, quoterSize));
		circles.push(new Circle(quoterSize + halfSize, quoterSize, quoterSize));
		circles.push(new Circle(quoterSize, quoterSize + halfSize, quoterSize));
		circles.push(new Circle(quoterSize + halfSize, quoterSize + halfSize, quoterSize));
	}
	
	function calculateNewCircles(e) {
		circles.forEach(function(element, index) { 
			if (element.isPointInsideCircle(e.offsetX, e.offsetY)) {
					var collidedCircle = circles[index], 
						newRadius = collidedCircle.r / 2,
						left = collidedCircle.x - newRadius, right = collidedCircle.x + newRadius,
						bottom = collidedCircle.y + newRadius, top = collidedCircle.y - newRadius;		
				
					circles.push(new Circle(left, top, newRadius));
					circles.push(new Circle(right, top, newRadius));
					circles.push(new Circle(left, bottom, newRadius));
					circles.push(new Circle(right, bottom, newRadius));
				
					collidedCircle.invalidateCircleArea();
					circles.splice(index, 1); 
			}
		});
	}
	
	function render() {
		window.requestAnimFrame(render, $canvas);
		circles.forEach(function(element) { element.draw(); });
	}	

	$canvas.addEventListener('mousemove', calculateNewCircles);
	
	firstStep();
	render();
}());