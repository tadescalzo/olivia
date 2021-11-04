let closeAbout = document.querySelector(".about--modal__close");
let closeLogin = document.querySelector(".closeLogin");
let closeItem = document.querySelector(".selectedClose");
let closeUpload = document.querySelector("#closeUpload");
let loginModal = document.querySelector(".login");
let aboutModal = document.querySelector(".about");
let uploadModal = document.querySelector(".upload");
let uploadItems = document.querySelector(".upload--modal");
let itemModal = document.querySelector(".main--selected");
let mainItems = document.querySelector(".main--items");
let loginForm = document.querySelector(".login--modal__form");
let registerForm = document.querySelector(".login--modal__register");
let userBtn = document.querySelector("#userBtn");
let aboutBtn = document.querySelector("#aboutBtn");
let cartBtn = document.querySelector("#cartBtn");
let uploadItem = document.querySelector("#uploadItem");
let sizesBtns = document.getElementsByClassName("selectedSizesInd");
let buyBtn = document.querySelector(".selectedBuy");
let regBtn = document.querySelector("#regBtn");
let logBtn = document.querySelector("#logBtn");
let upBtn = document.querySelector("#upBtn");
let googleLogin = document.querySelector("#googleLogin");
let logOut = document.querySelector("#logOut");
let usrInput = document.getElementById("usrInput");
let pswInput = document.getElementById("pswInput");
let usrRegInput = document.getElementById("usrRegInput");
let pswRegInput = document.getElementById("pswRegInput");
let pswRegSecInput = document.getElementById("pswRegSecInput");
let uploadTitle = document.querySelector("#uploadTitle");
let uploadPrice = document.querySelector("#uploadPrice");
let uploadProx = document.querySelector("#uploadProx");
let checkUp1 = document.querySelector("#checkUp1");
let checkUp2 = document.querySelector("#checkUp2");
let checkUp3 = document.querySelector("#checkUp3");
let checkUp4 = document.querySelector("#checkUp4");
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
  resetModal();
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
  let email = usrRegInput.value;
  if (pswRegInput.value === pswRegSecInput.value) {
    let password = pswRegInput.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        deleteValues();
        var user = userCredential.user;
        resetModal();
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
      resetModal();
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
});

/*LOGIN EMAIL*/
logBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let password = pswInput.value;
  let email = usrInput.value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      resetModal();
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});

/*CHECKS IF THERE IS A LOGGED IN USER*/
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.photoURL === "admin") {
      var uid = user.uid;
      userBtn.style.display = "none";
      cartBtn.style.display = "none";
      logOut.style.display = "block";
      upBtn.style.display = "block";
    } else {
      userBtn.style.display = "none";
      upBtn.style.display = "none";
      logOut.style.display = "block";
      cartBtn.style.display = "block";
    }
  } else {
    userBtn.style.display = "block";
    cartBtn.style.display = "block";
    logOut.style.display = "none";
    upBtn.style.display = "none";
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
    .then(() => {})
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

/*SOLO UN CHECKBOX EN TAMAÑOS*/
function selectOne(id) {
  for (var i = 1; i <= 4; i++) {
    document.getElementById("check" + i).checked = false;
  }
  if (document.getElementById(id).checked == true) {
    document.getElementById(id).checked = false;
  } else {
    document.getElementById(id).checked = true;
  }
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

/*UPLOAD MODAL*/
upBtn.addEventListener("click", (e) => {
  e.preventDefault();
  uploadModal.style.display = "flex";
  setTimeout(function () {
    uploadModal.style.opacity = 1;
    uploadItems.style.animation = "tothetop 0.8s linear forwards";
  }, 500);
});

/*CLOSE UPLOAD*/
closeUpload.addEventListener("click", () => {
  uploadModal.style.opacity = 0;
  setTimeout(() => {
    uploadModal.style.display = "none";
  }, 500);
});

/*UPLOAD ITEM*/
uploadItem.addEventListener("click", () => {
  uploadModal.style.opacity = 0;
  let title = uploadTitle.value;
  let price = uploadPrice.value;
  let prox = uploadProx.checked;
  let sizeS = checkUp1.checked;
  let sizeM = checkUp2.checked;
  let sizeL = checkUp3.checked;
  let sizeXL = checkUp4.checked;
  db.collection("items")
    .doc()
    .set({
      title: title,
      price: price,
      prox: prox,
      size: {
        s: sizeS,
        m: sizeM,
        l: sizeL,
        xl: sizeXL,
      },
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  setTimeout(function () {
    mainItems.innerHTML = "";
    uploadTitle.value = "";
    uploadPrice.value = "";
    uploadProx.checked = false;
    checkUp1.checked = false;
    checkUp2.checked = false;
    checkUp3.checked = false;
    checkUp4.checked = false;
    uploadModal.style.display = "none";
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Producto subido",
      showConfirmButton: false,
      timer: 1500,
    });
    db.collection("items")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          let itemData = doc.data();
          mainItems.innerHTML += `<article class="main--items__card" data-id='${doc.id}'>
                                  <img class="cardImg" src="images/about.jpg" alt="">
                                  <h2>${itemData.title}</h2>
                                  <h3>$${itemData.price}</h3>
                                  <footer class="itemBtn">Ver mas...</span>
                                  </article>`;
        });
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

const resetModal = () => {
  loginModal.style.opacity = 0;
  setTimeout(function () {
    registerForm.style.opacity = 0;
    loginForm.style.opacity = 1;
    deleteValues();
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
    loginModal.style.display = "none";
  }, 500);
};

const loadDB = () => {
  db.collection("items")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let itemData = doc.data();
        mainItems.innerHTML += `<article class="main--items__card" data-id='${doc.id}'>
                              <img class="cardImg" src="images/about.jpg" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              </article>`;
      });
    });
};

const promise1 = Promise.resolve(loadDB());

promise1.then(() => {
  console.log("termino diosss");
  setTimeout(function () {
    let itemBtns = document.getElementsByClassName("itemBtn");
    for (el of itemBtns) {
      el.addEventListener("click", () => {
        console.log("opens");
        itemModal.style.display = "flex";
        setTimeout(function () {
          itemModal.style.opacity = 1;
        }, 500);
      });
    }
  }, 2000);
});
