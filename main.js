const startBtn = document.querySelector('.start-game-btn');
const topBar = document.querySelector('.topbar');
const main = document.querySelector('.main');
const preparation = document.querySelector('.preparation-layer');
const end = document.querySelector('.end-layer');
const endScore = end.querySelector('.score');
const restartBtn = end.querySelector('.btn');

let score = 0;

let time = 0;
let circles = 0;
let leftTime = 0;

let done = 0;

const minCircle = 40;
const maxCircle = 80;
const randomNumber = randomizeNumber(minCircle, maxCircle);

const interval = 500;

let circlesTime = 1000;

console.log(leftTime);
console.log(circlesTime);

startBtn.addEventListener('click', hideStartLayer);
restartBtn.addEventListener('click', restartGame);

function hideStartLayer(){
	this.parentElement.classList.add('hide');
	setScore();
	startGame();
}

function setScore(){
	topBar.textContent = 'Score = ' + score;
}

function startGame(){
	setScore();
	prepare();
	setTimeout(() => {
		while(circles < randomNumber){
			timeout();
			circles++;
		}
		endTheGame();
	}, circlesTime)
}

function restartGame(){
	circles = 0;
	circlesTime = 1000;
	score = 0;
	end.classList.add('hide');
	startGame();
}

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

function createCircle(){

	const circle = document.createElement('div');
	circle.classList.add('circle');

	const item = document.createElement('div');
	item.classList.add('item');

	circle.append(item);
	main.append(circle);

	return moveCircle(...randomizePosition(randomizeColor(circle)));
}


function randomizePosition(element){
	const maxHorizontalPos = main.offsetWidth - 150;

	let horizontalPos = Math.floor(Math.random() * maxHorizontalPos);

	if(horizontalPos < 0 ){
		horizontalPos = -10;
	}

	element.style.transform = `translate(${horizontalPos}px, -50px)`;

	return [element, horizontalPos];
}

function randomizeColor(element){
	const child = element.firstElementChild;
	const colors = ['blue', 'orange', 'yellow', 'green', 'salmon'];
	const color = colors[Math.floor(Math.random() * colors.length)];

	child.style.backgroundColor = color;
	
	element.addEventListener('mouseenter', function () {
		child.style.backgroundColor = 'red';
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

function randomizeNumber(minTime, maxTime){
	return Math.floor(Math.random() * (maxTime - minTime)) + minTime;
}

function moveCircle(element, horizontalPos){
	const maxVerticalPos = main.offsetHeight;

	const minTime = 500;
	const maxTime = 2000;
	const randomTime = randomizeNumber(minTime, maxTime);

	element.style.transition = `transform ${randomTime}ms linear`;
	element.style.transform = `translate(${horizontalPos}px, ${maxVerticalPos}px)`;

	return randomTime;
}


function timeout(){
	setTimeout(() => {
		done = createCircle();
	}, circlesTime);
	circlesTime += interval;
}

function endTheGame(){
	setTimeout(() => showEnd(), circlesTime + 4000);
}

function showEnd(){
	end.classList.remove('hide');
	endScore.textContent = 'Your score is ' + score;
	topBar.innerHTML = '';
}
