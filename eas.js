// Select the elements on the page
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d')
const shakeButton = document.querySelector('.shake') ;

const MOVE_AMOUNT = 10;

// setup canvas for drawing
const { width, height } = canvas;

// or
// const width = canvas.width;
// const height = canvas.height;
 
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
let hue = 0;

ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
ctx.lineJoin = 'round';
ctx.lineCap = 'round'; 
ctx.lineWidth = 10;


ctx.beginPath(); // Start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function
function draw({ key }) {
    // CHnage the hue as we draw
    hue += 10
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

    console.log(key);
    ctx.beginPath();
    ctx.moveTo(x, y);

    switch(key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;    
        default:
            break;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
}
// write a handler for the keys

function handleKey(e) {
    if (e.key.includes("Arrow")) {
        e.preventDefault();
        draw({key: e.key}); 
    }
}

// clear/shake function
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height)
    canvas.addEventListener(
        'animationend', 
        function() {
            canvas.classList.remove('shake'); 
        },
        { once: true }
    )
}

// listen for arrow keys
window.addEventListener("keydown", handleKey);
shakeButton.addEventListener('click', clearCanvas)