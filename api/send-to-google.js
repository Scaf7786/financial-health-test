export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, gender, age, country, score } = req.body;

            // Отправляем данные в Google Apps Script
            await fetch('https://script.google.com/macros/s/AKfycbxvNsWQpyhvMwC_aL4Yrqgz-82bBm1yPy9ENWR_nvO5NowakmUfYaw8mPpO929rqhY3cQ/exec', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, gender, age, country, score })
            });

            res.status(200).send('OK');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}