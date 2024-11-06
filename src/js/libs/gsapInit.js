import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export function initGsap() {
    gsap.registerPlugin(ScrollTrigger);

    const itemBlocks = document.querySelectorAll('.items, .swiper-wrapper');
    const heroBgImage = document.querySelector('.hero__bg > img');
    const headings = document.querySelectorAll('h1, h2.section__title');

    if (headings.length) {
        gsap.from(headings, {
            opacity: 0,
            duration: 0.5,
            y: 100,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: headings,
                start: 'top 110%',
                end: 'top 100%',
            },
        });
    }

    if (itemBlocks.length) {
        itemBlocks.forEach((block) => {
            const children = block.children;
            if (children.length) {
                gsap.from(children, {
                    opacity: 0,
                    duration: 0.15,
                    ease: 'power2.out',
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: block,
                        start: 'top 100%',
                        end: 'bottom 80%',
                    },
                });
            }
        });
    }

    if (heroBgImage) {
        gsap.from(heroBgImage, {
            scale: 1.25,
            duration: 1,
            ease: 'power2.out',
        });
    }
}
