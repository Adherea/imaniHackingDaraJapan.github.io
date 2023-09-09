const menu = document.querySelector(".menu-toggle input");
const nav = document.querySelector("nav ul");
const registrasi = document.querySelector("#registrasi");

menu.addEventListener("click", () => {
  nav.classList.toggle("slide");
  nav.style.boxShadow = "10px 10px 101px 10px #adcce6";
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !nav.contains(e.target)) {
    nav.classList.remove("slide");
  }
});





