export const setCustomVh = () => {
    const zoomLevel = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
    const viewportHeight = window.innerHeight;
    const adjustedVh = viewportHeight / zoomLevel * 0.01;
  
    document.documentElement.style.setProperty('--vh', `${adjustedVh}px`);
}
  
setCustomVh();

export function setVh() {
    document.addEventListener('DOMContentLoaded', setCustomVh);
    window.addEventListener('resize', setCustomVh);
}
