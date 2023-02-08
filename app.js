
// Red Panda Animated Sprite
let img = new Image();
img.src = 'img/panda-sprite.png';
img.onload = function() {
    init();
    speech();
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
    if (frameCount < 14) {
        window.requestAnimationFrame(wave);
        return;
    }
    frameCount = 0;
    ctx.clearRect(0, 140, 160, 150);
    drawFrame(0, cycleLoop[currentLoopIndex], 0, 140);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        // currentLoopIndex = 0;
        drawFrame(0, 0, 0, 140)
    }
    window.requestAnimationFrame(wave);
}

function init() {
    window.requestAnimationFrame(wave);
};

ctx.font = '25px VT323';
ctx.fillStyle = 'black';

const introTextOne = ['Welcome!'];
const introTextTwo = ['*stomach grumbles*']
const introTextThree = ["Sorry about that...",  "I just woke up and", "I'm SO hungry!"];
const introTextFour = ["Hurry and sign up", "so I can make us", "something to eat!"];

const introTextLoop = [introTextOne, introTextTwo, introTextThree, introTextFour];

const sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time))
}


const speech = async () => {
    let lineHeight = 20;
    for (let i = 0; i < introTextLoop.length; i++) {
        await sleep(1700);
        ctx.clearRect(100, 50, 270, 110);
        for (let b = 0; b<introTextLoop[i].length; b++) {
            ctx.fillText(introTextLoop[i][b], 180, 100 + (b*lineHeight));
        } 
    }
}