export const headerFunctions = () => {
    // Инициализация поиска
    const searchForm = document.querySelector('.header .search__form');
    const searchButton = searchForm.querySelector('button[type="submit"]');
    const searchBlock = document.querySelector('.header-search');

    const toggleSearchBlock = (event) => {
        if (window.innerWidth < 1366 && window.innerWidth >= 576 && !searchBlock.classList.contains('header-search--is-open')) {
            event.preventDefault();
            searchBlock.classList.add('header-search--is-open');
        }
    };

    searchButton.addEventListener('click', toggleSearchBlock);

    window.addEventListener('resize', () => {
        if (window.innerWidth < 576) {
            searchBlock.classList.remove('header-search--is-open');
        }
    });


    // Инициализация бургер-меню
    const burger = document.querySelector('.burger');
    const burgerIcon = burger.querySelector('svg');

    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('mobile-menu--open');
        body.classList.toggle('overflow-hidden');

        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isExpanded);
        burger.setAttribute('aria-label', isExpanded ? 'Открыть меню' : 'Закрыть меню');
    };

    burgerIcon.addEventListener('click', toggleMobileMenu);

    // Инициализация мобильного поиска
    const searchIcon = document.querySelector('.header__search-mobile-icon');
    const headerSearch = document.querySelector('.header-search');
    const overlay = document.querySelector('.overlay');

    searchIcon.addEventListener('click', () => {
        headerSearch.classList.add('header-search--transformed');
        overlay.classList.add('is-visible');
    });

    overlay.addEventListener('click', () => {
        headerSearch.classList.remove('header-search--transformed');
        overlay.classList.remove('is-visible');
    });

    // Скрытие шапки при прокрутке
    const header = document.querySelector('.header');
    const firstSection = document.querySelector('main > *:first-child');
    let lastScrollTop = 0;

    if (header && firstSection) {
        window.addEventListener('scroll', () => {
            const firstSectionBottom = firstSection.getBoundingClientRect().bottom;
            const headerHeight = header.offsetHeight;
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (firstSectionBottom <= headerHeight) {
                header.classList.toggle('is-hidden', currentScrollTop > lastScrollTop);
            }

            lastScrollTop = currentScrollTop;
        });
    }
};

document.addEventListener('DOMContentLoaded', headerFunctions);
