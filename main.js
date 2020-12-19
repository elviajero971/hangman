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

let player2GuessInput = document.getElementById("player2GuessInput").value.toUpperCase();


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
valIndiceTab = player2GuessInput.charCodeAt(0) - 65;

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
    for (let i = 0; i < 26; i++) {
        tableAlphabet[i][1] = 0
    }
}



//------------ FONCTION displayAlphabet() -----------------------
//----------------------------------------------------------------
// ----------------------------------------------------------------

function displayAlphabet() {
    contentListAlphabet.innerHTML = ""; // Efface l'alphabet précédent
    for (let i = 0; i < 26; i++) {
        if (tableAlphabet[i][1] == 0) {
            contentListAlphabet.insertAdjacentHTML('beforeend', "<div id='letter" + i + "'  class='letter normal'>" + tableAlphabet[i][0] + "</div>");
        } else if (tableAlphabet[i][1] == 1) {
            contentListAlphabet.insertAdjacentHTML('beforeend', "<div id='letter" + i + "'  class='letter found'>" + tableAlphabet[i][0] + "</div>");
        } else if (tableAlphabet[i][1] == 2) {
            contentListAlphabet.insertAdjacentHTML('beforeend', "<div id='letter" + i + "'  class='letter wrong'>" + tableAlphabet[i][0] + "</div>");
        }
    }
}


// ---------- EVENT POUR BOUTON FORM PLAYER 1 ---------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

buttonSubmitWordPlayer1.addEventListener("click", function() {
    // j'identifie le mot à trouver qui est l'input de player1'
    inputPlayer1 = document.getElementById("wordInput").value.toUpperCase();
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
    findTheAlphabetLetters();
});



function findLetterInWord(player2GuessInput) {
    let tab = [""];
    for (let i = 0; i < inputPlayer1.length; i++) {
        if (inputPlayer1[i] == player2GuessInput) {
            // slorsque la lettre de player2GuessInput est bien dans le mot inputPlayer1
            tab[0] = player2GuessInput;
            tab.push(i);
        }
    }
    return tab;
}


// ------------- EVENT POUR BOUTON FORM PLAYER 2 ------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------


buttonSubmitGuessPlayer2.addEventListener("click", function() {

    //rajouter une boucle pour afficher un message si l'utilisateur n'a saisie aucune donnée ou si il a déjà saisie la lettre.
    // je décrémente le nombre d'essais du joueurs

    // le contenu de chaque input de player2 est stocké dans player2GuessInput
    player2GuessInput = document.getElementById("player2GuessInput").value.toUpperCase();

    valIndiceTab = (player2GuessInput.charCodeAt(0) - 65);
    // Boucle qui vérifie si la lettre existe dans le mot

    let result = findLetterInWord(player2GuessInput);
    if (result[0]) {
        tableAlphabet[valIndiceTab][1] = 1;
        for (let i = 1; i < result.length; i++) {
            player2GuessState[result[i]] = player2GuessInput;
        }
    } else {
        tableAlphabet[valIndiceTab][1] = 2;
        nbOfTries--;
    }

    displayAlphabet();

    startGame.style.display = "none";
    if (inputPlayer1.toUpperCase() == player2GuessState.join("").toUpperCase()) {
        contentPlayers.style.display = "none";
        contentWin.style.display = "flex";
    } else if (nbOfTries < 1) {
        contentPlayers.style.display = "none";
        contentLoose.style.display = "flex";
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

// ------------- EVENT POUR BOUTON ALPHABET ------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// function findTheAlphabetLetters() {
//     let theAlphabet = document.getElementsByClassName("letter");
//     for (var i = 0; i < theAlphabet.length; i++) {
//         console.log(theAlphabet[i].innerHTML)
//     }
//     return
// }


function findTheAlphabetLetters() {

    let theAlphabet = document.getElementsByClassName("letter");
    for (let i = 0; i < theAlphabet.length; i++) {
        theAlphabet[i].addEventListener("click", function() {
            player2GuessInput = theAlphabet[i].innerHTML;
            valIndiceTab = (player2GuessInput.charCodeAt(0) - 65);
            let result = findLetterInWord(player2GuessInput);
            if (result[0]) {
                tableAlphabet[valIndiceTab][1] = 1;
                theAlphabet[i].classList.add('found');
                for (let i = 1; i < result.length; i++) {
                    player2GuessState[result[i]] = player2GuessInput;
                }
            } else {
                tableAlphabet[valIndiceTab][1] = 2;
                theAlphabet[i].classList.add('wrong');
                nbOfTries--;
            }

            startGame.style.display = "none";
            if (inputPlayer1.toUpperCase() == player2GuessState.join("").toUpperCase()) {
                contentPlayers.style.display = "none";
                contentWin.style.display = "flex";
            } else if (nbOfTries < 1) {
                contentPlayers.style.display = "none";
                contentLoose.style.display = "flex";
            } else {
                displayGuessState.innerHTML = player2GuessState.join(" ");
            }
            // à chaque clic su btnPlayer 2 on va changer l'affichage du nombre d'essaye restant

            nbOfTriesArea.innerHTML = "You have " + nbOfTries + " left...";
        });
    }
}