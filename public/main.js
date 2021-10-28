let closeAbout = document.querySelector(".about--modal__close");
let closeLogin = document.querySelector(".closeLogin");
let closeItem = document.querySelector(".selectedClose");
let loginModal = document.querySelector(".login");
let aboutModal = document.querySelector(".about");
let itemModal = document.querySelector(".main--selected");
let loginForm = document.querySelector(".login--modal__form");
let registerForm = document.querySelector(".login--modal__register");
let userBtn = document.querySelector("#userBtn");
let aboutBtn = document.querySelector("#aboutBtn");
let itemBtns = document.getElementsByClassName("itemBtn");
let sizesBtns = document.getElementsByClassName("selectedSizesInd");
let buyBtn = document.querySelector(".selectedBuy");
let usrInput = document.getElementById("usrInput");
let pswInput = document.getElementById("pswInput");
let usrRegInput = document.getElementById("usrRegInput");
let pswRegInput = document.getElementById("pswRegInput");
let pswRegSecInput = document.getElementById("pswRegSecInput");
let regLink = document.getElementById("regLink");
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

/*INTERACTUAR ABOUT*/
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
/*INTERACTUAR LOGIN*/
closeLogin.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.opacity = 0;
  setTimeout(function () {
    registerForm.style.opacity = 0;
    loginForm.style.opacity = 1;
    usrInput.value = "";
    pswInput.value = "";
    usrRegInput.value = "";
    pswRegInput.value = "";
    pswRegSecInput.value = "";
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
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
regLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.opacity = 0;
  setTimeout(function () {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
    registerForm.style.opacity = 1;
  }, 500);
});
/*INTERACTUAR MODAL ITEM*/
closeItem.addEventListener("click", (e) => {
  e.preventDefault();
  itemModal.style.opacity = 0;
  setTimeout(function () {
    itemModal.style.display = "none";
    for (el of sizesBtns) {
      el.checked = false;
    }
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
/*SOLO UN CHECKBOX EN TAMAÑOS*/
function selectOne(id) {
  for (var i = 1; i <= 4; i++) {
    document.getElementById("check" + i).checked = false;
  }
  document.getElementById(id).checked = true;
}

/*INTERACTUAR BOTON COMPRAR*/
buyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  itemModal.style.opacity = 0;
  setTimeout(function () {
    itemModal.style.display = "none";
    for (el of sizesBtns) {
      el.checked = false;
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Agregado al carrito!",
      showConfirmButton: false,
      timer: 1500,
    });
  }, 500);
});

/*Register EMAIL BTN*/
