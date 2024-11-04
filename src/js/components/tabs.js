export const Tabs = () => {
    const tabItems = document.querySelectorAll(".tab_item");
    const tabs = document.querySelectorAll(".tab");

    if (tabs.length > 0 && tabItems.length > 0) {
        tabItems.forEach((item, index) => {
            if (index !== 0) item.style.display = "none";
        });

        tabs.forEach((tab, index) => {
            // Установка начального значения aria-selected
            tab.setAttribute("aria-selected", index === 0 ? "true" : "false");
            
            tab.addEventListener("click", function() {
                tabs.forEach((t, tIndex) => {
                    t.classList.remove("is-active");
                    t.setAttribute("aria-selected", "false");
                });

                tabItems.forEach(item => {
                    item.classList.remove("is-active");
                    item.style.display = "none";
                });

                tab.classList.add("is-active");
                tab.setAttribute("aria-selected", "true");
                tabItems[index].classList.add("is-active");
                tabItems[index].style.display = "block";
                tabItems[index].style.transform = "translateY(20px)";
                tabItems[index].style.opacity = 0;
                tabItems[index].style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";

                requestAnimationFrame(() => {
                    tabItems[index].style.transform = "translateY(0)";
                    tabItems[index].style.opacity = 1;
                });
            });
        });

        tabs[0].classList.add("is-active");
        tabs[0].setAttribute("aria-selected", "true");
        tabItems[0].classList.add("is-active");
    }
};

document.addEventListener("DOMContentLoaded", Tabs);
