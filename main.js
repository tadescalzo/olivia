let aboutModal = document.querySelector(".about");
let modalClose = document.querySelector(".about--modal__close");
let closeModal = document.querySelector(".closeModal");
let loginModal = document.querySelector(".login");
let userBtn = document.querySelector("#userBtn");
let aboutLink = document.querySelector("#aboutLink");

/*FIREBASE*/
const firebaseConfig = {
  apiKey: "AIzaSyDAVV4ueZcAmwHXAimaDlRwp-0DN2ETSio",
  authDomain: "tiendaolivia-608da.firebaseapp.com",
  projectId: "tiendaolivia-608da",
  storageBucket: "tiendaolivia-608da.appspot.com",
  messagingSenderId: "632038399033",
  appId: "1:632038399033:web:a602f377230894867d01e8",
  measurementId: "G-M1ZD8N9R47",
};

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

userBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.display = "flex";
  setTimeout(function () {
    loginModal.style.opacity = 1;
  }, 500);
});

closeModal.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.opacity = 0;
  setTimeout(function () {
    loginModal.style.display = "none";
  }, 500);
});
