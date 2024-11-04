import { isMobile } from "./check-viewport.js";

export const setActiveSidebarLink = () => {
    const sidebarBlock = document.querySelector('.has-sidebar');
    if (!sidebarBlock) return;

    const anchorLinks = sidebarBlock.querySelectorAll('.sidebar__nav-link[href^="#"]');
    if (anchorLinks.length === 0) return;

    const sections = Array.from(document.querySelectorAll('.has-sidebar > .content-area > .items > *'));

    anchorLinks[0].classList.add('is-active');

    const updateActiveLink = () => {
        let activeLink = null;

        sections.some((section) => {
            const { top } = section.getBoundingClientRect();
            if (top >= 0 && top < window.innerHeight) {
                activeLink = section.id;
                return true;
            }
            return false;
        });

        anchorLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${activeLink}`));
    };

    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink);
};

// Функция для инициализации или удаления активных ссылок в зависимости от устройства
const initializeSidebarLink = () => {
    if (!isMobile()) {
        setActiveSidebarLink();
    }
};

// Вызов функции при загрузке страницы
document.addEventListener("DOMContentLoaded", initializeSidebarLink);

// Вызов функции при изменении размера окна
window.addEventListener('resize', initializeSidebarLink);
