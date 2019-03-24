# Peinture non-morte

## Introduction et contexte

Ce projet vise à créer une escape room composée de quelques énigmes en utilisant uniquement un téléphone en entrée et des enceintes 5.1 en sortie afin de produire du son spatialisé.
Le Musée d'Art de Nantes nous a confié ce projet en nous proposant de répondre à la problématique suivante :

*Comment attirer et motiver les enfants et les adolescent à venir au musée pendant leur temps libre tout en leur permettant d'apprendre des choses sur l'art ?*

Ce projet a vu le jour lors du [ICreate 2019](https://projeticreate2019.wixsite.com/icreate19?fbclid=IwAR3sZtT69xuDUp60zoIqp_Ut2Em7cNhtB9y3uWBsRF6w7pOj3tiniH10_LM), une compétition de créativité et de développement rassemblant des élèves de l'école polytechnique de l'université de Nantes, de L'école de design Nantes Atlantique ainsi Audencia SciencesCom.

## Objectifs et énigmes proposés

Les énigmes sont centrées autour du tableau [L'Oiseleur accordant sa guitare (1757) de Jean-Baptiste Greuze](https://fr.wikipedia.org/wiki/Jean-Baptiste_Greuze).
Chaque énigme permet d'en apprendre plus sur le tableau afin d'en déceler le sens caché.

Les programmes qui composent ce projet permettent de mettre en place 5 énigmes :
- Sortir le téléphone d'un endroit sombre (boîte au centre d'une pièce)
- Scanner un tag NFC posé de préférence sur une guitare puis agiter le téléphone afin de jouer un son de guitare.
- Scanner 4 tags NFCs répartis sur divers objets (avec des tags piégés)
- Recomposer un code de cadenas diffusé de façon séquentiel via des sons spatialisés
- Retrouver l'auteur du tableau en *swapant* de gauche à droite des portraits et en reposant le téléphone dans un endroit sombre pour valider et terminer le jeu.

Chaque énigme est entrecoupée de séquences narratives audio permettant de faire avancer l'histoire.
Il y a également divers sons d'ambiance lors de la résolution d'énigme en lien avec l'énigme et l'histoire du tableau.
Cette escape game peut être parcouru par des groupes de 2-3 personnes.

## Installation

### Serveur de gestion du son

### Application android

#### Installation directe

L'application peut être retrouvée sous ce [dossier](./SM_ART/).
Afin d'installer l'application vous pouvez utiliser directement l'APK fourni dans le [dossier correspondant](./SM_ART/apk), ensuite vous pouvez suivre le tutoriel [suivant](https://www.wondershare.com/fr/mobile-phone/installer-android-application.html) pour l'installer sur un téléphone  .

Attention, votre téléphone doit être muni de la technologie NFC.

#### Installation à partir des sources

Si vous souhaitez construire l'application par vous même il vous faut d'abord vous procurer [node js](https://nodejs.org/en/).

Ensuite ans le [dossier de l'application](./SM_ART), lancer la commande suivante :
```bash
npm install
```

Après cette étape il vous faudra également compiler le code en utilisant react-native, pour cela vous pouvez suivre le [tutoriel suivant](https://facebook.github.io/react-native/docs/running-on-device) afin de compiler le code.

Et finalement si vous souhaitez produire une version signée de l'application vous pouvez suivre [ce tutoriel](https://facebook.github.io/react-native/docs/signed-apk-android).

### Scène

## Utilisation

Après avoir installé les programmes nécessaires et mis en place la scène, suivez les étapes suivantes afin de démarrer l'escape game :
- Lancez le serveur  via la commande ```python3 server.py``` sur un ordinateur puis relevez l'adresse IP affichée dans la console.
- Lancez l'application et utilisez le menu de configuration pour entrer l'adresse IP du serveur, vous devez aussi reconfigurer les IDs des tags NFC liés aux énimges via le menu *Tags*.
- Ensuite vous pouvez lancer directement la partie via le bouton "lancer la partie", attention , une fois lancé vous avez 3 secondes pour placer le téléphone dans l'endroit sombre de la première étape.
- Le jeu boucle sur lui même, une fois la dernière étape réalisé, le jeu retournera à la première étape.

## Auteurs

- Cuadros Nicolas
- Marjault Antoine
- Montagné Clara
- Manoury Jules
- Sannequin Violette
- Guillaume Graff