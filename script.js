
// ==========================================
// 1. SELECT ALL WEBSITE SCREENS
// ==========================================

const welcomeScreen = document.getElementById("welcomeScreen");
const loginScreen = document.getElementById("loginScreen");
const greetingScreen = document.getElementById("greetingScreen");
const scratchScreen = document.getElementById("scratchScreen");
const proposalScreen = document.getElementById("proposalScreen");


// ==========================================
// 2. SELECT BUTTONS AND INPUTS
// ==========================================

const loginButton = document.getElementById("loginButton");

const loginBackButton = document.getElementById("loginBackButton");

const rewardButton = document.getElementById("rewardButton");

const logoutButton = document.getElementById("logoutButton");

const scratchBackButton = document.getElementById("scratchBackButton");

const continueButton = document.getElementById("continueButton");

const finalLogoutButton = document.getElementById("finalLogoutButton");

const loginForm = document.getElementById("loginForm");

const visitorName = document.getElementById("visitorName");

const mobileNumber = document.getElementById("mobileNumber");

const personalGreeting = document.getElementById("personalGreeting");

const proposalName = document.getElementById("proposalName");

const scratchHint = document.getElementById("scratchHint");


// ==========================================
// 3. SCRATCH CARD ELEMENTS
// ==========================================

const scratchCanvas = document.getElementById("scratchCanvas");

const scratchContext = scratchCanvas.getContext("2d");


// ==========================================
// 4. SCREEN NAVIGATION
// ==========================================

const allScreens = [
    welcomeScreen,
    loginScreen,
    greetingScreen,
    scratchScreen,
    proposalScreen
];

function showScreen(selectedScreen) {

    allScreens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    selectedScreen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// 5. CREATE LAVENDER DUST
// ==========================================

const dustContainer = document.getElementById("dust");

for (let i = 0; i < 45; i++) {

    const particle = document.createElement("span");

    particle.style.left = Math.random() * 100 + "%";

    particle.style.top = Math.random() * 100 + "%";

    particle.style.width =
        (Math.random() * 3 + 2) + "px";

    particle.style.height = particle.style.width;

    particle.style.animationDuration =
        (Math.random() * 12 + 8) + "s";

    particle.style.animationDelay =
        (Math.random() * 12) + "s";

    dustContainer.appendChild(particle);

}


// ==========================================
// 6. LOGIN BUTTON
// ==========================================

loginButton.addEventListener("click", function() {

    showScreen(loginScreen);

});


// ==========================================
// 7. LOGIN BACK BUTTON
// ==========================================

loginBackButton.addEventListener("click", function() {

    showScreen(welcomeScreen);

});


// ==========================================
// 8. LOGIN FORM SUBMISSION
// ==========================================

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = visitorName.value.trim();

    const mobile = mobileNumber.value.trim();


    // Check name
    if (name.length === 0) {

        alert("Please enter your beautiful name 💗");

        visitorName.focus();

        return;

    }


    // Check mobile number
    if (!/^[0-9]{10}$/.test(mobile)) {

        alert("Please enter a valid 10-digit mobile number ❤️");

        mobileNumber.focus();

        return;

    }


    // Display name on greeting screen
    personalGreeting.textContent = "Welcome, " + name + " ❤️";


    // Display name on final proposal
    proposalName.textContent = name + " ❤️";


    // Go to greeting screen
    showScreen(greetingScreen);

    // Reset form fields
    loginForm.reset();

});


// ==========================================
// 9. OPEN MY REWARD
// ==========================================

rewardButton.addEventListener("click", function() {

    // Open scratch card screen
    showScreen(scratchScreen);

    // Reset and prepare scratch card
    requestAnimationFrame(function() {

        resetScratchCard();

    });

});


// ==========================================
// 10. LOGOUT FUNCTION
// ==========================================

function logout() {

    // Go back to first screen
    showScreen(welcomeScreen);

    // Clear form
    loginForm.reset();

    // Reset displayed name
    personalGreeting.textContent = "Welcome! ❤️";

    proposalName.textContent = "Beautiful ❤️";

    // Reset scratch card
    scratchRevealed = false;

    continueButton.classList.add("hidden");

    scratchHint.textContent =
        "👆 Scratch here using your finger or mouse";

}


// Logout from greeting screen
logoutButton.addEventListener("click", logout);


// Logout from final proposal screen
finalLogoutButton.addEventListener("click", logout);


// ==========================================
// 11. SCRATCH CARD VARIABLES
// ==========================================

let isScratching = false;

let scratchRevealed = false;

let lastPosition = null;


// ==========================================
// 12. CREATE SCRATCH CARD
// ==========================================

function resetScratchCard() {

    const rect = scratchCanvas.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) {
        return;
    }

    const pixelRatio = window.devicePixelRatio || 1;

    // Set high-resolution canvas
    scratchCanvas.width =
        Math.round(rect.width * pixelRatio);

    scratchCanvas.height =
        Math.round(rect.height * pixelRatio);

    // Set drawing scale
    scratchContext.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );


    // Create lavender-pink covering
    const gradient = scratchContext.createLinearGradient(
        0,
        0,
        rect.width,
        rect.height
    );

    gradient.addColorStop(0, "#c084fc");

    gradient.addColorStop(0.5, "#d63384");

    gradient.addColorStop(1, "#ff69b4");


    scratchContext.globalCompositeOperation = "source-over";

    scratchContext.fillStyle = gradient;

    scratchContext.fillRect(
        0,
        0,
        rect.width,
        rect.height
    );


    // Draw scratch instructions
    scratchContext.fillStyle = "#ffffff";

    scratchContext.textAlign = "center";

    scratchContext.textBaseline = "middle";

    scratchContext.font = "bold 23px Arial";

    scratchContext.fillText(
        "SCRATCH HERE 💗",
        rect.width / 2,
        rect.height / 2 - 10
    );

    scratchContext.font = "14px Arial";

    scratchContext.fillText(
        "Reveal your surprise!",
        rect.width / 2,
        rect.height / 2 + 23
    );


    // Reset variables
    isScratching = false;

    scratchRevealed = false;

    lastPosition = null;

    continueButton.classList.add("hidden");

    scratchHint.textContent =
        "👆 Scratch here using your finger or mouse";

    scratchCanvas.style.pointerEvents = "auto";

}


// ==========================================
// 13. GET SCRATCH POSITION
// ==========================================

function getScratchPosition(event) {

    const rect = scratchCanvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };

}


// ==========================================
// 14. START SCRATCHING
// ==========================================

scratchCanvas.addEventListener("pointerdown", function(event) {

    if (scratchRevealed) return;

    event.preventDefault();

    isScratching = true;

    scratchCanvas.setPointerCapture(event.pointerId);

    const position = getScratchPosition(event);

    lastPosition = position;

    scratchContext.globalCompositeOperation = "destination-out";

    scratchContext.lineWidth = 38;

    scratchContext.lineCap = "round";

    scratchContext.lineJoin = "round";

    scratchContext.beginPath();

    scratchContext.arc(
        position.x,
        position.y,
        19,
        0,
        Math.PI * 2
    );

    scratchContext.fill();

});


// ==========================================
// 15. SCRATCH WITH MOUSE OR FINGER
// ==========================================

scratchCanvas.addEventListener("pointermove", function(event) {

    if (!isScratching || scratchRevealed) return;

    event.preventDefault();

    const position = getScratchPosition(event);

    scratchContext.globalCompositeOperation = "destination-out";

    scratchContext.lineWidth = 38;

    scratchContext.lineCap = "round";

    scratchContext.lineJoin = "round";

    scratchContext.beginPath();

    scratchContext.moveTo(
        lastPosition.x,
        lastPosition.y
    );

    scratchContext.lineTo(
        position.x,
        position.y
    );

    scratchContext.stroke();

    lastPosition = position;

});


// ==========================================
// 16. CHECK SCRATCH PROGRESS
// ==========================================

function checkScratchProgress() {

    if (scratchRevealed) return;

    const width = scratchCanvas.width;

    const height = scratchCanvas.height;

    const imageData = scratchContext.getImageData(
        0,
        0,
        width,
        height
    );

    const pixels = imageData.data;

    let erasedPixels = 0;

    let checkedPixels = 0;


    // Sample pixels to measure erased area
    for (let i = 3; i < pixels.length; i += 16) {

        checkedPixels++;

        if (pixels[i] < 128) {

            erasedPixels++;

        }

    }


    const percentage =
        (erasedPixels / checkedPixels) * 100;


    // Reveal after 35% scratching
    if (percentage >= 35) {

        revealMessage();

    }

}


// ==========================================
// 17. STOP SCRATCHING
// ==========================================

function stopScratching(event) {

    if (!isScratching) return;

    isScratching = false;

    lastPosition = null;

    if (scratchCanvas.hasPointerCapture(event.pointerId)) {

        scratchCanvas.releasePointerCapture(event.pointerId);

    }

    checkScratchProgress();

}

scratchCanvas.addEventListener("pointerup", stopScratching);

scratchCanvas.addEventListener("pointercancel", function() {

    isScratching = false;

    lastPosition = null;

});


// ==========================================
// 18. REVEAL LOVE MESSAGE
// ==========================================

function revealMessage() {

    if (scratchRevealed) return;

    scratchRevealed = true;

    isScratching = false;

    lastPosition = null;


    // Remove the remaining scratch covering
    scratchContext.clearRect(
        0,
        0,
        scratchCanvas.width,
        scratchCanvas.height
    );


    // Disable scratching
    scratchCanvas.style.pointerEvents = "none";


    // Update instruction
    scratchHint.textContent =
        "Your secret message has been revealed! ❤️";


    // Display continue button
    continueButton.classList.remove("hidden");

}


// ==========================================
// 19. CONTINUE TO FINAL PROPOSAL
// ==========================================

continueButton.addEventListener("click", function() {

    if (!scratchRevealed) return;

    showScreen(proposalScreen);

});


// ==========================================
// 20. SCRATCH CARD BACK BUTTON
// ==========================================

scratchBackButton.addEventListener("click", function() {

    showScreen(greetingScreen);

});


// ==========================================
// 21. HANDLE WINDOW RESIZE
// ==========================================

window.addEventListener("resize", function() {

    if (
        scratchScreen.classList.contains("active") &&
        !scratchRevealed
    ) {

        resetScratchCard();

    }

});


// ==========================================
// 22. START WEBSITE
// ==========================================

showScreen(welcomeScreen);
