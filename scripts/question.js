const api_url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

let current_question = 0;
let score = 0;
let questionList = "";
let question_text = document.getElementById('question')
let a_text = document.getElementById('a_text')
let b_text = document.getElementById('b_text')
let c_text = document.getElementById('c_text')
let d_text = document.getElementById('d_text')

async function getQuestions() {
    // Making an API call (request)and getting the response back
    const response = await fetch(api_url);
    // Parsing it to JSON format
    const data = await response.json();
    questionList = data.results
}

getQuestions()