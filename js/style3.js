// ------------------------------------------------------------
// Game loop
// ------------------------------------------------------------
var ctx = null,
    background = null,

    lives = 3,
    paddle = null,
    ball = null,
    bricks = [],

    leftPushed = false,
    rightPushed = false,
    ctrlPushed = false,

    level1 = [[0, 1, 2, 3, 4, 1, 2, 3, 4, 1],
              [1, 2, 3, 4, 1, 2, 3, 4, 1, 0],
              [0, 3, 4, 1, 2, 3, 4, 1, 2, 3],
              [3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
              [0, 1, 2, 3, 4, 1, 2, 3, 4, 1],
              [1, 2, 3, 4, 1, 2, 3, 4, 1, 0],
              [0, 3, 4, 1, 2, 3, 4, 1, 2, 3],
              [3, 4, 1, 2, 3, 4, 1, 2, 3, 0],
              [0, 1, 2, 3, 4, 1, 2, 3, 4, 1]]

$(window).on('load', function () {
    initialize();
    createGame();
    tick();
});

function initialize() {
    background = new Image();
    background.src = "images/style3/background.jpg";
    $('<canvas>')
    .attr("id", "context")
    .attr("width", "500px")
    .attr("height", "650px")
    .appendTo('#styleContents');
    ctx = document.getElementById("context").getContext("2d");
}

function createGame() {
    var paddleSprite = new Image();
    paddleSprite.src = "images/style3/paddle.png";
    paddle = new Paddle(paddleSprite);
    ball = new Ball();

    for (var i = 0; i < level1.length; i++) {
        for (var j = 0; j < level1[i].length; j++) {
            if (level1[i][j] > 0) {
                bricks.push(new Brick(j * 50, i * 25, level1[i][j]));
            }
        }
    }
}

function tick() {
    checkMovement();
    collisionDetection();
    if (background.complete) { ctx.drawImage(background, 0, 0); }
    if (lives > 0) {
        paddle.tick();
        ball.tick();
        for (var i = 0; i < bricks.length; i++) {
            if (bricks[i].alive) {
                bricks[i].tick();
            } else {
                bricks.splice(i, 1);
                i--;
            }

        }
    }
    window.requestAnimationFrame(tick);
}

$(document).keydown(function (e) {
    if (e.which == 37)      leftPushed = true;
    else if (e.which == 39) rightPushed = true;
    else if (e.which == 17) ctrlPushed = true;
});

$(document).keyup(function (e) {
    if (e.which == 37)      leftPushed = false;
    else if (e.which == 39) rightPushed = false;
    else if (e.which == 17) ctrlPushed = false;
});

function checkMovement() {
    if (paddle.alive) {
        if (leftPushed && paddle.x > paddle.halfWidth) {
            paddle.x -= paddle.speed;
        }
        if (rightPushed && paddle.x <= 500 - paddle.halfWidth) {
            paddle.x += paddle.speed;
        }
        if (ctrlPushed && !ball.inGame) { // launch ball
            ball.inGame = true;
            console.log(ball.inGame);
        }
    }

}

function collisionDetection() {
    for (var i = bricks.length - 1; i >= 0; i--) {
        if (ball.x + ball.radius > bricks[i].x - bricks[i].halfWidth &&
            ball.x - ball.radius < bricks[i].x + bricks[i].halfWidth &&
            ball.y + ball.radius > bricks[i].y - bricks[i].halfHeight &&
            ball.y - ball.radius < bricks[i].y + bricks[i].halfHeight) {
            bricks[i].hp--;
            ball.dy = -ball.dy;
        }
    }

    if (ball.x + ball.radius > paddle.x - paddle.halfWidth &&
        ball.x - ball.radius < paddle.x + paddle.halfWidth &&
        ball.y + ball.radius > paddle.y - paddle.halfHeight &&
        ball.y - ball.radius < paddle.y + paddle.halfHeight) {
        ball.dy = -ball.dy;
    }
}

// ------------------------------------------------------------
// Paddle
// ------------------------------------------------------------
function Paddle(sprite) {
    this.x = 250;
    this.y = 600;
    this.sprite = sprite;
    this.halfWidth = 40;
    this.halfHeight = 9.5;
    this.alive = true;
    this.speed = 5;
}

Paddle.prototype.tick = function() {
    if (this.sprite.complete) {
        ctx.drawImage(this.sprite,
                      this.x - this.halfWidth,
                      this.y - this.halfHeight);
    }
};


// ------------------------------------------------------------
// Brick
// ------------------------------------------------------------
function Brick(x, y, hp) {
    this.halfHeight = 12.5;
    this.halfWidth = 25;
    this.x = x + this.halfWidth;
    this.y = y + this.halfHeight;
    this.alive = true;
    this.color = "";
    this.hp = hp;
}

Brick.prototype.tick = function() {
    switch (this.hp) {
        case 0:
            this.alive = false;
        case 1:
            this.color = "#07FE00";
            break;
        case 2:
            this.color = "#FFFF08";
            break;
        case 3:
            this.color = "#F0A203";
            break;
        case 4:
            this.color = "#F90403";
            break;
        default:
            this.color = "#";
            break;
    }

    if (this.alive) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.halfWidth,
                     this.y - this.halfHeight,
                     this.halfWidth * 2,
                     this.halfHeight * 2);
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x - this.halfWidth,
                      this.y - this.halfHeight,
                      this.halfWidth * 2,
                      this.halfHeight * 2);
    }
};

// ------------------------------------------------------------
// Ball
// ------------------------------------------------------------
function Ball() {
    this.radius = 5;
    this.speed = 4;
    this.x = 0;
    this.y = 0;
    this.dx = this.speed;
    this.dy = -this.speed;
    this.inGame = false;
}

Ball.prototype.tick = function() {
    if (this.inGame) {
        if (this.x + this.radius >= 500 || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (this.y > 750) {
            lives--;
            this.inGame = false;
        }
    }
    else {
        this.x = paddle.x;
        this.y = paddle.y - paddle.halfHeight - this.radius;
    }
    this.draw();
};

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
};
