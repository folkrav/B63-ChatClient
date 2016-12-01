window.onload = function () {
    $("#styleDropdown").change(function() {
        sessionStorage.setItem("style", $("#styleDropdown").val());
        window.location.href = "login?style=" + sessionStorage.getItem("style");
    });
}
