"use strict";

const fieldWidth = 404,
    fieldHeight = 404,
    cellWidth = 101,
    rowHeight = 83,
    playerImg = 'images/char-boy.png',
    enemyImg = 'images/enemy-bug.png',
    heightLinesOfEnemies = {
        1: 228,
        2: 145,
        3: 62
    },
    minSpeedOfEnemy = 50,
    maxSpeedOfEnemy = 300,
    getRandomArbitrary = function(min, max) {
        return Math.random() * (max - min) + min;
    }

const Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = enemyImg;
    this.speed = getRandomArbitrary(minSpeedOfEnemy, maxSpeedOfEnemy);
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > fieldWidth + cellWidth) {
        this.x = -cellWidth;
    }

    this.checkCollision();
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function() {
    if(player.y - 10 == this.y && player.x <= Math.floor(this.x) + cellWidth / 1.5 && player.x >= Math.floor(this.x) - cellWidth / 1.5 ) {
        console.log('collisionСheck', this.x, this.y);
    }
}

const Player = function() {
    this.x = fieldWidth / 2;
    this.y = fieldHeight;
    this.sprite = playerImg;
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    this.update = function() {
        this.checkExitFromField();
    };
    this.handleInput = function(key) {
        switch(key) {
            case "left":
                this.x += -cellWidth; 
                break;
            case "up":
                this.y += -rowHeight; 
                break;
            case "right":
                this.x += cellWidth; 
                break;
            case "down":
                this.y += rowHeight;
                break;
        }
    };
    this.checkExitFromField = function() {
        if (this.x < 0) {
            this.x = 0
        } else if (this.x > fieldWidth) {
            this.x = fieldWidth;
        } else if (this.y < -11) {
            this.y = -11;
        } else if (this.y > fieldHeight) {
            this.y = fieldHeight;
        }
    }
}

const allEnemies = [];

const startPositionOfEnemies = function(i, n ) {
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

const createEnemies = function(n, row) {
    const heightOfLine = heightLinesOfEnemies[row];

    for (let i = 1; i <= n; i++) {
        const startPositionX = startPositionOfEnemies(i, n);

        allEnemies.push(new Enemy(startPositionX, heightOfLine));
    }
}

createEnemies(1, 1);
createEnemies(2, 2);
createEnemies(2, 3);

const player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
