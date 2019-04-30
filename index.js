let questionNumber = 0;
let questionSet = quizList[0];
let score = 0;

function clearMain(element) {
    //wipes main section
    $(element).closest('main').empty();
}

function displayQuestion() {
    //writes question in banner
    if (questionNumber <= 10) {
        $('.question-number').html(`Question: ${questionNumber}/10`);
    } else {
        $('.question-number').html();
    }
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

function updateQuestionSet() {
    if (questionNumber > 0) {
        questionSet = quizList[questionNumber - 1];
    }
}

function generateQuizForm() {
    //creates the quiz form html
    updateQuestionSet();
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
    $('main').on('click', '.next-page', function(event) {
        clearMain(event.currentTarget);
        updateQuestionNumber();
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
    $('button.submitButton').html('Continue').addClass('.next-page').removeClass('submitButton');
}

function submitAnswer() {
    //updates DOM after submitting answer
    $('main').on('submit','form.unanswered', function(event) {
        event.preventDefault();  
        $(this).toggleClass("unanswered");
        $(this).toggleClass("next-page");
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
}

function endQuiz() {
    //shows final score and option to restart
    if (score > 6) {
        $('main').append(
            `<h2>Congratulations, You scored ${score} out of 10</h2>
            <img src="images/eggs-transparent-sunny-side-up-4.png" alt="congratulatory sunny side up egg">
            <button><a href="index.html">Retry?</a></button>`
        );
    } else {
        $('main').append(
            `<h2>Oops, You only scored ${score} out of 10</h2>
            <img src="images/cracked.png" alt="sad cracked egg">
            <button><a href="index.html">Retry?</a></button>`
        );
    }
}

function clickAnswer() {
    //got rid of ugly radio buttons and decided to use entire label as button
    //highlights answer when input is clicked
    $('main').on('click', '.choiceOption', function(event) {
        console.log('clicked');
        $(this).addClass('clicked');
        $(this).siblings().removeClass('clicked');
    })
}

function generateQuiz() {
    //run quiz functions
    beginQuiz();
    clickAnswer();
    submitAnswer();
}

$(generateQuiz)