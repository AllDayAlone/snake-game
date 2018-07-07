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
let velocity;
let snake;
let fruit;
let dir;
let lost;

function setup() {
  createCanvas(ww, wh);
  noStroke();
  createDiv("Press 'R' to restart");
  startGame();
}

function draw() {
	if (lost) {
        background('black');
        return;
	}
	
	frameRate(velocity);	
	drawField();
	
	fill(51);	
	snake.forEach(({x, y}) => rect(x, y, pixelSize, pixelSize));
	
	fill('red');
	rect(fruit.x, fruit.y, 10, 10);	
	
	move();

	if (snake[0].x === fruit.x && snake[0].y === fruit.y) {
		velocity += 1;
		generateFruit();
		snake.push(Object.assign(fruit, {}));
    }

    checkIntersection();
}

function generateFruit() {
    fruit = {};
	fruit.x = floor(random(10, ww / 10)) * 10;
	fruit.y = floor(random(10, wh / 10)) * 10;
	for (let el of snake) {
		if (el.x === fruit.x && el.y === fruit.y) {
			generateFruit();
			break;
		}
	}
}


function startGame() {
    lost = 0;
    dir = 'n';
    velocity = 10;
    generateSnake(initialLength);  
    generateFruit();
}

function generateSnake(len) {
    snake = [];
    for (let i = 0; i < len; i++) {
        snake.push({ x: ww/2, y: wh/2 + pixelSize * i });
      }
}

function drawField() {
    background(220, 230, 240);
    fill('grey');
    for (let j = 0; j < wh; j += 10) {
        rect(0, j, 10, 10);
        rect(ww - 10, j, 10, 10);
    }
    for (let i = 0; i < ww; i += 10) {
        rect(i, 0, 10, 10);
        rect(i, wh - 10, 10, 10);
    }    
}


function move() {
	let last = snake[snake.length - 1];
	snake = snake.map((el, ind) => ind === 0 
		? moveHead(snake[0], cardinalDirections[dir])
		: snake[ind - 1]
	);
}

function moveHead({ x, y }, { dirX, dirY }) {
	return  { x: x + dirX, y: y + dirY };
}

function checkIntersection() {
	if (snake[0].x <= 0) lost = 1;
	if (snake[0].x >= ww) lost = 1;
	if (snake[0].y <= 0) lost = 1;
    if (snake[0].y >= wh) lost = 1;
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            lost = 1;
        }
    }
    
}

function keyPressed() {
	switch(keyCode) {
		case 37:
			if (dir !== 'e') { dir = 'w'; }
			break;
        case 38:
            if (dir !== 's') { dir = 'n'; }
			break;
        case 39:
            if (dir !== 'w') { dir = 'e'; }
			break;
        case 40:
            if (dir !== 'n') { dir = 's'; }
            break;
        case 82:
            startGame();
            break;
	}
}