const menu = document.querySelector(".menu-toggle input");
const nav = document.querySelector("nav ul");
const registrasi = document.querySelector("#registrasi");

const openPopupButton = document.getElementById("openPopup");
const closePopupButton = document.getElementById("closePopup");
const popup = document.getElementById("myPopup");
const register = document.querySelector("#register");
let theform = document.querySelector("#theform");

let eigo = document.querySelector(".eigo");
let nihon = document.querySelector(".nihon");

let option = document.getElementById("option");
let displayContent = document.querySelector("#display-content");
let course1 = document.querySelector(".course1");
let course2 = document.querySelector(".course2");

menu.addEventListener("click", () => {
  nav.classList.toggle("slide");
  nav.style.boxShadow = "10px 10px 101px 10px #adcce6";
});

openPopupButton.addEventListener("click", (e) => {
  popup.style.display = "block";
});

closePopupButton.addEventListener("click", () => {
  popup.style.display = "none";
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !nav.contains(e.target)) {
    nav.classList.remove("slide");
  }

  if (popup.style.display === "block" && !popup.contains(e.target) && e.target !== openPopupButton) {
    popup.style.display = "none";
  }
});

function sendMail() {
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  const serviceID = "service_h4ubllu";
  const templateID = "template_byb3f8t";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("your message sent successfully");
    })
    .catch((err) => console.log(err));
}

document.getElementById("languageDropdown").addEventListener("change", function () {
  const selectedLanguage = this.value;
  if (selectedLanguage === "english") {
    window.location.href = "../index.html";
  } else if (selectedLanguage === "japanese") {
    window.location.href = "../日本語/index.html";
  }
});



