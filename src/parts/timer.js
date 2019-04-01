'use strict';

function timer() {
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
}

module.exports = timer;