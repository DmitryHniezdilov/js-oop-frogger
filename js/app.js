"use strict";

const mainConfig = {
    fieldWidth: 405,
    enemyWidth: 100,
    enemyImg: 'images/enemy-bug.png',
    heightLinesOfEnemies: {
        1: 226,
        2: 144,
        3: 62
    },
    minSpeedOfEnemy: 50,
    maxSpeedOfEnemy: 300,
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}

const Enemy = function(x, y, mainConfig) {
    this.x = x;
    this.y = y;
    this.sprite = mainConfig.enemyImg;
    this.speed = mainConfig.getRandomArbitrary(mainConfig.minSpeedOfEnemy, mainConfig.maxSpeedOfEnemy);
    this.enemyWidth = mainConfig.enemyWidth;
    this.fieldWidth = mainConfig.fieldWidth;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > this.fieldWidth + this.enemyWidth) {
        this.x = -this.enemyWidth;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];

const startPositionOfEnemies = function(i, n, mainConfig) {
    const enemyWidth = mainConfig.enemyWidth,
        fieldWidth = mainConfig.fieldWidth,
        getRandomArbitrary = mainConfig.getRandomArbitrary;

    if (i === 1) {
            return getRandomArbitrary(-enemyWidth, enemyWidth*2);
    } else if ( i === 2 && n === 2 ) {
        return getRandomArbitrary(-fieldWidth, -enemyWidth);
    } else if ( i === 2) {
        return getRandomArbitrary((-fieldWidth + enemyWidth )/2, -enemyWidth); 
    } else if ( i === 3) {
        return getRandomArbitrary((-fieldWidth + enemyWidth )/2, -enemyWidth);
    } else {
        return 0;
    }
}

const createEnemies = function(n, row, mainConfig) {
    const heightOfLine = mainConfig.heightLinesOfEnemies[row];

    for (let i = 1; i <= n; i++) {
        const startPositionX = startPositionOfEnemies(i, n, mainConfig);

        allEnemies.push(new Enemy(startPositionX, heightOfLine, mainConfig));
    }
}

createEnemies(1, 1, mainConfig);
createEnemies(2, 2, mainConfig);
createEnemies(2, 3, mainConfig);

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
