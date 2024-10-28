import { Fancybox } from '@fancyapps/ui';

export const rutubeEmbed = () => {
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
};


// import { Fancybox } from '@fancyapps/ui';

// export const rutubeEmbed = () => {
//     const fancyboxLinks = document.querySelectorAll('.prof-tv__item-link');
    
//     fancyboxLinks.forEach(link => {
//         const videoSrc = link.getAttribute('data-src');

//         if (videoSrc.startsWith('https://rutube.ru/video/')) {
//             const videoId = videoSrc.split('/').slice(-2, -1)[0];
//             const thumbnailUrl = `https://rutube.ru/api/video/${videoId}/thumbnail/?redirect=1`;
        
//             const imgElement = link.querySelector('.item__image');
//             if (imgElement) {
//                 imgElement.setAttribute('data-src', thumbnailUrl);
//             }
//             console.log(`Обновленный data-src для изображения: ${thumbnailUrl}`);
//         }

//         link.addEventListener('click', function(event) {
//             if (videoSrc.startsWith('https://rutube.ru/video/')) {
//                 event.preventDefault();

//                 Fancybox.show([
//                     {
//                         src: 'https://www.youtube.com/watch?v=Bz7fhUzX-lU',
//                         type: 'iframe',
//                     }
//                 ]);

//                 const videoId = videoSrc.split('/').slice(-2, -1)[0];
//                 const formattedSrc = `https://rutube.ru/play/embed/${videoId}/?t=1&r=plwd`;

//                 console.log(formattedSrc);

//                 setTimeout(() => {
//                     const iframe = document.querySelector('.fancybox__iframe');
//                     if (iframe) {
//                         iframe.src = formattedSrc;
//                     }
//                 }, 100);
//             }
//         });
//     });
// };


// удалить
    // const formattedLinks = [];

    // fancyboxLinks.forEach(link => {
    //     const videoSrc = link.getAttribute('data-src');

    //     if (videoSrc.startsWith('https://rutube.ru/video/')) {
    //         const videoId = videoSrc.split('/').slice(-2, -1)[0];
            
    //         const formattedSrc = `https://rutube.ru/play/embed/${videoId}/?t=1&r=plwd`;

    //         formattedLinks.push(formattedSrc);
    //     }
    // });

    // console.log("Переформатированные ссылки рутуб:", formattedLinks);
// удалить