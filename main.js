let aboutModal = document.querySelector(".about");
let modalClose = document.querySelector(".about--modal__close");
let aboutLink = document.querySelector("#aboutLink");
let userBtn = document.querySelector("#userBtn");

modalClose.addEventListener("click", (e) => {
  e.preventDefault();
  aboutModal.style.opacity = 0;
  setTimeout(function () {
    aboutModal.style.display = "none";
  }, 500);
});
aboutLink.addEventListener("click", (e) => {
  e.preventDefault();
  aboutModal.style.display = "flex";
  setTimeout(function () {
    aboutModal.style.opacity = 1;
  }, 500);
});
