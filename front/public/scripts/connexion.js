import { loginuser } from "../lib/auth.js";

let pseudo = document.querySelector("#pseudo");
let mdp = document.querySelector("#mdp");
let button = document.querySelector("#send");

button.addEventListener("click", () => {
  console.log("a")
  if (pseudo.value !== "" && mdp.value !== "") {
    loginuser(pseudo.value, mdp.value)
      .then((data) => {
        console.log(data)
        let token = data.access_token;
        window.sessionStorage.setItem("token", token);
        window.location.replace(`http://localhost:3000/clicker`);
      })
  } else {
    alert("Veuillez remplir tous les champs.");
  }
});
