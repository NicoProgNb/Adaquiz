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
const btnSuivant = document.getElementById('btn-suivant')

const ecranAccueil = document.getElementById('ecran-accueil')
const ecranQuestion = document.getElementById('ecran-question')
const ecranResultats = document.getElementById('ecran-resultats')

const nbQuestions = document.getElementById('nb-questions')
const texteQuestion = document.getElementById('texte-question')
const listeReponses = document.getElementById('liste-reponses')

const counterElement = document.getElementById('counter')
const progressBar = document.getElementById('my-progress')
const progressText = document.getElementById('progress-text')

const scoreFinal = document.getElementById('score')
const messageFin = document.getElementById('message-fin')


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
  const questionCourante = questions[indexCourant]

//   2. Mettre à jour la barre de progression
  const questionActuelle = indexCourant +1
  const totalQuestions = questions.length
  const pourcentage = Math.round((questionActuelle / totalQuestions) * 100)

// MAJ de la barre et du texte de progression
  progressBar.value = pourcentage
  progressText.textContent = pourcentage


//   3. Mettre à jour le compteur ("Question X / Y")
  if (counterElement) {
    counterElement.textContent = `Question ${questionActuelle} / ${totalQuestions}`
  }

//   4. Afficher le texte de la question dans #texte-question
  texteQuestion.textContent = questionCourante.question

//   5. Cacher le bouton "Question suivante"
  btnSuivant.classList.add('cache')

//   6. Vider #liste-reponses, puis créer un bouton pour chaque réponse
//      Chaque bouton doit appeler verifierReponse() au clic
  listeReponses.innerHTML = "" // Vide la liste

  questionCourante.reponses.forEach((rep, index) => {
    const li = document.createElement('li')
    li.textContent = rep
    li.addEventListener('click', () => {
    verifierReponse(index)
    })
    listeReponses.appendChild(li)
  })
}

// ── TODO : verifierReponse ───────────────────

const verifierReponse = (indexChoisi) => {
// Cette fonction est appelée quand une apprenante clique sur une réponse.
// Elle reçoit en paramètre l'index de la réponse choisie (0, 1, 2 ou 3).

  const reponses = document.querySelectorAll('#liste-reponses li')
//   1. Récupérer la question courante
  const questionCourante = questions[indexCourant]
  const indexBonneReponse = questionCourante.bonneReponse

//   2. Désactiver tous les boutons de réponse
  reponses.forEach(li => {
    li.style.pointerEvents = 'none'
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
  btnSuivant.classList.remove('cache')
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
  indexCourant = 0
  score = 0
  afficher(ecranQuestion)
  afficherQuestion()
})

//   - btn-suivant   → passer à la question suivante ou aux résultats

btnSuivant.addEventListener('click', () => {
  if (indexCourant === questions.length - 1) {
    afficherResultats()
  } else {
    indexCourant++
    afficherQuestion()
  }
})

//   - btn-rejouer   → remettre indexCourant et score à 0, revenir à l'accueil

btnRecommencer.addEventListener("click", () =>{
  indexCourant =0
  score = 0
  afficher(ecranAccueil)
})