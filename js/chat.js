window.onload = function () {
    setTimeout(getMessages, 1000);
}

function getMessages() {

    setTimeout(getUserlist, 1000);
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

function showUserlist(userList) {
    var list = document.createElement("ul");
    console.log(userList);

    for (var i = 0; i < userList.length; i++) {
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(userList[i]));
        list.appendChild(entry);
    }

    $("#chatUserlist").empty().append(list);
}
