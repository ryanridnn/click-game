// Elements that needed

const startLayer = document.querySelector('.start-layer')
const startBtn = document.querySelector('.start-game-btn');
const topBar = document.querySelector('.topbar');
const main = document.querySelector('.main');
const preparation = document.querySelector('.preparation-layer');
const end = document.querySelector('.end-layer');
const endScore = end.querySelector('.score');
const restartBtn = end.querySelector('.btn');

// variable that store the score of the player
let score = 0;

// required for the loop in startGame function, check it below
let circles = 0;


// Randomize the amout of the circle that will be created
const minCircle = 40; // you can change this if you want to
const maxCircle = 80; // you can also change this

// variable that store the amount of the circle that will be created
const randomNumber = randomizeNumber(minCircle, maxCircle);

const interval = 500; // the interval between circles to be created

let circlesTime = 1000; // to adjust the time when the circle should be appeared

// Event listeners

// start button listener to start the game
startBtn.addEventListener('click', startGame);

// restart button listener to restart the game
restartBtn.addEventListener('click', restartGame);



// To start the game

function startGame(){
	startLayer.classList.add('hide');
	prepare();
	setScore();
	setTimeout(() => {
		while(circles < randomNumber){
			timeout();
			circles++;
		}
		endTheGame();
	}, circlesTime)
}

// to restart the game

function restartGame(){
	circles = 0;
	circlesTime = 1000;
	score = 0;
	end.classList.add('hide');
	startGame();
}

// show the preparation screen

function prepare(){
	const {
		firstElementChild: ready,
		lastElementChild : go
	} = preparation;

	preparation.classList.remove('hide');
	setTimeout(() => ready.classList.remove('hide'), 500);
	setTimeout(() => {
		ready.classList.add('hide')
		go.classList.remove('hide')
	}, 1000);
	setTimeout(() => go.classList.add('hide'), 1500);
	setTimeout(() => preparation.classList.add('hide'), 1500);
}

// set the score in the topbar and make it dynamic and increase as the player click it

function setScore(){
	topBar.textContent = 'Score = ' + score;
}

// create a circle and also call some functions to randomize the color, randomize the horizontal position, and move it to bottom

function createCircle(){

	const circle = document.createElement('div');
	circle.classList.add('circle');

	const item = document.createElement('div');
	item.classList.add('item');

	circle.append(item);
	main.append(circle);

	return moveCircle(...randomizePosition(randomizeColor(circle)));
}

// function that return a random number that provided based on the given minimal and maksimal value

function randomizeNumber(minTime, maxTime){
	return Math.floor(Math.random() * (maxTime - minTime)) + minTime;
}

// randomize the color of the circle

function randomizeColor(element){
	const child = element.firstElementChild;
	const colors = ['#ff763f', '#3fc6ff', '#fff43f', '#3fff61', '#ff3ff9'];
	const color = colors[Math.floor(Math.random() * colors.length)];

	child.style.backgroundColor = color;
	
	element.addEventListener('mouseenter', function () {
		child.style.backgroundColor = '#ff3f3f';
	})

	element.addEventListener('mouseleave', function () {
		child.style.backgroundColor = color;
	})

	element.addEventListener('click', function () {
		score++;
		setScore();
		element.style.display = 'none';
	})

	return element;
}

// randomize the horizontal position

function randomizePosition(element){
	const maxHorizontalPos = main.offsetWidth - 150;

	let horizontalPos = Math.floor(Math.random() * maxHorizontalPos);

	if(horizontalPos < 0 ){
		horizontalPos = -10;
	}

	element.style.transform = `translate(${horizontalPos}px, -50px)`;

	return [element, horizontalPos];
}

// move the circle to bottom

function moveCircle(element, horizontalPos){
	const maxVerticalPos = main.offsetHeight;

	const minTime = 500;
	const maxTime = 2000;
	const randomTime = randomizeNumber(minTime, maxTime);

	element.style.transition = `transform ${randomTime}ms linear`;
	element.style.transform = `translate(${horizontalPos}px, ${maxVerticalPos}px)`;

	return randomTime;
}


// important function that adjust when the circle should be appeared 

function timeout(){
	setTimeout(() => {
		done = createCircle();
	}, circlesTime);
	circlesTime += interval;
}

// to end the game when there is no more circle left

function endTheGame(){
	setTimeout(() => showEnd(), circlesTime + 4000);
}

// show the result screen

function showEnd(){
	end.classList.remove('hide');
	endScore.textContent = 'Your score is ' + score;
	topBar.innerHTML = '';
}
