let topics = document.getElementById("topicSelect")
let amount = document.getElementById("amountSelect")
let difficulty = document.getElementById("difficultySelect")
let generate_btn = document.getElementById("generate")
let go_btn = document.getElementById("go")

let selected_topic = "";
let selected_difficulty = "";
let selected_amount = 1;

//go button on click
go_btn.addEventListener('click', () => {
    window.location = "../templates/question.html"
}
)

//generate button on click
generate_btn.addEventListener('click', () => {
    //store the user selection of topic
    selected_topic = topics.value
    //store the number of questions selected
    selected_amount = amount.value
    //store the user selection of difficulty
    selected_difficulty = difficulty.value
    //put in local storage
    localStorage.setItem("topic", selected_topic)
    localStorage.setItem("amount", selected_amount)
    localStorage.setItem("difficulty", selected_difficulty)
    //alert
    alert(selected_amount + " question about " + topics.options[topics.selectedIndex].text  + " has been generated!")
}
)

//on page load function
function onPageLoad() {
    localStorage.clear()
}

onPageLoad()




