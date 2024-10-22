import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export function initGsap() {
    gsap.registerPlugin(ScrollTrigger);

    const itemBlocks = document.querySelectorAll('.items, .swiper-wrapper');
    const heroBgImage = document.querySelector('.hero__bg > img');
    const btns = document.querySelectorAll('.btn');
    const headings = document.querySelectorAll('h1, h2');

    headings.forEach((heading) => {
        gsap.from(heading, {
            opacity: 0,
            duration: 0.5,
            y: 100,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: heading,
                start: 'top 110%',
                end: 'top 100%',
            },
        });
    });
    
    itemBlocks.forEach((block) => {
        const children = block.children;
    
        gsap.from(children, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: {
                trigger: block,
                start: 'top 90%',
                end: 'bottom 80%',
            },
        });
    });

    btns.forEach((btn) => {
        gsap.from(btn, {
            opacity: 0,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: btn,
                start: 'top 90%',
                end: 'bottom 80%',
            },
        });
    });

    if (heroBgImage) {
        gsap.from(heroBgImage, {
            scale: 1.25,
            duration: 1,
            ease: 'power2.out',
        });
    }
}