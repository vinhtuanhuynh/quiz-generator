let topics = document.getElementById("topicSelect")
let amount = document.getElementById("amountSelect")
let difficulty = document.getElementById("difficultySelect")
let generate_btn = document.getElementById("generate")

let selected_topic = ""
let selected_difficulty = ""
let selected_amount = 0

//Generate button on click
generate_btn.addEventListener('click', () => {
    //Store the user selection of topic
    selected_topic = topics.value
    //Store the number of questions selected
    selected_amount = amount.value
    //Store the user selection of difficulty
    selected_difficulty = difficulty.value
    localStorage.setItem("topic", selected_topic)
    localStorage.setItem("amount", selected_amount)
    localStorage.setItem("difficulty", selected_difficulty)
    window.location = "../templates/question.html"
}
)

