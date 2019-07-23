/*jshint esversion: 6 */

/*
JavaScript code for memory game with cards
The following logic is implemented:
* Use the arrow keys to control the character (move the player up, down, left, right)
* Avoid meeting bugs, they are your enemies
* The game displays your score - number of times you reached the water without meeting the bugs
* Collision with a bug will return the player to the initial position and reset your score
* Player skin will be randomly changed when you reach the water
* The speed of bugs is assigned randomly each time they are crossing the screen
*/

// Whole-script strict mode syntax
"use strict";

const canvasWidth = 505;
const blockWidth = 101;
const blockHeight = 83;
const playerImageYOffset = 10;
const enemyImageYOffset = 20;
const collisionXOffset = 80;
const collisionYOffset = 60;
let score = 0;
const scoreCounter = document.querySelector('.score');

function increaseScore() {
    score++;
    scoreCounter.innerText = score;
}

function resetScore() {
    score = 0;
    scoreCounter.innerText = score;
}

const playerBottomYPosition = blockHeight * 5 - playerImageYOffset;

function getRandomSpeed() {
    return 100 + Math.floor(Math.random() * 400);//min speed = 100, max speed = 500
}

class Character {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    //Draw the character on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Character {
    constructor(y, speed = getRandomSpeed()) {
        super(-blockWidth, y, 'images/enemy-bug.png');
        this.speed = speed;
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > canvasWidth) {
            this.x = -blockWidth;
            this.speed = getRandomSpeed();
        }
        //check if enemy and player collision happens
        if (this.x + collisionXOffset > player.x &&
            this.x - collisionXOffset < player.x &&
            this.y + collisionYOffset > player.y &&
            this.y - collisionYOffset < player.y
        ) {
            player.resetPosition();
            resetScore();
        }
    }
}

class Player extends Character {
    constructor(x = blockWidth * 2, y = playerBottomYPosition) {
        super(x, y, 'images/char-boy.png');//initial skin for the player is the char boy
    }

    resetPosition() {
        this.x = blockWidth * 2;
        this.y = playerBottomYPosition;
    }

    setRandomSkin() {
        const random = 1 + Math.round(Math.random() * 4);
        switch (random) {
            case 1:
                this.sprite = 'images/char-boy.png';
                break;
            case 2:
                this.sprite = 'images/char-cat-girl.png';
                break;
            case 3:
                this.sprite = 'images/char-horn-girl.png';
                break;
            case 4:
                this.sprite = 'images/char-pink-girl.png';
                break;
            case 5:
                this.sprite = 'images/char-princess-girl.png';
                break;
        }
    }

    //handles for key presses (left, right, up, down)
    handleInput(key) {
        if (this.y < 0) { //if player has already reached the water, do nothing waiting to setTimeout will reset it
            return;
        }
        switch (key) {
            case 'left':
                this.x > 0 ? this.x -= blockWidth : this.x -= 0;
                break;
            case 'right':
                this.x < canvasWidth - blockWidth ? this.x += blockWidth : this.x += 0;
                break;
            case 'up':
                this.y > 0 ? this.y -= blockHeight : this.y -= 0;
                break;
            case 'down':
                this.y < blockHeight * 5 - 10 ? this.y += blockHeight : this.y += 0;
                break;
        }
        if (this.y < 0) {
            setTimeout(function () {
                player.resetPosition();
                player.setRandomSkin();
                increaseScore();
            }, 600);
        }
    }
}

// Objects instantiation
const allEnemies = [];
const enemyLocation = [blockHeight - enemyImageYOffset, blockHeight * 2 - enemyImageYOffset, blockHeight * 3 - enemyImageYOffset];
enemyLocation.forEach(function (locationY) {
    const enemy = new Enemy(locationY);
    allEnemies.push(enemy);
});

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});