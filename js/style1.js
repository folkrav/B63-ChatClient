var ctx = null,
    background = null,
    rightPushed = false,
    leftPushed = false,
    ctrlPushed = false,
    ship = null;

$(window).on('load', function () {
    ctx = $("#styleCanvas");
    ship = new Ship("ship");
    background = new Background();

    tick();
});

function tick() {
    movement();
    ship.tick();
    background.tick();
    window.requestAnimationFrame(tick);
}

function movement() {
    if (leftPushed) {
        if (ship.x >= ship.radius * 2) {
            ship.x -= ship.speed;
        }
    }
    if (rightPushed) {
        if (ship.x < $(document).width() - ship.radius * 2) {
            ship.x += ship.speed;
        }
    }
}


// Ship class
function Ship(type) {
    var div = $("<div>", {"class": type});
    ctx.append(div);

    this.radius = div.width() / 2;
    this.x = $(document).width() / 2 - this.radius;
    this.y = $(window).height() - 50 - this.radius;
    this.speed = 10;
    this.attackrate = 15;
    this.cooldown = 0;

    this.projectiles = [];
}

Ship.prototype.tick = function() {
    $(".ship").css({top: this.y - this.radius, left: this.x - this.radius});
    $(".enemy").css({top: this.y - this.radius, left: this.x - this.radius});
    this.attack();
    for (var i = this.projectiles.length - 1; i >= 0; i--) {
        if (!this.projectiles[i].tick()) {
            this.projectiles.splice(i, 1);
            i--;
        }
        console.log("tick " + i);
    }
};

Ship.prototype.attack = function() {
    if (ctrlPushed) {
        if (this.cooldown % this.attackrate === 0) {
            var temp = new Projectile(this.x - 1, this.y - this.radius);
            this.projectiles.push(temp);
            this.cooldown = 1;
        } else {
            this.cooldown++;
        }
    } else {
        this.cooldown = 0;
    }
};

function Projectile(x, y) {
    this.div = $("<div>", {"class": "bullet"}).css({top: this.y, left: this.x});
    ctx.append(this.div);

    this.x = x;
    this.y = y;
    this.alive = true;
    this.speed = 15;
}

Projectile.prototype.tick = function() {
    if (this.alive) {
        this.y -= this.speed;
        this.div.css({left: this.x, top: this.y});
    } else {

    }
    if (this.y <= 0) {
        this.alive = false;
        this.div.remove();
    }
    return this.alive;
};


// Background image
function Background() {
    this.x = 0;
    this.scrollspeed = 2;
}

Background.prototype.tick = function() {
    if (this.x >= 1024) this.x = 0;
    $('body').css('background-position', '0 ' + this.x + 'px');
    this.x += this.scrollspeed;
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
