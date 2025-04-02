function disableScroll() {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    // Prevent touch scrolling on mobile
    document.addEventListener("touchmove", preventDefault, { passive: false });
    document.addEventListener("wheel", preventDefault, { passive: false });
}

// Enable Page Scrolling
function enableScroll() {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";

    document.removeEventListener("touchmove", preventDefault);
    document.removeEventListener("wheel", preventDefault);
}

// Prevent Default Scrolling Behavior
function preventDefault(e) {
    e.preventDefault();
}

// Open Contact Form
function openForm() {
    document.getElementById("contactForm").style.display = "block";
    document.getElementById("formOverlay").style.display = "block";
    disableScroll();
}

// Close Contact Form
function closeForm() {
    document.getElementById("contactForm").style.display = "none";
    document.getElementById("formOverlay").style.display = "none";
    enableScroll();
}

// Validate Indian Phone Number (Real-time)
function validateIndianPhoneNumber(input) {
    input.value = input.value.replace(/\D/g, ''); // Allow only numbers

    if (!/^[6-9][0-9]{0,9}$/.test(input.value)) {
        input.value = input.value.slice(0, -1);
    }

    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
}

// Form Submission
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("IG81txZ2Mketzf8w2"); // Initialize EmailJS

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let address = document.getElementById("address").value.trim();
        let message = document.getElementById("message").value.trim();
        
        let phoneRegex = /^[6-9][0-9]{9}$/; // Valid Indian phone number pattern
        
        if (!name || !email || !phone || !address || !message) {
            showError("All fields are required!");
            return;
        }

        if (!phoneRegex.test(phone)) {
            showError("Enter a valid phone number.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("Invalid email format!");
            return;
        }

        // Send email using EmailJS
        emailjs.send("service_mada5s9", "template_j21pk88", {
            name, email, phone, address, message
        }).then(
            function (response) {
                console.log("SUCCESS!", response.status, response.text);
                showSuccess("Service registered successfully!");
                document.getElementById("contact-form").reset();
            },
            function (error) {
                console.log("FAILED...", error);
                showError("Failed to register service. Please try again.");
            }
        );
    });
});

// Show Error Message
function showError(msg) {
    let errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = msg;
    errorMsg.style.display = "block";
    document.getElementById("success-msg").style.display = "none";
}

// Show Success Message
function showSuccess(msg) {
    let successMsg = document.getElementById("success-msg");
    successMsg.innerText = msg;
    successMsg.style.display = "block";
    document.getElementById("error-msg").style.display = "none";
}

// Detect Overflow Elements
setTimeout(() => {
    document.querySelectorAll('*').forEach(el => {
        if (el.scrollWidth > document.documentElement.clientWidth) {
            console.log('Overflowing element:', el);
        }
    });
}, 1000);
