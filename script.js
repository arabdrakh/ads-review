// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const btn = document.querySelector('.theme-toggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        btn.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        const btn = document.querySelector('.theme-toggle');
        if (btn) btn.textContent = '☀️ Light Mode';
    }
});

// Quiz functionality
function checkQuiz(quizId) {
    const quiz = document.getElementById(quizId);
    const questions = quiz.querySelectorAll('.quiz-question');
    let correct = 0;
    let total = questions.length;
    
    questions.forEach((q, index) => {
        const options = q.querySelectorAll('.quiz-option');
        const selected = q.querySelector('input:checked');
        const correctAnswer = q.dataset.answer;
        
        options.forEach(opt => {
            opt.classList.remove('correct', 'incorrect');
            const input = opt.querySelector('input');
            
            if (input.value === correctAnswer) {
                opt.classList.add('correct');
            } else if (input.checked) {
                opt.classList.add('incorrect');
            }
        });
        
        if (selected && selected.value === correctAnswer) {
            correct++;
        }
    });
    
    const result = quiz.querySelector('.quiz-result');
    const percentage = Math.round((correct / total) * 100);
    
    result.innerHTML = `You got <strong>${correct}/${total}</strong> (${percentage}%)`;
    result.style.background = percentage >= 70 ? '#d1fae5' : '#fee2e2';
    result.style.color = percentage >= 70 ? '#065f46' : '#991b1b';
    result.classList.add('show');
    
    if (document.body.getAttribute('data-theme') === 'dark') {
        result.style.background = percentage >= 70 ? '#064e3b' : '#7f1d1d';
        result.style.color = percentage >= 70 ? '#6ee7b7' : '#fca5a5';
    }
}

// Reset quiz
function resetQuiz(quizId) {
    const quiz = document.getElementById(quizId);
    const options = quiz.querySelectorAll('.quiz-option');
    const inputs = quiz.querySelectorAll('input');
    const result = quiz.querySelector('.quiz-result');
    
    options.forEach(opt => opt.classList.remove('correct', 'incorrect'));
    inputs.forEach(inp => inp.checked = false);
    result.classList.remove('show');
}
