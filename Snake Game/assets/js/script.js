const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// Obtener el puntaje más alto desde el almacenamiento local
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `Puntaje más alto: ${highScore}`;

const updateFoodPosition = () => {
    // Asignar una posición aleatoria entre 1 y 30 para la comida
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    // Detener el temporizador y recargar la página al terminar el juego
    clearInterval(setIntervalId);
    alert("¡Juego terminado! Presiona OK para jugar de nuevo...");
    location.reload();
}

const changeDirection = e => {
    // Cambiar la dirección según la tecla presionada
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Llamar a changeDirection por cada clic en un botón y pasar el valor de la tecla como un objeto
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Comprobar si la serpiente alcanzó la comida
    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // Agregar la posición de la comida al cuerpo de la serpiente
        score++; // Incrementar el puntaje en 1
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Puntaje: ${score}`;
        highScoreElement.innerText = `Puntaje más alto: ${highScore}`;
    }
    // Actualizar la posición de la cabeza de la serpiente según la velocidad actual
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Mover hacia adelante los valores de los elementos del cuerpo de la serpiente
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // Asignar la posición actual a la cabeza de la serpiente

    // Verificar si la cabeza de la serpiente sale del área, si es así, terminar el juego
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // Agregar un div por cada parte del cuerpo de la serpiente
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Comprobar si la cabeza de la serpiente chocó con el cuerpo
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);
