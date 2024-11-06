import { initFancybox } from './libs/fancyboxInit.js';
// import { initSwiper } from './libs/swiperInit.js';
import { initGsap } from './libs/gsapInit.js';
import { start } from './components/start.js';

import { tabs } from './components/tabs.js'
import { profTvVideos } from './components/profTvVideos.js'
import { headerMoreLinks } from './components/headerMoreLinks.js';
import { initMoveElements } from './components/moveElements.js';
import { loader } from './components/loader.js';
import { pageUp } from './components/pageUp.js';
import { initQrImg } from './components/initQrImg.js';
import { setupFormValidation } from './components/formValidation.js';
import { getHeaderHeight } from './components/getHeaderHeight.js';
import { setVh } from './components/setVh.js';
import { headerFunctions } from './components/headerFunctions.js';
import { updateActiveNavLink } from './components/activeNavLink.js';
import { setActiveSidebarLink } from './components/setActiveSidebarLink.js';
import { toggleSubmitButtonState } from './components/toggleSubmitButtonState.js';


document.addEventListener('DOMContentLoaded', function () {
    start();
    // initSwiper();
    initFancybox();
    initGsap();
});


