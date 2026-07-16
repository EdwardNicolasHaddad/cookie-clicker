let player = localStorage.getItem("player");

let crumbs = 0;

if (player) {

    let account = JSON.parse(player);
    crumbs = account.crumbs || 0;

}


const cookie = document.getElementById("cookie");
const crumbDisplay = document.querySelector("h2");


crumbDisplay.textContent = "Crumbs: " + crumbs;


cookie.addEventListener("click", async function() {

    crumbs++;

    crumbDisplay.textContent = "Crumbs: " + crumbs;


    if (player) {

        let account = JSON.parse(player);

        account.crumbs = crumbs;

        localStorage.setItem(
            "player",
            JSON.stringify(account)
        );


        await supabaseClient
            .from("profiles")
            .update({
                crumbs: crumbs
            })
            .eq("id", account.id);

    }

});
