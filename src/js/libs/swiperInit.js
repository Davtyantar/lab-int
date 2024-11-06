// swiperInit.js
import Swiper from 'swiper';
import { Navigation, Pagination} from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/grid';

export function initSwiper() {
  const sliders = document.querySelectorAll('.swiper.sanatory__slider');

  sliders.forEach((slider) => {
    const sliderInstance = new Swiper(slider, {
      modules: [Navigation, Pagination],
      spaceBetween: 25,
      navigation: {
        nextEl: slider.querySelector('.swiper-button-next'),
        prevEl: slider.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 15
        },
        576: {
          slidesPerView: 2.15,
          spaceBetween: 15
        },
      }
    });
  });
}



// import Swiper bundle with all modules installed
// import Swiper from 'swiper/bundle';
// import 'swiper/css/bundle';