import Inputmask from "./../../../node_modules/inputmask/dist/inputmask.es6.js";

export function initInputMask() {
    const inputPhoneAll = document.querySelectorAll('input[type="tel"]');
	const phoneMask = new Inputmask("+7 (999) 999-99-99");

	for (let inputPhone of inputPhoneAll) {
		phoneMask.mask(inputPhone);
	}
}
