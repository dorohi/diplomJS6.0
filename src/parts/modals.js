'use strict';


function modals() {
	//////////////////////////////////////////////////////////////////
	/*               Модальное окно "Вызова инженера"               */
	//////////////////////////////////////////////////////////////////
	const engineerButton = document.querySelector('.popup_engineer_btn'), // Кнопка вызова
		popupEngineer = document.querySelector('.popup_engineer'); // Модальное окно

	/* Показ окна */
	engineerButton.addEventListener('click', () => {
		popupEngineer.style.display = "block";
	});

	/* Закрытие окна */
	popupEngineer.addEventListener('click', (event) => {
		const target = event.target;

		if (target.classList.contains('popup_close') ||
			target.parentNode.classList.contains('popup_close') ||
			target.classList.contains('popup_engineer')) {
			popupEngineer.style.display = 'none';
		}
	});

	//////////////////////////////////////////////////////////////////
	/*               Модальное окно "Обратного звонка"              */
	//////////////////////////////////////////////////////////////////
	const phoneLink = document.querySelectorAll('.phone_link'), // Кнопка вызова
		popupModal = document.querySelector('.popup'); // Модальное окно

	/* Показ окна */
	phoneLink.forEach(element => {
		element.addEventListener('click', () => {
			event.preventDefault();
			popupModal.style.display = "block";
		});
	});

	/* Закрытие окна */
	popupModal.addEventListener('click', (event) => {
		const target = event.target;

		if (target.classList.contains('popup_close') ||
			target.parentNode.classList.contains('popup_close') ||
			target.classList.contains('popup')) {
			popupModal.style.display = 'none';
		}
	});

	//////////////////////////////////////////////////////////////////
	/*                 Модальное окно "Калькулятора"                */
	//////////////////////////////////////////////////////////////////
	const popupCalcBtn = document.querySelectorAll('.popup_calc_btn'), // Кнопки вызова первого окна
		popupCalc = document.querySelector('.popup_calc'), // Модальное окно выбора формы балкона
		balconIcons = document.querySelectorAll('.balcon_icons a'), // меню выбора формы балкона
		bigImg = document.querySelectorAll('.big_img img'), // Блоки с большыми картинками
		popupCalcButton = document.querySelector('.popup_calc_button'), // Кнопка "Далее"
		popupCalcProfile = document.querySelector('.popup_calc_profile'), // Второе модальное окно
		popupCalcProfileButton = document.querySelector('.popup_calc_profile_button'), // Третье модальное окно
		popupCalcEnd = document.querySelector('.popup_calc_end'), // Третье модальное окно
		popupCalcInput = popupCalc.querySelectorAll('input'),
		popupCalcSelect = document.querySelector('select'),
		popupCalcLabel = popupCalcProfile.querySelectorAll('label');
	let windowSettings = {};

	/* Показ окна */
	popupCalcBtn.forEach(element => {
		element.addEventListener('click', () => {
			popupCalc.style.display = "block";
			windowSettings.type = balconIcons[0].getAttribute('class');
		});
	});

	/* Закрытие окна */
	popupCalc.addEventListener('click', (event) => {
		const target = event.target;

		if (target.classList.contains('popup_calc_close') ||
			target.parentNode.classList.contains('popup_calc_close') ||
			target.classList.contains('popup_calc')) {
			popupCalc.style.display = 'none';
			windowSettings = {};
		}
	});

	/* Обработка первого окна */
	balconIcons.forEach(element => {
		element.addEventListener('click', (event) => {
			event.preventDefault();
			const typeWindowCalc = event.target.parentNode.getAttribute('class');

			bigImg.forEach(el => {
				const typeSelectedWindow = el.getAttribute('id');
				if (typeSelectedWindow == typeWindowCalc) {
					el.style.display = 'inline-block';
					windowSettings.type = typeWindowCalc;
				} else {
					el.style.display = 'none';
				}
			});
			console.log(windowSettings);
		});
	});

	/* Вводим только цифры в инпуты */
	popupCalcInput.forEach(input => {
		input.addEventListener('keyup', function () {
			this.value = this.value.replace(/[^0-9]+/g, '');
			input.textContent = this.value;
		});
	});

	/* Открываем второе окно, если инпуты заполнены */
	/* тут же инициализация первого пункта с селекта в обьект */
	popupCalcButton.addEventListener('click', () => {
		if (popupCalcInput[0].value && popupCalcInput[1].value) {
			popupCalc.style.display = 'none';
			popupCalcProfile.style.display = 'block';
			windowSettings.width = popupCalcInput[0].value;
			windowSettings.heigh = popupCalcInput[1].value;
			windowSettings.glazingType = popupCalcSelect.options[0].value;
		} else {
			popupCalcInput.forEach(input => {
				if (!input.value) {
					input.focus();
				}
			});
		}
	});

	/* меняем выбор типа остекления, относительно выбора в селекте */
	popupCalcSelect.addEventListener('change', function () {
		windowSettings.glazingType = this.options[this.selectedIndex].value;
	});

	/* Чекбоксы!!! выбираем только один, и записываем в обьект */
	/* Выбраный уже снять нельзя, только переключить на другой */
	popupCalcLabel.forEach(label => {
		label.addEventListener('change', event => {
			if (event.target.classList.contains('checkbox')) {
				[].slice.call(document.querySelectorAll('.checkbox')).forEach(c => c.checked = false);
				event.target.checked = true;
			}
			windowSettings.glazingProfile = label.querySelector('.checkbox-custom').getAttribute('id');
		});
	});

	/* Переходим к следующему окну, только если чекбоксы выбран */
	popupCalcProfileButton.addEventListener('click', () => {
		if (windowSettings.glazingProfile) {
			popupCalcProfile.style.display = 'none';
			popupCalcEnd.style.display = 'block';
		}
	});

	/* Закрытие окна Профиля*/
	popupCalcProfile.addEventListener('click', (event) => {
		const target = event.target;

		if (target.classList.contains('popup_calc_profile_close') ||
			target.parentNode.classList.contains('popup_calc_profile_close') ||
			target.classList.contains('popup_calc_profile')) {
			popupCalcProfile.style.display = 'none';
			windowSettings = {};
		}
	});

	/* Закрытие окна конца калькулятора*/
	popupCalcEnd.addEventListener('click', (event) => {
		const target = event.target;

		if (target.classList.contains('popup_calc_end_close') ||
			target.parentNode.classList.contains('popup_calc_end_close') ||
			target.classList.contains('popup_calc_end')) {
			popupCalcEnd.style.display = 'none';
			windowSettings = {};
		}
	});

	//////////////////////////////////////////////////////////////////
	/*                  МЫ ВАМ ПЕРЕЗВОНИМ 60 СЕК                    */
	//////////////////////////////////////////////////////////////////
	setTimeout(() => {
		popupModal.style.display = "block";
	}, 60 * 1000);
}

module.exports = modals;