/** update the position of the false cursor
 * 
 * @param {MouseEvent} e delta time
 * @param {HTMLElement} falseCursor the false cursor element
 */
function updatePos(e, falseCursor){
    let speed = (Math.random() * 0.5) + 0.1;
    moveTowardsMouse(e, falseCursor, speed);
}
function moveTowardsMouse(e, falseCursor, speed = 0.1) {
    const rect = falseCursor.getBoundingClientRect();
    const cursorX = rect.left + rect.width / 2;
    const cursorY = rect.top + rect.height / 2;
    const deltaX = e.clientX - cursorX;
    const deltaY = e.clientY - cursorY;
    falseCursor.style.left = (cursorX + deltaX * speed) + "px";
    falseCursor.style.top = (cursorY + deltaY * speed) + "px";
}

function collect(e, falseCursor){
    e.preventDefault();
    e.stopPropagation();
    const waterDrop = document.createElement('div');
    waterDrop.innerHTML = '💧';
    waterDrop.style.position = 'absolute';
    waterDrop.style.left = falseCursor.style.left;
    waterDrop.style.top = falseCursor.style.top;
    waterDrop.style.color = 'blue';
    waterDrop.style.fontSize = '20px';
    document.body.appendChild(waterDrop);
}

export { updatePos, collect };