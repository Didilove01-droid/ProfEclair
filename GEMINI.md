# ProfÉclair : règles du projet

## Le projet
Application web (SaaS) pour les enseignants du secondaire au Bénin. Elle génère des fiches de situation d'apprentissage (version apprenant sans réponses, version enseignant avec réponses), des interrogations, des devoirs et des épreuves, avec corrigés et barèmes, adaptés au milieu local de l'enseignant. On commence par la PCT. Les mathématiques viennent ensuite et s'affichent "Bientôt disponible".

## L'utilisateur
Je suis débutant. Explique tout en français simple, étape par étape. Avant d'installer un outil ou de lancer une commande, dis-moi ce que tu vas faire et pourquoi.

## Technologies
HTML, CSS et JavaScript simples pour l'instant. Pas de framework tant que je ne le demande pas. Les fichiers doivent s'ouvrir directement dans le navigateur.

## Nom
L'application s'appelle ProfÉclair (avec É majuscule accentué). Dans le code et les adresses : profeclair.

## Charte de couleurs (à respecter strictement)
- Bleu marine profond #173A63 : dominante, fonds, titres sur fond clair.
- Terracotta #B66F4C : accent, boutons d'action, mots clés, puces, filets.
- Beige crème #F0E4D0 : fonds clairs, cartes.
- Blanc #FFFFFF : texte sur marine.
- Tons dérivés autorisés : marine foncé #0E2644, marine presque noir #0A1B31, marine clair #24507F, bleu lumière #3A6EA5, terracotta clair #D08A63, terracotta foncé #8E5236, cuivre lumineux #E3A27C, beige foncé #E2D1B5.
- Lisibilité : sur marine, texte blanc ou beige ; texte orange sur marine seulement en #D08A63 ou #E3A27C. Sur beige, texte marine ; petit texte orange en #8E5236.

## Contenu pédagogique
- N'invente jamais le format officiel ni les programmes. Utilise les fichiers du dossier docs/. S'ils manquent, crée un gabarit marqué PROVISOIRE et dis-le-moi.
- Chaque document généré porte la mention : "À vérifier par l'enseignant avant utilisation".
- Ne jamais écrire "illimité". N'invente ni témoignages ni chiffres.

## Façon de travailler
- Pour tout gros changement, explique d'abord ton plan.
- Avance par petites étapes que je peux tester.
- Ne modifie que ce que je demande. Ne supprime aucun fichier sans me le demander.
- Ne change aucune technologie (par exemple passer à Next.js) sans mon accord explicite : explique d'abord et attends ma réponse.
- Termine toujours en résumant ce que tu as fait et comment recharger la page.
- Aucune clé secrète dans le code : utilise un fichier .env.

## À ne pas construire maintenant
Comptes réels, base de données, paiement (KKiaPay ou FedaPay plus tard, Stripe n'est pas disponible dans mon pays), autres matières.

## Langue
Interface et réponses en français.
