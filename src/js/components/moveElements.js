// moveElements.js

export function moveElements() {
    const preffix = 'movedIn';
    for (let moveElement of document.querySelectorAll('[data-move]')) {
        let data = moveElement.dataset,
            windowWidth = window.innerWidth,
            dataSize = data.move ? +data.move : 576,
            dataBreak = data.break ? +data.break : false,
            toElement = data.to ? document.getElementById(data.to) : false,
            oldPosition = document.getElementById(preffix + data.to);
        
        if (!toElement) return;
        
        if (windowWidth < dataSize && !oldPosition && windowWidth >= dataBreak) {
            let newOldPosition = document.createElement('div');
            newOldPosition.id = preffix + data.to;
            newOldPosition.style.display = 'none';
            moveElement.before(newOldPosition);
            toElement.append(moveElement);
        }
        else if ((windowWidth >= dataSize || (dataBreak && dataBreak > windowWidth)) && oldPosition) {
            oldPosition.after(moveElement);
            oldPosition.remove();
        }
    }
}

export function initMoveElements() {
    window.addEventListener('resize', moveElements);
    document.addEventListener('DOMContentLoaded', moveElements);
}
