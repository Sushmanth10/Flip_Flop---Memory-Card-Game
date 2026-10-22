const CARD_ICONS = ['⚡', '🔥'];
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

const gameContainer = document.querySelector('.game-container');
const movesDisplay = document.getElementById("moves-count");
const timerDisplay = document.getElementById("timer");
const matchesDisplay = document.getElementById("matches-count");
const restartBtn = document.getElementById("restart-btn");

const winModal = document.getElementById("win-modal");
const finalMoves = document.getElementById("final-moves");
const finalTimer = document.getElementById('final-time');
const playAgainBtn = document.getElementById("play-again-btn");

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function initGame() {
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


    const pairedIcons = [...CARD_ICONS, ...CARD_ICONS]
    cardsArray = shuffle(pairedIcons);

    createAndRenderBoard();
}

function createAndRenderBoard() {
    if (gameBoard) {
        gameBoard.remove();
    }
    gameBoard = document.createElement('main');
    gameBoard.classList = 'grid-container';

    cardsArray.forEach((icon, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;
        card.dataset.icon = icon;

        card.innerHTML = `
        <div class="card-inner">
        <div class="card-front">❓</div>
        <div class="card-back">${icon}</div>
        </div>`
        gameBoard.appendChild(card)
    })
    gameBoard.addEventListener("click", handleCardClick);
    gameContainer.appendChild(gameBoard);
}

function handleCardClick(event) {
    const clickedCard = event.target.closest(".card");

    if (!clickedCard) return;
    if (isBoardLocked) return;
    if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) return;

    if (!isGameStarted) {
        startTimer();
        isGameStarted = true;
    }

    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    if (flippedCards.length == 2) {
        IncrementMoves();
        ChechForMatch();
    }
}

function ChechForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.icon === card2.dataset.icon;

    if (isMatch) {
        handleMatch(card1, card2)
    } else {
        handleMisMatch(card1, card2)
    }
}

function handleMatch(card1, card2) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;
    matchesDisplay.textContent = matchedPairs;
    flippedCards = [];
    if (matchedPairs === TOTAL_PAIRS) {
        handleWin();
    }
}

function handleMisMatch(card1, card2) {
    isBoardLocked = true;

    setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
        isBoardLocked = false;
    }, 500);
}

function IncrementMoves() {
    moves++;
    movesDisplay.textContent = moves;
}

function startTimer() {
    timerInterval = setInterval(() => {
        secondsStarted++;
        const minutes = Math.floor(secondsStarted / 60);
        const seconds = secondsStarted % 60;
        timerDisplay.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
    }, 1000);
}

function stopTimer(){
    clearInterval(timerInterval);
}

function handleWin() {
    stopTimer();
    setTimeout(() => {
        finalMoves.textContent = moves;
        finalTimer.textContent = timerDisplay.textContent;
        winModal.classList.remove('hidden')
    }, 500)
}

restartBtn.addEventListener('click',initGame);
playAgainBtn.addEventListener('click',initGame); 
initGame();