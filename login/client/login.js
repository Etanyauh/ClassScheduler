console.log(axios);

const login = () => {
  axios
    .post("/login", {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    })
    .then(res => {
      console.log(res);
      if (res.data.status == "ok") {
        window.location.replace("/main");
      } else {
        showSnackbar(res.data.message);
    }
    });
};

const register = () => {
  axios
    .post("/register", {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    })
    .then(res => {
      if (res.data.status == "ok") {
        showSnackbar(res.data.message);
      } else {
        showSnackbar(res.data.message);
      }
    });
};

const showSnackbar = msg => {
    let x = document.getElementById("snackbar");
  // Add the "show" class to DIV
  x.className = "show";
  x.innerHTML = msg;
  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}