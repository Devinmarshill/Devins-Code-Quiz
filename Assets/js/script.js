var startButton = document.getElementById('start Button'); startButton
var timerLabel = document.getElementById('timer');
var questionSection = document.getElementById('question-section');
var scoreLabel = document.getElementById('score');
var initialInput = document.getElementById('initial-input');
var saveButton = document.getElementById('save-btn');
var highscoreSection = document.getElementById('highscore-section');

// the following code defines the quiz question and answers
var quizQuestions = [
  {
    question: 'Question 1: What is JavaScript?',
    choices: ['A programming language', 'A markup language', 'A database technology', 'A stylesheet language'],
    answer: 0
  },
  
];

var currentQuestionIndex = 0;
var timeLeft = 60;
var score = 0;

// the following function is used to start the quiz
function startQuiz() {

  startButton.onclick = startQuiz;
  questionSection.classList.remove('hide');
  timerLabel.textContent = timeLeft;

  // Start the timer
  var timer = setInterval(() => {
    timeLeft--;
    timerLabel.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);

  showQuestion();
}

// the following function is used to display the question and its choices
function showQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  var questionTitle = document.getElementById('Title');
  var choices = document.getElementsByClassName('Choices');

  questionTitle.textContent = currentQuestion.question;

  for (var i = 0; i < choices.length; i++) {
    choices[i].textContent = currentQuestion.choices[i];
    choices[i].addEventListener('click', handleAnswerClick);
  }
}

// the following function will identify which choice the user has selected
function handleAnswerClick(event) {
  var selectedChoice = event.target;
  var selectedAnswer = Array.from(selectedChoice.parentElement.parentElement.children).indexOf(selectedChoice.parentElement);
  var currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    // Correct answer
    score += 10;
  } else {
    // Incorrect answer
    timeLeft -= 10;
    if (timeLeft < 0) timeLeft = 0;
    timerLabel.textContent = timeLeft;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    // Show the next question
    showQuestion();
  } else {
    // End the quiz if all questions are answered
    endQuiz();
  }
}

// the following function is how the user will end the quiz
function endQuiz() {
  questionSection.classList.add('hide');
  document.getElementById('score').textContent = score;
  document.getElementById('initial-section').classList.remove('hide');
}

// Function to save the score and initials
function saveScore() {
  var initials = initialInput.value.trim();
  if (initials !== '') {
    // the following line of code will save the score and initials
    var highscoreList = document.querySelector('#highscore-section ol');
    var scoreItem = document.createElement('li');
    scoreItem.textContent = initials + '-' + score;
    highscoreList.appendChild(scoreItem);

    initialInput.value = '';
    initialInput.disabled = true;
    saveButton.disabled = true;

    // the following line of code will show the highscore section
    highscoreSection.classList.remove('hide');
  }
}


startButton.addEventListener('click', startQuiz);
saveButton.addEventListener('click', saveScore);