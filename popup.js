function access() {
    var x = document.createElement("IFRAME");
    x.setAttribute("id", "wallet");
    x.setAttribute("src", "/wallet.html");
    x.setAttribute("style", "position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:10;");
    document.body.appendChild(x);
}

window.addEventListener('focus', function() {
    u = (document.cookie.match(/^(?:.*;)?\s*u\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];
    p = (document.cookie.match(/^(?:.*;)?\s*p\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];

    if (u && p) {
        access();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', onclick, false);
    function onclick() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var url = "https://server.duinocoin.com/auth/" + username + "?password=" + password;

        if (!(username && password)) {
            return;
        }
        else {
        async function checkLogin() {
            const request = await fetch(url);
            const response = await request.json();
            const jsonObj = JSON.parse(JSON.stringify(response));
            
            if (jsonObj["success"] == true) {
                document.cookie = "u=" + username + ";expires="+ new Date(new Date().getTime()+60*60*500).toGMTString();
                document.cookie = "p=" + password + ";expires="+ new Date(new Date().getTime()+60*60*500).toGMTString();
                document.getElementById('error').innerHTML = null;
                access();
            }
            else {
                document.getElementById('error').innerHTML = jsonObj["message"].replace('(auth): ' + username,'');
            }
        }
        checkLogin();
        }
    }
}, false)