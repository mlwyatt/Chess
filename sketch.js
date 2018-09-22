var b;
function setup() {
	b = new Board();
	var c = createCanvas(900,900);
	c.parent('sketch');
	background(153);
}

function draw() {
  translate(width/2,height/2);
  rotate(-Math.PI/2);
  translate(-width/2,-height/2);
  // translate(0,height);
  translate(50,50);
	b.show();
  // b.tiles[0][0].show();
	frameRate(10);
}