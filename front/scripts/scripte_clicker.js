import { updatePos, collect } from "./water_physics.js";

console.log("scripte_clicker.js chargé");

// Define variables to avoid reference errors
let oldDt = 0;
let secondsPassed = 0;

let fpsP;
let waterDiv;
let falseCursor;
let collectButton;
let bubbles = []; // Array to store bubble elements and their data

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
        e.preventDefault();
        e.stopPropagation();
        if(e.isTrusted){
            updatePos(e, falseCursor);
        }
    });
    collectButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation()
        collect(e, falseCursor);
    });

    // Start spawning divs every 5 seconds
    setInterval(spawnRandomDiv, 5000);

    // Request an animation frame for the first time
    window.requestAnimationFrame(gameLoop);
}

/**
 * Main game loop
 * @param {float} dt delta time
 */
function gameLoop(dt) {
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (dt - oldDt) / 1000;
    oldDt = dt;

    // Draw fps to the screen
    fpsP.innerText = "FPS: " + Math.round(1 / secondsPassed);

    // Update all bubbles
    updateBubbles();

    // The loop function has reached its end
    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

/**
 * Spawn a new div element at a random position inside waterDiv
 */
function spawnRandomDiv() {
    // Create a new bubble div
    const newDiv = document.createElement('div');

    // Assign the 'bubble' class for styling
    newDiv.classList.add('bubble');

    // Generate random positions within waterDiv boundaries
    const waterDivRect = waterDiv.getBoundingClientRect();
    const randomX = Math.random() * (waterDivRect.width - 50); // Subtract width of the div
    const randomY = Math.random() * (waterDivRect.height - 50); // Subtract height of the div
    newDiv.style.width = '50px'
    // Add click event listener
    newDiv.addEventListener('click', (e) => {
        if(!e.isTrusted){
            if(newDiv.style.backgroundColor != 'red'){
                newDiv.style.backgroundColor = 'red'
            }
        }
        
    });

    // Append the new div to waterDiv
    waterDiv.appendChild(newDiv);

    // Add bubble data to the bubbles array
    bubbles.push({
        element: newDiv,
        x: randomX,
        y: randomY,
        radius: 25, // Half of the width/height
        speedX: (Math.random() * 2 - 1) * 100, // Random horizontal speed (-100 to 100 pixels/second)
        speedY: (Math.random() * 2 - 1) * 100, // Random vertical speed (-100 to 100 pixels/second)
    });

    // Initialize the bubble's position
    newDiv.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

/**
 * Update the positions and interactions of all bubbles
 */
function updateBubbles() {
    const waterDivRect = waterDiv.getBoundingClientRect();

    // Update each bubble's position and handle interactions
    for (let i = 0; i < bubbles.length; i++) {
        const bubbleA = bubbles[i];

        // Update position
        bubbleA.x += bubbleA.speedX * secondsPassed;
        bubbleA.y += bubbleA.speedY * secondsPassed;

        // Bounce off edges
        if (bubbleA.x <= 0 || bubbleA.x >= waterDivRect.width - 50) bubbleA.speedX = -bubbleA.speedX;
        if (bubbleA.y <= 0 || bubbleA.y >= waterDivRect.height - 50) bubbleA.speedY = -bubbleA.speedY;

        // Check for collisions with other bubbles
        for (let j = i + 1; j < bubbles.length; j++) {
            const bubbleB = bubbles[j];
            const dx = bubbleA.x - bubbleB.x;
            const dy = bubbleA.y - bubbleB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < bubbleA.radius + bubbleB.radius) {
                // Collision detected - exchange speeds
                const tempSpeedX = bubbleA.speedX;
                const tempSpeedY = bubbleA.speedY;

                bubbleA.speedX = bubbleB.speedX;
                bubbleA.speedY = bubbleB.speedY;

                bubbleB.speedX = tempSpeedX;
                bubbleB.speedY = tempSpeedY;

                // Push bubbles apart to avoid sticking
                const overlap = bubbleA.radius + bubbleB.radius - distance;
                const offsetX = (dx / distance) * overlap / 2;
                const offsetY = (dy / distance) * overlap / 2;

                bubbleA.x += offsetX;
                bubbleA.y += offsetY;
                bubbleB.x -= offsetX;
                bubbleB.y -= offsetY;
            }
        }

        // Update the bubble's position using transform
        bubbleA.element.style.transform = `translate(${bubbleA.x}px, ${bubbleA.y}px)`;
    }
}
money Requça est