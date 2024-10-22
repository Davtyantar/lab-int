export const pageUp = () => {
	const pageUpBtn = document.getElementById('pageup'),
		topShow = 280,
		scrollPosition = window.scrollY,
		documentFooter = document.querySelector('footer'),
		footerHeight = documentFooter ? documentFooter.offsetHeight : 0;
		
	if (!pageUpBtn) return;

	if (scrollPosition > topShow && scrollPosition < document.body.offsetHeight - window.innerHeight - footerHeight) {
		pageUpBtn.classList.add("is-active");
	} else {
		pageUpBtn.classList.remove("is-active");
	}

	pageUpBtn.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
};
