let currentQuestionIndex = 0; // starting at the element at index=0 in the question array
let timeLeft = 75;
let timeInterval;
let score;

let timeElement = document.querySelector("#time-span");
let startButton = document.querySelector("#start-button");
let questionsElement = document.querySelector("#questions");
let questionPromptElement = document.querySelector("#question-prompt"); // can this NOT be global??
let choicesElement = document.querySelector("#choices");
let feedbackElement = document.querySelector("#feedback");

let endScreenElement = document.querySelector("#end-screen");
let finalScore = document.querySelector("#final-score");
let initialInput = document.querySelector("#initial");
let submitButton = document.querySelector("#submit-button");

feedbackElement.style.visibility = "hidden";

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    let startScreenElement = document.querySelector("#start-screen");
    // hide start screen
    startScreenElement.setAttribute("class", "hide");

    // unhide questions and feedback
    questionsElement.removeAttribute("class");
    questionsElement.style.margin = "100px auto 0 auto";
    questionsElement.style.width = "50%";
    feedbackElement.style.visibility = "visible"; 

    // show starting time
    timeElement.textContent = timeLeft;

    // start timer
    timeInterval = setInterval(function() {
        timeLeft--;

        if (timeLeft >= 1) {
            timeElement.textContent = timeLeft;
        } else if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timeElement.textContent = 0;
        }
    }, 1000);

    // show questions and answer choices & penalize time for incorrect answers
    getQuestion();

}

function getQuestion() {
    // get each question from array of question objects in questions.js
    if (timeLeft <= 0 || currentQuestionIndex === 5) { // to prevent TypeError BUT MAYBE THIS MAKES SUBTRACTTIME STOPS WORKING WHEN CLICK WRONG CHOICE AT LAST QUESTION??
        showEndScreen();
        clearInterval(timeInterval);
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

        choiceButton.addEventListener('click', function() { // every button has this function but only the button that is clicked would run it! the button that is clicked is choice[i]!
            let chosenAnswer = choice[i]; // when the user clicks on any choice button, that choice IS the chosen answer
            subtractTime(correctAnswer, chosenAnswer);
        });
        choiceButton.addEventListener('click', function() {
            let chosenAnswer = choice[i];
            showFeedback(correctAnswer, chosenAnswer);
        }); 
        choiceButton.addEventListener('click', getQuestion); // to show the next question when clicked
    }

    currentQuestionIndex++;
    console.log(currentQuestionIndex);
}

function subtractTime(correctAnswer, chosenAnswer) { // NOTE: need to pass in both parameters for comparison before penalty
    if (chosenAnswer !== correctAnswer && timeLeft > 14) { // to prevent timer from going into negative seconds
        timeLeft -= 15;
    } else if (chosenAnswer !== correctAnswer && timeLeft <= 14) {
        timeLeft = 0;
    }
    timeElement.textContent = timeLeft; // display timeLeft in timeElement box
}

function showFeedback(correctAnswer, chosenAnswer) {
    feedbackElement.style.visibility = "visible"; 

    if (chosenAnswer === correctAnswer) {
        feedbackElement.textContent = 'Correct! ✅';
    } else if (chosenAnswer !== correctAnswer) {
        feedbackElement.textContent = 'Wrong! ❌';
    }

    setTimeout(function() {
        feedbackElement.style.visibility = "hidden";
    }, 500)
}

function showEndScreen() {
    // hide feedback and questions
    feedbackElement.setAttribute("class", "hide");
    questionsElement.setAttribute("class", "hide");

    // show end screen
    endScreenElement.removeAttribute("class");
    endScreenElement.style.margin = "100px auto 0 auto";
    endScreenElement.style.width = "50%";

    // render timeLeft as final score
    finalScore.textContent = timeLeft; // timeLeft is a string (e.g. "56")
    score = parseInt(finalScore.textContent); // so need to convert string to number
}

// also need to store scores in local object so that i can take them out and display in highscores.html right?
function saveScores() {
    let initial = initialInput.value.trim();

    if (initial !== '') {
        let scoreArray = JSON.parse(window.localStorage.getItem('scoreArray')) || []; // take out scoreArray from local storage if previous scores are there or set to empty array
        // MUST PUT || [] AT THE END FOR NEW SCORE TO BE ADDED TO ARRAY EVERY TIME... WHY??
        let newScore = {
            initial: initial,
            score: score,
        };

        scoreArray.push(newScore); // add newScore to scoreArray every time submit button is clicked
        console.log(scoreArray);

        window.localStorage.setItem('scoreArray', JSON.stringify(scoreArray));

        window.location.href = 'score-record.html';
    }
}

submitButton.addEventListener("click", saveScores); // runs saveScores() every time users click submit