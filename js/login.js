window.onload = function () {

    $("#styleDropdown").change(function() {
        sessionStorage.setItem("style", $("#styleDropdown").val());
        window.location.href = "login?style=" + sessionStorage.getItem("style");
    });

    if (sessionStorage.getItem("style")) {
        if ($("#styleDropdown").val() != sessionStorage.getItem("style")) {
            $("#styleDropdown").val(sessionStorage.getItem("style"));
        }
    }
}
