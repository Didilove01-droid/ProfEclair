/**
 * ProfÉclair - Logique interactive simple (JavaScript Vanilla pur)
 * Pas de framework, pas de dépendance externe.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Plan par défaut sélectionné
  let planActuel = 'gratuit';

  // Éléments du formulaire et de l'interface
  const declencheursPlan = document.querySelectorAll('.btn-declencheur-plan');
  const labelPlanChoisi = document.getElementById('labelPlanChoisi');
  const formulaire = document.getElementById('formulaireInscription');
  const messageErreur = document.getElementById('messageErreurForm');
  
  const champPrenom = document.getElementById('champPrenom');
  const champNom = document.getElementById('champNom');
  const champEmail = document.getElementById('champEmail');
  const checkPCT = document.getElementById('checkPCT');
  const checkMaths = document.getElementById('checkMaths');
  const badgeMathsBientot = document.getElementById('badgeMathsBientot');

  // Écrans
  const blocFormulaire = document.getElementById('blocFormulaireInscription');
  const ecranBienvenue = document.getElementById('ecranBienvenue');
  const affichagePrenom = document.getElementById('affichagePrenom');
  const noticePlanPayant = document.getElementById('noticePlanPayant');

  // Modale "Cette fonction arrive bientôt"
  const btnCreerPremiereFiche = document.getElementById('btnCreerPremiereFiche');
  const modaleBientot = document.getElementById('modaleBientot');
  const btnFermerModale = document.getElementById('btnFermerModale');

  /**
   * Dictionnaire des libellés de plans
   */
  const libellesPlans = {
    'gratuit': 'Plan Gratuit (0 FCFA)',
    'essentiel': 'Plan Essentiel (4 900 FCFA/mois)',
    'premium': 'Plan Premium (8 900 FCFA/mois)'
  };

  /**
   * Gestion du clic sur les boutons menant à l'inscription
   * ("Commencer gratuitement", "S'inscrire", "Choisir ce plan")
   */
  declencheursPlan.forEach(bouton => {
    bouton.addEventListener('click', (e) => {
      const planSelectionne = bouton.getAttribute('data-plan') || 'gratuit';
      planActuel = planSelectionne;

      if (labelPlanChoisi) {
        labelPlanChoisi.textContent = libellesPlans[planActuel] || libellesPlans['gratuit'];
      }

      // Si le formulaire était masqué par un précédent essai, on le réaffiche
      if (blocFormulaire && ecranBienvenue) {
        blocFormulaire.style.display = 'block';
        ecranBienvenue.style.display = 'none';
      }

      // Défilement fluide vers la section inscription
      const sectionInscription = document.getElementById('inscription');
      if (sectionInscription) {
        sectionInscription.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /**
   * Gestion de la case à cocher Mathématiques :
   * Affiche "Bientôt disponible" dès que la case est cochée.
   */
  if (checkMaths && badgeMathsBientot) {
    checkMaths.addEventListener('change', () => {
      if (checkMaths.checked) {
        badgeMathsBientot.style.display = 'inline-block';
      } else {
        badgeMathsBientot.style.display = 'none';
      }
    });
  }

  /**
   * Validation d'une adresse email simple et robuste
   */
  function validerEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  /**
   * Soumission du formulaire d'inscription
   */
  if (formulaire) {
    formulaire.addEventListener('submit', (e) => {
      e.preventDefault();

      // Récupération des valeurs
      const prenom = champPrenom.value.trim();
      const nom = champNom.value.trim();
      const email = champEmail.value.trim();
      const pctCoche = checkPCT.checked;
      const mathsCoche = checkMaths.checked;

      // Réinitialisation de l'erreur
      messageErreur.style.display = 'none';
      messageErreur.textContent = '';

      // 1. Vérification des champs obligatoires
      if (!prenom) {
        afficherErreur('Veuillez renseigner votre prénom.');
        champPrenom.focus();
        return;
      }

      if (!nom) {
        afficherErreur('Veuillez renseigner votre nom.');
        champNom.focus();
        return;
      }

      if (!email) {
        afficherErreur('Veuillez renseigner votre adresse e-mail.');
        champEmail.focus();
        return;
      }

      // 2. Vérification du format de l'e-mail
      if (!validerEmail(email)) {
        afficherErreur('Veuillez entrer une adresse e-mail valide (ex. prof@exemple.bj).');
        champEmail.focus();
        return;
      }

      // 3. Vérification qu'au moins une matière est cochée
      if (!pctCoche && !mathsCoche) {
        afficherErreur('Veuillez sélectionner au moins une matière d’enseignement (PCT ou Mathématiques).');
        return;
      }

      /* ======================================================================
         TODO: Emplacement pour l'enregistrement réel plus tard :
         - Appel vers une API后端 (ex: fetch('/api/inscription', { ... }))
         - Sauvegarde dans la base de données
         - Envoi de l'e-mail de confirmation
         Pour l'instant, aucune donnée n'est envoyée ni sauvegardée.
         ====================================================================== */

      // Masquage du formulaire et affichage de l'écran de bienvenue
      blocFormulaire.style.display = 'none';
      ecranBienvenue.style.display = 'block';

      // Personnalisation de l'accueil avec le prénom
      if (affichagePrenom) {
        affichagePrenom.textContent = prenom;
      }

      // Affichage du message spécifique si la personne a cliqué sur un plan payant
      if (noticePlanPayant) {
        if (planActuel === 'essentiel' || planActuel === 'premium') {
          noticePlanPayant.style.display = 'block';
        } else {
          noticePlanPayant.style.display = 'none';
        }
      }

      // Faire défiler jusqu'à l'écran de bienvenue
      ecranBienvenue.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function afficherErreur(message) {
    if (!messageErreur) return;
    messageErreur.textContent = message;
    messageErreur.style.display = 'block';
  }

  /**
   * Action : "Créer ma première fiche" -> Affiche "Cette fonction arrive bientôt"
   */
  if (btnCreerPremiereFiche && modaleBientot) {
    btnCreerPremiereFiche.addEventListener('click', () => {
      modaleBientot.classList.add('active');
    });
  }

  /**
   * Fermeture de la modale "Cette fonction arrive bientôt"
   */
  if (btnFermerModale && modaleBientot) {
    btnFermerModale.addEventListener('click', () => {
      modaleBientot.classList.remove('active');
    });

    // Fermeture lors d'un clic en dehors de la boîte
    modaleBientot.addEventListener('click', (e) => {
      if (e.target === modaleBientot) {
        modaleBientot.classList.remove('active');
      }
    });
  }

  /**
   * Liens internes avec défilement fluide
   */
  const liensInternes = document.querySelectorAll('a[href^="#"]');
  liensInternes.forEach(lien => {
    lien.addEventListener('click', (e) => {
      const cibleId = lien.getAttribute('href');
      if (cibleId && cibleId !== '#') {
        const cibleElement = document.querySelector(cibleId);
        if (cibleElement) {
          e.preventDefault();
          cibleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
