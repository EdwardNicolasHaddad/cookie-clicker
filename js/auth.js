const registerButton = document.getElementById("register");

if (registerButton) {

    registerButton.addEventListener("click", async function() {

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            alert(error.message);
        } else {
            alert("Account erfolgreich erstellt!");
            window.location.href = "login.html";
        }

    });

}
