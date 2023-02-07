
// Red Panda Animated Sprite
let img = new Image();
img.src = 'img/panda-sprite.png';
img.onload = function() {
    init();
};

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const spriteSize = 180;

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img, frameX * spriteSize, frameY * spriteSize, spriteSize, spriteSize, canvasX, canvasY, spriteSize, spriteSize);
}

const cycleLoop = [0, 3, 2, 1, 0];
let currentLoopIndex = 0;
let frameCount = 0;

function wave() {
    frameCount++;
    if (frameCount < 15) {
        window.requestAnimationFrame(wave);
        return;
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(0, cycleLoop[currentLoopIndex], 0, 0);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }
    window.requestAnimationFrame(wave);
}

function init() {
    window.requestAnimationFrame(wave);
};