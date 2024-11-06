export const initQrImg = () => {
    const itemQrs = document.querySelectorAll('.item_qr img');
    const overlay = document.querySelector('.overlay');

    itemQrs.forEach(img => {
        img.addEventListener('click', () => {
            const imgSrc = img.getAttribute('src');
            const imgAlt = img.getAttribute('alt');
            const imgTitle = img.getAttribute('title');
            if (imgSrc) {
                overlay.innerHTML = `<img class="overlay-qr" src="${imgSrc}" alt="${imgAlt}" title="${imgTitle}">`;
                overlay.classList.add('is-visible');
            }
        });
    });

    overlay.addEventListener('click', () => {
        overlay.classList.remove('is-visible');
        overlay.innerHTML = '';
    });
};

document.addEventListener('DOMContentLoaded', initQrImg());