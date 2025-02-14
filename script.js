// script.js
const correctPassword = 'kutas666';
let clickCount = 0;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let requiredKisses = 5;

const questions = [
    {
        question: "Od kiedy bebostwo?",
        answer: "",
        hint: "Jest to jesieni czas",
        anyAnswerCorrect: true
    },
    {
        question: "Ile już bebostwo?",
        answer: "6",
        hint: "Numer pogby"
    },
    {
        question: "Jest kochaś .... i ....?",
        answer: "Mały i duży",
        hint: "Tak różni a jednak razem"
    },
    {
        question: "Twój ulubiony kolor?",
        answer: "Żółty",
        hint: "Enguje cię tym"
    },
    {
        question: "Moje 3 ulubione to???",
        answer: "Beb ,Lazagn ,sernik",
        hint: "Jedno to wspaniała osoba reszta to jedzenie....."
    },
    {
        question: "Co duży by chciał?",
        answer: "Spokój",
        hint: "Bez chaosu, bez pośpiechu"
    },
    {
        question: "Najlepiej spędzamy czas?",
        answer: "Bebing, syrking i fylm",
        hint: "...ING, ....ING i .y.."
    },
    {
        question: "Dzinki dużego?",
        answer: "16.04.2005",
        hint: "Zapytaj beba"
    },
    {
        question: "Co najczęściej mówię?",
        answer: "",
        hint: "Ugryzienie od świni boli ale to rany po leszczynie goją się dłużej",
        anyAnswerCorrect: true
    },
    {
        question: "Jak sprawiam ci uśmiech?",
        answer: "",
        hint: "Dzięki za kissy",
        anyAnswerCorrect: true
    },
    {
        question: "Nasza przyszła baza?",
        answer: "Gniazdko",
        hint: "Jakbym wsadził tam siura to bym go stracił"
    },
    {
        question: "Pseudonimy taktyczno operacyjne?",
        answer: "Orzeł i orzełek",
        hint: "Mały i duży"
    }
];

function login() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput.value === correctPassword) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        startImageAnimation();
    } else {
        alert('Nieprawidłowe hasło!');
        passwordInput.value = '';
    }
}

function startImageAnimation() {
    const image = document.getElementById('mainImage');
    image.style.opacity = '0.1';
    image.style.transform = 'translate(-50%, -50%) scale(0.1)';
}

document.addEventListener('click', (e) => {
    if (document.getElementById('content').style.display === 'block') {
        clickCount++;
        const image = document.getElementById('mainImage');
        const clickText = document.getElementById('clickText');
        
        image.style.opacity = Math.min(clickCount * 0.2, 1);
        image.style.transform = `translate(-50%, -50%) scale(${0.1 + clickCount * 0.2})`;
        
        if (clickCount >= 5) {
            clickText.style.display = 'none';
            createParticles();
            setTimeout(() => {
                document.getElementById('questionContainer').style.display = 'block';
                showQuestion();
            }, 2000);
        }
    }
});

function createParticles() {
    const colors = ['#ff69b4', '#ff1493', '#ffffff'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = '50%';
        particle.style.top = '50%';
        
        const angle = (Math.random() * Math.PI * 2);
        const distance = Math.random() * 200 + 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('answerInput').value = '';
    } else {
        showResults();
    }
}

function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
    const correctAnswer = currentQuestion.answer.toLowerCase();
    
    if (currentQuestion.anyAnswerCorrect || userAnswer === correctAnswer) {
        correctAnswers++;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    } else {
        alert('Spróbuj jeszcze raz!');
    }
}

function showHint() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('hintText').textContent = currentQuestion.hint;
    document.getElementById('requiredKisses').textContent = requiredKisses;
    document.getElementById('hintModal').style.display = 'block';
    requiredKisses++;
}

function closeHint() {
    document.getElementById('hintModal').style.display = 'none';
}

function showResults() {
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('heartProgress').style.display = 'block';
    
    const score = (correctAnswers / questions.length) * 100;
    animateProgress(score);
}

function animateProgress(score) {
    let current = 0;
    const interval = setInterval(() => {
        current += 1;
        document.getElementById('heartFill').style.height = `${current}%`;
