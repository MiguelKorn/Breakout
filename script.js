"use strict";
var game = game || {};
var ball = ball || {};

game.init = function () {
    this.canvas = document.getElementById("field");
    this.ctx = this.canvas.getContext("2d");
    this.loop();
};

game.loop = function () {

    requestAnimationFrame(game.loop);
    ball.draw();
};

ball.init = function () {
    this.x = game.canvas.width / 2;
    this.y = game.canvas.height - 30;
};

ball.draw = function () {
    game.ctx.beginPath();
    game.ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
    game.ctx.fillStyle = "#0095DD";
    game.ctx.fill();
    game.ctx.closePath();
};

game.init();

