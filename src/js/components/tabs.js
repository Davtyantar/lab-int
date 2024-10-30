export const Tabs = () => {
    const tabItems = document.querySelectorAll(".tab_item");
    const tabs = document.querySelectorAll(".tab");

    if (tabs.length > 0 && tabItems.length > 0) {
        tabItems.forEach((item, index) => {
            if (index !== 0) item.style.display = "none";
        });

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", function() {
                tabs.forEach(t => t.classList.remove("is-active"));
                tabItems.forEach(item => item.classList.remove("is-active"));

                tab.classList.add("is-active");
                tabItems[index].classList.add("is-active");

                tabItems.forEach(item => item.style.display = "none");
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
        tabItems[0].classList.add("is-active");
    }
};

document.addEventListener("DOMContentLoaded", Tabs);
