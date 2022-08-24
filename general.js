// grabbing our elements to set them as variables
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startGame = document.getElementsByClassName("startGame")
var startBtn = document.getElementById("start-btn")

var questionList = document.getElementsByClassName("question-list");
var questions = document.getElementsByClassName("question");
var optionA = document.getElementById("btn0");
var optionB = document.getElementById("btn1");
var optionC = document.getElementById("btn2");
var optionD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var finalScore = document.getElementById("finalScore");
var submitInitialBtn = document.getElementById("initials-btn");
var initialInput = document.getElementById("initials");

var highScores = document.getElementsByClassName("highScoreSection");
var listofScores = document.getElementById("listofScores");
var playAgain = document.getElementById("goBackbtn");
var clearScores = document.getElementById("clearHighScoresbtn");
var viewHighScore = document.getElementById("viewHighScores");

// define new variables
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// timer start
var startTimer = 60;
function newGame() {
  questionIndex = 0;
  startTimer = 60;
  timeLeft.textContent(startTimer);
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
},1000);

  showQuiz();

};

function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionList.textContent = jsQuestions[questionIndex].question;
  optionA.textContent = jsQuestions[questionIndex].options[0]
  optionB.textContent = jsQuestions[questionIndex].options[1]
  optionC.textContent = jsQuestions[questionIndex].options[2]
  optionD.textContent = jsQuestions[questionIndex].options[3]
}

function answerCheck(answer) {

  // var lineBreak = document.getElementById("lineBreak");
  // lineBreak.style.display = "block";
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
answerCheck.textContent = "Wrong! The correct answer is: " + jsQuestions[questionIndex].answer;
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

function gameover() {
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

  var saveHighScores = localStorage.getItem('high scores');
  var scoresArray;

  if (saveHighScores === null) {
    scoresArray = [];
  } else {
    scoresArray = JSON.parse(saveHighScores);
  }

  var userScore = {
    intials: initialInput.value,
    score: finalScore.textContent
  };

  console.log(userScore);
  scoresArray.push(userScore);

  var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    showHighScores();
}

var i = 0;
function showHighScores() { 
  summary.style.display = "none";
  questionList.style.display = "none";
  startGame.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";
  highScores.style.display = "block";
  
  var savedHighScores = localStorage.getItem("high scores");

  // check if there is any in local storage
  if (savedHighScores === null) {
      return;
  }
  console.log(savedHighScores);

  var storedHighScores = JSON.parse(savedHighScores);

  for (; i < storedHighScores.length; i++) {
      var eachNewHighScore = document.createElement("p");
      eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
      listofScores.appendChild(eachNewHighScore);
  }
}


startBtn.addEventListener('click', newGame);
optionA.addEventListener('click', chooseA);
optionB.addEventListener('click', chooseB);
optionC.addEventListener('click', chooseC);
optionD.addEventListener('click', chooseD);

submitInitialBtn.addEventListener('click', function(event){
  storeHighScores(event);
});

viewHighScore.addEventListener('click', function(event){
  showHighScores(event);
})

goBackBtn.addEventListener('click', function() {
  startGame.style.display = "block";
  listofScores.style.display = "none";
});

clearHighScoreBtn.addEventListener('click', function(){
  window.localStorage.removeItem("high scores");
  listOfScores.innerHTML = "High Scores Cleared!";
  listOfScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});