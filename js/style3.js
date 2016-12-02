var ctx = null,
    background = null;

$(window).on('load', function () {
    initialize();
    createGame();
    tick();
});

function initialize() {
    background = new Image();
    background.src = "images/style3/background.jpg";

    background.onload = function () {
        $('<canvas>')
        .attr("id", "context")
        .attr("width", background.width + "px")
        .attr("height", background.height + "px")
        .appendTo('#styleContents');
        ctx = document.getElementById("context").getContext("2d");
        ctx.drawImage(background, 0, 0);
    }
}

function createGame() {

}

function tick() {


    window.requestAnimationFrame(tick);
}
