let currentQuestion = 0;
let score = 0;
let studentData = {};
let questions = [];

fetch("questions.json")
  .then(res => res.json())
  .then(data => { questions = shuffleArray(data); });

document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  studentData.name = document.getElementById("name").value;
  studentData.roll = document.getElementById("roll").value;
  studentData.email = document.getElementById("email").value;
  studentData.mobile = document.getElementById("mobile").value;
  document.getElementById("studentForm").style.display = "none";
  document.getElementById("quizContainer").style.display = "block";
  loadQuestion();
});

function loadQuestion() {
  const q = questions[currentQuestion];
  const box = document.getElementById("questionBox");
  box.innerHTML = `<h3>${q.question}</h3>`;
  q.options.forEach((opt, idx) => {
    box.innerHTML += `<button onclick="checkAnswer(${idx})">${opt}</button><br/>`;
  });
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll("#questionBox button");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.answer) btn.classList.add("correct");
    else if (idx === selected) btn.classList.add("wrong");
  });

  if (selected === q.answer) score++;
  document.getElementById("questionBox").innerHTML += `<p><strong>ব্যাখ্যা:</strong> ${q.explanation}</p>`;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quizContainer").style.display = "none";
  document.getElementById("resultContainer").style.display = "block";
  document.getElementById("score").innerText = `আপনার স্কোর: ${score} / ${questions.length}`;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
