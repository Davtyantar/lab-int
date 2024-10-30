export const headerMoreLinks = () => {
    if (window.innerWidth <= 991) return;

    const navList = document.querySelector(".header__nav .nav__list");
    const navItems = document.querySelectorAll(".header__nav .nav__item");

    if (navItems.length > 7) {
        const moreDropdown = document.createElement("li");
        moreDropdown.className = "nav__more";
        moreDropdown.innerHTML = '<span class="nav__more-label">...</span>';

        const moreMenu = document.createElement("div");
        moreMenu.className = "more__menu";
        moreDropdown.appendChild(moreMenu);

        for (let i = 7; i < navItems.length; i++) {
            moreMenu.appendChild(navItems[i]);
        }

        navList.appendChild(moreDropdown);
    }
};

document.addEventListener("DOMContentLoaded", headerMoreLinks);
