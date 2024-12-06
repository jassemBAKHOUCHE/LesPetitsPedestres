let pseudo = document.querySelector("#pseudo");
let mdp = document.querySelector("#mdp");
let button = document.querySelector("#send");

button.addEventListener("click", () => {
  console.log("a")
  if (pseudo.value !== "" && mdp.value !== "") {
    const userData = {
      pseudo: pseudo.value,
      password: mdp.value,
    };

    fetch("http://57.128.111.45:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur serveur : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        if (data.status === "success") {
          localStorage.setItem("token", data.token);
          alert("Connexion réussie !");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
      });
  } else {
    alert("Veuillez remplir tous les champs.");
  }
});
