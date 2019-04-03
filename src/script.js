'use strict';

require('es6-promise').polyfill();
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', () => {
	var gallery = require('./parts/gallery.js'),
		tabs = require('./parts/tabs.js'),
		mask = require('./parts/mask.js'),
		forms = require('./parts/forms.js'),
		calc = require('./parts/calc.js'),
		modals = require('./parts/modals.js'),
		timer = require('./parts/timer.js');

	gallery();
	tabs();
	mask();
	var windowSettings = calc();
	forms(windowSettings);
	modals();
	timer();
});

if ('NodeList' in window && !NodeList.prototype.forEach) {
	console.info('polyfill for IE11');
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}