let questionIndex = 0;

function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const progress = ((questionIndex + 1) / totalQuestions) * 100; // `totalQuestions` should be defined globally
    progressBar.style.width = progress + '%';
}

function nextQuestion() {
    if (questionIndex < totalQuestions - 1) {
        questionIndex++;
        document.getElementById(`question-${questionIndex}`).style.display = 'block';
        document.getElementById(`question-${questionIndex - 1}`).style.display = 'none';
        updateProgress();
    }
}

window.onload = () => {
    document.getElementById('question-0').style.display = 'block';
    updateProgress();
};
