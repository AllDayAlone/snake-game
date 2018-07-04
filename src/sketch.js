const initialLength = 10; 
const ww = 600;
const wh = 400;
const pixelSize = 10;
const cardinalDirections = {
	n: { dirX: 0, dirY: -pixelSize },
	e: { dirX: pixelSize, dirY: 0 },
	s: { dirX: 0, dirY: pixelSize },
	w: { dirX: -pixelSize, dirY: 0 },
}

let head = { x: ww/2, y: wh/2 };
let velocity = 10;
let snake = [];
let dir = 'e';


function setup() {
  createCanvas(ww, wh);
  background(220, 230, 240);
  for (let i = 0; i < initialLength; i++) {
    snake.push({ x: ww/2, y: wh/2 + pixelSize * i });
  }
}

function draw() {
	frameRate(velocity);
	background(220, 230, 240);
	noStroke();
	fill(51);	
	snake.forEach(({x, y}) => rect(x, y, pixelSize, pixelSize));
	move();
	velocity += 1;
}

function move() {
	let last = snake[snake.length - 1];
	snake = snake.map((el, ind) => ind === 0 
		? moveHead(snake[0], cardinalDirections[dir])
		: snake[ind - 1]
	);
	if (random() < 0.3) snake.push(last);
}

function moveHead({ x, y }, { dirX, dirY }) {
	let head = { x: x + dirX, y: y + dirY };
	if (head.x < 0) head.x = ww;
	if (head.x > ww) head.x = 0;
	if (head.y < 0) head.y = wh;
	if (head.y > wh) head.y = 0;

	return head;
}

function keyPressed() {
	console.log(keyCode);
	switch(keyCode) {
		case 37:
			dir = 'w';
			break;
		case 38:
			dir = 'n';
			break;
		case 39:
			dir = 'e';
			break;
		case 40:
			dir = 's';
			break;
	}
}