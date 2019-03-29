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
			target.parentNode.classList.contains('popup_close') ||
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

	// МЫ ВАМ ПЕРЕЗВОНИМ 60 СЕК
	setTimeout( () => {
		popupModal.style.display = "block";
	}, 60000);

	//ТАБЫ ОСТЕКЛЕНИЕ БАЛКОНОВ И ЛОДЖИЙ

	const glazingSlider = document.querySelector('.glazing_slider'),
		glazingBlock = document.querySelectorAll('.glazing_block'),
		glazingRow = document.querySelectorAll('.glazing .row');

	hideTabContent(1, glazingRow);

	glazingSlider.addEventListener('click', function (event) {
		let target = event.target;
		if (!target.classList.contains('glazing_block')) {
			target = target.parentNode;
		}

		if (target) {
			for (let i = 0; i < glazingBlock.length; i++) {
				glazingBlock[i].querySelector('a').classList.remove('active');
				if (glazingBlock[i] == target) {
					hideTabContent(0, glazingRow);
					showTabContent(i, glazingRow);
				}
			}
			target.querySelector('a').classList.add('active');
		}
	});

	// ТАБЫ ЗАКАЖИТЕ ОТДЕЛКУ БАЛКОНА СО СКИДКОЙ 60%!

	const decorationSlider = document.querySelector('.decoration_slider'),
		decorationItem = document.querySelectorAll('.decoration_item'),
		decorationRow = document.querySelectorAll('.decoration_row');

	hideTabContent(1, decorationRow);

	decorationSlider.addEventListener('click', function (event) {
		let target = event.target;
		if (!target.classList.contains('no_click')) {
			target = target.parentNode;
		}
		target = target.parentNode;

		if (!target.querySelector('div').classList.contains('after_click')) {
			for (let i = 0; i < decorationItem.length; i++) {
				decorationItem[i].querySelector('div').classList.remove('after_click');
				decorationItem[i].querySelector('div').classList.add('no_click');
				if (decorationItem[i] == target) {
					hideTabContent(0, decorationRow);
					showTabContent(i, decorationRow);
				}
			}
			target.querySelector('div').classList.add('after_click');
			target.querySelector('div').classList.remove('no_click');
		}
	});

	function hideTabContent(key, slideItems) {
		for (let i = key; i < slideItems.length; i++) {
			slideItems[i].classList.remove('show');
			slideItems[i].classList.add('hide');
		}
	}

	function showTabContent(key, slideItems) {
		if (slideItems[key].classList.contains('hide')) {
			slideItems[key].classList.remove('hide');
			slideItems[key].classList.add('show');
		}
	}

});