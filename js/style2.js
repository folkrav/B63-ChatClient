var ctx = null,
    cssrules = null;

$(window).on('load', function () {
    ctx = $("#chatRoom");
    cssrules = {
        "html": {
            "background-color": null,
            "color": null
        },
        "a": {
            "color": null
        }
    };

    if (localStorage.getItem("theme2styles")) {
        cssrules = JSON.parse(localStorage.getItem("theme2styles"));
        applyTheme();
    }
    ctx.append($("<p>").text("Bienvenue! Tapez /help pour les commandes.")).scrollTop($(this).height());

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
        $("#chatMessage").val("");

        switch (command) {
            case "help":
                showHelp();
                break;
            case "list-users":
                ctx.append($("#chatUserlist").children()).scrollTop($(this).height());
                break;
            case "color":
                if (args.length === 2) {
                    changeColors(args[0], args[1]);
                } else {
                    ctx.append($("<p>").text("Un argument est invalide.")).scrollTop($(this).height());
                }
                break;
            case "save-theme":
                localStorage.setItem("theme2styles", JSON.stringify(cssrules));
                break;
            case "disconnect":
                window.location.href += "?logout=true";
                break;
            case "unregister":
                window.location.href += "?unregister=true";
                break;
            default:
                ctx.append($("<p>").text("Commande invalide. Taper /help pour de l'aide.")).scrollTop($(this).height());
                break;
        }
    } else {
        sendMessage();
    }
}

function showHelp() {
    commands = {
        "/help": "Afficher ce menu d'aide.",
        "/disconnect": "Se déconnecter du chat.",
        "/unregister": "Se désenregistrer.",
        "/list-users": "Afficher la liste des utilisateurs connectés.",
        "/color": "Changer la couleur d'un élément de la page. arg1 : [background, text, links], arg2 : #XXXXXX).",
        "/save-theme": "Enregistrer le thème localement."
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
        ctx.append($("<p>").text("Couleur invalide.")).scrollTop($(this).height());
    } else if (!component || !color) {
        ctx.append($("<p>").text("Paramètre manquant.")).scrollTop($(this).height());
    } else {
        switch (component) {
            case "background":
                $("html").css('background-color', color);
                cssrules["html"]["background-color"] = color;
                console.log(cssrules);
                break;
            case "text":
                $("html").css('color', color);
                cssrules["html"]["color"] = color;
                break;
            case "links":
                $("a").css('color', color);
                cssrules["a"]["color"] = color;
                break;
            default:
                ctx.append($("<p>").text("Composante invalide.")).scrollTop($(this).height());
                break;
        }
    }
}

function applyTheme() {
    $("html").css(cssrules["html"]);
    $("a").css(cssrules["a"]);
}
