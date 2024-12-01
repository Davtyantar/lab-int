import { initSwiper } from './libs/swiperInit.js';
import { initGsap } from './libs/gsapInit.js';

import { initMoveElements } from './components/moveElements.js';
import { loader } from './components/loader.js';
import { pageUp } from './components/pageUp.js';
import { clickAnchors } from './components/clickAnchors.js';
import { setupFormValidation } from './components/formValidation.js';
import { getHeaderHeight } from './components/getHeaderHeight.js';
import { burgerMenu } from './components/burgerMenu.js';
import { toggleSubmitButtonState } from './components/toggleSubmitButtonState.js';
import { accordion } from './components/accordion.js';


document.addEventListener('DOMContentLoaded', function () {
    initSwiper();
    initGsap();
});


