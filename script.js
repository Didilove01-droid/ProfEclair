/**
 * ProfÉclair - Logique de la page d'accueil (JavaScript simple, sans framework)
 */

/* ==========================================================================
   1. RÉGLAGES À MODIFIER FACILEMENT
   ========================================================================== */
const CONFIG = {
  // Numéro WhatsApp qui reçoit les réservations (format international, sans + ni espaces).
  numeroWhatsApp: '22944803605',

  // Facultatif : adresse d'un service qui enregistre les inscriptions
  // (Google Sheets via Apps Script, Formspree, etc.). Laisser vide si non utilisé.
  adresseEnregistrement: '',

  // Facultatif : identifiant du Pixel Meta (publicité Facebook). Laisser vide si non utilisé.
  pixelMetaId: ''
};

/* ==========================================================================
   2. FONCTIONNEMENT DE LA PAGE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const LIBELLES_PLANS = {
    gratuit: 'Gratuit (0 FCFA)',
    essentiel: 'Essentiel (4 900 FCFA/mois)',
    premium: 'Premium (8 900 FCFA/mois)'
  };
  let planActuel = 'gratuit';

  const $ = (id) => document.getElementById(id);
  const formulaire = $('formulaireInscription');
  const messageErreur = $('messageErreurForm');
  const blocFormulaire = $('blocFormulaireInscription');
  const ecranBienvenue = $('ecranBienvenue');
  const sectionInscription = $('inscription');
  const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function allerVers(element) {
    element.scrollIntoView({ behavior: mouvementReduit ? 'auto' : 'smooth', block: 'start' });
  }

  function lienWhatsApp(message) {
    return 'https://wa.me/' + CONFIG.numeroWhatsApp + '?text=' + encodeURIComponent(message);
  }

  /* ---------- Pixel Meta (chargé seulement si un identifiant est renseigné) ---------- */
  if (CONFIG.pixelMetaId) {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', CONFIG.pixelMetaId);
    window.fbq('track', 'PageView');
  }

  /* ---------- Liens de contact WhatsApp ---------- */
  const lienContact = $('lienContactWhatsApp');
  if (lienContact) {
    if (CONFIG.numeroWhatsApp) {
      lienContact.href = lienWhatsApp('Bonjour, j\'ai une question sur ProfÉclair.');
    } else {
      lienContact.parentElement.hidden = true;
    }
  }

  /* ---------- Tarifs : bouton « Voir tout » (téléphone) ---------- */
  document.querySelectorAll('.btn-voir-tout').forEach((bouton) => {
    bouton.addEventListener('click', () => {
      const carte = bouton.closest('.carte-plan');
      const ouvert = carte.classList.toggle('ouvert');
      bouton.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
      bouton.textContent = ouvert ? 'Voir moins' : 'Voir tout';
    });
  });

  /* ---------- Boutons menant à l'inscription ---------- */
  document.querySelectorAll('.btn-declencheur-plan').forEach((bouton) => {
    bouton.addEventListener('click', (e) => {
      e.preventDefault();
      planActuel = bouton.dataset.plan || 'gratuit';
      $('labelPlanChoisi').textContent = LIBELLES_PLANS[planActuel];
      if (!dejaInscrit()) {
        blocFormulaire.hidden = false;
        ecranBienvenue.hidden = true;
      }
      allerVers(sectionInscription);
    });
  });

  /* ---------- Liens internes ---------- */
  document.querySelectorAll('a[href^="#"]:not(.btn-declencheur-plan)').forEach((lien) => {
    lien.addEventListener('click', (e) => {
      const cible = lien.getAttribute('href');
      if (!cible || cible === '#') return;
      const element = document.querySelector(cible);
      if (element) {
        e.preventDefault();
        allerVers(element);
      }
    });
  });

  /* ---------- Case Mathématiques ---------- */
  const checkMaths = $('checkMaths');
  const badgeMaths = $('badgeMathsBientot');
  checkMaths.addEventListener('change', () => { badgeMaths.hidden = !checkMaths.checked; });

  /* ---------- Formulaire ---------- */
  const CLE_STOCKAGE = 'profeclair_inscription';

  function lireInscription() {
    try { return JSON.parse(localStorage.getItem(CLE_STOCKAGE)); } catch (e) { return null; }
  }
  function dejaInscrit() { return !!lireInscription(); }

  function afficherErreur(message, champ) {
    messageErreur.textContent = message;
    messageErreur.style.display = 'block';
    if (champ) champ.focus();
  }

  function afficherConfirmation(inscription) {
    $('affichagePrenom').textContent = inscription.prenom;
    const bouton = $('btnConfirmerWhatsApp');
    if (CONFIG.numeroWhatsApp) {
      const message = 'Bonjour, je suis ' + inscription.prenom + ' ' + inscription.nom +
        ', enseignant(e) de ' + inscription.matieres.join(' et ') +
        '. Je réserve mon accès anticipé à ProfÉclair. Formule qui m\'intéresse : ' +
        LIBELLES_PLANS[inscription.plan] + '.';
      bouton.href = lienWhatsApp(message);
    } else {
      bouton.hidden = true;
      $('texteConfirmation').textContent = 'Vous serez prévenu dès l\'ouverture du générateur PCT.';
    }
    blocFormulaire.hidden = true;
    ecranBienvenue.hidden = false;
  }

  // Si la personne s'est déjà inscrite sur cet appareil, on réaffiche la confirmation.
  const inscriptionExistante = lireInscription();
  if (inscriptionExistante) afficherConfirmation(inscriptionExistante);

  formulaire.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageErreur.style.display = 'none';

    const champPrenom = $('champPrenom');
    const champNom = $('champNom');
    const champTelephone = $('champTelephone');
    const champEmail = $('champEmail');
    const prenom = champPrenom.value.trim();
    const nom = champNom.value.trim();
    const telephone = champTelephone.value.trim();
    const email = champEmail.value.trim();
    const matieres = [];
    if ($('checkPCT').checked) matieres.push('PCT');
    if (checkMaths.checked) matieres.push('Mathématiques');

    if (!prenom) return afficherErreur('Indiquez votre prénom.', champPrenom);
    if (!nom) return afficherErreur('Indiquez votre nom.', champNom);
    if (telephone.replace(/\D/g, '').length < 11) {
      return afficherErreur('Indiquez votre numéro WhatsApp complet, avec l\'indicatif (ex. +229 01 97 00 00 00).', champTelephone);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return afficherErreur('Indiquez une adresse e-mail valide (ex. prof@exemple.com).', champEmail);
    }
    if (matieres.length === 0) return afficherErreur('Cochez au moins une matière.');

    const inscription = { prenom, nom, telephone, email, matieres, plan: planActuel, date: new Date().toISOString() };

    const bouton = $('btnValiderInscription');
    const libelle = bouton.querySelector('.btn-libelle');
    bouton.disabled = true;
    libelle.textContent = 'Envoi en cours…';

    // Envoi vers le service d'enregistrement, s'il est configuré.
    if (CONFIG.adresseEnregistrement) {
      try {
        await fetch(CONFIG.adresseEnregistrement, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(inscription)
        });
      } catch (erreur) {
        bouton.disabled = false;
        libelle.textContent = 'Réserver mon accès anticipé';
        return afficherErreur('La connexion a échoué. Vérifiez votre réseau puis réessayez.');
      }
    }

    try { localStorage.setItem(CLE_STOCKAGE, JSON.stringify(inscription)); } catch (erreur) { /* stockage indisponible */ }
    if (window.fbq) window.fbq('track', 'Lead');

    bouton.disabled = false;
    libelle.textContent = 'Réserver mon accès anticipé';
    afficherConfirmation(inscription);
    allerVers(sectionInscription);
  });

  /* ---------- Barre d'action fixe (téléphone) ---------- */
  const barreMobile = $('barreMobile');
  const hero = document.querySelector('.hero');
  if (barreMobile && 'IntersectionObserver' in window) {
    const visibles = new Set();
    const observateur = new IntersectionObserver((entrees) => {
      entrees.forEach((entree) => {
        if (entree.isIntersecting) visibles.add(entree.target); else visibles.delete(entree.target);
      });
      // Masquée tant que l'accueil ou le formulaire est à l'écran.
      barreMobile.classList.toggle('visible', visibles.size === 0);
    }, { threshold: 0.05 });
    observateur.observe(hero);
    observateur.observe(sectionInscription);
    observateur.observe(document.querySelector('.footer'));
  }

  /* ---------- Apparition douce au défilement ---------- */
  const elementsReveal = document.querySelectorAll('.reveal');
  if (mouvementReduit || !('IntersectionObserver' in window)) {
    elementsReveal.forEach((el) => el.classList.add('visible'));
  } else {
    const obsReveal = new IntersectionObserver((entrees) => {
      entrees.forEach((entree) => {
        if (entree.isIntersecting) {
          entree.target.classList.add('visible');
          obsReveal.unobserve(entree.target);
        }
      });
    }, { threshold: 0.12 });
    elementsReveal.forEach((el) => obsReveal.observe(el));
  }
});
