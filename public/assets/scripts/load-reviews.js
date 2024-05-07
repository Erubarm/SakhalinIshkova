document.addEventListener('DOMContentLoaded', function () {
	fetch('/reviews')
		.then(response => response.json())
		.then(reviews => {
			const reviewsSection = document.getElementById('reviews-section')
			const container = reviewsSection.querySelector('.container')
			container.innerHTML = '<h2>Отзывы наших клиентов</h2>' // Сброс содержимого контейнера

			reviews.forEach(review => {
				const reviewBlock = document.createElement('div')
				reviewBlock.className = 'review hidden'
				const reviewDate = new Date(review.date).toLocaleDateString('ru-RU') // Форматирование даты
				reviewBlock.innerHTML = `
									<blockquote>${review.review}</blockquote>
									<footer>
											<div class="reviewer-info">
													<strong>${review.name}</strong>
													<span>${reviewDate}</span> <!-- Отображение даты -->
											</div>
									</footer>
							`
				container.appendChild(reviewBlock)
			})
		})
		.catch(error => console.error('Ошибка при загрузке отзывов:', error))
})
