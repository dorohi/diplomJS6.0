'use strict';


function modals() {
	//////////////////////////////////////////////////////////////////
	/*               Модальное окно "Вызова инженера"               */
	//////////////////////////////////////////////////////////////////
	const engineerButton = document.querySelector('.popup_engineer_btn'), 	// Кнопка вызова
		popupEngineer = document.querySelector('.popup_engineer'); 			// Модальное окно

	/* Показ окна */
	engineerButton.addEventListener('click', () => {
		popupEngineer.style.display = "block";
	});
	/* Закрытие окна */
	closeModal(popupEngineer, 'popup_engineer', 'popup_close');

	//////////////////////////////////////////////////////////////////
	/*               Модальное окно "Обратного звонка"              */
	//////////////////////////////////////////////////////////////////
	const phoneLink = document.querySelectorAll('.phone_link'), 			// Кнопка вызова
		popupModal = document.querySelector('.popup'); 						// Модальное окно

	/* Показ окна */
	phoneLink.forEach(element => {
		element.addEventListener('click', () => {
			event.preventDefault();
			popupModal.style.display = "block";
		});
	});

	/* Закрытие окна */
	closeModal(popupModal, 'popup', 'popup_close');

	const popupCalcProfile = document.querySelector('.popup_calc_profile'),
		popupCalcEnd = document.querySelector('.popup_calc_end'),
		popupCalc = document.querySelector('.popup_calc');
	/* Закрытие окна калькулятора*/
	closeModal(popupCalc, 'popup_calc', 'popup_calc_close');
	/* Закрытие окна Профиля*/
	closeModal(popupCalcProfile, 'popup_calc_profile', 'popup_calc_profile_close');
	/* Закрытие окна конца калькулятора*/
	closeModal(popupCalcEnd, 'popup_calc_end', 'popup_calc_end_close');

	function closeModal (trigger, selector, closeSelector){
		trigger.addEventListener('click', (event) => {
			const target = event.target;
	
			if (target.classList.contains(closeSelector) ||
				target.parentNode.classList.contains(closeSelector) ||
				target.classList.contains(selector)) {
				trigger.style.display = 'none';
			}
		});
	}

	//////////////////////////////////////////////////////////////////
	/*                  МЫ ВАМ ПЕРЕЗВОНИМ 60 СЕК                    */
	//////////////////////////////////////////////////////////////////
	setTimeout(() => {
		popupModal.style.display = "block";
	}, 60 * 1000);
}

module.exports = modals;