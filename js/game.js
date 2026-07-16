let crumbs = 0;

const cookie = document.querySelector("button");
const crumbDisplay = document.querySelector("h2");

cookie.addEventListener("click", function() {
    crumbs++;

    crumbDisplay.textContent = "Krümel: " + crumbs;
});
