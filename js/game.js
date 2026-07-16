let crumbs = localStorage.getItem("crumbs") || 0;

const cookie = document.getElementById("cookie");
const crumbDisplay = document.querySelector("h2");

crumbs = Number(crumbs);

crumbDisplay.textContent = "Crumbs: " + crumbs;

cookie.addEventListener("click", function() {

    crumbs++;

    crumbDisplay.textContent = "Crumbs: " + crumbs;

    localStorage.setItem("crumbs", crumbs);

});
