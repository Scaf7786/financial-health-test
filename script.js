// script.js

document.getElementById('testForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Подсчет баллов
    const questions = ['q1', 'q2']; // Добавьте остальные вопросы
    let totalScore = 0;

    questions.forEach(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected) {
            totalScore += parseInt(selected.value);
        }
    });

    // Получение личных данных
    const email = document.querySelector('input[name="email"]').value;
    const gender = document.querySelector('select[name="gender"]').value;
    const age = document.querySelector('input[name="age"]').value;
    const country = document.querySelector('input[name="country"]').value;

    // Отображение результатов
    document.getElementById('totalScore').textContent = totalScore;
    document.getElementById('results').style.display = 'block';

    // Генерация диаграммы
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Финансовое здоровье'],
            datasets: [{
                label: 'Баллы',
                data: [totalScore],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Отправка данных в Google Sheets
    sendDataToGoogleSheets(email, gender, age, country, totalScore);
});

function sendDataToGoogleSheets(email, gender, age, country, score) {
    fetch('AKfycby77wK107_au0L4W4yoEHaJtuOQPz2-7_6DHSfXj3MThVD37qwtDHRNVNXgzF8DxMaAFQ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, gender, age, country, score })
    }).then(response => console.log('Данные отправлены:', response));
}