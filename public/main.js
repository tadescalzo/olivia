let closeAbout = document.querySelector(".about--modal__close");
let closeLogin = document.querySelector(".closeLogin");
let closeUpload = document.querySelector("#closeUpload");
let closeCart = document.querySelector(".cart--modal__close");
let loginModal = document.querySelector(".login");
let aboutModal = document.querySelector(".about");
let uploadModal = document.querySelector(".upload");
let uploadItems = document.querySelector(".upload--modal");
let confirmModal = document.querySelector(".cart--modal__confirm");
let itemModal = document.querySelector(".main--selected");
let cartModal = document.querySelector(".cart");
let mainItems = document.querySelector(".main--items");
let loginForm = document.querySelector(".login--modal__form");
let registerForm = document.querySelector(".login--modal__register");
let userBtn = document.querySelector("#userBtn");
let aboutBtn = document.querySelector("#aboutBtn");
let cartBtn = document.querySelector("#cartBtn");
let uploadItem = document.querySelector("#uploadItem");
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
let uploadDesc = document.querySelector("#uploadDesc");
let uploadFilter = document.querySelector("#uploadFilter");
let checkUp1 = document.querySelector("#checkUp1");
let checkUp2 = document.querySelector("#checkUp2");
let checkUp3 = document.querySelector("#checkUp3");
let checkUp4 = document.querySelector("#checkUp4");
let regLink = document.getElementById("regLink");
let itemsCart = document.querySelector(".cart--modal__items");
let eraseCart = document.querySelector("#eraseCart");
let buyCart = document.querySelector("#buyCart");
let confirmCart = document.querySelector("#confirmCart");
let confirmAdress = document.querySelector("#confirmAdress");
let confirmInfo = document.querySelector("#confirmInfo");
let filtersAccesorios = document.querySelector("#filtersAccesorios");
let filtersRemera = document.querySelector("#filtersRemera");
let filtersPantalones = document.querySelector("#filtersPantalones");
let filtersBuzos = document.querySelector("#filtersBuzos");
let filterShow = document.querySelector("#filterShow");
let filterInteractive = document.querySelector(".main--filters__interactive");
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
        let userId = user.uid;
        let userMail = mail;
        db.collection("users")
          .doc(userId)
          .set({
            userMail: userMail,
            userStatus: "user",
            userId: userId,
            userCart: "",
          })
          .then(() => {
            console.log("Document successfully written!");
            location.reload();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
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
      location.reload();
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
    var docRef = db.collection("users").doc(user.uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let usuario = doc.data();
          const { userMail, userStatus, userId, userCart } = usuario;
          if (userStatus === "admin") {
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
          callPromise.then(
            setTimeout(() => {
              /*OPENS SELECTED ITEM MODAL*/
              let itemBtns = document.getElementsByClassName("itemBtn");
              for (el of itemBtns) {
                el.addEventListener("click", (e) => {
                  let parent = e.currentTarget.parentNode;
                  let data = parent.getAttribute("data-id");
                  /*OPENS SELECTED ITEM MODAL*/
                  itemModal.style.display = "flex";
                  let itemRef = db.collection("items").doc(data);
                  itemRef
                    .get()
                    .then((doc) => {
                      if (doc.exists) {
                        let item = doc.data();
                        itemModal.innerHTML = `<div class="main--selected__modal">
                                              <span class="selectedClose">X</span>
                                              <img class="selectedImg" src="images/about.jpg" alt="">
                                              <div class="selectedInfo" data-id='${doc.id}'>
                                                  <h1 class="selectedTitle">${item.title}</h1>
                                                  <h2 class="selectedPrice">$${item.price}</h2>
                                                  <span class="selectedDesc">${item.desc}</span> 
                                                  <div class="selectedSizes">
                                                      <div class="sizeSize"><input class="selectedSizesInd" value='S' type="checkbox" id="check1" onclick="selectOne(this.id)"><label class="sizeLabel" for="sizeS">S</label></div>
                                                      <div class="sizeSize"><input class="selectedSizesInd" value='M' type="checkbox" id="check2" onclick="selectOne(this.id)"><label class="sizeLabel" for="sizeM">M</label></div>
                                                      <div class="sizeSize"><input class="selectedSizesInd" value='L' type="checkbox" id="check3" onclick="selectOne(this.id)"><label class="sizeLabel" for="sizeL">L</label></div>
                                                      <div class="sizeSize"><input class="selectedSizesInd" value='XL' type="checkbox" id="check4" onclick="selectOne(this.id)"><label class="sizeLabel" for="sizeXL">XL</label></div>
                                                  </div>
                                                  <input  class="selectedBuy" type="button" value="Añadir al carrito">   
                                              </div>
                                          </div>`;
                        /*CLOSES SELECTED ITEM MODAL*/
                        let sizesBtns =
                          document.getElementsByClassName("selectedSizesInd");
                        let closeItem =
                          document.querySelector(".selectedClose");
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
                        /*BUY ITEM FUNCTION*/
                        let buyBtn = document.querySelector(".selectedBuy");
                        buyBtn.addEventListener("click", (e) => {
                          e.preventDefault();
                          let buyTitle =
                            document.querySelector(".selectedTitle");
                          let buyPrice =
                            document.querySelector(".selectedPrice");
                          let title = buyTitle.innerHTML;
                          let price = buyPrice.innerHTML;
                          let parent = e.currentTarget.parentNode;
                          let id = parent.getAttribute("data-id");
                          let size = "";
                          for (el of sizesBtns) {
                            if (el.checked == true) {
                              size = el.value;
                            }
                            el.checked = false;
                          }
                          const product = {
                            title: title,
                            price: price,
                            size: size,
                            id: id,
                          };
                          cart = [...cart, product];
                          console.log(cart);
                          /*UPDATING CART*/
                          docRef
                            .update({
                              userCart: cart,
                            })
                            .then(() => {
                              console.log("Document successfully updated!");
                            })
                            .catch((error) => {
                              // The document probably doesn't exist.
                              console.error("Error updating document: ", error);
                            });
                          /*CLOSE AFTER BUY*/
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
                      } else {
                        console.log("No such document!");
                      }
                    })
                    .catch((error) => {
                      console.log("Error getting document:", error);
                    });
                  setTimeout(function () {
                    itemModal.style.opacity = 1;
                  }, 500);
                });
              }
            }, 600)
          );

          /*OPENS CART SCREEN*/
          let cart = userCart;
          cartBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(cart);
            itemsCart.innerHTML = "";
            cartModal.style.display = "flex";
            if (cart.length == 0) {
              itemsCart.innerHTML = "<h1>NO HAY ITEMS</h1>";
            }
            loadCart(cart);

            /*DELETE ITEMS FROM CART*/
            let deleteItemsBtn =
              document.getElementsByClassName("deleteItemsBtn");
            setTimeout(() => {
              for (el of deleteItemsBtn) {
                el.addEventListener("click", (e) => {
                  let child = event.currentTarget;
                  let parent = child.parentNode;
                  let data = parent.getAttribute("data-id");
                  let cartRef = db.collection("users").doc(user.uid);
                  console.log(data);
                  console.log(cart);
                  for (el of cart) {
                    if (el.id == data) {
                      let deleting = cart.indexOf(el);
                      console.log(deleting);
                      cart.splice(deleting, 1);
                      cartRef
                        .update({
                          userCart: cart,
                        })
                        .then(() => {
                          console.log("Document successfully updated!");
                        })
                        .catch((error) => {
                          console.error("Error updating document: ", error);
                        });
                    }
                  }
                  itemsCart.innerHTML = "";
                  loadCart(cart);
                  if (cart.length == 0) {
                    itemsCart.innerHTML = "<h1>NO HAY ITEMS</h1>";
                  }
                });
              }
              cartModal.style.opacity = 1;
            }, 500);
          });
          /*CLOSES CART SCREEN*/
          closeCart.addEventListener("click", () => {
            cartModal.style.opacity = 0;
            itemsCart.innerHTML = "";
            action = false;
            setTimeout(() => {
              cartModal.style.display = "none";
              confirmCart.style.display = "none";
              eraseCart.style.display = "block";
              buyCart.style.display = "block";
              confirmModal.style.display = "none";
              confirmModal.style.opacity = 0;
              itemsCart.style.opacity = 1;
              itemsCart.style.display = "flex";
            }, 500);
          });
          /*DELETE EVERYTING FROM CART*/
          eraseCart.addEventListener("click", () => {
            deleteCart(docRef);
          });
          /*FIRST BUY CART ACCTION*/
          buyCart.addEventListener("click", () => {
            itemsCart.style.opacity = 0;
            confirmModal.style.display = "flex";
            confirmCart.style.display = "block";
            eraseCart.style.display = "none";
            buyCart.style.display = "none";
            console.log("vamos a confirmar ahora");
            setTimeout(() => {
              itemsCart.style.display = "none";
              confirmModal.style.opacity = 1;
            }, 500);
          });
          /*CONFIRM BUY*/
          confirmCart.addEventListener("click", () => {
            cartModal.style.opacity = 0;
            itemsCart.innerHTML = "";
            console.log("confirmado");
            confirmCart.style.display = "none";
            eraseCart.style.display = "block";
            buyCart.style.display = "block";
            let adress = confirmAdress.value;
            let extraInfo = confirmInfo.value;
            const cartFinal = {
              mail: userMail,
              cart: cart,
              adress: adress,
              info: extraInfo,
            };
            console.log(cartFinal);
            setTimeout(() => {
              confirmAdress.value = "";
              confirmInfo.value = "";
              cartModal.style.display = "none";
              eraseCart.style.display = "block";
              confirmModal.style.display = "none";
              confirmModal.style.opacity = 0;
              itemsCart.style.opacity = 1;
              itemsCart.style.display = "flex";
              cart = "";
              deleteCart(docRef);
            }, 500);
          });
        } else {
          /*FUNCTION TO CREATE USER DB*/
          db.collection("users")
            .doc(user.uid)
            .set({
              userMail: user.email,
              userStatus: "user",
              userId: user.uid,
              userCart: "",
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
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
/*FILTERS ACCS*/
filtersAccesorios.addEventListener("click", () => {
  let filterRef = db.collection("items");
  let reference = filterRef.where("filter", "==", "accesorio");
  reference
    .get()
    .then(function (results) {
      if (results.empty) {
        mainItems.innerHTML = "<h1>NO HAY ITEMS</h1>";
      } else {
        mainItems.innerHTML = "";
        // go through all results
        results.forEach(function (doc) {
          let itemData = doc.data();
          if (itemData.prox == false) {
            mainItems.innerHTML += `<article class="main--items__card" data-id='${doc.id}'>
                              <img class="cardImg" src="images/about.jpg" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              </article>`;
          } else {
            mainItems.innerHTML += `<article class="main--items__cardDisabled" data-id='${doc.id}'>
                              <img class="cardImg" src="images/about.jpg" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              <span class='proxAlert'> PROXIMAMENTE </span>
                              </article>`;
          }
        });
      }
    })
    .catch(function (error) {
      console.log("Error getting documents:", error);
    });
});
/*FILTERS PANTS*/
filtersPantalones.addEventListener("click", () => {
  let filterRef = db.collection("items");
  let reference = filterRef.where("filter", "==", "pantalon");
  reference
    .get()
    .then(function (results) {
      if (results.empty) {
        mainItems.innerHTML = "<h1>NO HAY ITEMS</h1>";
      } else {
        mainItems.innerHTML = "";
        // go through all results
        results.forEach(function (doc) {
          let itemData = doc.data();
          if (itemData.prox == false) {
            mainItems.innerHTML += `<article class="main--items__card" data-id='${doc.id}'>
                              <img class="cardImg" src="images/about.jpg" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              </article>`;
          } else {
            mainItems.innerHTML += `<article class="main--items__cardDisabled" data-id='${doc.id}'>
                              <img class="cardImg" src="images/about.jpg" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              <span class='proxAlert'> PROXIMAMENTE </span>
                              </article>`;
          }
        });
      }
    })
    .catch(function (error) {
      console.log("Error getting documents:", error);
    });
});
/*FILTERS TSHIRTS*/
filtersRemera.addEventListener("click", () => {
  let filterRef = db.collection("items");
  let reference = filterRef.where("filter", "==", "remera");
  reference
    .get()
    .then(function (results) {
      if (results.empty) {
        mainItems.innerHTML = "<h1>NO HAY ITEMS</h1>";
      } else {
        mainItems.innerHTML = "";
        // go through all results
        results.forEach(function (doc) {
          let itemData = doc.data();
          if (itemData.prox == false) {
            mainItems.innerHTML += `<article class="main--items__card" data-id='${doc.id}'>
                              <img class="cardImg" src="images/about.jpg" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              </article>`;
          } else {
            mainItems.innerHTML += `<article class="main--items__cardDisabled" data-id='${doc.id}'>
                              <img class="cardImg" src="images/about.jpg" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              <span class='proxAlert'> PROXIMAMENTE </span>
                              </article>`;
          }
        });
      }
    })
    .catch(function (error) {
      console.log("Error getting documents:", error);
    });
});
/*FILTERS HOODIES*/
filtersBuzos.addEventListener("click", () => {
  let filterRef = db.collection("items");
  let reference = filterRef.where("filter", "==", "buzo");
  reference
    .get()
    .then(function (results) {
      if (results.empty) {
        mainItems.innerHTML = "<h1>NO HAY ITEMS</h1>";
      } else {
        mainItems.innerHTML = "";
        // go through all results
        results.forEach(function (doc) {
          let itemData = doc.data();
          if (itemData.prox == false) {
            mainItems.innerHTML += `<article class="main--items__card" data-id='${doc.id}'>
                              <img class="cardImg" src="images/about.jpg" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              </article>`;
          } else {
            mainItems.innerHTML += `<article class="main--items__cardDisabled" data-id='${doc.id}'>
                              <img class="cardImg" src="images/about.jpg" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              <span class='proxAlert'> PROXIMAMENTE </span>
                              </article>`;
          }
        });
      }
    })
    .catch(function (error) {
      console.log("Error getting documents:", error);
    });
});
/*EXPAND FILTERS MOBILE*/
filterShow.addEventListener("click", () => {
  console.log("object");
  filterInteractive.style.display = "flex";
  setTimeout(() => {
    filterInteractive.style.opacity = 1;
  });
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
  let desc = uploadDesc.value;
  let prox = uploadProx.checked;
  let filter = uploadFilter.value;
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
      desc: desc,
      filter: filter,
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
  }, 1500);
  setTimeout(function () {
    location.reload();
  }, 2500);
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
        let itemData = doc.data();
        if (itemData.prox == false) {
          mainItems.innerHTML += `<article class="main--items__card" data-id='${doc.id}'>
                              <img class="cardImg" src="images/about.jpg" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              </article>`;
        } else {
          mainItems.innerHTML += `<article class="main--items__cardDisabled" data-id='${doc.id}'>
                              <img class="cardImg" src="images/about.jpg" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              <span class='proxAlert'> PROXIMAMENTE </span>
                              </article>`;
        }
      });
    });
};

const deleteCart = (docRef) => {
  docRef
    .update({
      userCart: "",
    })
    .then(() => {
      itemsCart.innerHTML = "<h1>NO HAY ITEMS</h1>";
      cart.length = "";
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
};

const loadCart = (cart) => {
  for (el of cart) {
    itemsCart.innerHTML += `<article class='cartItem' data-id='${el.id}'>
                                                    <div class='cartDiv'>
                                                    <h2 class='cartTitle'>${el.title}</h2>
                                                    <h3 class='cartSize'>${el.size}</h3>
                                                    </div>
                                                    <h3 class='cartPrice'>${el.price}</h3>
                                                    
                                                    <input class='deleteItemsBtn' type='button' value='Borrar'>
                                                    </article>`;
  }
};

/**/
const callPromise = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve(loadDB());
  }, 500);
});
