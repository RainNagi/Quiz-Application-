let timer;
let timerDuration = 30;

// Correct Answers for every question
const correctAnswers = {
    1: 'b', // Question 1
    2: 'b', // Question 2
    3: 'c', // Question 3
    4: 'b', // Question 4
    5: 'a', // Question 5
  };

function activateRadio(groupName, radioId) {
    // Activate the radio button when the div with btn class is clicked
    
    var radio = document.getElementById(radioId);
    if (!radio.disabled) {
        radio.checked = true;
    }

}
function startTimer(timerId, questionNumber) {
    let timeLeft = timerDuration;

    timer = setInterval(function () {
        document.querySelector(`#${timerId}`).innerHTML = `<p style="text-align:right;">Time left: ${timeLeft} seconds</p>`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            submitAnswer(questionNumber);
            handleTimeOut(questionNumber);
        }
    }, 1000);
}
function startQuestion() {
    transitionOfOverlays(0, 1);
    startTimer('timer1',1);
}

function questionTransition(questionNumber) {
    transitionOfOverlays(questionNumber - 1, questionNumber);
    startTimer(`timer${questionNumber}`,questionNumber);
}

function transitionOfOverlays(fromOverlayIndex, toOverlayIndex) {
    const fromOverlay = document.querySelector(`.overlay${fromOverlayIndex}`);
    const toOverlay = document.querySelector(`.overlay${toOverlayIndex}`);
    
    fromOverlay.style.animationName = 'exit';
    fromOverlay.addEventListener('animationend', function() {
        this.style.display = 'none';
    });
    
    toOverlay.style.animationName = 'enter';
    toOverlay.style.display = 'block';
}



function submitAnswer(questionNumber) {
    const selectedAnswer = getSelectedAnswer(`choices${questionNumber}`);
    const correctAnswer = correctAnswers[questionNumber];
  
    const answerElement = document.querySelector(`.overlay${questionNumber} .answer`);
    if (selectedAnswer === correctAnswer) {
        answerElement.innerHTML = `<p class="correct">Correct!'</p>`;
    }else if (selectedAnswer === undefined || selectedAnswer === null) {
        answerElement.innerHTML = `<p class="na">No Answer!'</p>`;
    } else {
        answerElement.innerHTML = `<p class="incorrect">Incorrect!'</p>`;
    }
  
    disableRadioButtons(`choices${questionNumber}`);
}
let selectedAnswers = {};

function activateRadio(groupName, radioId) {
    var radio = document.getElementById(radioId);
    if (!radio.disabled) {
        radio.checked = true;
        selectedAnswers[groupName] = radio.value;
    }
}

function getSelectedAnswer(groupName) {
    return selectedAnswers[groupName];
}

function Score() {
    let score = 0;

    for (let questionNumber = 1; questionNumber <= 5; questionNumber++) {
        const selectedAnswer = getSelectedAnswer(`choices${questionNumber}`);
        const correctAnswer = correctAnswers[questionNumber];

        if (selectedAnswer === correctAnswer) {
            score++;
        }
    }
    document.getElementById('score').textContent = score;
    transitionOfOverlays(5, 6);
}   
function handleTimeOut(questionNumber) {

    disableRadioButtons(`choices${questionNumber}`);
}

function disableRadioButtons(groupName) {
    const radioButtons = document.getElementsByName(groupName);
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].disabled = true;
    }
}

function restart() {
    window.location.reload();
}
