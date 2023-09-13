const menu = document.querySelector(".menu-toggle input");
const nav = document.querySelector("nav ul");
const registrasi = document.querySelector("#registrasi");

const openPopupButton = document.getElementById("openPopup");
const closePopupButton = document.getElementById("closePopup");
const popup = document.getElementById("myPopup");

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
