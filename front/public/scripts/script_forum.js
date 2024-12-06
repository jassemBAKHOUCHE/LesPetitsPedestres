const sliderInput = document.getElementById('sliderInput');
const sliderLetter = document.getElementById('sliderLetter');
const addLetterBtn = document.getElementById('addLetterBtn');
const inputField = document.getElementById('inputField'); // Le champ de texte (input)
const letterContainer = document.getElementById('letterContainer'); // Conteneur pour lettres aléatoires
const loadingIndicator = document.getElementById('loadingIndicator'); // L'indicateur de chargement
const publicationsContainer = document.getElementById('publicationsContainer'); // Conteneur des publications

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Fonction pour mélanger l'alphabet
function shuffleAlphabet() {
    const alphabetArray = alphabet.split('');
    for (let i = alphabetArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [alphabetArray[i], alphabetArray[j]] = [alphabetArray[j], alphabetArray[i]]; // Échange les éléments
    }
    return alphabetArray;
}

// Mélanger l'alphabet une seule fois
const shuffledAlphabet = shuffleAlphabet();

// Met à jour la lettre affichée à côté du slider
sliderInput.addEventListener('input', () => {
    const letter = getLetterFromSlider(sliderInput.value);
    sliderLetter.textContent = letter;
});

// Fonction pour obtenir la lettre en fonction de la valeur du slider
function getLetterFromSlider(value) {
    const index = value - 65; // Ajuste la valeur pour correspondre à l'index de l'alphabet mélangé
    return shuffledAlphabet[index];
}

// Fonction pour générer une position aléatoire sur la page
function getRandomPosition() {
    const maxX = window.innerWidth - 50; // Largeur de l'écran, moins la largeur d'un caractère
    const maxY = window.innerHeight - 50; // Hauteur de l'écran, moins la hauteur d'un caractère
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    return { x: randomX, y: randomY };
}

// Ajouter une lettre à une position aléatoire dans l'input ou dans un conteneur
addLetterBtn.addEventListener('click', () => {
    const letter = sliderLetter.textContent;
    
    // Afficher la roue de chargement
    loadingIndicator.style.display = 'flex';

    // Afficher un chargement aléatoire avant d'ajouter la lettre
    const randomDelay = Math.floor(Math.random() * 2000) + 500; // Délai aléatoire entre 500ms et 2500ms

    // Simuler un délai avant d'ajouter la lettre
    setTimeout(() => {
        // Cacher la roue de chargement
        loadingIndicator.style.display = 'none';

        // Insérer la lettre dans l'input
        inputField.value += letter; // Ajoute la lettre choisie au champ input

    }, randomDelay); // Attendre avant d'ajouter la lettre
});

// Gérer la publication d'un message
const publishBtn = document.getElementById('publishBtn');
publishBtn.addEventListener('click', () => {
    const messageContent = inputField.value.trim();
    if (messageContent) {
        // Créer un nouvel élément pour afficher la publication
        const publication = document.createElement('div');
        publication.classList.add('publication');
        
        const messageElement = document.createElement('span');
        messageElement.classList.add('message');
        let uname = window.sessionStorage.getItem("username")
        messageElement.textContent = uname + " : " + messageContent;


        // Ajouter le message et le timestamp au conteneur de la publication
        publication.appendChild(messageElement);

        // Ajouter la publication au conteneur
        publicationsContainer.appendChild(publication);

        // Envoyer la publication à l'API via POST
        postPublication(messageContent);

        // Effacer le champ de saisie après la publication
        inputField.value = '';
    } else {
        alert('Veuillez entrer un message avant de publier !');
    }
});

// Fonction pour envoyer une publication via POST
function postPublication(messageContent) {
    let token = window.sessionStorage.getItem("token");
    let uname = window.sessionStorage.getItem("username")
    fetch('http://57.128.111.45:8000/api/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
            
        },
        body: JSON.stringify({ contenu: messageContent, title: uname }), // Envoi du message sous forme JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Publication envoyée:', data);
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi de la publication:', error);
    });
}

// Fonction pour récupérer les publications via GET
function getPublications() {
    let token = window.sessionStorage.getItem("token");
    console.log(token)
    fetch('http://57.128.111.45:8000/api/posts', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Publications récupérées:', data);
        data.posts.forEach(publication => {
            const publicationElement = document.createElement('div');
            publicationElement.classList.add('publication');
            const messageElement = document.createElement('span');
            messageElement.classList.add('message');
            messageElement.textContent = publication.titre + " : " + publication.contenu;
            publicationElement.appendChild(messageElement);
            publicationsContainer.appendChild(publicationElement);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des publications:', error);
    });
}

// Récupérer les publications lors du chargement de la page
window.addEventListener('load', () => {
    getPublications(); // Charger les publications dès que la page est prête
});
