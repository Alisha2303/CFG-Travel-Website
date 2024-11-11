const questions = [
    {
        question: "What is the Turkish word for Hello?",
        answers: [
            {text: "Merhaba", correct: true},
            {text: "Lutfen", correct: false},
            {text: "Tesekur", correct: false},
            {text: "Gule Gule", correct: false},
        ]
    },
    {
        question: "What is the English word for Gule Gule?",
        answers: [
            {text: "Thank you", correct: false},
            {text: "Please", correct: false},
            {text: "Goodbye", correct: true},
            {text: "Hello", correct: false},
        ]
    },
    {
        question: "What is the Turkish word for please?",
        answers: [
            {text: "Gule Gule", correct: false},
            {text: "Tesekur", correct: false},
            {text: "Merhaba", correct: false},
            {text: "Lutfen", correct: true},
        ]
    },
    {
        question: "What is the English word for Tesekur?",
        answers: [
            {text: "Please", correct: false},
            {text: "Thank you", correct: true},
            {text: "Hello", correct: false},
            {text: "Goodbye", correct: false},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
       selectedBtn.classList.add("correct");
       score++; 
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ${score} out of ${questions.length}!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();