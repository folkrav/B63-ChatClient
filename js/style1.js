var ctx = null,
    scoreSpan = null,
    score = 0,

    background = null,
    rightPushed = false,
    leftPushed = false,
    ctrlPushed = false,
    inGame = false;

    ship = null,
    enemies = [],
    projectiles = [],

    ENEMY_MAX_HP = 8,
    SHIP_MAX_HP = 50,
    HP_BAR_WIDTH = 30;

$(window).on('load', function () {
    background = new Background();
    startGame();
    tick();
});

function startGame() {
    ctx = $("#styleCanvas");
    scoreDiv = $("<div>", {"id": "score"}).text("Score : " + score);
    ctx.append(scoreDiv);
    ship = new Ship();
    inGame = true;
    score = 0;
}

function tick() {
    manageControls();
    if (inGame) {
        if (Math.random() < 0.005) {
            enemies.push(new Enemy());
        }
        enemyMovement();
        for (var i = projectiles.length - 1; i >= 0; i--) {
            if (!projectiles[i].tick()) {
                projectiles.splice(i, 1);
                i--;
            }
        }
        ship.tick();
        scoreDiv.text("Score : " + score)
        background.tick();
    }

    window.requestAnimationFrame(tick);
}

function manageControls() {
    if (inGame) {
        if (leftPushed) {
            if (ship.x >= ship.radius * 2) {
                ship.x -= ship.speed;
                $('body').css('background-position', '0 ' + background.x + 'px');
            }
        }
        if (rightPushed) {
            if (ship.x < $(document).width() - ship.radius * 2) {
                ship.x += ship.speed;
            }
        }
    } else {
        if (ctrlPushed) {
            ctx.empty();
            startGame();
        }
    }
}

function enemyMovement() {
    for (var i = enemies.length - 1; i >= 0; i--) {
        if (!enemies[i].tick()) {
            enemies.splice(i, 1);
            i--;
        }
    }
}


// Ship class
function Ship(type) {
    this.div = $("<div>", {"class": "ship"});
    ctx.append(this.div);

    this.radius = this.div.width() / 2;
    this.x = $(document).width() / 2 - this.radius;
    this.y = $(window).height() - this.radius;
    this.speed = 10;
    this.attackrate = 15;
    this.cooldown = 0;
    this.hp = SHIP_MAX_HP;
}

Ship.prototype.tick = function() {
    $(".ship").css({top: this.y - this.radius, left: this.x - this.radius});
    this.attack();
    for (var i = projectiles.length - 1; i >= 0; i--) {
        if (!projectiles[i].tick()) {
            projectiles.splice(i, 1);
            i--;
        }
    }
    if (this.hp < SHIP_MAX_HP) {
        if (this.div.children().length == 0) {
            this.div.append($("<div>", {"class": "hp-background"}));
            this.div.children(".hp-background").append($("<div>", {"class": "hp-bar"}));
        }
        this.div.children(".hp-background").children(".hp-bar").width(HP_BAR_WIDTH * this.hp / SHIP_MAX_HP);
    }

    if (this.hp <= 0) {
        inGame = false;
        ship = null;
        enemies = [];
        projectiles = [];
        ctx.empty();
        gameOver = $("<p>", {"id": "gameOver"}).append("You died with a score of " + score + ". Press Fire to restart!");
        ctx.append(gameOver);
    }

};

Ship.prototype.attack = function() {
    if (ctrlPushed) {
        if (this.cooldown % this.attackrate === 0) {
            var temp = new Projectile(this.x - 1, this.y - this.radius, false);
            projectiles.push(temp);
            this.cooldown = 1;
        } else {
            this.cooldown++;
        }
    } else {
        this.cooldown = 0;
    }
};

// Enemy class
function Enemy() {
    this.div = $("<div>", {"class": "enemy"});
    ctx.append(this.div);

    this.alive = true;
    this.halfwidth = this.div.width() / 2;
    this.halfheight = this.div.height() / 2;
    this.x = Math.random() * ($(document).width() - this.halfwidth);
    this.y = -50;
    this.speed = Math.random() * 3 + 2;
    this.hp = ENEMY_MAX_HP;
    this.collisiondamage = 10;
    this.attackrate = 50;
    this.cooldown = 0;
}

Enemy.prototype.tick = function() {
    this.y += this.speed;
    this.div.css({top: this.y - this.halfheight, left: this.x - this.halfwidth});
    this.attack();

    if (this.hp < ENEMY_MAX_HP) {
        if (this.div.children().length == 0) {
            this.div.append($("<div>", {"class": "hp-background"}));
            this.div.children(".hp-background").append($("<div>", {"class": "hp-bar"}));
        }
        this.div.children(".hp-background").children(".hp-bar").width(HP_BAR_WIDTH * this.hp / ENEMY_MAX_HP);
    }

    if (this.y >= ship.y) {
        ship.hp -= this.collisiondamage;
        ship.div.fadeOut(100).fadeIn(100);
        this.div.remove();
        this.alive = false;
    }

    if (this.hp <= 0) {
        this.div.remove();
        this.alive = false;
        score++;
    }

    return this.alive;
};

Enemy.prototype.attack = function() {
    if (true) {
        if (this.cooldown % this.attackrate === 0) {
            if (Math.random() < 0.025) {
                var temp = new Projectile(this.x + 1, this.y + this.halfwidth, true);
                projectiles.push(temp);
                this.cooldown = 1;
            }
        } else {
            this.cooldown++;
        }
    } else {
        this.cooldown = 0;
    }
};

function Projectile(x, y, isEnemy) {
    this.div = $("<div>", {"class": "bullet"}).css({top: this.y, left: this.x});
    ctx.append(this.div);

    this.x = x;
    this.y = y;
    this.alive = true;
    this.speed = isEnemy ? -5 : 5;
    this.damage = Math.random() * 4 + 1;
    this.isEnemy = isEnemy;
}

Projectile.prototype.tick = function() {
    if (this.alive) {
        this.y -= this.speed;
        this.div.css({left: this.x, top: this.y});
        if (this.isEnemy) {
            var enemyx = ship.x - ship.radius,
                enemyxx = ship.x + ship.radius,
                enemyy = ship.y - ship.radius,
                enemyyy = ship.y + ship.radius;
            if (this.x < enemyxx && this.x > enemyx &&
                this.y < enemyyy && this.y > enemyy) {
                ship.hp -= this.damage;
                this.alive = false;
                this.div.remove();
                ship.div.fadeOut(100).fadeIn(100);
            }
        } else {
            for (var i = enemies.length - 1; i >= 0; i--) {
                var enemyx = enemies[i].x - enemies[i].halfwidth,
                    enemyxx = enemies[i].x + enemies[i].halfwidth,
                    enemyy = enemies[i].y - enemies[i].halfheight,
                    enemyyy = enemies[i].y + enemies[i].halfheight;
                if (this.x < enemyxx && this.x > enemyx &&
                    this.y < enemyyy && this.y > enemyy) {
                    enemies[i].hp -= this.damage;
                    this.alive = false;
                    this.div.remove();
                    enemies[i].div.fadeOut(100).fadeIn(100);
                }
            }
        }
    }
    if (this.y <= 0 || this.y >= ship.y) {
        this.alive = false;
        this.div.remove();
    }
    return this.alive;
};


// Background image
function Background() {
    this.x = 0;
    this.y = 0;
    this.scrollspeed = 5;
}

Background.prototype.tick = function() {
    if (this.y >= 1024) this.y = 0;
    $('body').css('background-position', '0 ' + this.y + 'px');
    this.y += this.scrollspeed;
}


// Movement
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
