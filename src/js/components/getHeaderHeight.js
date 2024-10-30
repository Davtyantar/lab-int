export const getHeaderHeight = () => {
    const headerHeight = document.querySelector('.header').offsetHeight;
    document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
}
  
document.addEventListener('DOMContentLoaded', getHeaderHeight);
window.addEventListener('resize', getHeaderHeight);
