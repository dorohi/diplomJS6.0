'use strict';

function calc(){
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
	closeModal(popupCalc, 'popup_calc', 'popup_calc_close');

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
		input.addEventListener('keypress', function () {
			this.value = this.value.replace(/[^0-9]+/g, '');
			this.focus();
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
	closeModal(popupCalcProfile, 'popup_calc_profile', 'popup_calc_profile_close');

	/* Закрытие окна конца калькулятора*/
	closeModal(popupCalcEnd, 'popup_calc_end', 'popup_calc_end_close');

	return windowSettings;
}

module.exports = calc;