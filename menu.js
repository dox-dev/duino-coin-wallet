function logout() {
    document.cookie = 'p=; Max-Age=0;';
    document.cookie = 'u=; Max-Age=0;';
    window.location.href = "popup.html";
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('logout_btn').addEventListener('click', logout, false);
}, false);