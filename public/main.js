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
let cartBtn = document.querySelector("#cartBtn");
let itemBtns = document.getElementsByClassName("itemBtn");
let sizesBtns = document.getElementsByClassName("selectedSizesInd");
let buyBtn = document.querySelector(".selectedBuy");
let regBtn = document.querySelector("#regBtn");
let googleLogin = document.querySelector("#googleLogin");
let logOut = document.querySelector("#logOut");
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
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
var db = firebase.firestore();

/*CLOSE ABOUT MODAL*/
closeAbout.addEventListener("click", (e) => {
  e.preventDefault();
  aboutModal.style.opacity = 0;
  setTimeout(function () {
    aboutModal.style.display = "none";
  }, 500);
});
/*OPENS ABOUT MODAL*/
aboutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  aboutModal.style.display = "flex";
  setTimeout(function () {
    aboutModal.style.opacity = 1;
  }, 500);
});
/*CLOSE LOGIN MODAL*/
closeLogin.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.opacity = 0;
  setTimeout(function () {
    registerForm.style.opacity = 0;
    loginForm.style.opacity = 1;
    deleteValues();
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
    loginModal.style.display = "none";
  }, 500);
});

/*OPENS LOG IN MODAL*/
userBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.display = "flex";
  setTimeout(function () {
    loginModal.style.opacity = 1;
  }, 500);
});

/*OPENS REGISTER MODAL*/
regLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.opacity = 0;
  setTimeout(function () {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
    registerForm.style.opacity = 1;
  }, 500);
});

/*REGISTER BUTTON*/
regBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let email = userRegInput.value;
  if (pswRegInput.value === pswRegSecInput.value) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        usrInput.value = "";
        pswInput.value = "";
        usrRegInput.value = "";
        pswRegInput.value = "";
        pswRegSecInput.value = "";
        var user = userCredential.user;
        console.log("se creo ", user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  }
});
/*LOGIN GOOGLE*/
googleLogin.addEventListener("click", (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      console.log("buenas ", user);
      loginModal.style.opacity = 0;
      setTimeout(function () {
        registerForm.style.opacity = 0;
        loginForm.style.opacity = 1;
        deleteValues();
        registerForm.style.display = "none";
        loginForm.style.display = "flex";
        loginModal.style.display = "none";
      }, 500);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
});

/*CHECKS IF THERE IS A LOGGED IN USER*/
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userBtn.style.display = "none";
    logOut.style.display = "block";
    var uid = user.uid;
    // ...
  } else {
    userBtn.style.display = "block";
    logOut.style.display = "none";
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      loginModal.style.display = "flex";
      setTimeout(function () {
        loginModal.style.opacity = 1;
      }, 500);
    });
  }
});

/*LOG OUT GENERAL*/
logOut.addEventListener("click", (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("chauchis");
    })
    .catch((error) => {
      // An error happened.
    });
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

/*FUNCTIONS*/

const deleteValues = () => {
  usrInput.value = "";
  pswInput.value = "";
  usrRegInput.value = "";
  pswRegInput.value = "";
  pswRegSecInput.value = "";
};
