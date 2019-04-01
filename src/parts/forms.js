'use strict';

//////////////////////////////////////////////////////////////////
/*               ФОРМЫ. ЗАПИСЬ НА БЕСПЛАТНЫЙ ЗАМЕР              */
//////////////////////////////////////////////////////////////////

function forms() {

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
	
	//Формы на сайте
	const freeMasterForms = document.querySelectorAll('.main_form');

	freeMasterForms.forEach(form => {
		sendForm(form);
	});

	// Формы модальных окон "Обратного звонка"
	const popupForm = document.querySelector('.popup form');
	sendForm(popupForm);

	// Формы модальных окон "Вызов замерщика"
	const popupEngineerForm = document.querySelector('.popup_engineer form');
	sendForm(popupEngineerForm);

	// Формы модальных окон "Отправка калькулятора"
	const popupCalcEndForms = document.querySelector('.popup_calc_end form');
	sendForm(popupCalcEndForms, windowSettings);

	function sendForm(form, object = null) {
		const statusMessage = document.createElement('div'),
			curentFormInputs = form.querySelectorAll('input');

		form.addEventListener('submit', event => {
			event.preventDefault();
			form.appendChild(statusMessage);
			let formData = new FormData(form);
			statusMessage.innerHTML = "<img src=\"img/ajax-loader.gif\" alt=\"loader\" style=\"margin-top: 20px;\">";
			statusMessage.style.paddingBottom = '20px';
			postData(formData, object)
				.then(() => {
					statusMessage.style.color = 'green';
					statusMessage.innerHTML = "ЗАЯВКА ОТПРАВЛЕНА<br> Мы перезвоним Вам в течении 10 минут!";
				})
				.catch(() => {
					statusMessage.style.color = 'red';
					statusMessage.innerHTML = "ПРОИЗОШЛА ОШИБКА!<br>Попробуйте, пожалуйста, позже.";
				})
				.then(clearInput(curentFormInputs))
				.then(clearObject(object));
		});
	}

	function postData(data, object = null) {
		return new Promise(function (resolve, reject) {
			let request = new XMLHttpRequest();
			request.open('POST', 'server.php');
			request.setRequestHeader('Content-Type', 'aplication/json charset=utf-8');
			let json = formDataToJSON(data, object);
			request.onreadystatechange = () => {
				if (request.readyState == 4) {
					if (request.status == 200) {
						resolve();
					} else {
						reject();
					}
				}
			};
			request.send(json);
		});
	}

	function formDataToJSON(formData, object = null) {
		const obj = {};
		formData.forEach((value, key) => {
			obj[key] = value;
		});
		if (object) {
			return JSON.stringify(Object.assign(object, obj));
		} else {
			return JSON.stringify(obj);
		}

	}

	function clearInput(inputs) {
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].value = '';
		}
	}

	function clearObject(object) {
		object = {};
	}
}

module.exports = forms;