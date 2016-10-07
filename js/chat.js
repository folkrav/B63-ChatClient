window.onload = function () {
    setTimeout(getMessages, 1000);
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
    console.log(messages);
}

function showUserlist(users) {
    var list = document.createElement("ul");
    console.log(users);

    for (var i = 0; i < users.length; i++) {
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(users[i]));
        list.appendChild(entry);
    }

    $("#chatUserlist").empty().append(list);
}
