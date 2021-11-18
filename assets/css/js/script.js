// Create Variables from HTML classes

var intro = document.getElementsByClassName("intro");
var startbtn = document.getElementsByClassName("startbtn");
var quizContainer = document.getElementsByClassName("quiz-container");
var result = document.getElementsByClassName("result");
var end = document.getElementsByClassName("end");
var questions = document.getElementsByClassName("questions");
var timer = document.getElementsByClassName("timer");
var highscoreContainer = document.getElementsByClassName("highscore-container");
var highscorePage = document.getElementsByClassName("highscore-page");
var initials = document.getElementsByClassName("initials");
var highscoreInitials = document.getElementsByClassName("highscore-initials");
var highscoreScore = document.getElementsByClassName("highscore-score");
var postGameBtns = document.getElementsByClassName("post-game-btns");
var submit = document.getElementById("submit");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");



//Questions for Quiz

var quizQuestions = [
    {
        question: "Example Question",
        choiceA: "a",
        choiceB: "b",
        choiceC: "c",
        choiceD: "d",
        correctAnswer: "a"

    },
    {
        question: "Example Question",
        choiceA: "a",
        choiceB: "b",
        choiceC: "c",
        choiceD: "d",
        correctAnswer: "a"

    },
    {
        question: "Example Question",
        choiceA: "a",
        choiceB: "b",
        choiceC: "c",
        choiceD: "d",
        correctAnswer: "a"

    },
    {
        question: "Example Question",
        choiceA: "a",
        choiceB: "b",
        choiceC: "c",
        choiceD: "d",
        correctAnswer: "a"

    },
    {
        question: "Example Question",
        choiceA: "a",
        choiceB: "b",
        choiceC: "c",
        choiceD: "d",
        correctAnswer: "a"

    },
    {
        question: "Example Question",
        choiceA: "a",
        choiceB: "b",
        choiceC: "c",
        choiceD: "d",
        correctAnswer: "a"

    },
    {
        question: "Example Question",
        choiceA: "a",
        choiceB: "b",
        choiceC: "c",
        choiceD: "d",
        correctAnswer: "a"

    },

];

//New variables for questions, correct/incorrect, time, and score
//Have to put after the quizQuestions variable
var timeLeft = 120;
var timerInterval;
var score1 = 0;
var correct;
var finalQuestion = quizQuestions.length;
var currentQuestion = 0;

//Generates Questions to the 
//CHAANGE VARIABLENAMES
function generateQuizQuestion(){
    end.style.display = "none";
    if (currentQuestion === finalQuestion){
        return showScore();
    } 
    var currentQuestion1 = quizQuestions[currentQuestion];
    questions.innerHTML = "<p>" + currentQuestion1.question + "</p>";
    buttonA.innerHTML = currentQuestion1.choiceA;
    buttonB.innerHTML = currentQuestion1.choiceB;
    buttonC.innerHTML = currentQuestion1.choiceC;
    buttonD.innerHTML = currentQuestion1.choiceD;
}

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    end.style.display = "none";
    intro.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizContainer.style.display = "block";
}

// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizContainer.style.display = "none";
    end.style.display = "flex";
    clearInterval(timerInterval);
    initials.value = "";
    score1.innerHTML = "You got " + score1 + " out of " + quizQuestions.length + " correct!";
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submit.addEventListener("click", function highscore(){    
    
    if(initials.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = initials.value.trim();
        var currentHighscore = {
            name : currentUser,
            scoree : score1
        };
    
        end.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscorePage.style.display = "block";
        postGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});


// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreInitials.innerHTML = "";
    highscoreScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        initials.appendChild(newNameSpan);
        highscoreScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages from 
function showHighscore(){
    intro.style.display = "none";
    end.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscorePage.style.display = "block";
    postGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreInitials.textContent = "";
    highscoreScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    end.style.display = "none";
    intro.style.display = "flex";
    timeLeft = 76;
    score1 = 0; //maybe change to score
    currentQuestion = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestion].correctAnswer;

    if (answer === correct && currentQuestion !== finalQuestion){
        score1++;
        alert("That Is Correct!");
        currentQuestion++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestion !== finalQuestion){
        alert("That Is Incorrect.");
        currentQuestion++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

startbtn.addEventListener("click",startQuiz);
