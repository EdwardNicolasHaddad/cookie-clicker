let player = localStorage.getItem("player");

let crumbs = 0;

if (player) {

    let account = JSON.parse(player);
    crumbs = account.crumbs || 0;

}


const cookie = document.getElementById("cookie");
const crumbDisplay = document.querySelector("h2");


crumbDisplay.textContent = "Crumbs: " + crumbs;

async function cookieClick(event) {

    crumbs++;

    if (event && event.type === "click") {

        showFloatingText(event);

    } else {

        showFloatingTextFromCenter();

    }

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

}

cookie.addEventListener("click", function(event) {

    cookieClick(event);

});

function showFloatingText(event) {

    const text = document.createElement("div");

    text.className = "floating";

    text.innerText = "+1";


    text.style.left = event.clientX + "px";
    text.style.top = event.clientY + "px";


    document.body.appendChild(text);


    setTimeout(() => {

        text.remove();

    }, 1000);

}

function showFloatingTextFromCenter() {

    const text = document.createElement("div");

    text.className = "floating";

    text.innerText = "+1";

    const rect = cookie.getBoundingClientRect();

    text.style.left = (rect.left + rect.width / 2) + "px";
    text.style.top = (rect.top + rect.height / 2) + "px";

    document.body.appendChild(text);

    setTimeout(function() {

        text.remove();

    }, 1000);

}

document.addEventListener("keydown", function(event) {

    if (event.code === "Space") {

        event.preventDefault();

        cookieClick(event);

    }

});
