const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Plus Ultra vem de?',
        choice1: 'Kimetsu no Yaiba',
        choice2: 'Naruto',
        choice3: 'Boku no Hero',
        choice4: 'Bleach',
        answer: 3,
    },
    {
        question: "Qual o nome da Mãe do Naruto?",
        choice1: "Kushina",
        choice2: "Temari",
        choice3: "Sakura",
        choice4: "Hinata",
        answer: 1,
    },
    {
        question: "Qual anime famoso contém 1000 episódios?",
        choice1: "Naruto",
        choice2: "Dragon Ball Z",
        choice3: "One Piece",
        choice4: "Kimetsu no Yaiba",
        answer: 3,
    },
    {
        question: "Qual o nome do estilo mais visto de anime?",
        choice1: "Seinen",
        choice2: "Shounen",
        choice3: "School",
        choice4: "Sports",
        answer: 2,
    },
    {
        question: "No Brasil, qual o anime mais falado pela maioria?",
        choice1: "Kuroko no Basket",
        choice2: "Haikyuu",
        choice3: "Naruto",
        choice4: "Inazuma Eleven",
        answer: 3,
    },
    {
        question: "Qual desses animes contém um jogo?",
        choice1: "Ao Haru Ride",
        choice2: "Kimetsu no Yaiba",
        choice3: "Haikyuu",
        choice4: "One Piece",
        answer: 4,
    },
    {
        question: "Qual a frase que o Naruto sempre diz?",
        choice1: "Eu serei o rei dos piratas",
        choice2: "Respiração da Fera - Sétima Forma",
        choice3: "Esse é o meu jeito ninja de ser!",
        choice4: "Plus ultra!",
        answer: 3,
    },
    {
        question: "Shingeki no Kyojin é um anime sobre",
        choice1: "Ninjas",
        choice2: "Titans",
        choice3: "Piratas",
        choice4: "Espadachins",
        answer: 2,
    },
    {
        question: "Sakura, de Naruto, tem o cabelo",
        choice1: "Rosa",
        choice2: "Loiro",
        choice3: "Azul",
        choice4: "Verde",
        answer: 1,
    },
    {
        question: "Qual desses animes é sobre cartas?",
        choice1: "Yu gi Oh!",
        choice2: "Bleach",
        choice3: "One Piece",
        choice4: "Bakugan",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()