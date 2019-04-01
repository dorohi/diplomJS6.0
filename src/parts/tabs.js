'use strict';

function tabs() {

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
	
	
	decorationSlider.querySelectorAll('a')[0].focus();

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
}

module.exports = tabs;