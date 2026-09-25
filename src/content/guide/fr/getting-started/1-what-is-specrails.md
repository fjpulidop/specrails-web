<!-- guide-revision: mission-first-v1 -->

# Découvrir Specrails

Specrails est un espace de travail local pour transformer une idée en spec précise, en implémentation coordonnée et en livraison vérifiable. Commencez par une mission ; le Board permet de gérer directement le même backlog.

## Votre premier parcours

Installez l’application et authentifiez un fournisseur. Ajoutez le projet et ses dépôts, ouvrez une mission et décrivez le résultat attendu. Vérifiez la spec, choisissez un loop et examinez les preuves avant d’accepter chaque livraison.

Une mission peut aussi explorer le code, utiliser le navigateur et observer des processus. La spec définit ce qui doit changer ; le loop définit comment travailler. Claude, Codex, Gemini et Kimi ont des capacités distinctes. Les appels aux fournisseurs et intégrations peuvent transmettre du contexte et entraîner des frais.

## Ce qui s’exécute où

Specrails est une seule application. Desktop inclut son moteur, **Specrails Core** : quand vous ajoutez un projet, Desktop utilise Core pour préparer les fichiers de workflow dont votre fournisseur a besoin, et les loops intégrés Implement et Batch Implement s’appuient sur Core pour planifier, développer, vérifier et relire la modification avant de rendre le résultat à Desktop. Desktop gère tout le reste : missions, Board, worktrees, commits, pull requests et historique.

## Core est intégré à Desktop

Core n’est pas un produit à part. Vous ne l’installez pas, ne le lancez pas depuis un terminal et ne l’ajoutez pas à vos dépôts. Desktop en inclut une version testée ; **Paramètres de Desktop → Mises à jour → Specrails Core** affiche la version utilisée et applique les mises à jour de Core à tous vos projets.

Cette documentation décrit le produit actuel. Vérifiez votre version si une commande manque.

[Première mission](/docs/missions-first-mission).
