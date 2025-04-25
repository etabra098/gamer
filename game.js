// Game Variables
const shapes = ['circle', 'square', 'triangle', 'star', 'heart', 'hexagon'];
let selectedShapes = [];
let matchedPairs = 0;
let gameStarted = false;
let timer;
let timeLeft = 60;
let score = 0;

// DOM Elements
const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

// Initialize Game
function initGame() {
    gameStarted = true;
    matchedPairs = 0;
    score = 0;
    timeLeft = 60;
    gameBoard.innerHTML = '';
    messageDisplay.textContent = 'Find matching shapes!';
    updateScore();
    startTimer();

    // Create pairs of shapes
    const gameShapes = [...shapes, ...shapes];
    gameShapes.sort(() => Math.random() - 0.5); // Shuffle

    // Create cards
    gameShapes.forEach((shape, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.shape = shape;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip Card on Click
function flipCard() {
    if (!gameStarted || selectedShapes.length === 2 || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.innerHTML = `<div class="shape ${this.dataset.shape}"></div>`;
    selectedShapes.push(this);

    if (selectedShapes.length === 2) {
        checkMatch();
    }
}

// Check if Shapes Match
function checkMatch() {
    const [card1, card2] = selectedShapes;
    const shape1 = card1.dataset.shape;
    const shape2 = card2.dataset.shape;

    if (shape1 === shape2) {
        matchedPairs++;
        score += 10;
        updateScore();
        selectedShapes = [];
        
        if (matchedPairs === shapes.length) {
            endGame(true);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '';
            card2.innerHTML = '';
            selectedShapes = [];
        }, 1000);
    }
}

// Timer Function
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

// Update Score
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// End Game
function endGame(isWin) {
    clearInterval(timer);
    gameStarted = false;
    
    if (isWin) {
        messageDisplay.textContent = `🎉 You Win! Final Score: ${score}`;
    } else {
        messageDisplay.textContent = `⏰ Time's Up! Try again!`;
    }
}

// Start Button Event
startButton.addEventListener('click', initGame);