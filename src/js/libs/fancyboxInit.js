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

const fancyboxLinks = document.querySelectorAll('.prof-tv__item-link');

fancyboxLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        const videoSrc = link.getAttribute('data-src');

        if (videoSrc.startsWith('https://rutube.ru/video/')) {
            event.preventDefault();

            Fancybox.show([
                {
                    src: 'https://www.youtube.com/watch?v=Bz7fhUzX-lU',
                    type: 'iframe',
                }
            ]);

            const videoId = videoSrc.split('/').slice(-2, -1)[0];
            const formattedSrc = `https://rutube.ru/play/embed/${videoId}/?t=1&r=plwd`;

            console.log(formattedSrc);

            setTimeout(() => {
                const iframe = document.querySelector('.fancybox__iframe');
                if (iframe) {
                    iframe.src = formattedSrc;
                }
            }, 100);
        }
    });
});


const formattedLinks = [];

fancyboxLinks.forEach(link => {
    const videoSrc = link.getAttribute('data-src');

    if (videoSrc.startsWith('https://rutube.ru/video/')) {
        const videoId = videoSrc.split('/').slice(-2, -1)[0];
        
        const formattedSrc = `https://rutube.ru/play/embed/${videoId}/?t=1&r=plwd`;

        formattedLinks.push(formattedSrc);
    }
});

console.log("Переформатированные ссылки рутуб:", formattedLinks);
