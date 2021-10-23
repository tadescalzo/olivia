let closeAbout = document.querySelector(".about--modal__close");
let closeLogin = document.querySelector(".closeLogin");
let closeItem = document.querySelector(".selectedClose");
let loginModal = document.querySelector(".login");
let aboutModal = document.querySelector(".about");
let itemModal = document.querySelector(".main--selected");
let userBtn = document.querySelector("#userBtn");
let aboutBtn = document.querySelector("#aboutBtn");
let itemBtns = document.getElementsByClassName("itemBtn");

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

closeAbout.addEventListener("click", (e) => {
  e.preventDefault();
  aboutModal.style.opacity = 0;
  setTimeout(function () {
    aboutModal.style.display = "none";
  }, 500);
});
aboutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  aboutModal.style.display = "flex";
  setTimeout(function () {
    aboutModal.style.opacity = 1;
  }, 500);
});

closeLogin.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.opacity = 0;
  setTimeout(function () {
    loginModal.style.display = "none";
  }, 500);
});
userBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.display = "flex";
  setTimeout(function () {
    loginModal.style.opacity = 1;
  }, 500);
});

closeItem.addEventListener("click", (e) => {
  e.preventDefault();
  itemModal.style.opacity = 0;
  setTimeout(function () {
    itemModal.style.display = "none";
  }, 500);
});
for (el of itemBtns) {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("cosa");
    itemModal.style.display = "flex";
    setTimeout(function () {
      itemModal.style.opacity = 1;
    }, 500);
  });
}
