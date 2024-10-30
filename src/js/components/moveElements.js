export function initMoveElements() {
    const prefix = 'movedIn';
    const windowWidth = window.innerWidth;
    
    for (let moveElement of document.querySelectorAll('[data-move]')) {
        const data = moveElement.dataset,
              minWidthToMove = data.move ? +data.move : 576,
              maxWidthToMove = data.break ? +data.break : false,
              toElement = data.to ? document.getElementById(data.to) : null,
              oldPosition = document.getElementById(prefix + data.to);
        
        if (!toElement) return;
        
        if (windowWidth < minWidthToMove && !oldPosition && windowWidth >= maxWidthToMove) {
            const placeholder = document.createElement('div');
            placeholder.id = prefix + data.to;
            placeholder.style.display = 'none';
            moveElement.before(placeholder);
            toElement.append(moveElement);
        }
        else if ((windowWidth >= minWidthToMove || (maxWidthToMove && maxWidthToMove > windowWidth)) && oldPosition) {
            oldPosition.after(moveElement);
            oldPosition.remove();
        }
    }
}

window.addEventListener('resize', initMoveElements);
document.addEventListener('DOMContentLoaded', initMoveElements);
