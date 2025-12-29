
const quizBox = document.querySelector(".quizBox"),
      questionNum = document.querySelector(".questionNum"),
      scoreText = document.querySelector(".score"),
      questionText = document.querySelector(".questionText"),
      questionList = document.querySelector(".list-group"),
      nextBtn = document.querySelector(".nextBtn"),
      resultBox = document.querySelector(".resultBox"),
      finalScore = document.querySelector(".finalScore")


let questions = [];
let currentIndex = 0;
let score = 0   

async function getAllQuestion(){
    const {data: res} = await axios.get('http://localhost:2210/questions')
    questions = res

    showQuestion()
}

const showQuestion = function () {
    const question = questions[currentIndex]
    questionText.textContent = question.question
    questionList.textContent = ''
    scoreText.textContent = score 

    question.options.forEach((el, index) => {
        let li = document.createElement("li")
        li.className = "list-group-item list-group-item-action"
        li.textContent = el

        li.onclick = () => setAnswer(li, index)

        questionList.appendChild(li)
    })


}

function setAnswer(el, index){
    console.log(el);
    const correctIndex = questions[currentIndex].correctAnswer
    if(questionList){
        [...questionList.children].forEach(li => li.onclick = null)

    }
    if(index === correctIndex) {
        el.classList.add('list-group-item-success')
        score += questions[correctIndex].points
    } 
    else{
        el.classList.add('list-group-item-danger')
        questionList.children[correctIndex].classList.add('list-group-item-success')
    }

    nextBtn.classList.remove('d-none')
}

nextBtn.onclick = () => {
    currentIndex++
    if(currentIndex < questions.length){
        showQuestion()
    }
    else {
        showResult()
    }
}

function showResult(){
    resultBox.classList.remove('d-none')
    quizBox.classList.add('d-none')
    finalScore.textContent = `
        Score ${score}/${questions.reduce((accum, curItem) => accum + curItem.points, 0)}
    `
}

getAllQuestion();