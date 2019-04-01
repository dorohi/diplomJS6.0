'use strict';

//////////////////////////////////////////////////////////////////
/*              НАШИ РАБОТЫ. ОТОБРАЖЕНИЯ ГАЛЕРЕИ                */
//////////////////////////////////////////////////////////////////

function gallery() {
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
}

module.exports = gallery;