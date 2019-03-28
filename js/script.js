'use strict';

window.addEventListener('DOMContentLoaded', () => {
	const engineerButton = document.querySelector('.popup_engineer_btn'),
		popupEngineer = document.querySelector('.popup_engineer');

	engineerButton.addEventListener('click', () => {
		popupEngineer.style.display = "block";		
	});

	popupEngineer.addEventListener('click', (event) => {
		const target = event.target;
		console.log(target);
		if (target.classList.contains('popup_close') ||
			target.parentNode.classList.contains('popup_close')||
			target.classList.contains('popup_engineer')) {
			popupEngineer.style.display = 'none';
		}
	});
});