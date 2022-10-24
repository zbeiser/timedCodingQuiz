////// Declare variables: DOM hooks

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

////// Declare variables: state

var score = 0;
var timer = null;
var timeLeft = 0;

////// Declare variables: constants

var kDuration = 10;
var kQuestions = [
{
  question: "What is my name?",
  answers: {
    a: "Zach",
    b: "Cornelius",
    c: "Mordecai",
    d: "Thaddeus",
  },
  correctAnswer: "Zach"
},
{
  question: "What is my age?",
  answers: {
    a: "1",
    b: "55",
    c: "235743",
    d: "28",
  },
  correctAnswer: "28"
},
{
  question: "What is my favorite color?",
  answers: {
    a: "Chartreuse",
    b: "Beige",
    c: "Green",
    d: "Macaroni and Cheese",
  },
  correctAnswer: "Green"
},
{
  question: "What is my wife's name?",
  answers: {
    a: "Lucretia",
    b: "Emma",
    c: "Ulga",
    d: "Karen",
  },
  correctAnswer: "Emma"
},
{
  question: "What is my favorite food?",
  answers: {
    a: "Grass",
    b: "Beer",
    c: "Noodles",
    d: "Porridge",
  },
  correctAnswer: "Noodles"
},
{
  question: "What is my favorite hobby?",
  answers: {
    a: "Gardening",
    b: "Spelunking",
    c: "Extreme underwater basket weaving",
    d: "Watching paint dry",
  },
  correctAnswer: "Gardening"
},
{
  question: "What is my favorite animal?",
  answers: {
    a: "Amoebas",
    b: "Cockroaches",
    c: "Humans (are we the true animals?)",
    d: "Bears",
  },
  correctAnswer: "Bears"
},
{
  question: "What is my favorite show?",
  answers: {
    a: "Cops",
    b: "The Great Pottery Throwdown",
    c: "90 Day Fiance",
    d: "The Biggest Loser",
  },
  correctAnswer: "The Great Pottery Throwdown"
},
{
  question: "Which of these is a good song?",
  answers: {
    a: "Friday - Rebecca Black",
    b: "Allstar - Smashmouth",
    c: "Any song by Limp Bizkit",
    d: "Lady and Man - Khruangbin",
  },
  correctAnswer: "Lady and Man - Khruangbin"
},
{
  question: "What is the meaning of life?",
  answers: {
    a: "To pursue our meaning is the very meaning itself",
    b: "Capitalism",
    c: "Tacos",
    d: "Look buddy, I just work here",
  },
  correctAnswer: "Tacos"
},
];



////// Identify events

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

}
}
startGameButtonEl.addEventListener("click", handleClickStart);

// Event: Timer tick

function handleTimerTick(event) {
  console.log("Timer ticked", timeLeft);
  timeLeft--;

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

  hideElement(gameEndEl);
  showElement(highScoresEl);
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

  hideElement(highScoresEl);
  showElement(startGameEl);
  timerEl.textContent = "Time left: " + 10;
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