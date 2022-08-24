const jsQuestions = [{
  question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
  options: [
  "Throws an error",
  "Gives a warning", 
  "Ignores the statements", 
  "None of the Above"
  ],
  answer: "Ignores the statements"
},
{
  question: "Which of the following type of variable takes precedence over other if names are same?",
  options: [
  "global", 
  "local", 
  "neighbor", 
  "parent-child"
  ],
  answer: "local"
},
{
  question: "Which of the following function of Array object joins all elements of an array into a string?",
  options: [
  "concat()", 
  "pop()", 
  "join()", 
  "connect()",
  ],
  answer: "join()"
},
{

  question: "Which of the following are closures in Javascript?",
  options: [
  "Variables", 
  "Functions", 
  "Objects", 
  "All of the Above"
  ],
  answer: "All of the Above"
},
{
  question: "In which HTML element, we put the JavaScript code?",
  options: [ 
  "<javascript>", 
  "<style>", 
  "<css>", 
  "<script>"
  ],
  answer: "<script>"
},
{
  question: "Which symbol is used separate JavaScript statements?",
  options: [
  "colon(:)", 
  "semicolon(;)", 
  "hyphen(_)", 
  "comma(,)",
  ],
  answer: "semicolon(;)"
},
{
  question: "Which of the following methods is used to access HTML elements using Javascript?",
  options: [
  "getElementbyId", 
  "getElementsbyClassName()", 
  "Both A and B", 
  "let",
  ],
  answer: "Both A and B"
},
{
  question: "When an operator’s value is NULL, the typeof returned by the unary operator is:",
  options: [
  "Boolean", 
  "Number", 
  "Undefined", 
  "None of the Above"
  ],
  answer: "None of the Above"
},
{
  question: "Javascript is an _______ language?",
  options: [
  "Object-Oriented", 
  "Array-Oriented", 
  "Object-Based", 
  "None of the Above",
  ],
  answer: "Object-Based"
},
{
  question: "Which function is used to serialize an object into a JSON string in Javascript?",
  options: [
  "parse()", 
  "stringify()", 
  "convert()", 
  ".split",
  ],
  answer: "stringify()"
},
{
  question: "Which property is used to define the HTML content to an HTML element with a specific id?", 
  options: [
  "Variables", 
  "innerText", 
  "innerHTML", 
  "innerContent",
  ],
  answer: "innerHTML"
},
{
  question: "Which of the following keywords is used to define a variable in Javascript?",
  options: [
  "var", 
  "const", 
  "style", 
  "Both A and B"
  ],
  answer: "Both A and B"
},
]


// grabbing our elements to set them as variables
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startGame = document.getElementById("startGame")
var startBtn = document.getElementById("start-btn")

var questionList = document.getElementById("question-list");
var questions = document.getElementById("question");
var optionA = document.getElementById("btn0");
var optionB = document.getElementById("btn1");
var optionC = document.getElementById("btn2");
var optionD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var house = document.getElementById("the-house");
var summary = document.getElementById("summary");
var finalScore = document.getElementById("finalScore");
var submitInitialBtn = document.getElementById("initials-btn");
var initialInput = document.getElementById("initials");

var highScores = document.getElementById("highScoreSection");
var listofScores = document.getElementById("listofScores");
var playAgain = document.getElementById("goBackbtn");
var clearScores = document.getElementById("clearHighScorebtn");
var viewHighScore = document.getElementById("viewHighScores");

// define new variables
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// timer start
var totalTime = 100;
function newGame() {
  questionIndex = 0;
  totalTime = 100;
  timeLeft.textContent = totalTime;
  initialInput.textContent = '';

  startGame.style.display = "none";
  questionList.style.display = "block";
  timer.style.display = "block";
  timesUp.style.display = "none";

var startTimer = setInterval(function() {
  totalTime--;
  timeLeft.textContent = totalTime;
  if(totalTime <= 0) {
      clearInterval(startTimer);
      if (questionIndex < jsQuestions.length - 1) {
          gameOver();
      }
  }
}, 1000);

  showQuiz();

};

function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questions.textContent = jsQuestions[questionIndex].question;
  optionA.textContent = jsQuestions[questionIndex].options[0]
  optionB.textContent = jsQuestions[questionIndex].options[1]
  optionC.textContent = jsQuestions[questionIndex].options[2]
  optionD.textContent = jsQuestions[questionIndex].options[3]
}

function checkAnswer(answer) {

  answerCheck.style.display = "block";

if (jsQuestions[questionIndex].answer === jsQuestions[questionIndex].options[answer]) {
  // correct answer, add 1 score to final score
  correctAns++;
  // console.log(correctAns);
  answerCheck.textContent = "Correct!";
} else {
  // wrong answer, deduct 15 second from timer
  totalTime -= 15;
  timeLeft.textContent = totalTime;
answerCheck.textContent = "Wrong!"
}

questionIndex++;
// repeat with the rest of questions 
if (questionIndex < jsQuestions.length) {
  nextQuestion();
} else {
  // if no more question, run game over function
  gameOver();
}
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

function gameOver() {
  summary.style.display = "block";
  questionList.style.display = "none";
  startGame.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";

  finalScore.textContent = correctAns
}

function storeHighScores(event) {
  event.preventDefault();

  if (initialInput.value === '') {
    alert("Please add your initials!")
    return;
  }

  summary.style.display = "none";
  questionList.style.display = "none";
  startGame.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";
  highScores.style.display = "block";

  var savedHighScores = localStorage.getItem("high scores");
  var Array;

  if (savedHighScores === null) {
    Array = [];
  } else {
    Array = JSON.parse(savedHighScores);
  }

  var userScore = {
    initial: initialInput.value,
    score: finalScore.textContent
  };

  console.log(userScore);
  Array.push(userScore);

  var scoresArrayString = JSON.stringify(Array);
    window.localStorage.setItem("userScore", scoresArrayString);

    showHighScores(event);
}

var i = 0;
function showHighScores() { 

  summary.style.display = "none";
  questionList.style.display = "none";
  startGame.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  highScores.style.display = "block";
  listofScores.style.display ="block";
  
  var savedHighScores = localStorage.getItem("userScore");

  // check if there is any in local storage
  if (savedHighScores === null) {
      return;
  }
  console.log(savedHighScores);

  var storedHighScores = JSON.parse(savedHighScores);

  for (i = 0; i < storedHighScores.length; i++) {
      var eachNewHighScore = document.createElement("p");
      eachNewHighScore.innerHTML = storedHighScores[i].initial + ": " + storedHighScores[i].score;
      listofScores.appendChild(eachNewHighScore);
  }
}

startBtn.addEventListener("click", newGame);
optionA.addEventListener("click", chooseA);
optionB.addEventListener("click", chooseB);
optionC.addEventListener("click", chooseC);
optionD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", storeHighScores);

viewHighScore.addEventListener("click", showHighScores);

playAgain.addEventListener("click", function() {
  startGame.style.display = "block";
  highScores.style.display = "none";
});

clearScores.addEventListener("click", function(){
  window.localStorage.removeItem("userScore");
  listofScores.innerHTML = "High Scores Cleared!";
  listofScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});