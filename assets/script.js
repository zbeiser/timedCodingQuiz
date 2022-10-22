/*
 1. Design UI
    - Draw a picture
    - Determine where you will display feedback. 
    - Determine what is clickable, what will recieve key input, change input
      timers, scroll events, etc
    - rough in the elements in HTML, style is less important

*/

/*
  2. Declare variables: DOM hooks
    - In the Javascript, create variables for each of the DOM elements that will display feedback
    - create variables for the elements that will receive input
    - set each variable to its DOM element like:
    
    var theElement = document.querySelector([CSS Selector for your element]);
 */

/*
 3. Declare variables: state
    - What are the datq that need to be kept track of? 
    - Global state variables sometimes emerge while working on event handlers (i.e., it
      becomes clearer what needs to be tracked across the application)
    - state variables:
      "State describes the status of the entire program or an individual
       object. It could be text, a number, a boolean, or another data type.

       It’s a common tool for coordinating code. For example, once you update state, a bunch of different functions can instantly react to that change."
       https://www.freecodecamp.org/news/state-in-javascript-explained-by-cooking-a-simple-meal-2baf10a787ee/
    - Does the state variable need to be global (i.e., used by all the event handlers) or does it only need to be local
      to the event handler?
*/

var score = 0;
var timer = null;
var timeLeft = 0;
var currentQuestionIndex = null;
var currentGuess = null;

/*
 4. Declare variables: constants
    - What are the data the application needs that won't change?
    - e.g. Math constants, pre-created content (maybe the questions and answers?)
*/

var kDuration = 75;
var kStorageKey ="timedCodingQuiz-scores";

/*
 5. Identify events
    - Based on the variables created in Step 2, create event handlers

      theElement.addeventListener([EVENT TYPE], function(event){
        // do stuff here...
      })

    ...where [EVENT TYPE] is "click" or "change" or "keydown" or whatver

    - Identify the things that should happen in the click handlers
    - Rememember: there is always a page load event. Usually have a function for anything
      that needs setting up at the beginning, before people interact with the 
      page. Start the execution of this setup function at the bottom of page
*/

// Event: Page load
function init() {
  console.log("Game loading...");

  var highscores = JSON.parse(localStorage.getItem(kStorageKey));

  if(highscores) {

  }
}

// Event: Click start

function handleClickStart(event) {
  console.log("Game Started");
}
startGameButtonEl.addEventListener("click", handleClickStart);

// Event: Timer tick

function handleTimerTick(event) {
  console.log("Timer ticked");
}

// Event: Answer question

function handleAnswer(event) {
  console.log("Question answered");
}
answerButtonEl.addEventListener("click", handleAnswer);

// Event: Game ends
function handleGameEnd() {
  console.log("Game ended");
}

// Event: Submit name & high score

function handleHighScore(event) {
  console.log("High score submitted");
}
document.addEventListener("click", handleHighScore);

// Event: Return to game start

function handleGameRestart(event) {
  console.log("Game restarted");
}
document.addEventListener("click", handleGameRestart);

/*
 6. Refactor
    - identify tasks that can be broken into their own functions, outside the event handlers
    - Are there tasks that more than one event handler share?
*/

function updateHighScores(){

}

init();