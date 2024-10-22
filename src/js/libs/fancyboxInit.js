import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui';

export function initFancybox() {
    Fancybox.bind("[data-fancybox]", {});

    Fancybox.bind('[data-fancybox="gallery"], [data-fancybox^="gallery-"]', {
        Toolbar: {
            display: {
                left: [],
                middle: [],
                right: ['close'],
            },
        },

        Images: {
            zoom: false,
        },

        Thumbs: {
            type: 'classic',
        },

        Carousel: {
            transition: false,
            friction: 0,
        },
    });
}


