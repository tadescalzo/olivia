let aboutModal = document.querySelector(".about");
let modalClose = document.querySelector(".about--modal__close");
let aboutLink = document.querySelector("#aboutLink");
let userBtn = document.querySelector("#userBtn");

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/*FACEBOOK*/
window.fbAsyncInit = function () {
  FB.init({
    appId: "{4364525773675715}",
    cookie: true,
    xfbml: true,
    version: "{1.0}",
  });

  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

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
