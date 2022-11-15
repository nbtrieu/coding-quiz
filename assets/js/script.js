let currentQuestionIndex = 0; // starting at the element at index=0 in the question array
let timeLeft = 75; // questions.length * 10;
let timeInterval;

let timeElement = document.querySelector("#time-span");
let startButton = document.querySelector("#start-button");
let questionsElement = document.querySelector("#questions");
let questionPromptElement = document.querySelector("#question-prompt"); // can this NOT be global??
let choicesElement = document.querySelector("#choices");

console.log(startButton);
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    let startScreenElement = document.querySelector("#start-screen");
    // hide start screen
    startScreenElement.setAttribute("class", "hide");

    // unhide questions
    questionsElement.removeAttribute("class");

    // show starting time
    timeElement.textContent = timeLeft;

    // start timer
    timeInterval = setInterval(function() {
        timeLeft--;

        if (timeLeft >= 1) {
            timeElement.textContent = timeLeft;
        } else if (timeLeft <= 0) {
            clearInterval(timeInterval);
        }
    }, 1000);

    // show questions and answer choices
    getQuestion();
}

function getQuestion() {
    // get each question from array of question objects in questions.js
    let currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);

    // question prompt h2 element is blank right now so we need to add text to it
    questionPromptElement.textContent = currentQuestion.prompt;

    // clear out old question choices
    choicesElement.innerHTML = "";

    // loop over each choice to create choice buttons with text
    let choice = currentQuestion.choice;
    for (let i = 0; i < choice.length; i++) {
        let choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choices");
        choiceButton.innerHTML = choice[i];
        choicesElement.appendChild(choiceButton);
        
        console.log(choiceButton);
        choiceButton.addEventListener('click', getQuestion);
    }

    currentQuestionIndex++;
}

function subtractTime() {
    
}