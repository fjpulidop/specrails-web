# Fournisseurs d'IA (Claude, Codex)

Specrails n'est lié à aucune IA en particulier. Chaque endroit de l'app qui dialogue avec une IA — Explore Spec, Quick spec, les rails, le chat, l'AI Edit, le bouton « Open AI CLI » du terminal — peut passer par l'un des deux fournisseurs de premier plan. Vous choisissez ceux qu'un projet utilise, et vous pouvez même changer de fournisseur tâche par tâche.

## Les deux fournisseurs

| Fournisseur | CLI | Édité par | Notes |
|---|---|---|---|
| **Claude** | `claude` | Anthropic | Le plus complet. Seul fournisseur pour les Agents (profils), les rails Freestyle et le Contract Refine. |
| **Codex** | `codex` | OpenAI | Nécessite codex `0.128.0+`. Lit ses serveurs MCP depuis votre fichier global `~/.codex/config.toml`. |

## Installer un fournisseur pour un projet

Lorsque vous ajoutez un projet, l'assistant de configuration vous demande quel(s) fournisseur(s) installer. Choisissez-en un, déroulez l'étape d'installation, et c'est terminé. À partir de là, le projet *possède* simplement ce fournisseur — vous n'avez plus jamais à y penser. Les specs, les rails, le chat et les analytics fonctionnent de la même façon quel que soit votre choix.

Si une CLI que vous voulez n'apparaît pas dans Ajouter un projet, c'est presque toujours parce qu'elle n'est pas installée ou absente de votre `PATH`. Installez-la, puis rouvrez Ajouter un projet.

## Installer plusieurs fournisseurs pour un même projet

Quelques points utiles à connaître sur les projets multi-fournisseurs :

- **Avec un seul fournisseur, rien ne change.** Si un projet n'a qu'un seul fournisseur, vous ne verrez jamais de sélecteur de fournisseur où que ce soit — l'app reste épurée et simple.
- **La barre latérale droite n'affiche que les sections prises en charge par tous les fournisseurs installés.** Comme les Agents (profils) sont un concept propre à Claude, la section **Agents** disparaît dès qu'un projet inclut un fournisseur autre que Claude. Tout le reste (Specs, Code, Analytics, Intégrations, Terminal, Chat) demeure.
- **Le choix des fournisseurs est verrouillé après la création.** Dans cette version, vous choisissez vos fournisseurs au moment d'ajouter le projet et vous ne pouvez plus les modifier ensuite depuis les Réglages. S'il vous faut une combinaison différente, créez un nouveau projet.

## Choisir un fournisseur à chaque invocation

Tout l'intérêt d'un projet multi-fournisseurs, c'est de choisir l'IA la plus adaptée à chaque tâche — sans toucher au moindre réglage global. Partout où une IA s'exécute, un petit sélecteur de fournisseur apparaît (uniquement lorsque le projet en compte plusieurs) :

- **Ajouter une spec** — un sélecteur de moteur vous permet d'Explorer ou de générer en Quick une spec avec le fournisseur de votre choix.
- **En-tête de rail** — choisissez le moteur de ce rail précis avant de le lancer.
- **Terminal** — le bouton « Open AI CLI » (Sparkles) ouvre un menu de fournisseurs pour basculer dans n'importe quelle CLI installée, dans le répertoire de ce projet.

Votre choix est mémorisé par projet, avec le fournisseur principal comme valeur par défaut, pour ne pas avoir à le refaire à chaque fois.

## Ce que seul Claude peut faire

Une poignée de fonctionnalités sont par nature propres à Claude : elles sont donc soit masquées, soit ignorées lorsqu'un autre fournisseur est en jeu :

- **Agents (profils)** — le catalogue d'agents par projet et le routage des modèles. Masqué sur tout projet incluant un fournisseur autre que Claude.
- **Rails Freestyle** — toujours exécutés sur Claude.
- **Contract Refine** — la passe supplémentaire « Contract Layer » sur une spec validée ne s'exécute que lorsque le fournisseur de la conversation est Claude.
- **Modes avancés d'Ajouter une spec** (SMASH / Contract Layer) — masqués pour les moteurs autres que Claude.

Tout le reste — Explore, Quick spec, le pipeline complet des rails, l'AI Edit, le chat, les analytics de coût — fonctionne avec les deux fournisseurs.

## Dépannage

- **Les serveurs MCP de Codex ne se chargent pas dans le chat.** Codex lit ses serveurs MCP depuis votre fichier global `~/.codex/config.toml` — enregistrez-les là avec `codex mcp add`.
