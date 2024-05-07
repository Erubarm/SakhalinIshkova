const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// Маршрут для получения отзывов
app.get('/reviews', (req, res) => {
	fs.readFile(path.join(__dirname, 'reviews.json'), 'utf8', (err, data) => {
		if (err) {
			return res.status(500).send('Ошибка при чтении файла с отзывами')
		}
		res.json(JSON.parse(data))
	})
})

// Маршрут для отправки отзыва
// Маршрут для отправки отзыва
app.post('/submit-review', (req, res) => {
	const newReview = {
		...req.body,
		date: new Date().toISOString(), // Добавление текущей даты в формате ISO
	}
	fs.readFile(path.join(__dirname, 'reviews.json'), 'utf8', (err, data) => {
		if (err) {
			return res.status(500).send('Ошибка при чтении файла с отзывами')
		}
		const reviews = JSON.parse(data)
		reviews.unshift(newReview) // Добавление нового отзыва в начало массива
		fs.writeFile(
			path.join(__dirname, 'reviews.json'),
			JSON.stringify(reviews, null, 2),
			err => {
				if (err) {
					return res.status(500).send('Ошибка при сохранении отзыва')
				}
				res.send('Отзыв успешно добавлен')
			}
		)
	})
})

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
})
