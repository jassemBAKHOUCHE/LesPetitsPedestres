import { URL } from "../global.js";
import { registerUser, loginuser } from "../lib/auth.js";

let pseudo = document.querySelector("#pseudo");
let mdp = document.querySelector("#mdp");
let button = document.querySelector("#send");

button.addEventListener("click", () => {
  console.log("a")
  if (pseudo.value !== "" && mdp.value !== "") {
    registerUser(pseudo.value, mdp.value)
    .then((data) => {
      console.log(data)
      loginuser(pseudo.value, mdp.value)
      .then((data) => {
        console.log(data)
        let token = data.access_token;
        window.sessionStorage.setItem("token", token);
        window.location.replace(`${URL}/clicker`);
      })
    })
  } else {
    alert("Veuillez remplir tous les champs.");
  }
});
