function on(event, object, func = function () { }) {
	document.addEventListener(event, function (e) {
		const eTarget = e.target.closest(object);
		if (eTarget == null) return;
		func.call(eTarget, e);
	});
}

async function loadScript(src, func = false) {
	const script = document.createElement('script');
	script.src = src;
	document.body.append(script);
	if (func) script.onload = () => func();
}

function checkAgree() {
	const confirmElementDOM = 'input[data-form-confirm]',
		formDOM = 'form',
		parentFormElementDOM = '.form',
		queryElementDOM = '[type=submit]';
	for (let agree of document.querySelectorAll(confirmElementDOM)) changeAgree(agree);
	on('change', confirmElementDOM, function () { changeAgree(this); });
	function changeAgree(object) {
		const parent = object.closest(formDOM) ? object.closest(formDOM) : object.closest(parentFormElementDOM),
			submits = parent.querySelectorAll(queryElementDOM);
		if (!submits) return;
		for (let agree of parent.querySelectorAll(confirmElementDOM)) {
			for (let submit of submits) submit.disabled = false;
			if (!agree.checked) {
				for (let submit of submits) submit.disabled = true;
				break;
			}
		}
	}
}

function clickAnchors() {
	on('click', 'a[href^="#"]', function (e) {
		e.preventDefault();
		const element = document.getElementById(this.getAttribute('href').substr(1));
		if (!element) return;
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	});
}

function initModalPlaceholder(prefix = '.modal__') {
	on('click', '[data-fancybox][data-src*="#"]', function () {
		const dataContent = this.dataset.content,
			modalObject = document.getElementById(this.dataset.src.substr(1));
		if (!modalObject) return;
		let customContent = [];
		if (dataContent) {
			try { customContent = JSON.parse(`{${dataContent}}`); }
			catch (error) { }
		}
		for (let defaultElement of modalObject.querySelectorAll('[data-default]')) {
			let defaultValue = defaultElement.dataset.default;
			if (defaultElement.nodeName.toLowerCase() == 'input') defaultElement.value = defaultValue;
			else defaultElement.innerHTML = defaultValue;
		}
		for (let customItem in customContent) {
			let divDOM = modalObject.querySelector(prefix + customItem),
				inputDOM = modalObject.querySelector(`input[name="${customItem}"]`);
			if (divDOM) divDOM.innerHTML = customContent[customItem];
			if (inputDOM) inputDOM.value = customContent[customItem];
		}
	});
}

function pageUp() {
	const pageUpBtn = document.getElementById('pageup'),
		topShow = 280,
		scrollPosition = window.scrollY,
		documentFooter = document.querySelector('footer'),
		footerHeight = documentFooter ? documentFooter.offsetHeight : 0;
	if (!pageUpBtn) return;
	if (scrollPosition > topShow && scrollPosition < document.body.offsetHeight - window.innerHeight - footerHeight) pageUpBtn.classList.add(ACTIVE_CLASS);
	else pageUpBtn.classList.remove(ACTIVE_CLASS);
}

function css(element, css) {
	for (var style in css) {
		element.style[style] = css[style];
	}
}

function outsideClick(element, func) {
	element = (typeof (element) == 'string') ? document.querySelector(element) : element;

	document.addEventListener('click', (e) => {
		const withinBoundaries = e.composedPath().includes(element);
		if (!withinBoundaries) {
			func(element);
		}
	})
}

const INPUT_INIT = 'input-initialized';
const INPUT_IGNORE = 'input-ignore';

function setCustomSelect() {
	const mainClass = 'selector',
		selectedClass = 'is-selected',
		activeClass = ACTIVE_CLASS,
		reverseClass = 'is-reverse',
		disabledClass = 'is-disabled',
		optionClass = 'option',
		separator = '__',
		modSeparator = '_',
		mobileClass = 'mobile',
		elements = ['label', 'title', 'btn', 'list'];

	for (let select of document.querySelectorAll(`select`)) {
		let main = document.createElement('div');
		main.classList.add(mainClass);

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
			main.classList.add(`${mainClass}${modSeparator}${mobileClass}`);
		}

		let label = document.createElement('div');
		label.classList.add(`${mainClass}${separator}label`);

		let title = document.createElement('div');
		title.classList.add(`${mainClass}${separator}title`);

		let btn = document.createElement('div');
		btn.classList.add(`${mainClass}${separator}btn`);

		let list = document.createElement('div');
		list.classList.add(`${mainClass}${separator}list`);

		select.after(main);
		label.append(title, btn);
		main.append(select, label, list);

		label.addEventListener('click', function (e) {
			let parent = this.parentNode,
				list = parent.querySelector(`.${mainClass}${separator}${elements[3]}`);

			if (window.innerHeight - list.getBoundingClientRect().top - parent.offsetHeight < list.offsetHeight) {
				parent.classList.add(reverseClass);
			} else {
				parent.classList.remove(reverseClass);
			}

			parent.classList.toggle(activeClass);
		});

		outsideClick(main, (element) => element.classList.remove(activeClass));

		setSelectList(select);

		select.addEventListener('change', () => setSelectList(select));

		select.classList.add(INPUT_INIT);

		function setSelectList(select) {
			let parent = select.closest(`.${mainClass}`),
				list = parent.querySelector(`.${mainClass}${separator}${elements[3]}`),
				title = parent.querySelector(`.${mainClass}${separator}${elements[1]}`);

			list.innerHTML = '';

			for (let option of select.options) {
				let optionDOM = document.createElement('div'),
					optionDOMClassList = optionDOM.classList;

				optionDOM.textContent = option.textContent;
				optionDOM.dataset.value = option.value;
				optionDOMClassList.add(`${mainClass}${separator}${optionClass}`);

				if (option.selected) {
					optionDOMClassList.add(selectedClass);
					title.textContent = option.textContent;

					if (option.disabled) {
						title.classList.add(disabledClass);
					} else {
						title.classList.remove(disabledClass);
					}
				}

				if (option.disabled) {
					optionDOMClassList.add(disabledClass);
				}

				list.append(optionDOM);

				optionDOM.addEventListener('click', function (e) {
					if (this.classList.contains(disabledClass)) return;

					this.closest(`.${mainClass}`).classList.remove(activeClass);
					select.value = this.dataset.value;
					select.dispatchEvent(new Event('change'));
				});
			}
		}
	}
}

function getCookie(key = false) {
	let cookies = [];
	for (let cookie of document.cookie.split(';')) {
		cookie = cookie.split('=');
		cookies[decodeURIComponent(cookie[0]).trim()] = decodeURIComponent(cookie[1]);
	}
	return (!key) ? cookies : cookies[key];
}

function setCookie(name, value, options = {}) {
	if (!options.path) options.path = '/';
	if (!options.samesite) options.samesite = 'lax';
	console.log(options);
	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}
	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}
	document.cookie = updatedCookie;
}

function deleteCookie(name) {
	setCookie(name, "", {
		'max-age': -1
	});
}

function createStructure(element) {
	const type = element.type ? element.type : "div",
		classes = element.classes,
		children = element.children,
		content = element.content,
		inner = element.inner,
		data = element.data,
		variable = element.variable,
		newElement = document.createElement(type);
	if (classes) {
		if (typeof classes == "string") newElement.setAttribute("class", classes.trim());
		else classes.forEach(cls => newElement.classList.add(cls));
	}
	if (content) newElement.textContent = content;
	if (inner) newElement.innerHTML = inner;
	if (data) for (var dataElement in data) newElement.dataset[dataElement] = data[dataElement];
	if (children) children.forEach(child => newElement.append(createStructure(child)));
	if (variable) window[variable] = newElement;
	return newElement;
}

function isMobile() {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) ? true : false;
}

const ACTIVE_CLASS = 'is-active';
const TEMPLATE_PATH = '/';

document.addEventListener('DOMContentLoaded', function () {
	clickAnchors();
	pageUp();
	globalFunctions();
	checkAgree();
	initModalPlaceholder();
	// loadScript('//api-maps.yandex.ru/2.1/?lang=ru_RU', setMap);
});

document.addEventListener('scroll', function () {
	pageUp();
});

function globalFunctions() {
	setCustomSelect();
}

function setMap() {
	try {
		ymaps.ready(() => {
			for (let mapContainer of document.querySelectorAll('.map')) {
				let id = mapContainer.getAttribute('id'),
					data = mapContainer.dataset,
					mapCenter = JSON.parse(data.center),
					mapCoord = data.coord ? JSON.parse(data.coord) : mapCenter,
					mapZoom = data.zoom,
					mapTitle = data.title,
					map = new ymaps.Map(id, {
						center: mapCenter,
						zoom: mapZoom,
						controls: ['zoomControl', 'fullscreenControl', 'typeSelector', 'trafficControl', 'geolocationControl']
					}),
					pin = new ymaps.Placemark(mapCoord, {
						hintContent: mapTitle
					}, {
						iconLayout: 'default#image'
					});
				map.behaviors.disable(['scrollZoom']);
				map.geoObjects.add(pin);
				setMapCenter();
				function setMapCenter() {
					(mapContainer.offsetWidth < 992) ? map.setCenter(mapCoord) : map.setCenter(mapCenter);
				}
				window.addEventListener('resize', setMapCenter);
			}
		});
	} catch (e) {
		console.log('Yandex Map is not initiated');
	}
}