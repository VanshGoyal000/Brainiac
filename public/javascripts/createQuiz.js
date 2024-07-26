let questionIndex = 0;

function addQuestion() {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-block');
    questionDiv.innerHTML = `
        <label>Question:</label>
        <input type="text" name="questions[${questionIndex}][text]" required>
        <div>
            <label>Option 1:</label>
            <input type="text" name="questions[${questionIndex}][options][]" required>
            <label>Option 2:</label>
            <input type="text" name="questions[${questionIndex}][options][]" required>
            <label>Option 3:</label>
            <input type="text" name="questions[${questionIndex}][options][]" required>
            <label>Option 4:</label>
            <input type="text" name="questions[${questionIndex}][options][]" required>
        </div>
        <label>Correct Option:</label>
        <select name="questions[${questionIndex}][correctAnswer]">
            <option value="0">Option 1</option>
            <option value="1">Option 2</option>
            <option value="2">Option 3</option>
            <option value="3">Option 4</option>
        </select>
        <hr>
    `;
    document.getElementById('questions').appendChild(questionDiv);
    questionIndex++;
}
