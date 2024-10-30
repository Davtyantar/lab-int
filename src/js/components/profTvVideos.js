export const profTvVideos = () => {
    const profTvLinks = document.querySelectorAll('.prof-tv__item-link');

    profTvLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const videoSrc = link.getAttribute('data-src-video');
            let formattedSrc = videoSrc;

            if (videoSrc && videoSrc.startsWith('https://rutube.ru/video/')) {
                const videoId = videoSrc.split('/').slice(-2, -1)[0];
                formattedSrc = `https://rutube.ru/play/embed/${videoId}/?t=1&r=plwd`;
            }
            
            const iframe = document.getElementById('video-iframe');
            if (iframe) {
                iframe.src = formattedSrc;
            }
        });
    });
};


document.addEventListener('DOMContentLoaded', profTvVideos);