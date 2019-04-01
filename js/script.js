'use strict';

window.addEventListener('DOMContentLoaded', () => {

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

	//////////////////////////////////////////////////////////////////
	/*              ТАБЫ ОСТЕКЛЕНИЕ БАЛКОНОВ И ЛОДЖИЙ               */
	//////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////
	/*         ТАБЫ ЗАКАЖИТЕ ОТДЕЛКУ БАЛКОНА СО СКИДКОЙ 60%!        */
	//////////////////////////////////////////////////////////////////
	const decorationSlider = document.querySelector('.decoration_slider'),
		decorationItem = document.querySelectorAll('.decoration_item'),
		decorationRow = document.querySelectorAll('.decoration_row');

	hideTabContent(1, decorationRow);

	decorationSlider.addEventListener('click', function (event) {
		let target = event.target;
		if (!target.classList.contains('no_click') && !target.classList.contains('after_click')) {
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
		target.querySelector('a').focus();
	});

	/* ОБЩАЯ ФУНКЦИЯ СКРЫТИЯ ВСЕХ ТАБОВ БЛЯ ТАБОВ */
	function hideTabContent(key, slideItems) {
		for (let i = key; i < slideItems.length; i++) {
			slideItems[i].classList.remove('show');
			slideItems[i].classList.add('hide');
		}
	}

	/* ОБЩАЯ ФУНКЦИЯ ПОКАЗА ВСЕХ ТАБОВ БЛЯ ТАБОВ */
	function showTabContent(key, slideItems) {
		if (slideItems[key].classList.contains('hide')) {
			slideItems[key].classList.remove('hide');
			slideItems[key].classList.add('show');
		}
	}

	//////////////////////////////////////////////////////////////////
	/*           ТАЙМЕР ОБРАТНОГО ОТСЧЕРА ДЛЯ СКИДОК -60%           */
	//////////////////////////////////////////////////////////////////
	const deadLine = '2019-04-05';
	setClock('timer', deadLine);

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
			const t = getTimeRemaining(endTime);

			days.textContent = getNormal(t.days);
			hours.textContent = getNormal(t.hours);
			minutes.textContent = getNormal(t.minutes);
			seconds.textContent = getNormal(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	function getNormal(number) {
		return number < 10 ? '0' + number : number;
	}

	//////////////////////////////////////////////////////////////////
	/*              НАШИ РАБОТЫ. ОТОБРАЖЕНИЯ ГАЛЕРЕИ                */
	//////////////////////////////////////////////////////////////////
	const works = document.querySelectorAll('.works .row div');

	works.forEach((work) => {
		work.addEventListener('click', (event) => {
			event.preventDefault();

			const popupImage = document.createElement('div');
			const curentImage = document.createElement('img');
			const curentImageHref = work.querySelector('a').getAttribute('href');

			popupImage.classList.add('popup');
			curentImage.setAttribute('src', curentImageHref);
			popupImage.appendChild(curentImage);
			document.body.appendChild(popupImage);
			popupImage.style.display = 'flex';
			popupImage.style.alignItems = 'center';
			popupImage.style.justifyContent = 'center';

			popupImage.addEventListener('click', (event) => {
				if (event.target.classList.contains('popup')) {
					popupImage.style.display = 'none';
					document.body.removeChild(popupImage);
				}
			});
		});
	});

	//////////////////////////////////////////////////////////////////
	/*               ФОРМЫ. ЗАПИСЬ НА БЕСПЛАТНЫЙ ЗАМЕР              */
	//////////////////////////////////////////////////////////////////

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

	//////////////////////////////////////////////////////////////////
	/*              МАСКА ДЛЯ ВВОДА ТЕЛЕФОННЫХ НОМЕРОВ              */
	//////////////////////////////////////////////////////////////////

	const userPhones = document.querySelectorAll('input');
	userPhones.forEach(function (element) {
		if (element.getAttribute('name') === 'user_phone') {
			element.addEventListener("focus", mask);
			element.addEventListener("input", mask);
			element.addEventListener("blur", mask);
		}
	});

	function mask(event) {
		let matrix = "+7 (___) ___-__-__",
			curentSimvol = 0,
			onlyNumbers = matrix.replace(/\D/g, ""),
			value = this.value.replace(/\D/g, "");

		if (onlyNumbers.length >= value.length) {
			value = onlyNumbers;
		}

		this.value = matrix.replace(/./g, function (a) {
			if (/[_\d]/.test(a) && curentSimvol < value.length) {
				return value.charAt(curentSimvol++);
			} else if (curentSimvol >= value.length) {
				return '';
			} else {
				return a;
			}
		});

		if (event.type == "blur") {
			if (this.value.length <= 3) {
				this.value = "";
			}
		}
	}
});