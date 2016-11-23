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
        if (ship.x >= ship.radius) {
            ship.x -= ship.speed;
        }
    }
    if (rightPushed) {
        if (ship.x < $(document).width() - ship.radius - 1) {
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
    this.speed = 7;

    this.projectiles = []
}

Ship.prototype.tick = function() {
    $(".ship").css({top: this.y - this.radius, left: this.x - this.radius});
    $(".enemy").css({top: this.y - this.radius, left: this.x - this.radius});
    this.attack();
};

Ship.prototype.attack = function() {
    if (ctrlPushed) {

    }
};


// Background image
function Background(img) {
    this.img = img;
    this.x = 0;
    this.scrollspeed = 8;
}

Background.prototype.tick = function() {
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
