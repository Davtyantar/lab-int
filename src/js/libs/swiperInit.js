// swiperInit.js
import Swiper from 'swiper';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

export function initSwiper() {
  const slider = document.querySelector('.reviews');

  if (slider) {
    const reviewsSlider = new Swiper(slider.querySelector('.swiper'), {
      modules: [Navigation, Pagination],
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
        320: {
          slidesPerView: 1,
          spaceBetween: 15
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 32
        },
      }
    });
  }
}



// import Swiper bundle with all modules installed
// import Swiper from 'swiper/bundle';
// import 'swiper/css/bundle';