'use strict';

//////////////////////////////////////////////////////////////////
/*              МАСКА ДЛЯ ВВОДА ТЕЛЕФОННЫХ НОМЕРОВ              */
//////////////////////////////////////////////////////////////////

function mask(){
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
}

module.exports = mask;