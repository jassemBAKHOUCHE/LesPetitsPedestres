import { updatePos, collect } from "./water_physics.js";

console.log("scripte_clicker.js chargé");

// Define variables to avoid reference errors
let oldDt = 0;
let secondsPassed = 0;
let money = 0;
let waterHeight = 0;

let fpsP;
let waterDiv;
let falseCursor;
let collectButton;
let moneyP;
let bubbles = []; // Array to store bubble elements and their data

// List of image paths for random bubble selection
const bubbleImages = [
    'images/plastic-bag.jpg'
];

// Listen to the onLoad event
window.onload = init;

function registerUser() {
    fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pseudo: 'test',
            password: 'test',
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Trigger init function when the page has loaded
function init() {
    fpsP = document.getElementById('fps');
    waterDiv = document.getElementById('water');
    falseCursor = document.getElementById('falseCursor');
    collectButton = document.getElementById('collect');
    moneyP = document.getElementById('money');

    // Register the user
    registerUser();

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

    window.addEventListener('keypress', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === ' ') {
            collect(e, falseCursor);
        }
    });

    console.log("d")
    // Start spawning divs every 5 seconds


    // Request an animation frame for the first time
    window.requestAnimationFrame(gameLoop);
}

function refreshMoney() {
    // TODO Update the money counter
    moneyP.innerText = "Money: " + money +"♻️";
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

    // Update water height
    waterHeight = 5 * Math.sin(dt / 1000); // 10 pixels per second
    waterDiv.style.height = (80 + waterHeight) + '%';

    // Prevent the false cursor from going above the water
    const falseCursorRect = falseCursor.getBoundingClientRect();
    const waterDivRect = waterDiv.getBoundingClientRect();
    if (falseCursorRect.top < waterDivRect.top) {
        falseCursor.style.top = waterDivRect.top + 'px';
    }

    if (Math.floor(Math.random()*10000)<=25) {
    spawnRandomDiv()        
    }

    // The loop function has reached its end
    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

/**
 * Spawn a new image element at a random position inside waterDiv
 */
function spawnRandomDiv() {
    // Create a new bubble image element
    const newImg = document.createElement('img');

    // Randomly select an image from the bubbleImages array
    const randomImage = bubbleImages[Math.floor(Math.random() * bubbleImages.length)];
    newImg.src = randomImage; // Set the image source to the randomly selected image
    newImg.alt = 'Bubble'; // Alt text for the image for accessibility
    newImg.classList.add('bubble'); // Assign a class for styling (optional)

    // Set image size (make sure it matches your bubble size)
    newImg.style.width = '50px';
    newImg.style.height = '50px';

    // Generate random positions within waterDiv boundaries
    const waterDivRect = waterDiv.getBoundingClientRect();
    const randomX = Math.random() * (waterDivRect.width - 50); // Subtract width of the image
    const randomY = Math.random() * (waterDivRect.height - 50); // Subtract height of the image

    // Add click event listener for the image
    newImg.addEventListener('click', (e) => {
        if (!e.isTrusted) {
            if (newImg.style.backgroundColor !== 'red') {
                newImg.remove()
                money += 1;
                refreshMoney();
            }
        }
    });

    // Append the new image to waterDiv
    waterDiv.appendChild(newImg);

    // Add bubble data to the bubbles array
    bubbles.push({
        element: newImg,
        x: randomX,
        y: randomY,
        radius: 25, // Half of the width/height of the image
        speedX: (Math.random() * 2 - 1) * 100, // Random horizontal speed (-100 to 100 pixels/second)
        speedY: (Math.random() * 2 - 1) * 100, // Random vertical speed (-100 to 100 pixels/second)
    });

    // Initialize the image's position using transform for smooth movement
    newImg.style.transform = `translate(${randomX}px, ${randomY}px)`;
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

        // Update the bubble's position using transform for smooth movement
        bubbleA.element.style.transform = `translate(${bubbleA.x}px, ${bubbleA.y}px)`;
    }
}
money Requça est