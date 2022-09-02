"use strict";

const fieldWidth = 400,
    fieldHeight = 390,
    enemyWidth = 100,
    enemySpeed = 200,
    enemyImg = 'images/enemy-bug.png';

const Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = enemyImg;
    this.speed = enemySpeed;
    this.enemyWidth = enemyWidth;
    this.fieldWidth = fieldWidth;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    console.log('this.x', this.x);

    console.log('fieldWidth', fieldWidth + enemyWidth);

    if (this.x > fieldWidth + enemyWidth) {
        console.log('if fieldWidth', fieldWidth);
        this.x = -enemyWidth;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const heightLinesOfObstacles = {
    1: 62,
    2: 144,
    3: 226
};

const allEnemies = [];

const createEnemies = function(n, row) {
    const rowNumber = heightLinesOfObstacles[row];

    for (let i = 0; i < n; i++) {
        allEnemies.push(new Enemy(0, rowNumber));
    }
}

createEnemies(1, 1);
createEnemies(2, 2);
createEnemies(3, 3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
