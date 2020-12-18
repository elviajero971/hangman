//Jeu du pendu à deux joueurs!

let nbOfTries = 10; //initialise le nombre d'essais à 10

//déclaration du bouton qui va déclencher l'event sauvegarde du mot de Player 1
let buttonSubmitWordPlayer1 = document.getElementById("submitWord");

// le contenu qui va afficher l'état d'avancement du Player 2 est stocké dans la variable displayGuessState
let displayGuessState = document.getElementById("displayGuessState");

// Je déclare l'élément bouton qui va déclencher l'event sauvegarde du mot guess de Player 2
let buttonSubmitGuessPlayer2 = document.getElementById("submitGuessInput");


// j'identifie la zone texte pour player 1
let player1Display = document.getElementById("player1");

// j'identifie la zone texte pour player 2
let player2Display = document.getElementById("player2");

let player2GuessState = ['_']; //déclaration du tableau contenant le résultat des essais de player 2

//je déclare la variable inputPlayer1
let inputPlayer1;

// je déclare la variable startGame qui représente le champ texte qui va contenir l'affichage de fin de partie gagnante
let startGame = document.getElementById("startGame");

// je déclare la variable contentWin qui représente le champ texte qui va contenir l'affichage de fin de partie gagnante
let contentWin = document.getElementById("contentWin");

// je déclare la variable contentWin qui représente le champ texte qui va contenir l'affichage de fin de partie perdante
let contentLoose = document.getElementById("contentLoose");

//je déclare la variable contentPlayers qui représente le block de texte de Player 1 et Player 2
let contentPlayers = document.getElementById("content");


//je déclare la variable contentListTries qui représente le block qui va afficher les valeurs entrées par Player 2

let contentListAlphabet = document.getElementById("contentListAlphabet");


let nbOfTriesArea = document.getElementById("nbLives");

//je déclare la balise qui va contenir lenombre d'essais restants
let nbLives = document.getElementById("nbLives");

let player2GuessInput = document.getElementById("player2GuessInput").value;


//----------------------- tableAlphabet --------------------------
//----------------------------------------------------------------

let tableAlphabet = [];
for (i = 0; i < 26; i++) {
    tableAlphabet.push([String.fromCharCode(i + 65), 0]);
}

function initializeAlphabet() {
    for (let i = 0; i < inputPlayer1.length; i++) {
        tableAlphabet[i][1] = 0;
    }
}

let valIndiceTab;
valIndiceTab = player2GuessInput.toUpperCase().charCodeAt(0) - 65;

function initializeVariables() {
    inputPlayer1 = "";
    nbOfTries = 10;
    player2GuessState = ['_'];
    contentPlayers.style.display = "flex";
    startGame.style.display = "none";
    contentWin.style.display = "none";
    contentLoose.style.display = "none";
    //au clic la zone texte player2 va apparaitre
    player1Display.style.display = "flex";
    //au clic la zone texte player2 va disparaitre
    player2Display.style.display = "none";
    document.getElementById("wordInput").innerHTML = "";
}



//------------ FONCTION displayAlphabet() -----------------------
//----------------------------------------------------------------

function displayAlphabet() {
    contentListAlphabet.innerHTML = ""; // Efface l'alphabet précédent
    for (let i = 0; i < 26; i++) {
        if (tableAlphabet[i][1] == 0) {
            contentListAlphabet.insertAdjacentHTML('beforeend', "<div id='letter'" + i + "  class='letter'>" + tableAlphabet[i][0] + "</div>");
        } else if (tableAlphabet[i][1] == 1) {
            contentListAlphabet.insertAdjacentHTML('beforeend', "<div id='letter'" + i + "  class='letter'>" + tableAlphabet[i][0] + "</div>");
        } else if (tableAlphabet[i][1] == 2) {
            contentListAlphabet.insertAdjacentHTML('beforeend', "<div id='letter'" + i + "  class='letter'>" + tableAlphabet[i][0] + "</div>");
        }
    }
}


// ---------- EVENT POUR BOUTON FORM PLAYER 1 ---------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

buttonSubmitWordPlayer1.addEventListener("click", function() {
    // j'identifie le mot à trouver qui est l'input de player1'
    inputPlayer1 = document.getElementById("wordInput").value;
    //pour chaque lettre de wordInput on la remplace par un "_" dans le tableau str
    for (let i = 0; i < inputPlayer1.length - 1; i++) {
        player2GuessState.push('_');
    }

    displayGuessState.innerHTML = player2GuessState.join("  ");
    //au clic la zone texte player1 va disparaitre
    player1Display.style.display = "none";
    //au clic la zone texte player2 va apparaitre
    player2Display.style.display = "flex";

    //au clic la zone texte list-tries va apparaitre
    contentListAlphabet.style.display = "flex";

    document.getElementById("wordInput").innerHTML = "";

    // affiche le nombre d'essais restant
    nbOfTriesArea.innerHTML = "You have " + nbOfTries + " left...";

    initializeAlphabet();
    displayAlphabet();

});



// ------------- EVENT POUR BOUTON FORM PLAYER 2 ------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

buttonSubmitGuessPlayer2.addEventListener("click", function() {
    // je décrémente le nombre d'essais du joueurs
    nbOfTries--;
    // le contenu de chaque input de player2 est stocké dans player2GuessInput
    player2GuessInput = document.getElementById("player2GuessInput").value;

    // Boucle qui vérifie si la lettre existe dans le mot
    for (let i = 0; i < inputPlayer1.length; i++) {
        // Si lettre dans le mot n'est pas encore trouvée
        valIndiceTab = (player2GuessInput.toUpperCase().charCodeAt(0) - 65);
        console.log('avant if');
        if (player2GuessInput.toUpperCase() == inputPlayer1[i].toUpperCase()) {
            player2GuessState[i] = player2GuessInput.toUpperCase();
            tableAlphabet[valIndiceTab][1] = 1;
            console.log("égalité valeur de tableAlphabet[valIndiceTab[0]: " + tableAlphabet[valIndiceTab][0]);
            console.log("égalité valeur de : player2GuessInput: " + player2GuessInput.toUpperCase());
            console.log("égalité valeur de inputPlayer1[" + i + "]: " + inputPlayer1.toUpperCase()[i])
        } else if (player2GuessInput.toUpperCase() != inputPlayer1[i].toUpperCase()) {
            tableAlphabet[valIndiceTab][1] = 2;
            console.log("inégalité valeur de tableAlphabet[valIndiceTab[0]: " + tableAlphabet[valIndiceTab][0])
            console.log("inégalité valeur de : player2GuessInput: " + player2GuessInput.toUpperCase());
            console.log("inégalité valeur de inputPlayer1[" + i + "]: " + inputPlayer1.toUpperCase()[i])
        } else {
            tableAlphabet[valIndiceTab][1] = 0;
        }

        console.log('après if');
        console.log(tableAlphabet[valIndiceTab][1]);
    }
    displayAlphabet();

    startGame.style.display = "none";
    if (inputPlayer1.toUpperCase() == player2GuessState.join("").toUpperCase()) {
        contentPlayers.style.display = "none";
        contentWin.style.display = "flex";
        console.log("tu as gagné");
    } else if (nbOfTries < 1) {
        contentPlayers.style.display = "none";
        contentLoose.style.display = "flex";
        console.log("tu as perdu");
    } else {
        displayGuessState.innerHTML = player2GuessState.join(" ");
    }
    // à chaque clic su btnPlayer 2 on va changer l'affichage du nombre d'essaye restant

    nbOfTriesArea.innerHTML = "You have " + nbOfTries + " left...";
});

let btnStartGame = document.getElementById("btnStartGame");
let btnStartGameWin = document.getElementById("btnStartGameWin");
let btnStartGameLoose = document.getElementById("btnStartGameLoose");


btnStartGame.addEventListener("click", function() {
    initializeVariables();
    initializeAlphabet();
    displayAlphabet();
});

btnStartGameLoose.addEventListener("click", function() {
    initializeVariables();
    initializeAlphabet();
    displayAlphabet();

});


btnStartGameWin.addEventListener("click", function() {
    initializeVariables();
    initializeAlphabet();
    displayAlphabet();
});