const CARD_ICONS = ['⚡', '🔥', '🎮', '🚀', '💎', '🎨', '🍕', '🎧'];
const TOTAL_PAIRS = CARD_ICONS.length;

let cardsArray = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

let timerInterval = null;
let secondsStarted = 0;
let isGameStarted = false;
let isBoardLocked = false;

let gameBoard = null;

let gameContainer = document.querySelector('.game-container');
let movesDisplay = document.getElementById("moves-count");
let timerDisplay = document.getElementById("timer");
let matchesDisplay = document.getElementById("matches-count");
let restartBtn = document.getElementById("restart-btn");

let winModal = document.getElementById("win-modal");
let finalMoves = document.getElementById("final-moves");
let finalTimer = document.getElementById('final-time');
let playAgainBtn = document.getElementById("play-again-btn");

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length; i > 0; i--) {
        const j = Math.floor((Math.random) * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function initGame(){
    matchedPairs = 0;
    moves = 0;
    secondsStarted = 0;
    isBoardLocked = false;
    isGameStarted = false;
    flippedCards = [];

    stopTimer();
    timerDisplay.textContent = '00:00';
    movesDisplay.textContent = '0';
    matchesDisplay.textContent = '0';
    winModal.classList.add('hidden');


    const pairedIcons = [...CARD_ICONS,...CARD_ICONS]
    cardsArray = shuffle(pairedIcons);

    createAndRenderBoard();
}