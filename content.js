function buildTable(data, id){
    var table = document.getElementById(id)

    for (var i = data.length; i > 0; i--){
        var row = `<tr>
                        <td>${data[i - 1].amount}</td>
                        <td>${data[i - 1].recipient}</td>
                        <td>${data[i - 1].sender}</td>
                  </tr>`
        table.innerHTML += row
    }
}

function httpGetAsync(theUrl)
{
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() { 
    if (http.readyState == 4 && http.status == 200) {
        var response = http.responseText;
        var json = JSON.parse(response);
        var balance = json["result"]["balance"]["balance"];
        var transactions = json["result"]["transactions"];
        
        document.getElementById("balance").innerHTML = balance;

        buildTable(transactions, "activity");
    }
    }
    http.open("GET", theUrl, true);
    http.send(null);
}

function load() {
    u = (document.cookie.match(/^(?:.*;)?\s*u\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
    document.getElementById("avatar").src = "https://avatars.dicebear.com/api/adventurer/" + u + ".svg";
    document.getElementById("username").innerHTML = u;
    httpGetAsync("https://server.duinocoin.com/users/" + u);
    document.getElementById('avatar').addEventListener('click', function () {
        window.location.href = "menu.html";
    }, false);
}
window.onload = load;