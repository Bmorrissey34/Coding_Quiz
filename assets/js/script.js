var startQuizBtn = document.querySelector("#start-quiz");
var timerEl = document.querySelector("#timer");
var startEl = document.querySelector(".start-page")
// timer count down
var secondsLeft = 75;
var timerNum
var questionsEl = document.querySelector("#questions");
questionsEl.style.display = "none";
var finalScore = document.querySelector("#score");
finalScore.style.display = "none";

// An array to store all the questions with choices and answers
var questions = [
    {
        title: "What do we use to manipulate the DOM:",
        choices: ["Javascript", "Html", "CSS", "Your parents dog"],
        answer: "Javascript"
    },
    {
        title: "Arrays can be used to store ____ .",
        choices: ["equations", "functions", "numbers & strings", "mashed potatoes"],
        answer: "numbers & strings"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["numbers", "Html", "booleans", "strings"],
        answer: "Html"
    },
    {
        title: "What is a good tool to use for debugging during development?",
        choices: ["API's", "CSS Frameworks", "console.log", "the periodic table"],
        answer: "console.log"
    }
];


// Click the start button, starts game, timer starts running
function timeCount() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;
    if (secondsLeft == 0) {
        clearInterval(timerNum);
        initialPage();
    }   
}
startQuizBtn.addEventListener("click", function(event){
    event.preventDefault();
    startEl.style.display = "none";
    timerNum = setInterval(function() {
        timeCount(); 
    }, 1000);
    if (secondsLeft > 0){ 
        showQuestions();
    } 
});

//Game Start 
var questionTitle = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var result = document.createElement("p");
questionsEl.appendChild(result);
questionsEl.style.display = "initial";
var i = 0;
var currentQuestion = questions[i];

function showQuestions(){

    currentQuestion = questions[i]; 
    // insert questions into the HTML 
    questionTitle.textContent = currentQuestion.title;
    // clear choice buttons each time
    choicesEl.innerHTML = "";
    // defined each button, gave them class, value and target them to decide the player's score
    currentQuestion.choices.forEach(function(choice, k){
        var choices = document.createElement("button");   
        choices.setAttribute("class", "choice");
        choices.setAttribute("value", choice);
        choices.textContent = k + 1 + ". " + choice;
        choicesEl.appendChild(choices);
        choices.addEventListener('click', function(event){
            event.preventDefault();
            if (choices.value == currentQuestion.answer) {
                result.textContent = "Correct!"; 
            } else {
                result.textContent = "Wrong!"; 
                secondsLeft -= 10;
            }  

            setTimeout(function () {
            result.textContent = "";
            }, 500);
            
            i++; 

            if (i < questions.length){    
                showQuestions();
            } else {
                gameOver();
            }
        })    
    }) 
}

// Game Over and stop the count down
function gameOver(){
    if(i = questions.length){
        score = secondsLeft;
        clearInterval(timerNum);
        initialPage();
    }else if (secondsLeft == 0){
        score = 0;
        clearInterval(timerNum);
        initialPage();
    }
}

//Show scores and ask for initial; use localStorage to store the result; jump to highscore page
var finalScoreTitle = document.querySelector(".final-score");
var formEl = document.querySelector(".enter-initial");
var submit = document.querySelector("#submit");
var initial = document.querySelector("#initial");

function initialPage(){
    questionsEl.style.display = "none";
    finalScore.style.display = "initial";
    finalScoreTitle.textContent = "Finished! Your score is " + timerEl.textContent +". Now enter your initial."
    submit.addEventListener("click", function(event){
        event.preventDefault();
        localStorage.setItem(initial.value, timerEl.textContent);
        initial.value = "";
        window.location.href = "viewHighScores.html";
    })    
}