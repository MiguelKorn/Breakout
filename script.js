"use strict";
var game = game || {};
var ball = ball || {};
var paddle = paddle || {};
var brick = brick || {};

game.init = function () {
    document.addEventListener("keyup", this.keyUpHandler, false);
    document.addEventListener("keydown", this.keyDownHandler, false);

    this.canvas = document.getElementById("field");
    this.ctx = this.canvas.getContext("2d");
    this.leftPressed = false;
    this.rightPressed = false;

    // init all
    ball.init();
    paddle.init();
    brick.init();
    this.loop();
};

game.keyUpHandler = function (e) {
    // check if 'a' or 'left' button is pressed
    if (e.keyCode === 37 || e.keyCode === 65) {
        game.leftPressed = false;
    }
    // check if 'd' or 'right' button is pressed
    else if (e.keyCode === 39 || e.keyCode === 68) {
        game.rightPressed = false;
    }
};

game.keyDownHandler = function (e) {
    // check if 'a' or 'left' button is pressed
    if (e.keyCode === 37 || e.keyCode === 65) {
        game.leftPressed = true;
    }
    // check if 'd' or 'right' button is pressed
    else if (e.keyCode === 39 || e.keyCode === 68) {
        game.rightPressed = true;
    }
};

game.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

game.loop = function () {
    game.clear();

    brick.draw();
    ball.draw();
    paddle.draw();

    brick.collisionDetection();
    ball.checkPos();
    paddle.checkPos();

    requestAnimationFrame(game.loop);
};

ball.init = function () {
    this.x = game.canvas.width / 2;
    this.y = game.canvas.height - 30;
    this.dx = 2;
    this.dy = -2;
    this.r = 10;
    this.color = "#404040";
};

ball.draw = function () {
    game.ctx.beginPath();
    game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    game.ctx.fillStyle = this.color;
    game.ctx.fill();
    game.ctx.closePath();
};

ball.checkPos = function () {
    if (this.x + this.dx > game.canvas.width - this.r || this.x + this.dx < this.r) {
        this.dx = -this.dx;
    }
    if (this.y + this.dy < this.r) {
        this.dy = -this.dy;
    }
    else if (this.y + this.dy > game.canvas.height - this.r) {
        if (this.x > paddle.x && this.x < paddle.x + paddle.w) {
            this.dy = -this.dy;
        }
        else {
            console.log("GAME OVER");
            document.location.reload();
        }
    }

    this.x += this.dx;
    this.y += this.dy;
};

paddle.init = function () {
    this.w = 75;
    this.h = 10;
    this.x = (game.canvas.width - this.w) / 2;
    this.color = "#404040";
    this.dx = 7;
};

paddle.draw = function () {
    game.ctx.beginPath();
    game.ctx.rect(this.x, game.canvas.height - this.h, this.w, this.h);
    game.ctx.fillStyle = this.color;
    game.ctx.fill();
    game.ctx.closePath();
};

paddle.checkPos = function () {
    if (game.leftPressed && this.x > 0) {
        this.x -= this.dx;
    }
    else if (game.rightPressed && this.x < game.canvas.width - this.w) {
        this.x += this.dx;
    }
};

brick.init = function () {
    this.row = 3;
    this.col = 5;
    this.w = 75;
    this.h = 20;
    this.padding = 10;
    this.offset = {
        top: 30,
        left: 30
    };
    this.bricks = [];
    for (var c = 0; c < this.col; c++) {
        this.bricks[c] = [];
        for (var r = 0; r < this.row; r++) {
            this.bricks[c][r] = {x: 0, y: 0, status: 1};
        }
    }
    this.color = "#9fdd8b";
};

brick.draw = function () {
    for (var c = 0; c < this.col; c++) {
        for (var r = 0; r < this.row; r++) {
            if (this.bricks[c][r].status === 1) {
                var brickX = (c * (this.w + this.padding)) + this.offset.left;
                var brickY = (r * (this.h + this.padding)) + this.offset.top;
                this.bricks[c][r].x = brickX;
                this.bricks[c][r].y = brickY;
                game.ctx.beginPath();
                game.ctx.rect(brickX, brickY, this.w, this.h);
                game.ctx.fillStyle = this.color;
                game.ctx.fill();
                game.ctx.closePath();
            }
        }
    }
};

brick.collisionDetection = function () {
    for (var c = 0; c < this.col; c++) {
        for (var r = 0; r < this.row; r++) {
            var b = this.bricks[c][r];
            if (b.status === 1) {
                if (ball.x > b.x && ball.x < b.x + this.w && ball.y > b.y && ball.y < b.y + this.h) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                }
            }
        }
    }
};

game.init();

