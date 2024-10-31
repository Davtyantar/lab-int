// activeNavLink.js

export function updateActiveNavLink() {
    const currentUrl = window.location.pathname;

    const navLinks = Array.from(document.querySelectorAll('.nav__link')).filter(link => {
        const linkHref = link.getAttribute('href');
        return !(linkHref.startsWith('#') || linkHref.includes('/#'));
    });

    navLinks.forEach(link => {
        const linkUrl = new URL(link.href).pathname;

        if (currentUrl === linkUrl || (currentUrl === '/' && linkUrl === '/')) {
            link.classList.add('nav__link--current');
        } else {
            link.classList.remove('nav__link--current');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNavLink);