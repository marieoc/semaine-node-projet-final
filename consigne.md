# Le carnet d'adresses

## Objectif
Concevoir un carnet d’adresses avec Node JS et ExpressJs.

Les fonctionnalités attendues sont :

Visualiser la liste des contacts (nom et prénom), lorsque l'on clique sur un nom, on arrive sur une nouvelle page qui affiche le détail complet du contact.
Ajouter un contact
Modifier un contact
Supprimer un ou plusieurs contacts
Sur la page d'accueil, un petit gateau s'affiche à côté des contacts dont c'est le jour de l'anniversaire


Un contact contiendra comme informations :

Civilité
Nom
Prénom
Téléphone
Email
Date de naissance

## Contraintes Techniques

Nous choisissons d’enregistrer les contacts dans un fichier CSV, renseignez vous sur quel module NPM peut être utilisé pour faire cela.

Répartissez correctement le code (controller / routeur ... )

Organisez votre code de façon à répéter le moins de code possible. Il y a ici 2 pages à réaliser :

Accueil : affiche la liste des contacts déjà enregistrés
Ajout de contact : contient un formulaire d’ajout, à la validation, cela envoie une requête post qui ajoute un contact au fichier CSV