/*fetch('./questions.json')
    .then(response => response.json())
    .then(data => {
        const questions = data;
        console.log(questions);
        
        startQuiz(questions);
    })
    .catch(error => console.error('Erreur lors de la récupération du fichier JSON:', error)); */

let questions = [
  {
    question:
      "Quelle est la principale cause de la montée du niveau des océans ?",
    reponses: [
      { chaine: "La déforestation", is_correct: false },
      { chaine: "La fonte des glaciers", is_correct: true },
      { chaine: "L'augmentation de la salinité de l'eau", is_correct: false },
    ],
  },
  {
    question: "Quel est le plus grand océan du monde ?",
    reponses: [
      { chaine: "L'océan Atlantique", is_correct: false },
      { chaine: "L'océan Pacifique", is_correct: true },
      { chaine: "L'océan Indien", is_correct: false },
    ],
  },
  {
    question: "Quelle proportion de la planète est recouverte par les océans ?",
    reponses: [
      { chaine: "50%", is_correct: false },
      { chaine: "70%", is_correct: true },
      { chaine: "90%", is_correct: false },
    ],
  },
  {
    question:
      "Quel est l'impact principal de la pollution plastique sur les océans ?",
    reponses: [
      { chaine: "Augmentation de la température de l'eau", is_correct: false },
      { chaine: "Menace pour la faune marine", is_correct: true },
      { chaine: "Réduction des vagues", is_correct: false },
    ],
  },
  {
    question:
      "Quel organisme marin est particulièrement menacé par le réchauffement climatique ?",
    reponses: [
      { chaine: "Les méduses", is_correct: false },
      { chaine: "Les coraux", is_correct: true },
      { chaine: "Les dauphins", is_correct: false },
    ],
  },
  {
    question: "Quelle est la principale source de pollution des océans ?",
    reponses: [
      { chaine: "Les activités agricoles", is_correct: false },
      { chaine: "Les déversements d'hydrocarbures", is_correct: false },
      { chaine: "Les déchets plastiques", is_correct: true },
    ],
  },
  {
    question: "Quel est l'effet principal de l'acidification des océans ?",
    reponses: [
      { chaine: "Le blanchissement des coraux", is_correct: true },
      { chaine: "La disparition des poissons", is_correct: false },
      { chaine: "La disparition des plages", is_correct: false },
    ],
  },
  {
    question:
      "Quel est le rôle des mangroves dans la préservation des écosystèmes marins ?",
    reponses: [
      { chaine: "Elles purifient l'eau des océans", is_correct: false },
      {
        chaine:
          "Elles agissent comme des barrières naturelles contre les tempêtes",
        is_correct: true,
      },
      { chaine: "Elles produisent des vagues", is_correct: false },
    ],
  },
  {
    question:
      "Quelle est la principale action pour lutter contre la surpêche ?",
    reponses: [
      { chaine: "Augmenter la taille des bateaux de pêche", is_correct: false },
      { chaine: "Instaurer des zones marines protégées", is_correct: true },
      {
        chaine: "Introduire des espèces marines dans de nouveaux océans",
        is_correct: false,
      },
    ],
  },
];


function startQuiz(questions) {
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const questionIndexElement = document.getElementById("question-index");
  const progressBarElement = document.getElementById("progress-bar");
  const scoreContainer = document.getElementById("score-container");
  const scoreElement = document.getElementById("score");
  const replayButton = document.getElementById("replay-btn");

  let currentQuestionIndex = 0;
  let score = 0;
  let answerSelected = false;

  startQuiz();

  replayButton.addEventListener("click", () => {
    scoreContainer.classList.add("hide");
    questionElement.classList.remove("hide");
    answerButtonsElement.classList.remove("hide");
    startQuiz();
  });

  function startQuiz() {
    currentQuestionIndex = 0;
    nextButton.classList.add("hide");
    showQuestion(questions[currentQuestionIndex]);
    updateProgress();
  }

  function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = "";
    console.log(question);

    question.reponses.forEach((answer) => {
      console.log(answer);

      const button = document.createElement("button");
      button.innerText = answer.chaine;
      button.classList.add("btn");
      if (answer.is_correct) {
        button.dataset.is_correct = answer.is_correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    });
    questionIndexElement.innerText = `Question ${
      currentQuestionIndex + 1
    } sur ${questions.length}`;
    answerSelected = false;
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.is_correct === "true";
    if (correct) {
      selectedButton.style.backgroundColor = "green";
      selectedButton.classList.add("correct-answer-animation");
      score += 1;
      setTimeout(() => {
        moveToNextQuestion();
      }, 1000);
    } else {
      selectedButton.style.backgroundColor = "red";

      Array.from(answerButtonsElement.children).forEach((button) => {
        if (button.dataset.is_correct === "true") {
          button.classList.add("correct-answer-animation");
          button.style.backgroundColor = "green";
        }
      });
    }
    Array.from(answerButtonsElement.children).forEach((button) => {
      button.disabled = true;
    });
    nextButton.classList.remove("hide");
    answerSelected = true;
  }

  nextButton.addEventListener("click", () => {
    if (!answerSelected) {
      Array.from(answerButtonsElement.children).forEach((button) => {
        if (button.dataset.is_correct === "true") {
          button.classList.add("correct-answer-animation");
          button.style.backgroundColor = "green";
        }
        button.disabled = true;
      });
      setTimeout(() => {
        moveToNextQuestion();
      }, 1000);
    } else {
      moveToNextQuestion();
    }
  });

  function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
      updateProgress();
    } else {
      showScore();
    }
    nextButton.classList.add("hide");
  }

  function updateProgress() {
    const progressPercentage =
      ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBarElement.style.width = progressPercentage + "%";
  }

  function showScore() {
    questionElement.classList.add("hide");
    answerButtonsElement.classList.add("hide");
    scoreContainer.classList.remove("hide");
    scoreElement.innerText = `${score} / ${questions.length}`;
  }
}
