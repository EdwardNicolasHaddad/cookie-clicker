let player = localStorage.getItem("player");

let crumbs;

if (player) {

    // Eingeloggter Account
    let account = JSON.parse(player);
    crumbs = account.crumbs || 0;

} else {

    // Gast
    crumbs = 0;

}


const cookie = document.getElementById("cookie");
const crumbDisplay = document.querySelector("h2");


crumbs = Number(crumbs);

crumbDisplay.textContent = "Crumbs: " + crumbs;


cookie.addEventListener("click", function() {

    crumbs++;

    crumbDisplay.textContent = "Crumbs: " + crumbs;


    if (player) {

        let account = JSON.parse(player);
        account.crumbs = crumbs;

        localStorage.setItem(
            "player",
            JSON.stringify(account)
        );

    }

});
