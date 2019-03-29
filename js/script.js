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
	setTimeout(() => {
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

	// ТАЙМЕР СКИДОК 

	const deadLine = '2019-04-05';

	function getTimeRemaining(endTime) {
		let t = Date.parse(endTime) - Date.parse(new Date());
		t <= 0 ? t = 0 : t;
		const seconds = Math.floor(t / 1000 % 60),
			minutes = Math.floor(t / 1000 / 60 % 60),
			hours = Math.floor(t / 1000 / (60 * 60) % 24),
			days = Math.floor(t / 1000 / (60 * 60 * 24));
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setClock(id, endTime) {
		const timer = document.getElementById(id),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes').firstChild,
			seconds = timer.querySelector('#seconds').firstChild,
			timeInterval = setInterval(update, 1000);

		function update() {
			var t = getTimeRemaining(endTime);
			days.textContent = getNormal(t.days);
			hours.textContent = getNormal(t.hours);
			minutes.textContent = getNormal(t.minutes);
			seconds.textContent = getNormal(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('timer', deadLine);

	function getNormal(number) {
		return number < 10 ? '0' + number : number;
	}


	//НАШИ РАБОТЫ

	const works = document.querySelectorAll('.works .row div');
	works.forEach((work) => {
		work.addEventListener('click', function (event) {
			event.preventDefault();
			const popupImage = document.createElement('div');
			const curentImage = document.createElement('img');
			const curentImageHref = this.querySelector('a').getAttribute('href');
			popupImage.classList.add('popup');
			curentImage.setAttribute('src', curentImageHref);
			popupImage.appendChild(curentImage);
			document.body.appendChild(popupImage);
			popupImage.style.display = 'flex';
			popupImage.style.alignItems = 'center';
			popupImage.style.justifyContent = 'center';

			popupImage.addEventListener('click', (event) => {
				if (event.target.classList.contains('popup')){
					popupImage.style.display = 'none';
				}
			});
		});
	});


});