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
let filtersRemerones = document.querySelector("#filtersRemerones");
let filtersBlusasCamisas = document.querySelector("#filtersBlusasCamisas");
let filtersKimonos = document.querySelector("#filtersKimonos");
let filtersPolleras = document.querySelector("#filtersPolleras");
let filtersVestidos = document.querySelector("#filtersVestidos");
let filtersShorts = document.querySelector("#filtersShorts");
let filtersSweaters = document.querySelector("#filtersSweaters");
let filtersBlazers = document.querySelector("#filtersBlazers");
let filtersMusculosas = document.querySelector("#filtersMusculosas");
let filtersMangaCorta = document.querySelector("#filtersMangaCorta");
let filtersMangaLarga = document.querySelector("#filtersMangaLarga");
let filtersJeans = document.querySelector("#filtersJeans");
let filtersBengalina = document.querySelector("#filtersBengalina");
let filtersLino = document.querySelector("#filtersLino");
let filtersEngomado = document.querySelector("#filtersEngomado");
let filtersCartBill = document.querySelector("#filtersCartBill");
let filtersPa??uelos = document.querySelector("#filtersPa??uelos");
let filtersRelojes = document.querySelector("#filtersRelojes");
let filterShow = document.querySelector("#filterShow");
let filterInteractive = document.querySelector(".main--filters__interactive");
let cartList = document.querySelector("#cartList");
let uploadImg = document.querySelector("#uploadImg");
let moreRemeras = document.querySelector("#moreRemeras");
let morePantalones = document.querySelector("#morePantalones");
let moreAccesorios = document.querySelector("#moreAccesorios");
let moreFiltersSpace = document.querySelector("#moreFiltersSpace");
let uploadConfirm = document.querySelector("#uploadConfirm");
let moreFiltersPantalones = document.querySelector("#moreFiltersPantalones");
let moreFiltersRemera = document.querySelector("#moreFiltersRemera");
let moreFiltersAccesorios = document.querySelector("#moreFiltersAccesorios");
/*FIREBASE*/
const firebaseConfig = {
  apiKey: "AIzaSyDjDNZ12w_IzxHrylZX7W-eMq0fS0LbKGs",
  authDomain: "oliviaspboutique-81509.firebaseapp.com",
  projectId: "oliviaspboutique-81509",
  storageBucket: "oliviaspboutique-81509.appspot.com",
  messagingSenderId: "321117996647",
  appId: "1:321117996647:web:055372d0c00d1ae06e76c2",
  measurementId: "G-Q08M39RZ57",
};
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
var db = firebase.firestore();
var storage = firebase.storage();

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
                        itemModal.innerHTML = `<div class="main--selected__modal" data-id='${doc.id}'>
                                              <span class="selectedClose">X</span>
                                              <img class="selectedImg" src="images/loading.gif" alt="" id='${item.imgNumber}'>
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
                                                  <input  class="selectedBuy" type="button" value="A??adir al carrito">   
                                              </div>
                                          </div>`;
                        /*LOAD IMG*/
                        let cardImg = document.getElementById(item.imgNumber);
                        async function firstFunctionModal(dataModal, cardImg) {
                          firebase
                            .storage()
                            .ref(`images/${dataModal}.jpg`)
                            .getDownloadURL()
                            .then((imgUrl) => {
                              cardImg.src = imgUrl;
                            });
                          return;
                        }
                        async function secondFunctionModal(cardImg) {
                          let dataModal = parent.getAttribute("data-cont");
                          await firstFunctionModal(dataModal, cardImg);
                        }
                        secondFunctionModal(cardImg);
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
              let cardImg = document.getElementsByClassName("cardImg");
              async function firstFunction(data, el) {
                firebase
                  .storage()
                  .ref(`images/${data}.jpg`)
                  .getDownloadURL()
                  .then((imgUrl) => {
                    el.src = imgUrl;
                  });
                return;
              }
              async function secondFunction(cardImg) {
                for (el of cardImg) {
                  let parent = el.parentNode;
                  let data = parent.getAttribute("data-cont");
                  await firstFunction(data, el);
                }
              }
              secondFunction(cardImg);
            }, 600)
          );

          /*OPENS CART SCREEN*/
          let cart = userCart;
          cartBtn.addEventListener("click", (e) => {
            e.preventDefault();
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
            cart = "";
            deleteCart(docRef);
          });
          /*FIRST BUY CART ACCTION*/
          buyCart.addEventListener("click", () => {
            itemsCart.style.opacity = 0;
            confirmModal.style.display = "flex";
            confirmCart.style.display = "block";
            eraseCart.style.display = "none";
            buyCart.style.display = "none";
            setTimeout(() => {
              itemsCart.style.display = "none";
              confirmModal.style.opacity = 1;
            }, 500);
          });
          /*CONFIRM BUY*/
          confirmCart.addEventListener("click", () => {
            cartModal.style.opacity = 0;
            let cartArray = [];
            for (el of cart) {
              let cartDestruct = { nombre: el.title, talle: el.size };
              cartArray = [cartDestruct, ...cartArray];
            }
            itemsCart.innerHTML = "";
            confirmCart.style.display = "none";
            eraseCart.style.display = "block";
            buyCart.style.display = "block";
            let adress = confirmAdress.value;
            let extraInfo = confirmInfo.value;
            let cartListConfirm = JSON.stringify(cartArray);
            const cartFinal = {
              mail: userMail,
              cart: cart,
              adress: adress,
              info: extraInfo,
            };
            emailjs.send("service_ry0gdf8", "template_8rhmv4c", {
              from_name: userMail,
              to_name: "Hola Boutique Olivia",
              message: `Te realizaron una compra de los siguientes items: ${cartListConfirm}, la direccion de compra es: ${cartFinal.adress} y brindo la siguiente informacion:${cartFinal.info}`,
            });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Enviado! Nos pondremos en contacto a la brevedad",
              showConfirmButton: false,
              timer: 3000,
            });
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
    setTimeout(() => {
      let itemBtns = document.getElementsByClassName("itemBtn");
      for (el of itemBtns) {
        el.addEventListener("click", () => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Inicie sesion para comprar",
            showConfirmButton: false,
            timer: 5000,
          });
        });
      }
    }, 3000);
  }
});

var filterRef = db.collection("items");
/*FILTERS ACCS*/
filtersAccesorios.addEventListener("click", () => {
  moreAccesorios.style.display = "block";
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
  morePantalones.style.display = "block";
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
  moreRemeras.style.display = "block";
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
/*FILTERS REMERONES*/
filtersRemerones.addEventListener("click", () => {
  let reference = filterRef.where("filter", "==", "remeron");
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
/*FILTERS BLUSAS Y CAMISAS*/
filtersBlusasCamisas.addEventListener("click", () => {
  let reference = filterRef.where("filter", "==", "blusacamisa");
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
/*FILTERS KIMONOS*/
filtersKimonos.addEventListener("click", () => {
  let reference = filterRef.where("filter", "==", "kimono");
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
/*FILTERS POLLERAS*/
filtersPolleras.addEventListener("click", () => {
  let reference = filterRef.where("filter", "==", "pollera");
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
/*FILTERS VESTIDOS*/
filtersVestidos.addEventListener("click", () => {
  let reference = filterRef.where("filter", "==", "vestido");
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
/*FILTERS SHORTS*/
filtersShorts.addEventListener("click", () => {
  let reference = filterRef.where("filter", "==", "short");
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
/*FILTERS SWEATER*/
filtersSweaters.addEventListener("click", () => {
  let reference = filterRef.where("filter", "==", "sweater");
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
/*FILTERS BLAZERS*/
filtersBlazers.addEventListener("click", () => {
  let reference = filterRef.where("filter", "==", "blazer");
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
/*FILTERS MUSCULOSAS*/
filtersMusculosas.addEventListener("click", () => {
  let reference = filterRef.where("extraFilter", "==", "musculosa");
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
/*FILTERS MANGA CORTA*/
filtersMangaCorta.addEventListener("click", () => {
  let reference = filterRef.where("extraFilter", "==", "mangacorta");
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
/*FILTERS MANGA LARGA*/
filtersMangaLarga.addEventListener("click", () => {
  let reference = filterRef.where("extraFilter", "==", "mangalarga");
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
/*FILTERS JEAN*/
filtersJeans.addEventListener("click", () => {
  let reference = filterRef.where("extraFilter", "==", "jean");
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
/*FILTERS BENGALINA*/
filtersBengalina.addEventListener("click", () => {
  let reference = filterRef.where("extraFilter", "==", "bengalina");
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
/*FILTERS LINO*/
filtersLino.addEventListener("click", () => {
  let reference = filterRef.where("extraFilter", "==", "lino");
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
/*FILTERS ENGOMADO*/
filtersEngomado.addEventListener("click", () => {
  let reference = filterRef.where("extraFilter", "==", "engomado");
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
/*FILTERS CARTERA Y BILLETERA*/
filtersCartBill.addEventListener("click", () => {
  let reference = filterRef.where("extraFilter", "==", "cartbill");
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
/*FILTERS PA??UELOS*/
filtersPa??uelos.addEventListener("click", () => {
  let reference = filterRef.where("extraFilter", "==", "pa??uelo");
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
/*FILTERS RELOJ*/
filtersRelojes.addEventListener("click", () => {
  let reference = filterRef.where("extraFilter", "==", "reloj");
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

/*SOLO UN CHECKBOX EN TAMA??OS*/
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

let file = {};
const chooseFile = (e) => {
  setInterval(() => {
    file = e.target.files[0];
  }, 500);
};

/*UPLOAD ITEM*/
uploadItem.addEventListener("click", () => {
  let title = uploadTitle.value;
  let price = uploadPrice.value;
  let desc = uploadDesc.value;
  let prox = uploadProx.checked;
  let filter = uploadFilter.value;
  let sizeS = checkUp1.checked;
  let sizeM = checkUp2.checked;
  let sizeL = checkUp3.checked;
  let sizeXL = checkUp4.checked;
  let imgNumber = totalItems;
  db.collection("items")
    .add({
      title: title,
      price: price,
      prox: prox,
      desc: desc,
      imgNumber: imgNumber,
      filter: filter,
      extraFilter: "",
      size: {
        s: sizeS,
        m: sizeM,
        l: sizeL,
        xl: sizeXL,
      },
    })
    .then((docRef) => {
      let data = docRef.id;
      if (filter == "pantalon") {
        let uploadSpace = document.getElementsByClassName("uploadSpace");
        for (el of uploadSpace) {
          el.style.display = "none";
        }
        moreFiltersSpace.style.display = "flex";
        uploadItem.style.display = "none";
        uploadConfirm.style.display = "block";
        moreFiltersPantalones.style.display = "block";
        uploadConfirm.addEventListener("click", () => {
          let confirmFilter = moreFiltersPantalones.value;
          db.collection("items")
            .doc(data)
            .update({
              extraFilter: confirmFilter,
            })
            .then(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto subido",
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(function () {
                location.reload();
              }, 3500);
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        });
      } else if (filter == "accesorio") {
        let uploadSpace = document.getElementsByClassName("uploadSpace");
        for (el of uploadSpace) {
          el.style.display = "none";
        }
        moreFiltersSpace.style.display = "flex";
        uploadItem.style.display = "none";
        uploadConfirm.style.display = "block";
        moreFiltersAccesorios.style.display = "block";
        uploadConfirm.addEventListener("click", () => {
          let confirmFilter = moreFiltersAccesorios.value;
          db.collection("items")
            .doc(data)
            .update({
              extraFilter: confirmFilter,
            })
            .then(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto subido",
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(function () {
                location.reload();
              }, 3500);
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        });
      } else if (filter == "remera") {
        let uploadSpace = document.getElementsByClassName("uploadSpace");
        for (el of uploadSpace) {
          el.style.display = "none";
        }
        moreFiltersSpace.style.display = "flex";
        uploadItem.style.display = "none";
        uploadConfirm.style.display = "block";
        moreFiltersRemera.style.display = "block";
        uploadConfirm.addEventListener("click", () => {
          let confirmFilter = moreFiltersRemera.value;
          db.collection("items")
            .doc(data)
            .update({
              extraFilter: confirmFilter,
            })
            .then(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto subido",
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(function () {
                location.reload();
              }, 3500);
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        });
      } else {
        uploadModal.style.opacity = 0;
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
        }, 1000);
        setTimeout(function () {
          location.reload();
        }, 3500);
      }
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  firebase
    .storage()
    .ref("images/" + imgNumber + ".jpg")
    .put(file)
    .then(() => {
      imgNumber++;
      console.log(imgNumber);
      db.collection("global").doc("itemsTotal").update({
        cont: imgNumber,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
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

let totalItems, itemData, imgData;
const loadDB = () => {
  let totalRef = db.collection("global").doc("itemsTotal");
  totalRef.get("itemsTotal").then((doc) => {
    if (doc.exists) {
      let result = doc.data();
      totalItems = result.cont;
    } else {
    }
  });
  db.collection("items")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        itemData = doc.data();
        if (itemData.prox == false) {
          mainItems.innerHTML += `<article class="main--items__card" data-id='${doc.id}' data-cont='${itemData.imgNumber}'>
                              <img class="cardImg" id='card${itemData.imgNumber}' src="" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              </article>`;
        } else {
          mainItems.innerHTML += `<article class="main--items__cardDisabled" data-id='${doc.id}'>
                              <img class="cardImg" src="" alt="">
                              <h2>${itemData.title}</h2>
                              <h3>$${itemData.price}</h3>
                              <span class="itemBtn">Ver mas...</span>
                              <span class='proxAlert'> PROXIMAMENTE </span>
                              </article>`;
        }
        callPromise.then(
          setTimeout(() => {
            /*OPENS SELECTED ITEM MODAL*/
            let cardImg = document.getElementsByClassName("cardImg");
            async function firstFunction(data, el) {
              firebase
                .storage()
                .ref(`images/${data}.jpg`)
                .getDownloadURL()
                .then((imgUrl) => {
                  el.src = imgUrl;
                });
              return;
            }
            async function secondFunction(cardImg) {
              for (el of cardImg) {
                let parent = el.parentNode;
                let data = parent.getAttribute("data-cont");
                await firstFunction(data, el);
              }
            }
            secondFunction(cardImg);
          }, 600)
        );
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

emailjs.init("user_zHfLX4fnyJ0iDwHcZZC7y");
