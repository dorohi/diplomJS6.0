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

	//Tabs

	const glazingSlider = document.querySelector('.glazing_slider'),
		glazingBlock = document.querySelectorAll('.glazing_block'),
		glazingRow = document.querySelectorAll('.glazing .row');

	hideTabContent(1);

	function hideTabContent(key) {
		for (let i = key; i < glazingRow.length; i++) {
			glazingRow[i].classList.remove('show');
			glazingRow[i].classList.add('hide');
		}
	}

	function showTabContent(key) {
		if (glazingRow[key].classList.contains('hide')) {
			glazingRow[key].classList.remove('hide');
			glazingRow[key].classList.add('show');
		}
	}

	glazingSlider.addEventListener('click', function (event) {
		let target = event.target;
		if (!target.classList.contains('glazing_block')){
			target = target.parentNode;
		}

		if (target) {
			for (let i = 0; i < glazingBlock.length; i++) {
				glazingBlock[i].querySelector('a').classList.remove('active');
				if (glazingBlock[i] == target) {
					hideTabContent(0);
					showTabContent(i);
				}
			}
			target.querySelector('a').classList.add('active');
		}
	});

});