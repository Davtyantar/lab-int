export const burgerMenu = () => {
    const burger = document.querySelector('.burger');

    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('mobile-menu--open');
        body.classList.toggle('overflow-hidden');

        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isExpanded);
        burger.setAttribute('aria-label', isExpanded ? 'Открыть меню' : 'Закрыть меню');
    };

    const navLinks = mobileMenu.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('mobile-menu--open');
            body.classList.remove('overflow-hidden');
            burger.setAttribute('aria-expanded', 'false');
            burger.setAttribute('aria-label', 'Открыть меню');
        });
    });

    burger.addEventListener('click', toggleMobileMenu);
};

document.addEventListener('DOMContentLoaded', burgerMenu);
