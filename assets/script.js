////// Declare variables: DOM hooks

var startGameButtonEl = document.querySelector("#startGameButton");
var startGameEl = document.querySelector(".startGame");
var submitInitialsButtonEl = document.querySelector("#gameEnd_submit_intials");
var highScoresInitials = document.querySelector("#gameEnd_initials");
var restartGameButtonEl = document.querySelector("#highScores_restart");
var clearScoresButtonEl = document.querySelector("#highScores_clearScores");
var timerLeftEl = document.querySelector("#timeLeft");
var timerEl = document.querySelector(".gameBoard_timer");
var gameBoardEl = document.querySelector(".gameBoard");
var gameEndEl = document.querySelector(".gameEnd");
var highScoresEl = document.querySelector(".highScores");
var scoreEl = document.querySelector("#score");
var finalScoreEl = document.querySelector("#gameEnd_score");
var gameResultEl = document.querySelector(".gameBoard_results");
var viewHighscoresEl = document.querySelector("#viewHighscores");

////// Declare variables: state. Highscores, current score, timer, time left, and question counter.

var scoreArray = [];
var score = 0;
var timer = null;
var timeLeft = 0;
var questionIndex = 0;

////// Declare variables: constants. Timer duration and questions in an array of objects.

var kDuration = 60;
var kQuestions = [
  {
    question: "What is my name?",
    answers: {
      a: "Zach",
      b: "Cornelius",
      c: "Mordecai",
      d: "Thaddeus",
    },
    correctAnswer: "Zach",
  },
  {
    question: "What is my age?",
    answers: {
      a: "1",
      b: "55",
      c: "235743",
      d: "28",
    },
    correctAnswer: "28",
  },
  {
    question: "What is my favorite color?",
    answers: {
      a: "Chartreuse",
      b: "Beige",
      c: "Green",
      d: "Macaroni and Cheese",
    },
    correctAnswer: "Green",
  },
  {
    question: "What is my wife's name?",
    answers: {
      a: "Lucretia",
      b: "Emma",
      c: "Ulga",
      d: "Karen",
    },
    correctAnswer: "Emma",
  },
  {
    question: "What is my favorite food?",
    answers: {
      a: "Grass",
      b: "Beer",
      c: "Noodles",
      d: "Porridge",
    },
    correctAnswer: "Noodles",
  },
  {
    question: "What is my favorite hobby?",
    answers: {
      a: "Gardening",
      b: "Spelunking",
      c: "Extreme underwater basket weaving",
      d: "Watching paint dry",
    },
    correctAnswer: "Gardening",
  },
  {
    question: "What is my favorite animal?",
    answers: {
      a: "Amoebas",
      b: "Cockroaches",
      c: "Humans (are we the true animals?)",
      d: "Bears",
    },
    correctAnswer: "Bears",
  },
  {
    question: "What is my favorite show?",
    answers: {
      a: "Cops",
      b: "The Great Pottery Throwdown",
      c: "90 Day Fiance",
      d: "The Biggest Loser",
    },
    correctAnswer: "The Great Pottery Throwdown",
  },
  {
    question: "Which of these is a good song?",
    answers: {
      a: "Friday - Rebecca Black",
      b: "Allstar - Smashmouth",
      c: "Any song by Limp Bizkit",
      d: "Lady and Man - Khruangbin",
    },
    correctAnswer: "Lady and Man - Khruangbin",
  },
  {
    question: "What is the meaning of life?",
    answers: {
      a: "To pursue our meaning is the very meaning itself",
      b: "Capitalism",
      c: "Tacos",
      d: "Look buddy, I just work here",
    },
    correctAnswer: "Tacos",
  },
];

// Event: Page load. Updates high scores, hides everything except game start screen.
function init() {
  updateHighscores();

  hideElement(gameBoardEl);
  hideElement(gameEndEl);
  hideElement(highScoresEl);
}

// Event: Begins timer, hides game start screen and any previous answer result message.
// Shows game screen, starts questions.

function handleClickStart() {
  if (!timer) {
    timeLeft = kDuration;
    timer = setInterval(handleTimerTick, 1000);

    hideElement(startGameEl);
    hideElement(gameResultEl);
    showElement(gameBoardEl);

    handleQuestions();
  }
}
startGameButtonEl.addEventListener("click", handleClickStart);

// Event: Ticks timer down, displays timer on UI, ends game if it reaches 0.

function handleTimerTick() {
  timeLeft--;

  timerEl.textContent = "Time left: " + timeLeft;
  if (timeLeft <= 0) {
    handleGameEnd();
  }
}

// Event: Matches questions and answers in the questions array to the p and list elements.
// Clicking on answers handles them accordingly with the next function below.

function handleQuestions() {
  var question = kQuestions[questionIndex];
  document.getElementById("question").innerHTML = question.question;

  var answer1 = document.getElementById("answer1");
  answer1.innerHTML = question.answers.a;
  answer1.addEventListener("click", handleAnswer);

  var answer2 = document.getElementById("answer2");
  answer2.innerHTML = question.answers.b;
  answer2.addEventListener("click", handleAnswer);

  var answer3 = document.getElementById("answer3");
  answer3.innerHTML = question.answers.c;
  answer3.addEventListener("click", handleAnswer);

  var answer4 = document.getElementById("answer4");
  answer4.innerHTML = question.answers.d;
  answer4.addEventListener("click", handleAnswer);
}

// Event: Validates answers, checks if what's clicked matches correctAnswer, displays result.
// Adds score if it does match, removes time if it doesn't. Moves to next question.
// Ends game if your questionIndex reaches end of question list length.

function handleAnswer() {
  if (this.innerText === kQuestions[questionIndex].correctAnswer) {
    showElement(gameResultEl);
    gameResultEl.innerHTML = "Correct!";
    score++;
  } else {
    showElement(gameResultEl);
    gameResultEl.innerHTML = "False!";
    timeLeft -= 5;
  }
  scoreEl.innerHTML = score;
  questionIndex++;

  if (questionIndex === kQuestions.length) {
    handleGameEnd();
  } else {
    handleQuestions();
  }
}

// Event: Game ends, clears timer, sets the final score UI, moves to Game Over screen.

function handleGameEnd() {
  clearInterval(timer);
  timer = null;

  finalScoreEl.innerHTML = score;

  hideElement(gameBoardEl);
  showElement(gameEndEl);
}

// Event: Submits name & high score. Creates variables for the initials input and final score, stores
// them in an object variable, pushes that object into the scores array, sets array into the localStorage.
// Moves to highscore screen.

function handleHighScore() {
  var initials = document.getElementById("gameEnd_initials").value;
  var highscore = finalScoreEl.innerHTML;
  var initialsHighscore = { initials, highscore };

  scoreArray.push(initialsHighscore);

  localStorage.setItem("Highscores", JSON.stringify(scoreArray));

  // 249-257 adds the most recent highscore to the UI.
  var score = document.createElement("li");

  score.textContent =
    "user: " +
    scoreArray[scoreArray.length - 1].initials +
    " | score: " +
    scoreArray[scoreArray.length - 1].highscore;

  document.getElementById("highScores_display_score").appendChild(score);

  hideElement(gameEndEl);
  showElement(highScoresEl);
}
submitInitialsButtonEl.addEventListener("click", handleHighScore);

// Event: Clear highscores from the UI and localStorage.

function handleClearScores() {
  localStorage.clear();
  document.getElementById("highScores_display_score").innerHTML = "";
}
clearScoresButtonEl.addEventListener("click", handleClearScores);

// Event: Moves back to game start screen, resets questionIndex, resets scores, resets timer on UI.

function handleGameRestart() {
  hideElement(highScoresEl);
  showElement(startGameEl);
  timerEl.textContent = "Time left: " + 60;
  questionIndex = 0;
  score = 0;
  scoreEl.innerHTML = 0;
  finalScoreEl.innerHTML = 0;
}
restartGameButtonEl.addEventListener("click", handleGameRestart);

// Functions to hide and show HTML elements

function hideElement(el) {
  el.classList.add("hide");
}

function showElement(el) {
  el.classList.remove("hide");
}

// Updates the highscore list from the localStorage. This gets called in the init function on page load.
// The if statement makes sure the scoreArray doesn't log an error as null if the localStorage is empty.

function updateHighscores() {
  var loadScores = JSON.parse(localStorage.getItem("Highscores"));
  if (loadScores === null) {
    scoreArray = [];
  } else {
    scoreArray = loadScores;
  }

  for (var i = 0; i < scoreArray.length; i++) {
    var score = document.createElement("li");

    score.textContent =
      "user: " +
      scoreArray[i].initials +
      " | score: " +
      scoreArray[i].highscore;

    document.getElementById("highScores_display_score").appendChild(score);
  }
}

// Event: View highscore page by pressing a button at any time. Resets the timer so
// you can sucessfully start game again.

function viewHighscores() {
  clearInterval(timer);
  timer = null;
  showElement(highScoresEl);
  hideElement(gameEndEl);
  hideElement(gameBoardEl);
  hideElement(startGameEl);
}
viewHighscoresEl.addEventListener("click", viewHighscores);

// Load the game start screen on page load.
init();
