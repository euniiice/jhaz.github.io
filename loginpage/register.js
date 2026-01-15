document.addEventListener("DOMContentLoaded", () => {
    const regButton = document.getElementById("regis");
    const inputBoxes = document.querySelectorAll(".register-box .inputbox");

    regButton.addEventListener("click", () => {
        const name = inputBoxes[0].value.trim();
        const username = inputBoxes[1].value.trim();
        const email = inputBoxes[2].value.trim();
        const password = inputBoxes[3].value.trim();

        if (!name || !username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // Save to localStorage
        localStorage.setItem("name", name);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        alert("Registration successful! You can now log in.");
        window.location.href = "login.html";
    });
});
