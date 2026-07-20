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
                    {
                        username: username,
                        password_hash: passwordHash,
                        crumbs: 0,
                        total_crumbs: 0,
                        total_clicks: 0,
                        total_worlds: 1
                    }
                }
            ])
            .select();


        if (error) {

            alert(error.message);

        } else {

            localStorage.setItem("player", JSON.stringify(data[0]));

            sessionStorage.setItem(
                "enteredGameNormally",
                "true"
            );

            alert("Account created!");

            window.location.href = "game.html";

        }

    });

}

const loginButton = document.getElementById("login");

if (loginButton) {

    loginButton.addEventListener("click", async function() {

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const passwordHash = btoa(password);


        const { data, error } = await supabaseClient
            .from("profiles")
            .select("*")
            .eq("username", username)
            .eq("password_hash", passwordHash)
            .single();


        if (error) {

            alert("Wrong username or password!");

        } else {

            localStorage.setItem("player", JSON.stringify(data));

            alert("Login successful!");

            sessionStorage.setItem(
                "enteredGameNormally",
                "true"
            );
            
            window.location.href = "game.html";

        }

    });

}
