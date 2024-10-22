export const headerHeight = () => {
    const headerHeight = document.querySelector('.header').offsetHeight;
    document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
}
  
headerHeight();


export function getHeaderHeight() {
    document.addEventListener('DOMContentLoaded', headerHeight);
    window.addEventListener('resize', headerHeight);
}
