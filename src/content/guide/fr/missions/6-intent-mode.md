<!-- guide-revision: mission-first-v1 -->

# Intent : dites le problème, pas la solution

**Intent** est la façon de démarrer un travail dans Specrails. Au lieu d’écrire une solution, vous écrivez l’**intent** : le problème, le résultat recherché, comment vous saurez que ça a marché, qui et quoi est concerné, les limites et ce que personne ne sait encore. Specrails en dérive la spec, et vous relisez la spec au lieu de l’écrire. (Intent est le nouveau nom de ce qui s’appelait Flow, et il conserve tout ce que Flow savait faire.)

## L’intent

Un intent a six parties, et aucune pour la solution :

| Partie | Ce qu’elle contient |
| --- | --- |
| **Problème** | Ce qui ne va pas aujourd’hui, pour qui, et quand cela fait mal |
| **Résultat recherché** | Ce qui est vrai une fois résolu, avec une hypothèse facultative |
| **Comment nous le saurons** | Signaux observables ; ils deviennent des critères d’acceptation |
| **Qui et quoi est concerné** | Personnes, écrans ou systèmes |
| **Contraintes** | Limites que toute solution doit respecter |
| **Questions ouvertes** | Ce que personne ne sait encore ; les agents enquêtent au lieu de deviner |

Si vous nommez une solution (« ajouter un cache Redis »), l’intent garde son but (« l’API répond en moins de 200 ms ») comme résultat. Votre solution devient une contrainte si vous l’exigez, ou une question ouverte si c’est une option parmi d’autres. Un intent reste dans Specrails et n’est jamais envoyé à Jira.

## D’où vient un intent

- **Dans une mission.** Quand vous décrivez un travail, l’agent vous interroge sur les utilisateurs, les limites et la façon de savoir que ça a marché, puis affiche une carte **Intent** avec toutes les parties et, si la demande est ambiguë, deux lectures possibles. Cliquez sur une lecture ou répondez avec vos mots.
- **Dans Ajouter une spec.** **Intent** est le premier mode et s’ouvre par défaut. Décrivez le problème, appuyez sur **Générer l’intent et la spec** et relisez les deux. Voir les [modes d’Ajouter une spec](/docs/specs-specs-and-the-backlog).

Tout agent qui travaille sur la spec reçoit d’abord l’intent, comme source de vérité du pourquoi et du résultat, jamais du comment. Quand un rail livre une spec qui a un intent, il est écrit sous le nom `intent.md` dans le changement OpenSpec, donc il vit dans Git à côté du code.

## Explorer ou Déléguer

Un intent validé propose deux chemins égaux. Aucun n’est recommandé ; vous choisissez.

- **Explorer** le construit avec un agent dans une session Intent isolée. Quand le résultat est le bon, un rail dérive la spec de ce que vous avez construit. À utiliser quand la forme n’est pas encore claire : quelque chose d’exploratoire ou de visuel.
- **Déléguer** demande à l’agent de rédiger la spec à partir de l’intent. Vous la relisez et un rail la construit avec [Implement](/docs/pipeline-rails-and-jobs). À utiliser quand ce que vous voulez est déjà clair.

## Démarrer une session Intent

Choisissez **Explorer**. Une confirmation s’ouvre : Specrails crée un worktree isolé où l’agent peut écrire du code, et votre branche principale n’est pas modifiée. Appuyez sur **Démarrer l’Intent**. Une spec provisoire portant votre intent apparaît sur le board avec l’étiquette **En Intent** ; cliquez dessus pour revenir à la mission. Vous pouvez aussi démarrer n’importe quelle spec existante en Intent avec **Démarrer en Intent**, sur le board ou dans le détail de la spec.

## Gardez le contrôle pendant la construction

Une barre au-dessus du compositeur affiche la branche du worktree, les fichiers modifiés avec les lignes ajoutées et supprimées, et le coût réel facturé par le fournisseur (jamais une estimation).

- **Voir les modifications** liste chaque fichier modifié avec son statut et ses +/−.
- **Suspendre l’Intent** arrête l’agent et conserve le worktree et la spec. La mission propose alors **Reprendre l’Intent**, même après un redémarrage de l’app.
- **Abandonner** supprime le worktree, sa branche et la spec provisoire, après confirmation. Une spec qui existait déjà revient exactement comme elle était.
- **Interrompez à tout moment** : écrivez pendant que l’agent travaille et votre message interrompt l’étape en cours.

Intent n’écrit que dans son worktree ; hors Intent, les missions restent en lecture seule. Une mission a un seul Intent à la fois.

## Remettre à un rail

Quand le résultat vous convient, appuyez sur **Remettre**. La ligne indique **Prêt à devenir une PR**, avec rail, moteur, modèle et effort déjà choisis. Ajustez-les si besoin et appuyez sur **Lancer**, ou sur **Pas encore** pour revenir. Si la limite de revue ou un budget est atteint, la ligne l’indique et rien n’est lancé.

Le rail dérive la spec et le changement OpenSpec à partir de ce que vous avez construit, les vérifie et les relit, archive le changement et livre comme toute exécution. La carte de livraison apparaît dans la mission, et le [dossier de revue](/docs/missions-review-and-delivery) montre quelle part du changement la spec dérivée explique. Si l’exécution échoue pour une raison technique, le travail revient intact dans l’Intent.

## Jira seulement à la livraison

Jira ne reçoit rien pendant l’Intent ni si vous l’abandonnez. Dans les projets connectés à [Jira](/docs/integrations-jira-integration), le ticket n’est créé que lorsque la livraison arrive en revue, déjà complet avec la spec dérivée.

## Prérequis

Intent nécessite que le Specrails Core intégré à Desktop le prenne en charge. Si **Démarrer l’Intent** est désactivé, la carte liste ce qui manque ; mettez à jour Specrails Core depuis **Paramètres de Desktop → Mises à jour → Specrails Core**. Le coût d’Intent apparaît dans Analytics comme surface à part, **Intent**.
