import fs from 'fs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, gender, age, country, score } = req.body;

            // Чтение существующих данных из файла
            let data = [];
            try {
                const fileContent = await fs.promises.readFile('data.json', 'utf8');
                data = JSON.parse(fileContent);
            } catch (err) {
                console.log('Файл не найден, создаем новый...');
            }

            // Добавляем новые данные
            data.push({ email, gender, age, country, score });

            // Записываем обновленные данные в файл
            await fs.promises.writeFile('data.json', JSON.stringify(data, null, 2));

            res.status(200).send('OK');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
