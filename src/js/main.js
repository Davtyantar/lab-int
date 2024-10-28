import { initFancybox } from './libs/fancyboxInit.js';
import { initSwiper } from './libs/swiperInit.js';
import { initGsap } from './libs/gsapInit.js';
import { rutubeEmbed } from './components/rutubeEmbed.js'


import { initMoveElements } from './components/moveElements.js';
import { start } from './components/start.js';
import { loader } from './components/loader.js';
import { pageUp } from './components/pageUp.js';
import { initQrImg } from './components/initQrImg.js';
import { setupFormValidation } from './components/formValidation.js';
import { getHeaderHeight } from './components/getHeaderHeight.js';
import { setVh } from './components/setVh.js';
import { headerFunctions } from './components/headerFunctions.js';

import { updateActiveNavLink } from './components/activeNavLink.js';

start();

// Функции шапки - бургер, поиск ...
headerFunctions();

// QR коды в подвале
initQrImg();

// Лоадер
loader();

// Функция для перемещения элементов
initMoveElements();

// Получение высоты шапки
getHeaderHeight();

// Получение vh
setVh();

document.addEventListener('scroll', function () {
    pageUp();
});

document.addEventListener('DOMContentLoaded', function () {
    // updateActiveNavLink();
    setupFormValidation();
    
    rutubeEmbed();
    initSwiper();
    initFancybox();
    initGsap();
});


