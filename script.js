document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const feedbackForm = document.getElementById("feedbackForm");
    const showRegisterBtn = document.getElementById("showRegisterBtn");
    const registerSection = document.getElementById("registerSection");

    // Show registration form on button click and hide login form
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener("click", () => {
            registerSection.classList.remove("hidden");
            loginForm.classList.add("hidden");
        });
    }

    // Registration Form Handling
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("registerUsername").value.trim();
            const password = document.getElementById("registerPassword").value;

            if (localStorage.getItem(username)) {
                alert("Username already exists!");
            } else {
                localStorage.setItem(username, JSON.stringify({ password, feedback: "" }));
                alert("Registration successful! Please log in.");
                registerForm.reset();
                registerSection.classList.add("hidden"); // Hide registration form
                loginForm.classList.remove("hidden"); // Show login form
            }
        });
    }

    // Login Form Handling
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("loginUsername").value.trim();
            const password = document.getElementById("loginPassword").value;

            const userData = JSON.parse(localStorage.getItem(username));

            if (userData && userData.password === password) {
                localStorage.setItem("loggedInUser", username);
                window.location.href = "feedback.html";
            } else {
                alert("Invalid username or password!");
            }
        });
    }

    // Feedback Form Handling
    if (feedbackForm) {
        const username = localStorage.getItem("loggedInUser");

        if (!username) {
            alert("You must be logged in to provide feedback.");
            window.location.href = "index.html";
        } else {
            displayFeedback(username);

            feedbackForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const feedback = document.getElementById("feedback").value.trim();
                let userData = JSON.parse(localStorage.getItem(username));
                userData.feedback = feedback;
                localStorage.setItem(username, JSON.stringify(userData));
                alert("Feedback submitted successfully!");
                displayFeedback(username);
            });
        }
    }

    // Display saved feedback
    function displayFeedback(username) {
        const userData = JSON.parse(localStorage.getItem(username));
        const savedFeedback = document.getElementById("savedFeedback");
        if (savedFeedback) {
            savedFeedback.textContent = userData.feedback ? userData.feedback : "No feedback yet.";
        }
    }
});
// Profile Page - Display Student Info
if (window.location.href.includes("profile.html")) {
    const username = localStorage.getItem("loggedInUser");

    if (!username) {
        alert("You must be logged in to view your profile.");
        window.location.href = "index.html";
    } else {
        const userData = JSON.parse(localStorage.getItem(username));
        document.getElementById("profileUsername").textContent = username;
        document.getElementById("profileFeedback").textContent = userData.feedback || "No feedback submitted yet.";
    }
}
// Logout Functionality
if (window.location.href.includes("profile.html")) {
    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        alert("You have been logged out successfully!");
        window.location.href = "index.html";
    });
}
