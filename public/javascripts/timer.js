let timeLeft = quizTimeLimit * 60; // `quizTimeLimit` should be defined globally
let timerInterval;

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.innerHTML = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(timerInterval);
        document.getElementById('quizForm').submit();
    }
}

window.onload = () => {
    timerInterval = setInterval(updateTimer, 1000);
};
