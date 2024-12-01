export const footeryear = () => {
    document.querySelector('.footer__year').textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", footeryear)