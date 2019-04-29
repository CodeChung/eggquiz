let questionNumber = 1;
let score = 0;

function clearMain(element) {
    //wipes main section
    $(element).closest('main').empty();
}

function displayQuestion() {
    //writes question in banner
    $('.question-number').html(`Question: ${questionNumber}/10`)
}

function displayScore() {
    //writes score in banner
    $('.scoreboard').html(`Score: ${score}`)
}

function generateQuizChoices(answers) {
    //creates quiz labels and inputs
    let answerHTML = answers.map(answer => 
        `<label class="choiceOption">
            <input type="radio" value="${answer}" name="choice" required>
            <span>${answer}</span>
        </label>
        `);
    return answerHTML.join("");
}

function generateQuizForm() {
    //creates the quiz form html
    let question = quizList[questionNumber - 1];
    let choices = generateQuizChoices(question.choices);
    $('main').append(
        `<form>
            <fieldset>
                <legend>${question.question}</legend>
                ${choices}
            </fieldset>
            <button class="submitButton" type="submit">Submit</button>
        </form>
        `
        );
}

function showQuizElement() {
    //displays quiz question and answer on main screen
    if (questionNumber == 11) {
        endQuiz();
    } else {
        generateQuizForm()
    }
}


function beginQuiz() {
    //begins quiz when get started button is pressed.
    $('main').on('click', '.get-started', function(event) {
        clearMain(event.currentTarget);
        displayQuestion();
        displayScore();
        showQuizElement();
    })
}

function chooseAnswer() {
    $('main').on('submit','form', function(event) {
        event.preventDefault();
        console.log('answer chosen');
    })
}

function endQuiz() {
    //shows final score and option to restart
    console.log('ended');
}
function generateQuiz() {
    //run quiz functions
    beginQuiz();
    chooseAnswer();
}

$(generateQuiz)