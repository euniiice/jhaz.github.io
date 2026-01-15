document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login");
    const usernameInput = document.querySelector(".inputbox[type='text']");
    const passwordInput = document.querySelector(".inputbox[type='password']");
    const rememberMeCheckbox = document.getElementById("remember-me");
    const forgotLink = document.querySelector(".forgot a");

    // Auto-fill if "Remember Me" was checked
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedUsername && rememberedPassword) {
        usernameInput.value = rememberedUsername;
        passwordInput.value = rememberedPassword;
        rememberMeCheckbox.checked = true;
    }

    // LOGIN FUNCTION
    loginButton.addEventListener("click", () => {
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        const enteredUsername = usernameInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        if (!enteredUsername || !enteredPassword) {
            alert("Please enter both username and password.");
            return;
        }

        if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
            // Remember Me
            if (rememberMeCheckbox.checked) {
                localStorage.setItem("rememberedUsername", enteredUsername);
                localStorage.setItem("rememberedPassword", enteredPassword);
            } else {
                localStorage.removeItem("rememberedUsername");
                localStorage.removeItem("rememberedPassword");
            }

            

            alert("Login successful! Redirecting to homepage...");
            window.location.href = "../final.html"; // <-- Correct path to homepage
        } else {
            alert("Incorrect username or password.");
        }
    });

    // LOGIN WITH ENTER KEY
    usernameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") loginButton.click();
    });
    passwordInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") loginButton.click();
    });

    // FORGOT PASSWORD FUNCTION
    forgotLink.addEventListener("click", (e) => {
        e.preventDefault();

        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) {
            alert("No registered email found. Please register first.");
            return;
        }

        const enteredEmail = prompt("Please enter your registered email:");
        if (!enteredEmail) return;

        if (enteredEmail.trim() === storedEmail) {
            alert("A password reset link has been sent to your email (simulated).");

            const newPassword = prompt("Enter your new password:");
            if (newPassword && newPassword.trim() !== "") {
                localStorage.setItem("password", newPassword.trim());
                alert("Your password has been reset. You can now log in with the new password.");
            } else {
                alert("Password reset cancelled.");
            }
        } else {
            alert("Email does not match our records.");
        }
    });
});
