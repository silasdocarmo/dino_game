const player = document.querySelector('.player');
const background = document.querySelector('.background');

let isJumping = false;
let position = 0;

function keyMap(event) {
    if (event.keyCode == 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;
    let timeAnimation = 20

    let upAnimation = setInterval(() => {
        if (position >= 100) {
            clearInterval(upAnimation);

            let downAnimation = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downAnimation);
                    isJumping = false;
                } else {
                    position -= 20;
                    player.style.bottom = position + 'px';
                }
            }, timeAnimation);
        } else {
            position += 20;
            player.style.bottom = position + 'px';
        }
    }, timeAnimation);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 4000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let playerSpeed = setInterval(() => {
        if (cactusPosition < -40) {
            clearInterval(playerSpeed);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 40 && position < 40) {
            clearInterval(playerSpeed);
            document.body.innerHTML = "<h1 class='Game-over'> Fim de Jogo</h1>"
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)
    setTimeout(createCactus, randomTime)
}
createCactus();
document.addEventListener('keypress', keyMap)