export const accordion = () => {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach((accordion) => {
        const header = accordion.querySelector(".accordion-header");
        const content = accordion.querySelector(".accordion-content");

        if (!header || !content) {
            console.error("Header or content not found for accordion:", accordion);
            return;
        }

        header.addEventListener("click", () => {
            const isOpen = content.style.maxHeight;
            
            // Добавляем или удаляем класс 'is-open'
            accordion.classList.toggle('is-open', !isOpen);
            
            // Управляем максимальной высотой для анимации
            content.style.maxHeight = isOpen ? null : `${content.scrollHeight}px`;
        });
    });
};

// Инициализируем аккордеон после загрузки DOM
document.addEventListener("DOMContentLoaded", accordion);
