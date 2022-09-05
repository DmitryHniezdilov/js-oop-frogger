"use strict";

const mainConfig = {
    fieldWidth: 404,
    fieldHeight: 404,
    cellWidth: 101,
    rowHeight: 83,
    playerImg: 'images/char-boy.png',
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
    this.cellWidth = mainConfig.cellWidth;
    this.fieldWidth = mainConfig.fieldWidth;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > this.fieldWidth + this.cellWidth) {
        this.x = -this.cellWidth;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function(mainConfig) {
    this.x = mainConfig.fieldWidth / 2;
    this.y = mainConfig.fieldHeight;
    this.sprite = mainConfig.playerImg;
    this.fieldWidth = mainConfig.fieldWidth;
    this.fieldHeight = mainConfig.fieldHeight;
    this.cellWidth = mainConfig.cellWidth;
    this.rowHeight = mainConfig.rowHeight;
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    this.update = function() {
        this.checkExitFromField();
    };
    this.handleInput = function(key) {
        switch(key) {
            case "left":
                this.x += -this.cellWidth; 
                break;
            case "up":
                this.y += -this.rowHeight; 
                break;
            case "right":
                this.x += this.cellWidth; 
                break;
            case "down":
                this.y += this.rowHeight;
                break;
        }
    };
    this.checkExitFromField = function() {
        if (this.x < 0) {
            this.x = 0
        } else if (this.x > this.fieldWidth) {
            this.x = this.fieldWidth;
        } else if (this.y < -11) {
            this.y = -11;
        } else if (this.y > this.fieldHeight) {
            this.y = this.fieldHeight;
        }
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];

const startPositionOfEnemies = function(i, n, mainConfig) {
    const cellWidth = mainConfig.cellWidth,
        fieldWidth = mainConfig.fieldWidth,
        getRandomArbitrary = mainConfig.getRandomArbitrary;

    if (i === 1) {
            return getRandomArbitrary(-cellWidth, cellWidth*2);
    } else if ( i === 2 && n === 2 ) {
        return getRandomArbitrary(-fieldWidth, -cellWidth);
    } else if ( i === 2) {
        return getRandomArbitrary((-fieldWidth + cellWidth )/2, -cellWidth); 
    } else if ( i === 3) {
        return getRandomArbitrary((-fieldWidth + cellWidth )/2, -cellWidth);
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

const player = new Player(mainConfig);

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
