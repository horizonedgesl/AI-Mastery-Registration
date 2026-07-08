// =============================
// Promo Code System
// =============================

const promo = document.getElementById("promo");
const message = document.getElementById("promoMessage");

promo.addEventListener("input", function () {

    const value = promo.value.trim().toUpperCase();

    if (value === "") {

        promo.classList.remove("valid", "invalid");
        message.innerHTML = "";
        message.className = "";

    } else if (value === "WEB35") {

        promo.classList.remove("invalid");
        promo.classList.add("valid");

        message.innerHTML = "✅ Promo Code Verified";
        message.className = "success";

    } else {

        promo.classList.remove("valid");
        promo.classList.add("invalid");

        message.innerHTML = "❌ Invalid Promo Code";
        message.className = "error";
    }

});


// =============================
// Mouse Glow Effect
// =============================

const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = (e.clientX - 125) + "px";
    glow.style.top = (e.clientY - 125) + "px";

});


// =============================
// Progress Bar
// =============================

const inputs = document.querySelectorAll("input");
const district = document.getElementById("district");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function updateProgress() {

    let completed = 0;
    const total = 6;

    if (document.getElementById("name").value.trim() !== "") completed++;
    if (document.getElementById("email").value.trim() !== "") completed++;
    if (document.getElementById("phone").value.trim() !== "") completed++;
    if (document.querySelector('input[name="path"]:checked')) completed++;
    if (district.value !== "") completed++;
    if (promo.value.trim() !== "") completed++;

    const percent = Math.round((completed / total) * 100);

    progressFill.style.width = percent + "%";
    progressText.innerHTML = percent + "% Completed";

}

inputs.forEach(input => {
    input.addEventListener("input", updateProgress);
});

document.querySelectorAll('input[name="path"]').forEach(path => {
    path.addEventListener("change", updateProgress);
});

district.addEventListener("change", updateProgress);


// =============================
// Path Glow
// =============================

const pathLabels = document.querySelectorAll(".radio");

pathLabels.forEach(label => {

    label.addEventListener("click", () => {

        pathLabels.forEach(item => {
            item.classList.remove("active");
        });

        label.classList.add("active");

    });

});


// =============================
// Registration Submit
// =============================

const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const btnSpinner = document.getElementById("btnSpinner");

let isSubmitting = false;

form.addEventListener("submit", function (e) {

    e.preventDefault();

    if (isSubmitting) return;

    const selectedPath = document.querySelector('input[name="path"]:checked');

    if (!selectedPath) {
        alert("Please select your AI Path");
        return;
    }

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    isSubmitting = true;

    submitBtn.disabled = true;
    btnSpinner.style.display = "inline-block";
    btnText.innerHTML = "⏳ Submitting...";

    const data = {

        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        path: selectedPath.value,
        district: district.value,
        promo: promo.value.trim()

    };

    const formData = new FormData();

formData.append("name", data.name);
formData.append("email", data.email);
formData.append("phone", data.phone);
formData.append("path", data.path);
formData.append("district", data.district);
formData.append("promo", data.promo);

fetch("https://script.google.com/macros/s/AKfycbxMI0L_Q74p57kITVAtmQm3SSGxcsyjAIybbx3s3CNcii3lrAUyjHUdFzrl2rgjgS8qIw/exec", {
    method: "POST",
    body: formData
})
.then(response => response.json())
.then(result => {const whatsappMessage =
`Hi Horizon Edge SL 👋

My registration has been completed successfully.

Registration ID: ${result.registrationID}

Name: ${data.name}

Email: ${data.email}

Phone: ${data.phone}

Selected Path: ${data.path}

District: ${data.district}

Thank you.`;

const whatsappURL =
`https://wa.me/94701121744?text=${encodeURIComponent(whatsappMessage)}`;

document.getElementById("whatsappBtn").href = whatsappURL;

    document.getElementById("registrationID").innerHTML =
        result.registrationID;

    document.getElementById("successPopup").style.display = "block";

   const whatsappBtn = document.getElementById("whatsappBtn");

whatsappBtn.href =
    "https://wa.me/94701121744?text=Hi Horizon Edge SL! I have completed my registration. My Registration ID is " +
    result.registrationID;

let seconds = 5;

const countdown = document.getElementById("countdown");
const countdownText = document.getElementById("countdownText");

countdown.innerHTML = seconds;

const timer = setInterval(() => {

    seconds--;

    countdown.innerHTML = seconds;

    if (seconds <= 0) {

        clearInterval(timer);

        countdownText.innerHTML = "👇 Click below to continue on WhatsApp";

        whatsappBtn.style.animation = "pulse 1s infinite";

    }

}, 1000);

    form.reset();
    updateProgress();

    promo.classList.remove("valid","invalid");
    message.innerHTML="";
    message.className="";

    pathLabels.forEach(item=>item.classList.remove("active"));

})
.catch(error=>{
    console.error(error);
    alert("Registration Failed");
})
.finally(()=>{

    isSubmitting=false;

    submitBtn.disabled=false;

    btnSpinner.style.display="none";

    btnText.innerHTML="Submit";

});

});