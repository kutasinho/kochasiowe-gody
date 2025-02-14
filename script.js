let clickCount = 0;
const maxClicks = 5;
const questions = [
    "Od kiedy bebostwo?",
    "Ile już bebostwo?",
    "Jest kochaś .... i ....?",
    "Twój ulubiony kolor?",
    "Moje 3 ulubione to???",
    "Co duży by chciał?",
    "Najlepiej spędzamy czas?",
    "Dzinki dużego?",
    "Co najczęściej mówię?",
    "Jak sprawiam ci uśmiech?",
    "Nasza przyszła baza?",
    "Pseudonimy taktyczno operacyjne?"
];
const answers = [
    "Tutaj każda odpowiedź będzie dobra",
    "6",
    "Mały i duży",
    "Żółty",
    "Beb, Lazagn, sernik",
    "Spokój",
    "Bebing, syrking i fylm",
    "16.04.2005",
    "Tu każda odpowiedź dobra",
    "Tutaj każda odpowiedź jest dobra",
    "Gniazdko",
    "Orzeł i orzełek"
];
let currentQuestionIndex = 0;
let correctAnswers = 0;

document.getElementById('main-image').addEventListener('click', function() {
    clickCount++;
    if (clickCount <= maxClicks) {
        const scale = 1 + (clickCount * 0.2);
        this.style.transform = `scale(${scale})`;
    } else {
        particlesJS.load('particles-js', 'particles.json', function() {
            setTimeout(() => {
                document.getElementById('particles-js').style.display = 'none';
                document.getElementById('question-container').classList.remove('hidden');
                showQuestion();
            }, 2000);
        });
    }
});

function showQuestion() {
    document.getElementById('question-header').innerText = questions[currentQuestionIndex];
}

function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
    const correctAnswer = answers[currentQuestionIndex].toLowerCase();
    if (userAnswer === correctAnswer) {
        correctAnswers++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showCertificate();
    }
}

function showCertificate() {
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('certificate-container').classList.remove('hidden');
    const score = (correctAnswers / questions.length) * 100;
    document.getElementById('certificate-score').innerText = `${score}%`;
}
