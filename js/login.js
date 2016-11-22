window.onload = function () {
    if (sessionStorage.getItem("style")) {
        $("#styleDropdown").val(sessionStorage.getItem("style"));
    }

    $("#styleDropdown").change(function() {
        sessionStorage.setItem("style", $("#styleDropdown").val());
        window.location.href = "login?style=" + $("#styleDropdown").val();
    });
}
