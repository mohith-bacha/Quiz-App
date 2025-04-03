const questions = [
    {
        question: "Which of the following is the correct way to declare a variable in JavaScript?",
        answers: [
            { text: "var myVar = 10;", correct: false },
            { text: "let myVar = 10;", correct: false },
            { text: "const myVar = 10;", correct: false },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "Which method is used to convert a string into an integer in JavaScript?",
        answers: [
            { text: "parseInt()", correct: true },
            { text: "parseFloat()", correct: false },
            { text: "toInteger()", correct: false },
            { text: "stringToNumber()", correct: false }
        ]
    },
    {
        question: "What does the === operator do in JavaScript?",
        answers: [
            { text: "Checks only value equality", correct: false },
            { text: "Checks only type equality", correct: false },
            { text: "Checks both value and type equality", correct: true },
            { text: "It is not a valid operator in JavaScript", correct: false }
        ]
    },
    {
        question: "Which of the following is used to define an asynchronous function in JavaScript?",
        answers: [
            { text: "async function myFunction() {}", correct: true },
            { text: "function async myFunction() {}", correct: false },
            { text: "await function myFunction() {}", correct: false },
            { text: "function myFunction() async {}", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}.`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
