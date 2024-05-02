document.getElementById('review-form').addEventListener('submit', function (e) {
	e.preventDefault()

	const reviewerName = document.getElementById('reviewer-name').value
	const reviewText = document.getElementById('review-text').value

	fetch('/submit-review', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `name=${encodeURIComponent(reviewerName)}&review=${encodeURIComponent(
			reviewText
		)}`,
	})
		.then(response => response.text())
		.then(data => {
			alert(data)
			// Обновите список отзывов на странице, если необходимо
		})
		.catch(error => console.error('Ошибка:', error))
})
