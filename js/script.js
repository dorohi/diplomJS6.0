'use strict';

window.addEventListener('DOMContentLoaded', () => {

	// Модальное окно "Вызова инженера"
	const engineerButton = document.querySelector('.popup_engineer_btn'),
		popupEngineer = document.querySelector('.popup_engineer');

	engineerButton.addEventListener('click', () => {
		popupEngineer.style.display = "block";		
	});

	popupEngineer.addEventListener('click', (event) => {
		const target = event.target;
		
		if (target.classList.contains('popup_close') ||
			target.parentNode.classList.contains('popup_close')||
			target.classList.contains('popup_engineer')) {
			popupEngineer.style.display = 'none';
		}
	});

	//Модальное окно "Обратного звонка"
	const phoneLink = document.querySelectorAll('.phone_link'),
		popupModal = document.querySelector('.popup');
	
	phoneLink.forEach(element => {
		element.addEventListener('click', () => {
			popupModal.style.display = "block";
		});
	});
	popupModal.addEventListener('click', (event) => {
		const target = event.target;
		
		if (target.classList.contains('popup_close') ||
			target.parentNode.classList.contains('popup_close') ||
			target.classList.contains('popup')) {
			popupModal.style.display = 'none';
		}
	});

});