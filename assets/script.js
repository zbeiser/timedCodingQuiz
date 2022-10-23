// Declare variables: DOM hooks

var startGameButtonEl = document.querySelector("#startGameButton");
var startGameEl = document.querySelector(".startGame");
var submitInitialsButtonEl = document.querySelector("#gameEnd_submit_intials");
var restartGameButtonEl = document.querySelector("#highScores_restart");
var clearScoresButtonEl = document.querySelector("#highScores_clearScores");
var timerLeftEl = document.querySelector("#timeLeft");
var timerEl = document.querySelector(".gameBoard_timer");
var gameBoardEl = document.querySelector(".gameBoard");
var gameEndEl = document.querySelector(".gameEnd");
var highScoresEl = document.querySelector(".highScores");

// Declare variables: state

var score = 0;
var timer = null;
var timeLeft = 0;
var currentQuestionIndex = null;
var currentGuess = null;

// Declare variables: constants

var kDuration = 75;
var kStorageKey ="timedCodingQuiz-scores";
var kQuestionList = [

];

// Identify events

// Event: Page load
function init() {
  console.log("Game loading...");

  hideElement(gameBoardEl);
  hideElement(gameEndEl);
  hideElement(highScoresEl);

}

// Event: Click start

function handleClickStart(event) {
  console.log("Game Started");

if (!timer) {
  // set the time left
  timeLeft = kDuration;
  // start a timer
  timer = setInterval(handleTimerTick, 1000);
  // hide start screen
  hideElement(startGameEl);
  // show game board
  showElement(gameBoardEl);
  // choose question
  // set current guess
  /////////////////
  // reset display
  // show gameboard

}
}
startGameButtonEl.addEventListener("click", handleClickStart);

// Event: Timer tick

function handleTimerTick(event) {
  timeLeft--;
  console.log("Timer ticked", timeLeft);

  timerEl.textContent = "Time left: " + timeLeft;
  if(timeLeft === 0) {
    handleGameEnd();
  }
}

// Event: Answer question

// Event: Game ends

function handleGameEnd() {
  console.log("Game ended");
  clearInterval(timer);
  timer = null;

  hideElement(gameBoardEl)
  showElement(gameEndEl);
  
}

// Event: Submit name & high score

function handleHighScore(event) {
  console.log("Initials submitted");
}
submitInitialsButtonEl.addEventListener("click", handleHighScore);

// Event: Clear Highscores

function handleClearScores(event) {
  console.log("Highscores cleared");
}
clearScoresButtonEl.addEventListener("click", handleClearScores);

// Event: Return to game start

function handleGameRestart(event) {
  console.log("Game restarted");
}
restartGameButtonEl.addEventListener("click", handleGameRestart);

// /*
//  6. Refactor
//     - identify tasks that can be broken into their own functions, outside the event handlers
//     - Are there tasks that more than one event handler share?
// */

function hideElement(el) {
  el.classList.add("hide");
}

function showElement(el) {
  el.classList.remove("hide");
}

function updateHighScores(){

}


init();