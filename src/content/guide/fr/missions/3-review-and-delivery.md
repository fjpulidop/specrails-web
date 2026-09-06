<!-- guide-revision: mission-first-v1 -->

# Examiner et accepter une livraison

Une implémentation fournit des changements et des preuves à examiner. Des tests de base réussis ne prouvent pas que la fonctionnalité demandée existe.

## Choisir l’action

Intégrer localement applique le travail à la branche d’intégration vérifiée. Checkout déplace la branche de travail dans le dossier local du dépôt ; ce n’est pas une acceptation de la spec. Une PR exige de vérifier dépôt, branche cible et diff. Un worktree est un checkout Git isolé, pas un espace hébergé par GitHub.

## Préserver les résultats partiels

Pour plusieurs dépôts, examinez chaque livraison, y compris les résultats sans changement. L’intégration n’est pas une transaction atomique entre dépôts : ceux déjà acceptés restent enregistrés si une autre action échoue.

En cas de conflit ou de base modifiée, conservez vos changements locaux, lisez l’erreur et réessayez uniquement l’action restante. Ne supprimez pas un worktree pour masquer une carte. Une révision conserve le périmètre figé et le contexte de la livraison précédente.
