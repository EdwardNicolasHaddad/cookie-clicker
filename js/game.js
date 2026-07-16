let crumbs = localStorage.getItem("crumbs") || 0;

const cookie = document.querySelector("button");
const crumbDisplay = document.querySelector("h2");

crumbs = Number(crumbs);

crumbDisplay.textContent = "Krümel: " + crumbs;

cookie.addEventListener("click", function() {
    crumbs++;

    crumbDisplay.textContent = "Krümel: " + crumbs;

    localStorage.setItem("crumbs", crumbs);
});
