var boop = null,
    focused = true;

$(window).on('load', function () {
    $("#chatMessage").keydown(function(e) {
        if((e.keyCode || e.which) == 13) { //Enter keycode
            e.preventDefault();
            sendMessage();
        }
    });
    boop = new Audio('audio/served.mp3');

    setTimeout(getMessages, 1000);
});

// Notifications
$(window).on("blur", function () { focused = false;});
$(window).on("focus", function () { focused = true;});
document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});

function notifyMe(message) {
    if (!Notification) {
        alert('Notifications non-disponibles dans ce navigateur.');
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        var notification = new Notification(message["nomUsager"], {
            icon: 'images/notification.png',
            body: message["message"],
        });

        notification.onclick = function () {
            window.focus();
        };

        boop.play();
    }
}

// Messages
function sendMessage() {
    var text = document.getElementById("chatMessage").value;
    if (text.length > 0) {
        $.ajax({
            type : 'POST',
            url : 'write-message.php',
            data : {
                message : text
            }
        }).done(function (r) {
            r = JSON.parse(r);
            if (r !== "EMPTY_PARAMETER") {
                var messageContents = [];
                messageContents["nomUsager"] = $("#myUsername").text();
                messageContents["message"] = text;
                messageContents["prive"] = "false";
                addMessageLine(messageContents);
            }
        });

    }
    $("#chatMessage").val("");
}

function getMessages() {
    $.ajax({
		url : 'get-messages.php'
    }).done(function (r) {
        r = JSON.parse(r);
        showMessages(r);
        setTimeout(getUserlist, 1000);
    });
}

function getUserlist(key) {
    $.ajax({
		url : 'get-users.php'
    }).done(function (r) {
        r = JSON.parse(r);
        showUserlist(r);
        setTimeout(getMessages, 1000);
    });
}

function showMessages(messages) {
    for (var i = messages.length - 1; i >= 0; i--) {
        addMessageLine(messages[i]);
        if (!focused && i === 0) {
            notifyMe(messages[i]);
        }
    }
}

function addMessageLine(message) {
    // Create elements
    var line = document.createElement("p");
    line.className = "messageLine";
    var name = document.createElement("span");
    name.className = "chatName";
    if (message["prive"] === true) {
        name.className += " privateMessage";
    }

    // Text
    name.appendChild(document.createTextNode(message["nomUsager"] + " : "));
    var messageText = document.createTextNode(message["message"]);

    line.appendChild(name);
    line.appendChild(messageText);

    $("#chatRoom").append(line).scrollTop($("#chatRoom")[0].scrollHeight);
}

function showUserlist(users) {
    var list = document.createElement("ul");

    for (var i = 0; i < users.length; i++) {
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(users[i]));
        list.appendChild(entry);
    }

    $("#chatUserlist").empty().append(list);
}
