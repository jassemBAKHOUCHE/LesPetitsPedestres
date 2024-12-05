import { updatePos, collect } from "./water_physics.js";

console.log("scripte_clicker.js chargé");

// Define variables to avoid reference errors
let oldDt = 0;
let secondsPassed = 0;

let fpsP;
let waterDiv;
let falseCursor;
let collectButton;

// Listen to the onLoad event
window.onload = init;

// Trigger init function when the page has loaded
function init() {
    fpsP = document.getElementById('fps');
    waterDiv = document.getElementById('water');
    falseCursor = document.getElementById('falseCursor');
    collectButton = document.getElementById('collect');

    // Add event listeners
    waterDiv.addEventListener('click', (e) => {
        updatePos(e, falseCursor);
    });
    collectButton.addEventListener('click', (e) => {
        collect(e, falseCursor);
    });

    // Request an animation frame for the first time
    // The gameLoop() function will be called as a callback of this request
    window.requestAnimationFrame(gameLoop);
}

/**
 *  Main game loop
 * @param {float} dt delta time
 */
function gameLoop(dt) {

    // Calculate the number of seconds passed since the last frame
    secondsPassed = (dt - oldDt) / 1000;
    oldDt = dt;

    // Draw fps to the screen
    fpsP.innerText = "FPS: " + Math.round(1 / secondsPassed);

    // Perform the drawing operation
    draw();

    // Update the clicker
    update(dt);

    // The loop function has reached it's end
    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

/**
 * Update the clicker
 * @param {float} dt delta time
 */
function update(dt) {
}

function draw() {
    
}