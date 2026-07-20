const normalEntry =
    sessionStorage.getItem("enteredGameNormally");


let player = null;


if (normalEntry === "true") {

    player = localStorage.getItem("player");

}


let crumbs = 0;
let total_Crumbs = 0;
let total_Clicks = 0;
let total_Worlds = 1;


if (player) {

    let account = JSON.parse(player);

    crumbs = account.crumbs || 0;

    totalCrumbs = account.total_crumbs || 0;

    totalClicks = account.total_clicks || 0;

    totalWorlds = account.total_worlds || 1;

}

const cookie = document.getElementById("cookie");
const crumbDisplay =
    document.getElementById("crumb-count");

crumbDisplay.textContent = crumbs;

async function cookieClick(event) {

    crumbs++;
    
    total_Crumbs++;
    
    total_Clicks++;
    
    createCrumbs(event);
    if (event && event.type === "click") {

        showFloatingText(event);

    } else {

        showFloatingTextFromCenter();

    }

    crumbDisplay.textContent = crumbs;
    if (player) {

        let account = JSON.parse(player);

        account.crumbs = crumbs;
        
        account.totalCrumbs = total_Crumbs;
        
        account.totalClicks = total_Clicks;
        
        account.totalWorlds = total_Worlds;

        localStorage.setItem(
            "player",
            JSON.stringify(account)
        );

        await supabaseClient
            .from("profiles")
            .update({
                crumbs: crumbs,
                total_crumbs: total_Crumbs,
                total_clicks: total_Clicks,
                total_worlds: total_Worlds
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


    const offsetX = Math.random() * 50 - 25;

    text.style.left = (event.clientX + offsetX) + "px";
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

    const offsetX = Math.random() * 50 - 25;

    text.style.left =
    (rect.left + rect.width / 2 + offsetX) + "px";
    
    text.style.top = (rect.top + rect.height / 2) + "px";

    text.style.transform = "translate(-50%, -50%)";

    document.body.appendChild(text);

    setTimeout(function() {

        text.remove();

    }, 1000);

}

function createCrumbs(event) {

    for (let i = 0; i < 3; i++) {

        const crumb = document.createElement("div");

        crumb.className = "crumb-particle";
        const size = Math.random() * 6 + 6;

        crumb.style.width = size + "px";
        crumb.style.height = size + "px";
        crumb.style.rotate =
            (Math.random() * 90 - 45) + "deg";

        let x;
        let y;


        // Mausklick
        if (event && event.type === "click") {

            x = event.clientX;
            y = event.clientY;

        }

        // Leertaste
        else {

            const rect = cookie.getBoundingClientRect();

            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;

        }


        crumb.style.left = x + "px";
        crumb.style.top = y + "px";


        const randomX = Math.random() * 80 - 40;
        const randomY = Math.random() * 80 - 40;


        crumb.style.setProperty(
            "--x",
            randomX + "px"
        );

        crumb.style.setProperty(
            "--y",
            randomY + "px"
        );


        document.body.appendChild(crumb);


        setTimeout(() => {

            crumb.remove();

        }, 600);

    }

}
document.addEventListener("keydown", function(event) {

    if (event.code === "Space" && !event.repeat) {

        event.preventDefault();

        cookieClick();

    }

});
function logout() {

    localStorage.removeItem("player");

    sessionStorage.removeItem(
        "enteredGameNormally"
    );

    window.location.href = "index.html";

}
const achievementButton = document.getElementById("achievement-button");
const achievementPanel = document.getElementById("achievement-panel");


achievementButton.onclick = function() {

    achievementPanel.classList.toggle("active");

};
