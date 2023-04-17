const data = [
    {
        id: 1,
        question:
            "Что можно было использовать в качестве глушителя в игре Postal?",
        answers: [
            { answer: "Пакет", isCorrect: false },
            { answer: "Подушку", isCorrect: false },
            { answer: "Бутылку", isCorrect: false },
            { answer: "Кошку", isCorrect: true },
        ],
    },
    {
        id: 2,
        question: "За представителя какой рассы можно было сыграть в Sacred?",
        answers: [
            { answer: "Камаэль", isCorrect: false },
            { answer: "Серафим", isCorrect: true },
            { answer: "Орк", isCorrect: false },
            { answer: "Хоббит", isCorrect: false },
        ],
    },
    {
        id: 3,
        question:
            "В каком дополнении к The Sims 3 появилась система праздников?",
        answers: [
            { answer: "Студенческая жизнь", isCorrect: false },
            { answer: "Времена года", isCorrect: true },
            { answer: "Райские острова", isCorrect: false },
            { answer: "Снежные просторы", isCorrect: false },
        ],
    },
];

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const submit = document.querySelector(".submit");
const play = document.querySelector(".play");

let qIndex = 0;
let correctAnswersCount = 0;
let wrongAnswersCount = 0;
let total = 0;
let selectedAnswer;

const playAgain = () => {
    play.addEventListener("click", () => {
        qIndex = 0;
        correctAnswersCount = 0;
        wrongAnswersCount = 0;
        total = 0;

        resultScreen.style.display = "none";
        gameScreen.style.display = "block";

        showQuestion(qIndex);
    });
};

const showResult = () => {
    resultScreen.style.display = "flex";
    gameScreen.style.display = "none";

    resultScreen.querySelector(
        ".correct"
    ).textContent = `Правильные ответы: ${correctAnswersCount}`;
    resultScreen.querySelector(
        ".wrong"
    ).textContent = `Неправильные ответы: ${wrongAnswersCount}`;
    resultScreen.querySelector(".score").textContent = `Результат: ${
        (correctAnswersCount - wrongAnswersCount) * 10
    } очков`;
};

const showQuestion = (qNumber) => {
    if (qIndex === data.length) return showResult();
    selectedAnswer = null;
    question.textContent = data[qNumber].question;
    answersContainer.innerHTML = data[qNumber].answers
        .map(
            (answer, i) => `
    <div class="answer">
        <input type="radio" name="answer" id=${i} value=${answer.isCorrect}>
        <label for=${i}>${answer.answer}</label>
    </div>
    `
        )
        .join("");

    selectAnswer();
};

const selectAnswer = () => {
    answersContainer.querySelectorAll("input").forEach((el) => {
        el.addEventListener("click", (e) => {
            selectedAnswer = e.target.value;
        });
    });
};

const submitAnswer = () => {
    submit.addEventListener("click", () => {
        if (selectedAnswer !== null) {
            selectedAnswer === "true"
                ? correctAnswersCount++
                : wrongAnswersCount++;
            qIndex++;
            showQuestion(qIndex);
        } else {
            alert("Select an answer");
        }
    });
};

showQuestion(qIndex);
submitAnswer();
playAgain();
