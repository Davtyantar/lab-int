import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui';

export function initFancybox() {
    Fancybox.bind("[data-fancybox]", {});

    Fancybox.bind('[data-fancybox="gallery"], [data-fancybox^="gallery-"]', {
        Toolbar: {
            display: {
                left: [],
                middle: [
                    "zoomIn",
                    "zoomOut",
                  ],
                right: ['close'],
            },
        },

        Images: {
            zoom: true,
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


