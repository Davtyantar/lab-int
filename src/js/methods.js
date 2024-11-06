const ACTIVE_CLASS = 'is-active';
const TEMPLATE_PATH = '/';

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

function isMobile() {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) ? true : false;
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

document.addEventListener('DOMContentLoaded', function () {
	clickAnchors();
	checkAgree();
	initModalPlaceholder();
});