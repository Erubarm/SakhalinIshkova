document.addEventListener('DOMContentLoaded', () => {
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('fadeInUp')
					entry.target.classList.remove('hidden')
					observer.unobserve(entry.target)
				}
			})
		},
		{
			threshold: 0.1, // Элемент на 10% виден на экране
		}
	)

	// Добавляем наблюдение за всеми элементами с классом 'hidden'
	document.querySelectorAll('.hidden').forEach(el => observer.observe(el))
})
