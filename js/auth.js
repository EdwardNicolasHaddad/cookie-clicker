const registerButton = document.getElementById("register");

if (registerButton) {

    registerButton.addEventListener("click", async function() {

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;


        const passwordHash = btoa(password);


        const { data, error } = await supabaseClient
            .from("profiles")
            .insert([
                {
                    username: username,
                    password_hash: passwordHash,
                    crumbs: 0,
                    world: 1
                }
            ]);


        if (error) {

            alert(error.message);

        } else {

            alert("Account erstellt!");
            window.location.href = "login.html";

        }

    });

}
