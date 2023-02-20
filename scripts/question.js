const api_url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
const randGeneratedAr = []
const randGeneratedAr2 = []

let current_question = 0;
let questionList = "";
let question_text = document.getElementById('question')
let a_text = document.getElementById('a_text')
let b_text = document.getElementById('b_text')
let c_text = document.getElementById('c_text')
let d_text = document.getElementById('d_text')
let answers_list = document.querySelectorAll('.answer')
let answer_texts = [a_text, b_text, c_text, d_text]
let feedback_container = document.getElementById('feedback')
let feedback_text = document.getElementById('feedback_text')
let submit_btn = document.getElementById('submit')
let next_btn = document.getElementById('next')

async function getQuestions() {
    // Making an API call (request)and getting the response back
    const response = await fetch(api_url);
    // Parsing it to JSON format
    const data = await response.json();
    questionList = data.results
    //After we get the response from the API, load the question
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
    let current_question_data = questionList[current_question];
    question_text.innerText = current_question_data.question;
    let answer_choices = [
        current_question_data.correct_answer,
        current_question_data.incorrect_answers[0],
        current_question_data.incorrect_answers[1],
        current_question_data.incorrect_answers[2],
    ]
    //call the function to shuffle the answers 
    shuffleAnswers(answer_choices)
}

//function to assign an answer from the API with a random letter (a, b, c, d)
function shuffleAnswers(answer_choices) {
    let amount = answer_choices.length;
    while (amount) {
        let answerTextIndex = Math.floor(Math.random() * 4);
        let answerChoiceIndex = Math.floor(Math.random() * 4);
        if (randGeneratedAr.includes(answerTextIndex) || randGeneratedAr2.includes(answerChoiceIndex)) {
            continue;
        }
        randGeneratedAr.push(answerTextIndex);
        randGeneratedAr2.push(answerChoiceIndex);
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
    let answer = selectedLabel.innerHTML
    let current_question_data = questionList[current_question];
    if (answer != '') {
        //disabled the button once an answer is selected
        submit_btn.disabled = true
        //show the container for feedback
        feedback_container.style.display = ""
        //If the answer is correct, display feedback
        if (answer == current_question_data.correct_answer) {
            feedback_text.textContent = 'Your answer is correct'
        } else {
            feedback_text.textContent = 'The correct answer is ' + current_question_data.correct_answer + "!"
        }
    }
})

//next question
next_btn.addEventListener('click', () => {
    //move on to the next question
    current_question++
    if (current_question < 10) {
        loadQuestion()
    //If run out of question 
    } else {

    }
})

getQuestions()