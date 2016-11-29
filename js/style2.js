var ctx = null;

$(window).on('load', function () {
    ctx = $("#chatRoom");

    $("#chatMessage").off().keyup(function(e) {
        if((e.keyCode || e.which) == 13) { //Enter keycode
            parseCommand($(this).val());
        }
    });
});

function parseCommand(str) {
    if (str.startsWith("/")) {
        str = str.substring(1, str.length - 1); // to remove newline carriage
        args = str.split(' ');
        command = args.shift();

        switch (command) {
            case "help":
                showHelp();
                break;
            case "list-users":
                ctx.append($("#chatUserlist").children());
                break;
            case "color":
                changeColors(args[0], args[1]);
                break;
            default:
                ctx.append($("<p>").text("Commande invalide. Taper /help pour de l'aide."));
                break;
        }
        if (command === "list-users") {

        }

        $("#chatMessage").val("");
    } else {
        sendMessage();
    }
}

function showHelp() {
    commands = {
        "/help": "Afficher ce menu d'aide.",
        "/list-users": "Afficher la liste des utilisateurs connectés."
    }
    for (key in commands) {
        var line = document.createElement("p");
        line.className = "messageLine";
        var name = document.createElement("span");
        name.className = "chatName";
        name.appendChild(document.createTextNode(key + " : "));
        var messageText = document.createTextNode(commands[key]);

        line.appendChild(name);
        line.appendChild(messageText);

        ctx.append(line);
    }
}

function changeColors(component, color) {
    if (!color.match("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")) {
        ctx.append($("<p>").text("Couleur invalide."));
    } else if (!component || !color) {
        ctx.append($("<p>").text("Paramètre invalide."));
    } else {
        switch (component) {
            case "background":
                $("html").css('background-color', color);
                break;
            case "text":
                $("html").css('color', color);
                break;
            case "links":
                $("a").css('color', color);
                break;
            default:
                ctx.append($("<p>").text("Composante invalide."));
                break;
        }
    }
}
