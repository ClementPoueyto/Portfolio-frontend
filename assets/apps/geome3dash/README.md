
![Geome3Dash](https://raw.githubusercontent.com/ClementPoueyto/ThePlaceToBe/master/assets/readme/title.png?token=ABFT774HQYKX3RX3DIHAEAK6NFSVG)

<div align="center">
  <em>Projet du concours Games On Web sur le thème The Place To Be</em>
</div>
  
### Demo Youtube (35s)

[![Youtube video](https://img.youtube.com/vi/n-IKwEWwW_I/2.jpg)](https://youtu.be/n-IKwEWwW_I)


### Jouer au jeu

URL : [https://clementpoueyto.github.io/gamesonweb/](https://clementpoueyto.github.io/gamesonweb/)
 ou [https://www.clementpoueyto.fr/apps/geome3dash/index.html](https://www.clementpoueyto.fr/apps/geome3dash/index.html)

Un tutoriel est disponible dans le répertoire "doc" ainsi que dans le niveau 1.

## Thème : "The Place To Be"

Pour ce projet de jeu sur navigateur, nous souhaitions réaliser un jeu de type *runner* inspiré du célèbre
jeu mobile "Geometry Dash". En accord avec le thème <b>The Place To Be</b>, le but de tous les niveaux du jeu est
d'amener un élément dans son environnement de prédilection (ex: une boule de papier dans une corbeille, un ballon dans des cages de foot...)

Le but du jeu est d'atteindre la fin du niveau en évitant ou en utilisant les obstacles.
Vous controlez une sphère qui doit se rendre dans un lieu particulier.

# Plan
- [Présentation de l'équipe](#Présentation-de-léquipe)
- [The place to be](#The-place-to-be)
- [Développement](#Développement)
- [Nos sources](#nos-sources)
- [Remerciements](#remerciements)


# Présentation de l'équipe

## Membres

| Prénom        | Nom           | Filière  | Passion            |
| ------------- | ------------- | :------: | ------------------ |
| Clément       | Poueyto       | SI3      | :running:          |
| Antoine       | Blaud         | ELEC3    | :guitar:           |
| Antoine       | Facq          | SI3      | :musical_keyboard: |

## Notre histoire

Etudiants en PEIP à Sophia-Antipolis où nous nous sommes rencontrés autour de notre passion commune pour l'informatique,
nous avons été amenés à souvent travailler ensemble à l'occasion de nombreux projets. Nous avons notamment participé
à la **Google Hashcode** 2019. Aujourd'hui, c'est à l'occasion de cet évènement Games On Web que nous retrouvons notre
équipe au complet ! :grinning:

## Idée du projet

Notre idée initiale était de créer un jeu de plateforme inspiré du jeu "Géometry Dash" tout en respectant le thème donné.
Pour profiter du potentiel de l'outil Babylon js, nous souhaitions réaliser un jeu en 3D contrairement au jeu de base.
Après plusieurs développement de versions du jeu, nous nous sommes éloignés de l'idée initiale pour créer un jeu qui nous correspondait davantage.

**Première version :**

![Version 1 du projet](https://raw.githubusercontent.com/ClementPoueyto/ThePlaceToBe/master/assets/readme/version1.PNG?token=ABFT777GH6BSQ4GYVSLWRXK6NFSXA)

En effet, la vue sur le coté était plus proche du jeu é"Geometry Dash" mais pour un environnement en 3D il était difficile de se déplacer
en profondeur et de prévoir la position de la sphère.

**Version finale :**
![Version finale du projet](https://raw.githubusercontent.com/ClementPoueyto/ThePlaceToBe/master/assets/readme/version2.PNG?token=ABFT775UVZFCVH5N6T5GY7S6NFSY4)


# The place to be

Au vu du thème de ce concours, nous voulions créer différents décors incarnant chacun le thème à leur manière. L'objectif est
d'amener le joueur représentant un objet dans son milieu de prédilection.

Pour le premier décor, le joueur symbolisé par un déchet, doit rejoindre une poubelle au milieu de New York afin de le
sensibiliser à la propreté de sa ville. Ici, la poubelle symbolise "The place to be", et c'est là  le déchet devant être dans cette dernière où et non ailleurs.

Notre deuxième décor est une forêt; le joueur, cette fois-ci symbolisé par un oeuf, doit atteindre son nid ...

Voici un petit récapitulatif des environnements que nous nous sommes amusés à créer :


| Objet          | *The Place To Be*|
|---------------- |-----------------|
| :page_with_curl: Boule de papier | Corbeille            |
| :egg: Oeuf                       | Nid            |
| :bomb: Boulet de canon | Tonneau |
| :soccer: Ballon | Cages de foot  |

# Développement

## Les différents fichiers

Le projet comporte 3 dossiers principaux: le dossier "js" contient les scripts permettant de faire tourner le jeu, le dossier css contient les fichiers de description de la version mobile et ordinateur, enfin le dossier "assets" comporte les images, textures, et modèles 3D que le jeu utilise.
L'execution du jeu se fait via le fichier "index.html".
Le repertoire "doc" contient les livrables attendus pour le concours.

## Spécification techniques

Pour ce projet les langages utilisés sont : HTML, CSS et JavaScript.

**La physique :**

Au cours du développement nous avons testé et utilisé les différents moteurs physiques présents dans la documentation de Babylon.

Cependant, nous avons gardé "Cannon.js" car il s'agissait du moteur physique qui répondait le mieux aux actions de l'utilisateur et aux 
interactions entre les différents objets du jeu.
Cannon.js permet principalement de gérer la gravité ainsi que les collisions.
 
 **Les scenes :**

Notre projet comporte deux scènes principales :
- une pour afficher le menu au lancement du jeu
- une autre pour générer et afficher le
niveau séléctionné par le joueur.

*Menu du jeu :*

![Menu](https://raw.githubusercontent.com/ClementPoueyto/ThePlaceToBe/master/assets/readme/menu.PNG?token=ABFT7723NQFRQXFV3S4ERCS6NFSMU)

**Les niveaux :**

Les niveaux sont construits à l'aide de la classe MapEngine qui nous permet de génerer des map facilement.
Nous avons programmé une vingtaine de paramètres modifiables uniquement pour la génération de la map. C'est en autre grâce à cela qu'on peut générer la map du niveau infini sans difficultés.

En effet en modifiant la probabilité d'apparition de certaines plateformes, nous pouvons générer une infinité de niveaux différents en utilisant une chaine "String" grâce à un systeme de "seed".

Voici les différents rôles des blocks spéciaux qui garnissent la plateforme :
![Roles blocks](https://raw.githubusercontent.com/ClementPoueyto/ThePlaceToBe/master/assets/images/menu/instructions.png?token=ABFT774MSZL3TOANGDCRSPC6NFOPO)

**La musique :**

La musique a été composée par notre équipe. Nous avons essayé de faire quelque chose qui ressemblait à une musique de
jeux d'arcades (dynamique, électro mais dans le fond simple). 

**Blender (modélisation) :**

Blender nous a permis de modéliser les quelques dessins 3D que l'on trouve dans le jeu (ville, bateau, etc...)

Avec l'utilisation de OpenStreetMap, nous avons été en mesure d'exporter les données des batiments de la ville de New York dans Blender.

Pour des raisons de performances, nous n'avons pu mettre que très peu de modèles, ce qui est regrettable
dans la mesure où nous étions prêts à étayer les décors des niveaux avec tous les modèles que nous avions créé.

**Substance Painter (baking) :**

Substance painter nous a permis de colorier les modèles 3D. Pour être en accord avec nos modèles très simples, nous n'avons pas retravaillé les détails afin de conserver une certaine cohérence; nous nous sommes contentés de nous rapprocher des couleurs réelles mais sans détails observés dans la vrai vie.

**Cookies (sauvegarde de la progression) :**

Les cookies nous permettent de sauvegarder le score du joueur sur les différents niveaux, mais aussi de marquerles niveaux terminés.
Cela a un role fondamental pour que le joueur puisse estimer sa progression et savoir où il en est du jeu.

**Version mobile :**

Nous avons crée un fichier css afin de permettre la jouabilité sur smartphone via le navigateur web.
Sur smartphone, 3 nouvelles touches apparaissent et permettent respectivement de : 
- se déplacer à gauche
- sauter
- se déplacer à droite.

Selon le smartphone il est conseillé d'activer le "mode performance"

*Screenshot d'un smartphone*

<img src="https://raw.githubusercontent.com/ClementPoueyto/ThePlaceToBe/master/assets/readme/mobile1.jpg?token=ABFT777RF4EON2TO6VYPEJS6NFSQO" width="50%" display="inline"><img src="https://raw.githubusercontent.com/ClementPoueyto/ThePlaceToBe/master/assets/readme/mobile2.jpg?token=ABFT776NNMFQXGI2J7HILHS6NFSRS" width="50%">


## Nos sources
Pour les graphismes, nous avons utilisé des textures libres de droit; le fichier de la création d'abres a été récupéré via la 
documentation de Babylon.
Toutes les autres ressources externes à Babylon ont été créés par notre équipe.

## Remerciements

Nous tenons à rajouter cette section afin de remercier toute l'équipe organisatrice du concours ainsi que CGI pour cette aventure.
Merci à Michel Buffa pour l'organisation ainsi que son aide sur le Slack et merci à Sebastien Vandenberghe pour le temps consacré et l'aide précieuse qu'il nous a accordés.

#

Merci à vous également d'avoir lu la description de notre projet ! :palm_tree:

