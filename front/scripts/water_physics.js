/** update the position of the false cursor
 * 
 * @param {MouseEvent} e delta time
 * @param {HTMLElement} falseCursor the false cursor element
 */
function updatePos(e, falseCursor){
    e.preventDefault();
    e.stopPropagation();
    let speed = (Math.random() * 0.5) + 0.1;
    moveTowardsMouse(e, falseCursor, speed);
}
function moveTowardsMouse(e, falseCursor, speed = 0.1) {
    const rect = falseCursor.getBoundingClientRect();
    const cursorX = rect.left + rect.width / 2;
    const cursorY = rect.top + rect.height / 2;
    const deltaX = e.clientX - cursorX;
    const deltaY = e.clientY - cursorY;
    const xOfset = (Math.random() - 0.5) * 15;
    const yOfset = (Math.random() - 0.5) * 15;
    falseCursor.style.left = (cursorX + xOfset + deltaX * speed) + "px";
    falseCursor.style.top = (cursorY + yOfset + deltaY * speed) + "px";
}

function collect(e, falseCursor) {
    e.preventDefault();
    e.stopPropagation();
    const rect = falseCursor.getBoundingClientRect();
    const elements = document.elementsFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    elements.forEach(element => {
        if (element !== falseCursor && typeof element.click === 'function') {
            element.click();
        }
    });
}

export { updatePos, collect };