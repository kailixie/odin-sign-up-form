
// Red Panda Animated Sprite
let img = new Image();
img.src = 'img/red-panda.png';
img.onload = function() {
    init();
    speech();
    // clearSpeech();
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
    ctx.clearRect(0, 140, 160, 180);
    drawFrame(0, cycleLoop[currentLoopIndex], 0, 170);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {drawFrame(0, 0, 0, 170)}
    window.requestAnimationFrame(wave);
}

function init() {
    window.requestAnimationFrame(wave);
};

ctx.font = '25px VT323';
ctx.textAlign = 'center';
ctx.fillStyle = 'var(--color-five)';

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
        for (let b = 0; b < introTextLoop[i].length; b++) {
            ctx.fillText(introTextLoop[i][b], 230, 100 + (b*lineHeight));
        }
    } 
}

// Remove ability to input dates in future for birthday

const birthday = document.getElementById('birthday');
birthday.max = new Date().toLocaleDateString('en-ca');

// Test password is 8-16 characters, with at least a symbol, upper and lower case
// letter, and a number
// function validatePassword(password) {
//     const regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8, 16}$/;
//     return regularExpression.text(password);
// }

const passwordInput = document.getElementById('password');

passwordInput.onfocus = function() {
    document.getElementById('passwordRequires').style.display = "block";
}

passwordInput.onblur = function() {
    document.getElementById('passwordRequires').style.display = "none";
}


function getPassword() {
    const text = document.getElementById('password').value;

    const pwLength = document.getElementById('pwLength');
    const pwCapital = document.getElementById('pwCapital');
    const pwLower = document.getElementById('pwLower');
    const pwNumber = document.getElementById('pwNumber');
    const pwSpecial = document.getElementById('pwSpecial');

    const passwordRequires = document.getElementById('passwordRequires');

    checkPasswordLength(text) ? pwLength.classList.add('valid') : pwLength.classList.remove('valid');
    checkCapital(text) ? pwCapital.classList.add('valid') : pwCapital.classList.remove('valid');
    checkLower(text) ? pwLower.classList.add('valid') : pwLower.classList.remove('valid');
    checkNumber(text) ? pwNumber.classList.add('valid') : pwNumber.classList.remove('valid');
    checkSpecial(text) ? pwSpecial.classList.add('valid') : pwSpecial.classList.remove('valid');

    checkPasswordLength(text) ? pwLength.classList.remove('invalid') : pwLength.classList.add('invalid');
    checkCapital(text) ? pwCapital.classList.remove('invalid') : pwCapital.classList.add('invalid');
    checkLower(text) ? pwLower.classList.remove('invalid') : pwLower.classList.add('invalid');
    checkNumber(text) ? pwNumber.classList.remove('invalid') : pwNumber.classList.add('invalid');
    checkSpecial(text) ? pwSpecial.classList.remove('invalid') : pwSpecial.classList.add('invalid');

    checkPasswordLength(text) && checkCapital(text) && checkLower(text) && checkNumber(text) && checkSpecial(text) ? passwordRequires.classList.add('valid') : passwordRequires.classList.remove('valid');
}

function checkPasswordLength(text) {
    return text.length >= 8 && text.length <=16;
}

function checkCapital(text) {
    return /[A-Z]/.test(text);
}

function checkLower(text) {
    return /[a-z]/.test(text);
}

function checkNumber(text) {
    return /[0-9]/.test(text);
}

function checkSpecial(text) {
    return /[!@#$%^&*]/g.test(text);
}