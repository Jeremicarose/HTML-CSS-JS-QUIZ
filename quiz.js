//select all element
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const progress = document.getElementById("progress");
const timeGauge = document.getElementById("timerGauge");
const qimg = document.getElementById("qimg");
const counter = document.getElementById("counter");
const scoreDiv = document.getElementById("score");

//creat questions
let questions = [
    {
        question: "What does HTML stand for?",
        imgSrc: "img/html.png",
        choiceA: "Hypertext Markup Language",
        choiceB: "Hypertext Machine language",
        choiceC: "Hightext machine language",
        correct: "A"
    }, {
        question: "What does CSS stand for?",
        imgSrc: "img/css.png",
        choiceA: "Cascading Stal Sheets",
        choiceB: "Cascading Style Sheets",
        choiceC: "Cascading Style Link",
        correct: "B"
    }, {
        question: "What does Js stand for?",
        imgSrc: "img/js.png",
        choiceA: "Java Sheet",
        choiceB: "Java Style",
        choiceC: "Java Script",
        correct: "C"
    }
]

//creat some variable
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// rendering question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = `<p>${q.question}</p>`;
    qimg.innerHTML = `<img src=${q.imgSrc}>`;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
//start Quiz
start.addEventListener("click", startQuiz);
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCount();
    TIMER = setInterval(renderCount, 1000);
}


//render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

//render count


function renderCount() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        //timeGauge.style.width = count * gaugeUnit;
        count++;
    }
    else {
        count = 0;
        wrongAnswer();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
            
        }else{
            //end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
//checked answer
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        score++;
        correctAnswer();
    } else {
        wrongAnswer();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    }
    else{
        //end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}
// correct answer
function correctAnswer() {
    document.getElementById(runningQuestion).style.backgroundColor = "green"
}
//wrong answer
function wrongAnswer() {
    document.getElementById(runningQuestion).style.backgroundColor = "red"
}
//score render 
function scoreRender(){
    scoreDiv.style.display = "block";
    //calculate the answer in percentage;
    const scorePerCent = Math.round(100 * score / questions.length);
    //choice image depending on the score
    let img = 
        (scorePerCent >= 80) ? "img/5.png" :
        (scorePerCent >= 60) ? "img/4.png" :
        (scorePerCent >= 40) ? "img/3.png" :
        (scorePerCent >= 20) ? "img/2.png" :
        "img/1.png";

        scoreDiv.innerHTML = "<img src = "+ img +">";
        scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";

    

}