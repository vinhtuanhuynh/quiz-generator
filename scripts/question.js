const api_url = "https://opentdb.com/api.php?amount=" + localStorage.getItem("amount") +
                "&category=" + localStorage.getItem("topic") +
                "&difficulty=" + localStorage.getItem("difficulty") +
                "&type=multiple";
const randGeneratedAr = []
const randGeneratedAr2 = []

let score = 0
//question and answers related variables
let questionList = "";
let curr_question_index = 0;
let question_text = document.getElementById('question');
let a_text = document.getElementById('a_text');
let b_text = document.getElementById('b_text');
let c_text = document.getElementById('c_text');
let d_text = document.getElementById('d_text');
let num_choices = 4;
let answers_list = document.querySelectorAll('.answer');
let answer_texts = [a_text, b_text, c_text, d_text];
let feedback_text = document.getElementById('feedback_text');
//containers
let feedback_container = document.getElementById('feedback');
let quiz_container = document.getElementById('quiz');
//buttons
let submit_btn = document.getElementById('submit');
let next_btn = document.getElementById('next');

//API call
async function getQuestions() {
    //making an API call (request)and getting the response back
    const response = await fetch(api_url);
    //parsing it to JSON format
    const data = await response.json();
    questionList = data.results
    //after we get the response from the API, load the question
    loadQuestion();
}

//function to load the question from the API into the created html
function loadQuestion() {
    deSelectAnswers()
    //hide the feedback container
    feedback_container.style.display = "none"
    //re-enable the submit button
    submit_btn.disabled = false
    //get the data of the current question and display to html
    let current_question_data = questionList[curr_question_index];
    //replace the following character from the API
    let curr_question = current_question_data.question
    curr_question = curr_question.replace(/&quot;|&#039;|&ldquo;|&rdquo;/gi,"'");
    curr_question = curr_question.replace(/&amp;/gi, '&');
    question_text.innerText = curr_question
    let answer_choices = [
        current_question_data.correct_answer,
        current_question_data.incorrect_answers[0],
        current_question_data.incorrect_answers[1],
        current_question_data.incorrect_answers[2],
    ]
    //call the function to shuffle the answers 
    shuffleAnswers(answer_choices)
}

//function to assign an answer from the API with a random choice (a, b, c, d)
function shuffleAnswers(answer_choices) {
    let amount = num_choices
    while (amount) {
        let answerTextIndex = Math.floor(Math.random() * num_choices);
        let answerChoiceIndex = Math.floor(Math.random() * num_choices);
        if (randGeneratedAr.includes(answerTextIndex) || randGeneratedAr2.includes(answerChoiceIndex)) {
            continue;
        }
        randGeneratedAr.push(answerTextIndex);
        randGeneratedAr2.push(answerChoiceIndex);
        //assigning the answers to a, b, c or d
        answer_texts[answerTextIndex].innerText = answer_choices[answerChoiceIndex];
        amount--;
    }
    randGeneratedAr.length = 0
    randGeneratedAr2.length = 0
}

//remove check from all the option when loading a new question
function deSelectAnswers() {
    //uncheck all option
    answers_list.forEach(option => {
        option.checked = false;
    })
}

//get the answer the user selected
function getSelected() {
    let answer_id = '';
    answers_list.forEach((option) => {
        if (option.checked) {
            //id is a, b, c or d
            answer_id = option.id;
        }
    })
    return answer_id
}

//submit button on click
submit_btn.addEventListener('click', () => {
    let answer_id = getSelected();
    let selector = 'label[for=' + answer_id + ']';
    let selectedLabel = document.querySelector(selector);
    let answer = selectedLabel.innerHTML;
    let current_question_data = questionList[curr_question_index];
    if (answer != '') {
        //disabled the button once an answer is selected
        submit_btn.disabled = true;
        //show the container for feedback
        feedback_container.style.display = "";
        //If the answer is correct, display feedback
        if (answer == current_question_data.correct_answer) {
            feedback_text.textContent = 'Your answer is correct';
            score++;
        } else {
            feedback_text.textContent = 'The correct answer is ' + current_question_data.correct_answer + "!";
        }
    }
})

//next question
next_btn.addEventListener('click', () => {
    //move on to the next question
    curr_question_index++
    if (curr_question_index < localStorage.getItem("amount")) {
        loadQuestion();
    //if run out of question 
    } else {
        quiz_container.innerHTML = `
        <h2>Your score is ${score}/${localStorage.getItem("amount")}</h2>
        `;
    }
})

//on page load
getQuestions();