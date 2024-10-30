export const setVh = () => {
    const zoomLevel = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
    const viewportHeight = window.innerHeight;
    const adjustedVh = viewportHeight / zoomLevel * 0.01;
  
    document.documentElement.style.setProperty('--vh', `${adjustedVh}px`);
}
  
document.addEventListener('DOMContentLoaded', setVh);
window.addEventListener('resize', setVh);
