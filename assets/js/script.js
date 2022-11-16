let currentQuestionIndex = 0; // starting at the element at index=0 in the question array
let timeLeft = 75;
let timeInterval;

let timeElement = document.querySelector("#time-span");
let startButton = document.querySelector("#start-button");
let questionsElement = document.querySelector("#questions");
let questionPromptElement = document.querySelector("#question-prompt"); // can this NOT be global??
let choicesElement = document.querySelector("#choices");

let endScreenElement = document.querySelector("#end-screen");
let finalScore = document.querySelector("#final-score");
let initialInput = document.querySelector("#initial");
let submitButton = document.querySelector("#submit-button");

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
        } else if (timeLeft <= 0 || currentQuestionIndex === 5) {
            clearInterval(timeInterval); // WHY ISN'T MY TIMER STOPPING???******PRK
            timeElement.textContent = 0;
        }
    }, 1000);

    // show questions and answer choices & penalize time for incorrect answers
    getQuestion();

}

function getQuestion() {
    // get each question from array of question objects in questions.js
    if (currentQuestionIndex === 5) { // to prevent TypeError
        showEndScreen();
        return; // exit getQuestion
    }
    
    let currentQuestion = questions[currentQuestionIndex];
    let correctAnswer = currentQuestion.answer;

    // question prompt h2 element is blank right now so we need to add text to it
    questionPromptElement.textContent = currentQuestion.prompt;

    // clear out old question choices
    choicesElement.innerHTML = "";

    // loop over each choice to create choice buttons with text
    let choice = currentQuestion.choice;
    for (let i = 0; i < choice.length; i++) {
        let choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choices"); // to style the choice buttons
        choiceButton.innerHTML = choice[i]; // to add text to choice buttons
        choicesElement.appendChild(choiceButton); // to append choice buttons to the choice div container

        choiceButton.addEventListener('click', getQuestion); // to show the next question when clicked
        choiceButton.addEventListener('click', function() { // every button has this function but only the button that is clicked would run it! the button that is clicked is choice[i]!
            let chosenAnswer = choice[i];
            subtractTime(correctAnswer, chosenAnswer);
        }); 
    }

    currentQuestionIndex++;
}

function subtractTime(correctAnswer, chosenAnswer) { // need to pass in both parameters for comparison before penalty
    console.log('show correct answer when subtractTime runs after clicking a choice button');
    console.log(correctAnswer);
    console.log('show chosen answer');
    console.log(chosenAnswer);

    // if (timeLeft === 0) {
    //     return;
    // }

    if (chosenAnswer !== correctAnswer && timeLeft > 14) {
        timeLeft -= 15;
        console.log(timeLeft);
    }
}

function showEndScreen() {
    // hide questions
    questionsElement.setAttribute("class", "hide");

    // show end screen
    endScreenElement.removeAttribute("class");

    // render timeLeft as final score
    finalScore.textContent = timeLeft;
    console.log(finalScore);
}

// also need to store scores in local object so that i can take them out and display in highscores.html right?
submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    let initial = initialInput.value.trim();

    if (initial !== '') {
        let storedScores = {
            initial: initial,
            score: finalScore.textContent,
        };

        localStorage.setItem("stored scores", JSON.stringify(storedScores));

        window.location.href = 'score-record.html';
    }
})