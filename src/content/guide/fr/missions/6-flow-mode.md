<!-- guide-revision: mission-first-v1 -->

# Flow : construire d’abord, la spec ensuite

**Nouveau.** Flow vous permet de construire du code qui fonctionne avec un agent avant de savoir exactement ce que vous voulez. Vous parlez à l’agent dans la conversation de la mission, il écrit et exécute du vrai code dans un worktree isolé, et aucune spec n’est nécessaire au départ. Quand le résultat est le bon, vous dites **C’est ça**, et un rail dérive la spec et livre le travail comme d’habitude.

## Flow pour découvrir, Implement pour déléguer

Utilisez [Implement](/docs/pipeline-rails-and-jobs) quand vous savez déjà décrire le changement : règles, critères d’acceptation, une API ou un modèle de données. Validez une spec et confiez-la à un rail.

Utilisez Flow quand la forme n’est pas encore claire : quelque chose d’exploratoire ou de visuel, une idée à essayer avant de s’engager. Vous découvrez le résultat en le construisant ensemble, et la spec est rédigée à partir de ce que vous avez construit.

## Démarrer un Flow depuis la mission

Inutile de demander Flow par son nom. Quand vous décrivez quelque chose d’exploratoire (« je veux essayer… », « je ne sais pas à quoi ça doit ressembler »), la mission affiche une carte avec deux chemins : **Flow**, pour le construire ensemble maintenant, et **Spec + Implement**, pour valider d’abord une spec. La carte indique le chemin recommandé et explique pourquoi en une phrase. L’autre chemin reste à un clic, et l’agent n’insiste pas si vous le choisissez ou appuyez sur **Pas maintenant**.

Choisir Flow ouvre une confirmation : Specrails crée un worktree isolé où l’agent peut écrire du code, et votre branche principale n’est pas modifiée. Appuyez sur **Démarrer le Flow**. Une spec provisoire apparaît sur le board avec l’étiquette **En Flow** ; cliquez dessus pour revenir à la mission.

## Gardez le contrôle pendant la construction

La conversation change d’aspect et une barre Flow apparaît au-dessus du compositeur. Elle affiche la branche du worktree, les fichiers modifiés avec les lignes ajoutées et supprimées, et le coût réel du Flow tel que facturé par le fournisseur (jamais une estimation).

- **Voir les modifications** liste chaque fichier modifié avec son statut et ses +/−.
- **Pause** arrête l’agent et conserve le worktree et la spec. La mission propose alors **Reprendre le Flow**, même après un redémarrage de l’app.
- **Abandonner** supprime le worktree, sa branche et la spec provisoire, après confirmation.
- **Interrompez à tout moment** : écrivez pendant que l’agent travaille et votre message interrompt l’étape en cours. Le bouton d’envoi devient un éclair et l’agent repart aussitôt avec vos nouvelles informations.

Flow n’écrit que dans son worktree ; hors Flow, les missions restent en lecture seule. Une mission a un seul Flow à la fois.

## Dites « C’est ça »

Quand le résultat vous convient, appuyez sur **C’est ça**. La barre Flow disparaît et la carte de lancement de rail habituelle apparaît, avec la boucle **Flow → Spec** présélectionnée et un rail libre choisi pour vous. Ajustez le moteur, le modèle ou l’effort si besoin et appuyez sur **Lancer**. Si la limite de revue ou un budget est atteint, la carte l’indique et ne lance rien. **Pas encore** vous ramène au Flow.

La boucle Flow → Spec dérive la spec Specrails et le changement OpenSpec à partir de ce que vous avez construit, les vérifie et les relit, archive le changement et livre comme toute exécution. La carte de livraison apparaît dans la mission, et le [dossier de revue](/docs/missions-review-and-delivery) montre quelle part du changement la spec dérivée explique.

## Jira seulement à la livraison

Jira ne reçoit rien pendant le Flow ni si vous l’abandonnez. Dans les projets connectés à [Jira](/docs/integrations-jira-integration), le ticket n’est créé que lorsque la livraison arrive en revue, déjà complet avec la spec dérivée, et passe directement au statut associé à la revue.

## Prérequis

Flow est disponible à partir de la version de Specrails Desktop qui l’introduit, et il nécessite que le Specrails Core intégré à Desktop prenne en charge Flow. Si **Démarrer le Flow** est désactivé, la carte liste ce qui manque ; mettez à jour Specrails Core depuis **Paramètres de Desktop → Mises à jour → Specrails Core**. Le coût de Flow apparaît dans Analytics comme surface à part, **Flow**.
