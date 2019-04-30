let questionNumber = 1;
let questionSet = quizList[questionNumber - 1];
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
    let choices = generateQuizChoices(questionSet.choices);
    $('main').append(
        `<form class="unanswered">
            <fieldset>
                <legend>${questionSet.question}</legend>
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

function updateScore() {
    //increments and updates score
    score++;
    displayScore();
}

function displayNiceMessage() {
    //displays this message if user gets the correct answer
    const messages = ["Eggcellent answer", "That's eggsactly right", "Eggs-eptional! Keep it up."]
    $('legend').html(`${messages[Math.floor(Math.random()*messages.length)]}`);
}

function displayRightAnswer() {
    //displays the correct answer if user chooses the incorrect answer
    $('legend').html(`Sorry, the answer is: ${questionSet.answer}`)
}

function changeSubmitButton() {
    //after submitting answer, switch submit button to continue button
    $('button.submitButton').html('Continue').addClass('continueButton').removeClass('submitButton');
}

function chooseAnswer() {
    //updates DOM after submitting answer
    $('main').on('submit','form.unanswered', function(event) {
        event.preventDefault();  
        $(this).toggleClass("unanswered");
        $(this).toggleClass("answered");
        let answer = $('form input:checked').val();
        if (answer == questionSet.answer) {
            updateScore();
            displayNiceMessage();
        } else {
            displayRightAnswer();
        }
        changeSubmitButton();
    });
}

function updateQuestionNumber() {
    //updates question number
    questionNumber++;
    displayQuestion();
}

function nextQuestion() {
    //changes question when user clicks continue
    $('main').on('submit', 'form.answered', function(event) {
        event.preventDefault();
        updateQuestionNumber();
        $(this).toggleClass("answered");
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
    nextQuestion();
    //add a next question function for when we press continue
}

$(generateQuiz)