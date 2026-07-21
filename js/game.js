const normalEntry =
    sessionStorage.getItem("enteredGameNormally");


let player = null;


if (normalEntry === "true") {

    player = localStorage.getItem("player");

}


let crumbs = 0;
let total_crumbs = 0;
let total_clicks = 0;
let total_worlds = 1;
let unlockedAchievements = [];


if (player) {

    let account = JSON.parse(player);

    crumbs = account.crumbs || 0;

    total_crumbs = account.total_crumbs || 0;

    total_clicks = account.total_clicks || 0;

    total_worlds = account.total_worlds || 1;
}

const cookie = document.getElementById("cookie");

const crumbDisplay =
    document.getElementById("crumb-count");

const totalCrumbsDisplay =
    document.getElementById("total-crumbs");

const totalClicksDisplay =
    document.getElementById("total-clicks");

const totalWorldsDisplay =
    document.getElementById("total-worlds");

const achievementList =
    document.getElementById("achievement-list");


crumbDisplay.textContent = crumbs;

totalCrumbsDisplay.textContent = total_crumbs;

totalClicksDisplay.textContent = total_clicks;

totalWorldsDisplay.textContent = total_worlds;

init();


async function cookieClick(event) {

    crumbs++;
    
    total_crumbs++;

    total_clicks++;
    
    createCrumbs(event);
    if (event && event.type === "click") {

        showFloatingText(event);

    } else {

        showFloatingTextFromCenter();

    }

    crumbDisplay.textContent = crumbs;
    totalCrumbsDisplay.textContent = total_crumbs;
    totalClicksDisplay.textContent = total_clicks;
    totalWorldsDisplay.textContent = total_worlds;
    loadAchievements();
    
    if (player) {

        let account = JSON.parse(player);

        account.crumbs = crumbs;

        account.total_crumbs = total_crumbs;

        account.total_clicks = total_clicks;

        account.total_worlds = total_worlds;


        localStorage.setItem(
            "player",
            JSON.stringify(account)
        );


        await supabaseClient
            .from("profiles")
            .update({
                crumbs: crumbs,
                total_crumbs: total_crumbs,
                total_clicks: total_clicks,
                total_worlds: total_worlds
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

async function init() {

    await loadUnlockedAchievements();

    await loadAchievements();

}

async function loadAchievements() {

    if (!player) {

        achievementList.innerHTML =
        `
        <div class="guest-achievement">

            Create an Account to view Achievements

        </div>
        `;

        return;

    }


    const { data, error } = await supabaseClient
        .from("achievements")
        .select("*");


    if (error) {

        console.log(error);

        achievementList.innerHTML =
        "Could not load achievements";

        return;

    }


    achievementList.innerHTML = "";


    data.forEach(function(achievement) {


        let current = 0;


        if (achievement.requirement_type === "clicks") {

            current = total_clicks;

        }


        if (achievement.requirement_type === "crumbs") {

            current = total_crumbs;

        }


        if (current > achievement.requirement_value) {

            current = achievement.requirement_value;

        }



        achievementList.innerHTML +=
        `

        <div class="achievement-card locked">


            <h3>
                ${achievement.name}
            </h3>


            <p>
                ${achievement.description}
            </p>


            <span class="achievement-progress">

                ${current}/${achievement.requirement_value}

            </span>


        </div>

        `;


    });


}

async function loadUnlockedAchievements() {

    if (!player) return;

    const account = JSON.parse(player);

    const { data, error } = await supabaseClient
        .from("player_achievements")
        .select("achievement_id")
        .eq("player_id", account.id);

    if (error) {

        console.log(error);
        return;

    }

    unlockedAchievements =
        data.map(a => a.achievement_id);

}

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
