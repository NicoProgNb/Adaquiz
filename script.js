// ════════════════════════════════════════════
//   ADAQUIZ — script.js
//   Certaines fonctions sont déjà écrites.
//   Les fonctions marquées TODO sont à compléter.
// ════════════════════════════════════════════


// ── Sélection des éléments DOM ──────────────
// Ces lignes récupèrent les éléments HTML par leur id.
// Tu n'as pas besoin de les modifier.

const btnCommencer = document.getElementById('btn-commencer')
const btnRecommencer = document.getElementById('btn-recommencer')
const ecranAccueil = document.getElementById('ecran-accueil')
const ecranQuestion = document.getElementById('ecran-question')
const ecranResultats = document.getElementById('ecran-resultats')
const nbQuestions = document.getElementById('nb-questions')
const questionCourante = questions[indexCourant]
const indexBonneReponse = questionCourante.bonneReponse
const scoreFinal = document.getElementById('score')
const messageFin = document.getElementById('message-fin')
const btnSuivant = document.getElementById('btn-suivant')

//... Crée autant de constantes que d'éléments HTML à récupérer


// ── État du quiz ─────────────────────────────
// Ces variables stockent les données en cours de partie.
// Tu n'as pas besoin de les modifier.

let questions = []   // tableau des questions chargées depuis le JSON
let indexCourant = 0    // numéro de la question en cours (commence à 0)
let score = 0    // nombre de bonnes réponses


// ── Chargement du JSON ───────────────────────
// Cette fonction est déjà écrite.
// Elle charge le fichier questions.json et remplit l'écran d'accueil.

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data
    nbQuestions.textContent = questions.length + ' questions'
  })


// ── Navigation entre les écrans ──────────────
// Cette fonction est déjà écrite.
// Elle cache tous les écrans puis affiche celui qu'on lui donne.

const afficher = (ecran) => {
  ecranAccueil.classList.add('cache')
  ecranQuestion.classList.add('cache')
  ecranResultats.classList.add('cache')
  ecran.classList.remove('cache')
}

// ════════════════════════════════════════════
//   TODO — Fonctions à compléter
// ════════════════════════════════════════════











// ── TODO : afficherQuestion ──────────────────
// Cette fonction doit afficher la question en cours.
// Elle est appelée au début de chaque nouvelle question.
//

const afficherQuestion = () => {

//   1. Récupérer la question courante : questions[indexCourant]

  document.getElementById("question").textContent
  const listRep = questions[indexCourant].reponses

  listRep.forEach(rep => {
    r = document.createElement("li")
    r.textContent = rep
    reponsesContainer.appendChild(r)
  })

  questionCourante.reponses.forEach((rep, indexCourant) => {
    // Création d'un élément bouton pour le clic
    const bouton = document.createElement('button')
    bouton.textContent = rep
  })




//   2. Mettre à jour la barre de progression
const progressBar = document.getElementById('my-progress')
const progressText = document.getElementById('progress-text')
const counterElement = document.getElementById('counter')

const mettreAJourProgression = () => {
  const totalQuestions = questions.length
  const questionActuelle = indexCourant + 1

  // Calcul du palier en pourcentage
  const pourcentage = Math.round((questionActuelle / totalQuestions) * 100)

  // Mise à jour de la barre et du texte de progression
  if (progressBar) progressBar.value = pourcentage
  if (progressText) progressText.innerText = pourcentage

//   3. Mettre à jour le compteur ("Question X / Y")
  if (counterElement) {
    counterElement.textContent = `Question ${questionActuelle} / ${totalQuestions}`
  }
}








//   4. Afficher le texte de la question dans #texte-question
  const texteQuestion = document.getElementById('texte-question')
  texteQuestion.textContent = questionCourante.question
//   5. Cacher le bouton "Question suivante"

//   6. Vider #liste-reponses, puis créer un bouton pour chaque réponse
//      Chaque bouton doit appeler verifierReponse() au clic
  const listeReponses = document.getElementById('liste-reponses')
  listeReponses.innerHTML = "" // Vide la liste

  bouton.addEventListener('click', () => {
    verifierReponse(index)
  })
}



















// ── TODO : verifierReponse ───────────────────

const verifierReponse = (indexChoisi) => {
// Cette fonction est appelée quand une apprenante clique sur une réponse.
// Elle reçoit en paramètre l'index de la réponse choisie (0, 1, 2 ou 3).

  const reponses = document.querySelectorAll('#reponse button')
//   1. Récupérer la question courante

//   2. Désactiver tous les boutons de réponse
  reponses.forEach(bouton => {
    bouton.disabled = true
  });

//   3. Colorier en vert la bonne réponse (ajouter la classe "correcte")
  reponses[indexBonneReponse].classList.add("correct")

//   4. Si la réponse choisie est mauvaise, la colorier en rouge ("incorrecte")
  if (indexChoisi !== questions[indexCourant].bonneReponse) {
    reponses[indexChoisi].classList.add("incorrect")
    } else {
//   5. Si la réponse est bonne, incrémenter le score
    score++
  }

//   6. Afficher le bouton "Question suivante"
  const suivant = document.getElementById("btn-suivant")
  suivant.classList.remove("cache")

// Cache à nouveau btn-suivant
  suivant.onclick = () => {
    suivant.classList.add("cache")

// Choix de l'action btn-suivant : Question suivante ou page de résultat
    if (indexCourant === questions.length - 1) {
        afficher(ecranResultats); 
    } else {
        indexCourant++; 
        afficherQuestion(indexCourant); 
    }
  }
}

// ── TODO : afficherResultats ─────────────────
// Cette fonction est appelée quand toutes les questions ont été répondues.
//
// Ce qu'elle doit faire :

const afficherResultats = () => {

//   1. Afficher le score dans #score-final (ex. "4 / 7")
  scoreFinal.textContent = `${score} / ${questions.length}`

//   2. Afficher un message dans #message-fin selon le score
  let message = ""

  if (score === questions.length) {
    message = "Trop fort !"
  } else if (score >= questions.length / 2) {
    message = "Pas mal... tu connais tes classiques ! "
  } else {
    message = "Bon... t'es pas très doué mais on t'aime bien quand même"
  }

  messageFin.textContent = message

//   3. Appeler afficher(ecranResultats) pour passer à l'écran résultats
  afficher(ecranResultats)
}


// ── TODO : écouteurs d'événements ───────────
// Branche les boutons sur les bonnes fonctions.
//
// À faire :

//   - btn-commencer → afficher l'écran question + appeler afficherQuestion()
btnCommencer.addEventListener("click", () =>{
  afficher(ecranQuestion)
  afficherQuestion(0)
})

//   - btn-suivant   → passer à la question suivante ou aux résultats


//   - btn-rejouer   → remettre indexCourant et score à 0, revenir à l'accueil

btnCommencer.addEventListener("click", () =>{
  indexCourant =0
  score = 0
  afficher(ecranQuestion)
})