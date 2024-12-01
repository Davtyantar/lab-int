export const setPhonesMask = () => {
    for (let phone of document.querySelectorAll(`input[type="tel"]`)) {
		phone.addEventListener('keydown', function (e) {
			if (e.key == undefined) return;
			if (['Delete', 'Backspace', 'Enter'].includes(e.key) || e.key.match(/^arrow/i)) return;
			if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.key.match(/\D/)) e.preventDefault();
		});
		phone.addEventListener('paste', function () {
			this.dispatchEvent(new Event('input'));
		});
		phone.addEventListener('input', function (e) {
			let value = this.value.replace(/\D/ig, '').substr(0, 13);
			if (value[0] == '9') value = `7${value}`;
			let rusFormat = [7, 8, 9].includes(+value[0]),
				result = '',
				startPosition = ((e.inputType && e.inputType.match(/^deleteContent/)) || (this.selectionStart < this.value.length)) ? this.selectionStart : false;
			for (let idx in value) {
				idx = +idx;
				let num = value[idx];
				if (idx == 0) {
					if (num == 8) result += '8';
					else if (num == 9) result += '+7 (9';
					else result += `+${num}`;
				}
				else {
					if (rusFormat) {
						if (idx == 1) result += ` (${num}`;
						else if ([2, 3, 5, 6, 8, 10].includes(idx)) result += `${num}`;
						else if ([7, 9].includes(idx)) result += `-${num}`;
						else if (idx == 4) result += `) ${num}`;
					}
					else result += `${num}`;
				}
			}
			this.value = result;
			if (startPosition && value.length < 11 && rusFormat) {
				this.selectionStart = startPosition;
				this.selectionEnd = startPosition;
			}
		});
	}
}

document.addEventListener("DOMContentLoaded", setPhonesMask)