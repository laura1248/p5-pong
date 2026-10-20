let paddleX;
let ballX;
let ballY;
let ballSpeedX;
let ballSpeedY;
let score = 0;
let highScore = 0;

const canvasWidth = 600;
const canvasHeight = 400;
const paddleWidth = 110;
const paddleHeight = 16;
const paddleY = canvasHeight - 35;
const paddleSpeed = 7;
const ballSize = 16;

const colorBlack = "black";
const colorWhite = "white";
const colorMagenta = "magenta";
const colorYellow = "yellow";

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("game");
  resetBall();
  paddleX = width / 2 - paddleWidth / 2;
}

function draw() {
  background(colorBlack);
  movePaddle();
  moveBall();
  drawGame();
}

function movePaddle() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    paddleX -= paddleSpeed;
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    paddleX += paddleSpeed;
  }

  paddleX = constrain(paddleX, 0, width - paddleWidth);
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX <= ballSize / 2 || ballX >= width - ballSize / 2) {
    ballSpeedX *= -1;
  }

  if (ballY <= ballSize / 2) {
    ballSpeedY *= -1;
  }

  const hitsPaddle =
    ballY + ballSize / 2 >= paddleY &&
    ballY - ballSize / 2 <= paddleY + paddleHeight &&
    ballX >= paddleX &&
    ballX <= paddleX + paddleWidth &&
    ballSpeedY > 0;

  if (hitsPaddle) {
    ballY = paddleY - ballSize / 2;
    ballSpeedY *= -1;
    ballSpeedX += (ballX - (paddleX + paddleWidth / 2)) * 0.05;
    score += 1;
    highScore = Math.max(highScore, score);
  }

  if (ballY > height + ballSize) {
    score = 0;
    resetBall();
  }
}

function drawGame() {
  fill(colorWhite);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(`Score: ${score}`, width / 2, 28);
  textAlign(RIGHT, CENTER);
  text(`High score: ${highScore}`, width - 12, 28);

  fill(colorMagenta);
  rect(paddleX, paddleY, paddleWidth, paddleHeight, 4);

  fill(colorYellow);
  circle(ballX, ballY, ballSize);
}

function resetBall() {
  ballX = width / 2;
  ballY = height / 2;
  ballSpeedX = 4;
  ballSpeedY = 4;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    return false;
  }
}
