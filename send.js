function httpGetAsync(theUrl)
{
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() { 
    if (http.readyState == 4 && http.status == 200) {
        var response = JSON.parse(http.responseText);
        
        if (response["success"] == false) {
            document.getElementById('prompt').style.color = "#ff4112";
            document.getElementById('prompt').innerHTML = "Something went wrong! :(";
            setTimeout(function (){
                window.location.href = "wallet.html";
            }, 1500);
        }

        else {
            document.getElementById('prompt').style.color = "#AFE1AF";
            document.getElementById('prompt').innerHTML = "Successfully transfered funds!";
            setTimeout(function (){
                window.location.href = "wallet.html";
            }, 1500);
        }
    }
    }
    http.open("GET", theUrl, true);
    http.send(null);
}

function load() {
    var checkUsername = document.getElementById("username");
    var u = (document.cookie.match(/^(?:.*;)?\s*u\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];
    document.getElementById("avatar").src = "https://avatars.dicebear.com/api/adventurer/" + u + ".svg";

    if (checkUsername)
        document.getElementById("username").innerHTML = u;
}
window.onload = load;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('avatar').addEventListener('click', function () {
        window.location.href = "menu.html";
    }, false);

    var checkIfAbleToSend = document.getElementById('send_btn');

    if (checkIfAbleToSend) {
        document.getElementById('send_btn').addEventListener('click', onclick, false);
        function onclick() {
            var amount = document.getElementById("amount").value;
            var recipient = document.getElementById("recipient").value;
            var memo = document.getElementById("memo").value;
            var u = (document.cookie.match(/^(?:.*;)?\s*u\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];
            var p = (document.cookie.match(/^(?:.*;)?\s*p\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];

            httpGetAsync("https://server.duinocoin.com/transaction?username=" + u + "&password=" + p + "&recipient=" + recipient + "&amount=" + amount + "&memo=" + memo);
        }
    }
    else return;
}, false)