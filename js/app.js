const canvasWidth = 505;
const canvasHeight = 606;
const blockWidth = 101;
const blockHeight = 83;
const playerImageYOffset = 10;
const enemyImageYOffset = 20;

const collisionXOffset = 80;
const collisionYOffset = 60;




function getRandomSpeed(){
    return 100 + Math.floor(Math.random() * 400);//min speed = 100, max speed = 500
}

// Enemies our player must avoid
const Enemy = function(y, speed = getRandomSpeed()) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -blockWidth;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function (x = blockWidth * 2, y = blockHeight*5-playerImageYOffset){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';//initial skin for the player is the char boy
}

Player.prototype.update = function(dt) {

};

Player.prototype.resetPosition = function() {
    this.x = blockWidth * 2;
    this.y = blockHeight*5-playerImageYOffset;
};

Player.prototype.setRandomSkin = function() {
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
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
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
            this.y < blockHeight*5-10 ? this.y += blockHeight : this.y += 0;
            break;
    }
    if (this.y < 0) {
        setTimeout(function (){
            player.resetPosition();
            player.setRandomSkin();
        }, 600);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];
const enemyLocation = [blockHeight*1-enemyImageYOffset,blockHeight*2-enemyImageYOffset,blockHeight*3-enemyImageYOffset];
enemyLocation.forEach(function (locationY) {
    const enemy = new Enemy(locationY);
    allEnemies.push(enemy);
});

const player = new Player();





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});