import type { LanguageId } from "@/lib/i18n";
type Feature = {
  title: string;
  body: string;
};
export interface ProductCopy {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  explore: string;
  workflow: string;
  skip: string;
  theme: string;
  menu: string;
  learn: string;
  workflowTitle: string;
  workflowBody: string;
  steps: [Feature, Feature, Feature, Feature];
  featureTitle: string;
  featureIntro: string;
  features: Feature[];
  loopNote: string;
  companionTitle: string;
  companionBody: string;
  companionCta: string;
  companionNote: string;
  docsTitle: string;
  docsBody: string;
  closing: string;
  local: string;
}
const en: ProductCopy = {
  eyebrow: "YOUR WORKSPACE FOR AGENTIC SOFTWARE",
  title: "Start with a mission.",
  accent: "Ship with a plan.",
  intro:
    "Bring your idea, your repositories and your favorite agent. Specrails connects the conversation, the spec and the work — all the way to review.",
  explore: "Explore the product",
  workflow: "Workflow",
  skip: "Skip to content",
  theme: "Change color theme",
  menu: "Open menu",
  learn: "Explore the guide",
  workflowTitle: "A clear path from idea to implementation.",
  workflowBody:
    "A conversation gives direction. A spec makes the outcome concrete. Loops turn your development process into repeatable steps.",
  steps: [
    {
      title: "Start a mission",
      body: "Describe the outcome. Add project, file and browser context to the conversation.",
    },
    {
      title: "Make it a spec",
      body: "Define scope, acceptance criteria and the repositories involved in one shared backlog.",
    },
    {
      title: "Put it on Rails",
      body: "Run a built-in loop or design your own. Follow execution, dependencies and validation.",
    },
    {
      title: "Review and deliver",
      body: "Inspect changes and results. Choose how the implementation joins your project.",
    },
  ],
  featureTitle: "The context you need. The control you expect.",
  featureIntro:
    "Everything around the agent matters, too. Specrails keeps the tools for understanding and directing the work close at hand.",
  features: [
    {
      title: "One project, many repositories",
      body: "Keep a shared backlog for frontend, backend and more. Assign repository scope to specs and coordinate their jobs.",
    },
    {
      title: "A conversation that keeps moving",
      body: "Send more context during execution. Edit pending messages, remove them or steer the active agent when supported.",
    },
    {
      title: "Isolated work, deliberate delivery",
      body: "Use worktrees to keep implementations separate. Review the diff and choose the next step from the mission.",
    },
    {
      title: "See beyond the progress indicator",
      body: "Inspect job activity and process logs, including past runs. Stop a process and understand failures with the evidence in view.",
    },
    {
      title: "Show the agent what you mean",
      body: "Browse your app, select a region and annotate the capture. Attach visual context directly to the mission.",
    },
    {
      title: "Make room for focused work",
      body: "Detach a mission into its own Desktop window. Move between screens, then bring it back into the workspace.",
    },
    {
      title: "Explore the code behind the work",
      body: "Browse files across repositories, search code, inspect history and diffs, and generate a file summary to understand its role.",
    },
    {
      title: "Connect your existing workflow",
      body: "Use local specs and configured GitHub or Jira integrations. The Specrails MCP gives mission agents tools to inspect context and operate project workflows.",
    },
  ],
  loopNote:
    "Built-in loops to get started. A visual builder to make the process yours.",
  companionTitle: "Your mission, within reach.",
  companionBody:
    "Step away from your desk without losing the thread. Pair Companion with Desktop to follow missions, inspect work and send the next instruction from your phone.",
  companionCta: "Open Companion",
  companionNote:
    "Desktop runs the work and must remain online. Mission controls require a compatible Desktop and a paired device with access to all projects.",
  docsTitle: "Understand the workflow. Make it your own.",
  docsBody:
    "Practical guides for your first mission, multi-repository projects, loops, review and working from your phone.",
  closing: "What will your next mission be?",
  local: "Open source. Local workspace. Your agent subscriptions.",
};
const es: ProductCopy = {
  eyebrow: "TU ESPACIO PARA CREAR SOFTWARE CON AGENTES",
  title: "Empieza con una misión.",
  accent: "Entrega con un plan.",
  intro:
    "Trae tu idea, tus repositorios y tu agente favorito. Specrails conecta la conversación, la spec y el trabajo hasta la revisión final.",
  explore: "Explora el producto",
  workflow: "Flujo de trabajo",
  skip: "Saltar al contenido",
  theme: "Cambiar tema de color",
  menu: "Abrir menú",
  learn: "Explorar la guía",
  workflowTitle: "Un camino claro de la idea a la implementación.",
  workflowBody:
    "La conversación da dirección. La spec concreta el resultado. Los loops convierten tu proceso de desarrollo en pasos repetibles.",
  steps: [
    {
      title: "Inicia una misión",
      body: "Describe el resultado. Añade contexto del proyecto, archivos y navegador a la conversación.",
    },
    {
      title: "Conviértela en una spec",
      body: "Define el alcance, los criterios de aceptación y los repositorios en un backlog común.",
    },
    {
      title: "Ponla en los Rails",
      body: "Ejecuta un loop de serie o diseña el tuyo. Sigue la ejecución, las dependencias y la validación.",
    },
    {
      title: "Revisa y entrega",
      body: "Inspecciona los cambios y resultados. Decide cómo incorporar la implementación al proyecto.",
    },
  ],
  featureTitle: "El contexto que necesitas. El control que esperas.",
  featureIntro:
    "Todo lo que rodea al agente también importa. Specrails reúne las herramientas para entender y dirigir el trabajo.",
  features: [
    {
      title: "Un proyecto, muchos repositorios",
      body: "Comparte un backlog entre frontend, backend y más. Asigna repositorios a las specs y coordina sus jobs.",
    },
    {
      title: "Una conversación que sigue contigo",
      body: "Añade contexto durante la ejecución. Edita o borra mensajes pendientes, o guía al agente activo cuando el proveedor lo permita.",
    },
    {
      title: "Trabajo aislado, entrega consciente",
      body: "Separa las implementaciones con worktrees. Revisa el diff y elige el siguiente paso desde la misión.",
    },
    {
      title: "Más allá del indicador de progreso",
      body: "Inspecciona la actividad y los logs de procesos, también de ejecuciones anteriores. Detén procesos y entiende los fallos con sus evidencias.",
    },
    {
      title: "Enséñale al agente lo que quieres",
      body: "Navega por tu aplicación, selecciona una región y anota la captura. Adjunta contexto visual directamente a la misión.",
    },
    {
      title: "Espacio para concentrarte",
      body: "Separa una misión en su propia ventana de Desktop. Muévela entre pantallas y vuelve a integrarla en tu espacio de trabajo.",
    },
    {
      title: "Explora el c\u00F3digo detr\u00E1s del trabajo",
      body: "Navega por los archivos de tus repositorios, busca c\u00F3digo, inspecciona el historial y los diffs, y genera un resumen para entender cada archivo.",
    },
    {
      title: "Conecta tu forma de trabajar",
      body: "Usa specs locales y las integraciones configuradas de GitHub o Jira. El MCP de Specrails ofrece al agente herramientas para consultar contexto y operar los flujos del proyecto.",
    },
  ],
  loopNote:
    "Loops de serie para empezar. Un constructor visual para adaptarlos a tu proceso.",
  companionTitle: "Tu misión, al alcance de la mano.",
  companionBody:
    "Aléjate del escritorio sin perder el hilo. Vincula Companion con Desktop para seguir misiones, revisar el trabajo y enviar la siguiente indicación desde el móvil.",
  companionCta: "Abrir Companion",
  companionNote:
    "Desktop ejecuta el trabajo y debe seguir conectado. Los controles de misión necesitan un Desktop compatible y un dispositivo vinculado con acceso a todos los proyectos.",
  docsTitle: "Conoce el flujo. Adáptalo a ti.",
  docsBody:
    "Guías prácticas para tu primera misión, proyectos con varios repositorios, loops, revisión y trabajo desde el móvil.",
  closing: "¿Cuál será tu próxima misión?",
  local:
    "Código abierto. Espacio de trabajo local. Tus suscripciones de agentes.",
};
const fr: ProductCopy = {
  eyebrow: "VOTRE ESPACE DE DÉVELOPPEMENT AVEC DES AGENTS",
  title: "Commencez par une mission.",
  accent: "Livrez avec un plan.",
  intro:
    "Votre idée, vos dépôts et votre agent préféré. Specrails relie la conversation, la spec et le travail jusqu’à la revue.",
  explore: "Explorer le produit",
  workflow: "Méthode",
  skip: "Aller au contenu",
  theme: "Changer de thème",
  menu: "Ouvrir le menu",
  learn: "Explorer le guide",
  workflowTitle: "Un chemin clair de l’idée à l’implémentation.",
  workflowBody:
    "La conversation donne la direction. La spec précise le résultat. Les loops rendent les étapes répétables.",
  steps: [
    {
      title: "Lancez une mission",
      body: "Décrivez le résultat et ajoutez le contexte du projet, des fichiers et du navigateur.",
    },
    {
      title: "Écrivez une spec",
      body: "Définissez le périmètre, les critères d’acceptation et les dépôts dans un backlog commun.",
    },
    {
      title: "Passez aux Rails",
      body: "Lancez un loop intégré ou le vôtre. Suivez l’exécution et la validation.",
    },
    {
      title: "Vérifiez et livrez",
      body: "Examinez les résultats et choisissez comment intégrer le travail au projet.",
    },
  ],
  featureTitle: "Le contexte nécessaire. Le contrôle attendu.",
  featureIntro:
    "Les outils autour de l’agent comptent aussi. Gardez tout le nécessaire pour comprendre et orienter son travail.",
  features: [
    {
      title: "Un projet, plusieurs dépôts",
      body: "Partagez le backlog entre frontend, backend et autres dépôts. Définissez le périmètre des specs et coordonnez les jobs.",
    },
    {
      title: "Une conversation continue",
      body: "Ajoutez du contexte en cours d’exécution. Modifiez ou supprimez les messages en attente et guidez l’agent lorsque le fournisseur le permet.",
    },
    {
      title: "Travail isolé, livraison choisie",
      body: "Isolez les implémentations dans des worktrees. Examinez le diff et choisissez la suite depuis la mission.",
    },
    {
      title: "Au-delà de la progression",
      body: "Consultez l’activité et les logs persistants, arrêtez les processus et comprenez les échecs.",
    },
    {
      title: "Montrez votre intention",
      body: "Naviguez dans l’application, sélectionnez une zone et annotez la capture pour la mission.",
    },
    {
      title: "De l’espace pour se concentrer",
      body: "Détachez une mission dans une fenêtre Desktop, déplacez-la entre vos écrans puis réintégrez-la.",
    },
    {
      title: "Explorez le code derri\u00E8re le travail",
      body: "Parcourez les fichiers des d\u00E9p\u00F4ts, recherchez du code, examinez l\u2019historique et les diffs, et g\u00E9n\u00E9rez un r\u00E9sum\u00E9 du r\u00F4le d\u2019un fichier.",
    },
    {
      title: "Connectez votre m\u00E9thode",
      body: "Utilisez les specs locales et les int\u00E9grations GitHub ou Jira configur\u00E9es. Le MCP Specrails fournit aux agents des outils de contexte et de gestion des workflows.",
    },
  ],
  loopNote:
    "Des loops intégrés pour démarrer. Un éditeur visuel pour votre méthode.",
  companionTitle: "Votre mission à portée de main.",
  companionBody:
    "Quittez votre bureau sans perdre le fil. Associez Companion à Desktop pour suivre les missions, examiner le travail et envoyer des instructions depuis le téléphone.",
  companionCta: "Ouvrir Companion",
  companionNote:
    "Desktop exécute le travail et doit rester connecté. Les missions nécessitent une version compatible et un appareil autorisé pour tous les projets.",
  docsTitle: "Comprenez la méthode. Adaptez-la.",
  docsBody:
    "Des guides pour votre première mission, les projets multi-dépôts, les loops, la revue et le mobile.",
  closing: "Quelle sera votre prochaine mission ?",
  local: "Code ouvert. Espace local. Vos abonnements aux agents.",
};
const de: ProductCopy = {
  eyebrow: "DEIN ARBEITSPLATZ FÜR SOFTWARE MIT AGENTEN",
  title: "Starte mit einer Mission.",
  accent: "Liefere mit einem Plan.",
  intro:
    "Deine Idee, deine Repositories und dein bevorzugter Agent. Specrails verbindet Gespräch, Spec und Umsetzung bis zum Review.",
  explore: "Produkt erkunden",
  workflow: "Arbeitsablauf",
  skip: "Zum Inhalt",
  theme: "Farbschema ändern",
  menu: "Menü öffnen",
  learn: "Anleitung lesen",
  workflowTitle: "Ein klarer Weg von der Idee zur Umsetzung.",
  workflowBody:
    "Das Gespräch gibt die Richtung vor. Die Spec definiert das Ergebnis. Loops machen den Ablauf wiederholbar.",
  steps: [
    {
      title: "Mission starten",
      body: "Beschreibe das Ergebnis und ergänze Kontext aus Projekt, Dateien und Browser.",
    },
    {
      title: "Spec erstellen",
      body: "Definiere Umfang, Akzeptanzkriterien und Repositories in einem gemeinsamen Backlog.",
    },
    {
      title: "Auf Rails ausführen",
      body: "Starte einen integrierten oder eigenen Loop. Verfolge Ausführung und Validierung.",
    },
    {
      title: "Prüfen und liefern",
      body: "Prüfe Änderungen und entscheide, wie die Umsetzung in das Projekt gelangt.",
    },
  ],
  featureTitle: "Der nötige Kontext. Die erwartete Kontrolle.",
  featureIntro:
    "Auch die Werkzeuge rund um den Agenten zählen. Verstehe und lenke die Arbeit an einem Ort.",
  features: [
    {
      title: "Ein Projekt, viele Repositories",
      body: "Ein Backlog für Frontend, Backend und mehr. Ordne Specs Repositories zu und koordiniere ihre Jobs.",
    },
    {
      title: "Ein fortlaufendes Gespräch",
      body: "Ergänze während der Ausführung Kontext. Bearbeite oder entferne wartende Nachrichten und lenke unterstützte Agenten.",
    },
    {
      title: "Isoliert arbeiten, bewusst integrieren",
      body: "Trenne Umsetzungen mit Worktrees. Prüfe den Diff und wähle den nächsten Schritt in der Mission.",
    },
    {
      title: "Mehr als ein Fortschrittsbalken",
      body: "Prüfe Aktivitäten und gespeicherte Prozesslogs, stoppe Prozesse und untersuche Fehler.",
    },
    {
      title: "Zeige, was du meinst",
      body: "Öffne deine App im Browser, wähle einen Bereich und füge der Mission eine kommentierte Aufnahme hinzu.",
    },
    {
      title: "Platz für konzentrierte Arbeit",
      body: "Öffne eine Mission in einem eigenen Desktop-Fenster und integriere sie später wieder.",
    },
    {
      title: "Erkunde den Code hinter der Arbeit",
      body: "Durchsuche Dateien und Code in deinen Repositories, pr\u00FCfe Verlauf und Diffs und lasse die Rolle einer Datei zusammenfassen.",
    },
    {
      title: "Verbinde deinen bestehenden Ablauf",
      body: "Nutze lokale Specs und konfigurierte GitHub- oder Jira-Integrationen. Specrails MCP gibt Agenten Werkzeuge f\u00FCr Projektkontext und Arbeitsabl\u00E4ufe.",
    },
  ],
  loopNote:
    "Integrierte Loops für den Einstieg. Ein visueller Builder für deinen Ablauf.",
  companionTitle: "Deine Mission in Reichweite.",
  companionBody:
    "Bleib auch abseits des Schreibtischs im Kontext. Kopple Companion mit Desktop, um Missionen zu verfolgen und Anweisungen vom Smartphone zu senden.",
  companionCta: "Companion öffnen",
  companionNote:
    "Desktop führt die Arbeit aus und muss online bleiben. Missionssteuerung benötigt eine kompatible Version und Gerätezugriff auf alle Projekte.",
  docsTitle: "Verstehe den Ablauf. Mach ihn zu deinem.",
  docsBody:
    "Anleitungen für Missionen, mehrere Repositories, Loops, Reviews und mobile Arbeit.",
  closing: "Was ist deine nächste Mission?",
  local: "Open Source. Lokaler Arbeitsbereich. Deine Agenten-Abonnements.",
};
const pt: ProductCopy = {
  eyebrow: "SEU ESPAÇO PARA CRIAR SOFTWARE COM AGENTES",
  title: "Comece com uma missão.",
  accent: "Entregue com um plano.",
  intro:
    "Sua ideia, seus repositórios e seu agente favorito. O Specrails conecta a conversa, a spec e o trabalho até a revisão.",
  explore: "Explore o produto",
  workflow: "Fluxo de trabalho",
  skip: "Ir para o conteúdo",
  theme: "Alterar tema",
  menu: "Abrir menu",
  learn: "Explorar o guia",
  workflowTitle: "Um caminho claro da ideia à implementação.",
  workflowBody:
    "A conversa orienta. A spec define o resultado. Os loops tornam as etapas repetíveis.",
  steps: [
    {
      title: "Inicie uma missão",
      body: "Descreva o resultado e adicione contexto do projeto, dos arquivos e do navegador.",
    },
    {
      title: "Crie uma spec",
      body: "Defina escopo, critérios de aceitação e repositórios em um backlog comum.",
    },
    {
      title: "Execute nos Rails",
      body: "Use um loop integrado ou crie o seu. Acompanhe execução e validação.",
    },
    {
      title: "Revise e entregue",
      body: "Inspecione os resultados e escolha como incorporar a implementação ao projeto.",
    },
  ],
  featureTitle: "O contexto necessário. O controle esperado.",
  featureIntro:
    "As ferramentas ao redor do agente também importam. Entenda e oriente o trabalho em um só lugar.",
  features: [
    {
      title: "Um projeto, muitos repositórios",
      body: "Compartilhe o backlog entre frontend, backend e mais. Defina os repositórios das specs e coordene os jobs.",
    },
    {
      title: "Uma conversa contínua",
      body: "Adicione contexto durante a execução. Edite ou remova mensagens pendentes e oriente o agente quando houver suporte.",
    },
    {
      title: "Trabalho isolado, entrega consciente",
      body: "Separe implementações com worktrees. Revise o diff e escolha o próximo passo na missão.",
    },
    {
      title: "Além do indicador de progresso",
      body: "Explore atividade e logs persistentes, pare processos e investigue falhas.",
    },
    {
      title: "Mostre o que deseja",
      body: "Navegue pela aplicação, selecione uma região e anote a captura para a missão.",
    },
    {
      title: "Espaço para se concentrar",
      body: "Destaque uma missão em uma janela do Desktop, mova entre telas e depois reintegre.",
    },
    {
      title: "Explore o c\u00F3digo por tr\u00E1s do trabalho",
      body: "Navegue pelos arquivos dos reposit\u00F3rios, busque c\u00F3digo, inspecione hist\u00F3rico e diffs e gere um resumo para entender cada arquivo.",
    },
    {
      title: "Conecte seu fluxo de trabalho",
      body: "Use specs locais e integra\u00E7\u00F5es configuradas de GitHub ou Jira. O MCP do Specrails oferece ferramentas de contexto e opera\u00E7\u00E3o dos fluxos do projeto aos agentes.",
    },
  ],
  loopNote:
    "Loops integrados para começar. Um construtor visual para seu processo.",
  companionTitle: "Sua missão ao alcance da mão.",
  companionBody:
    "Saia da mesa sem perder o contexto. Vincule o Companion ao Desktop para acompanhar missões e enviar instruções pelo celular.",
  companionCta: "Abrir Companion",
  companionNote:
    "O Desktop executa o trabalho e precisa estar conectado. Missões exigem uma versão compatível e um dispositivo com acesso a todos os projetos.",
  docsTitle: "Conheça o fluxo. Adapte ao seu jeito.",
  docsBody:
    "Guias para missões, projetos com vários repositórios, loops, revisão e trabalho pelo celular.",
  closing: "Qual será sua próxima missão?",
  local: "Código aberto. Espaço local. Suas assinaturas de agentes.",
};
const it: ProductCopy = {
  eyebrow: "IL TUO SPAZIO PER CREARE SOFTWARE CON GLI AGENTI",
  title: "Inizia con una missione.",
  accent: "Consegna con un piano.",
  intro:
    "La tua idea, i tuoi repository e il tuo agente preferito. Specrails collega la conversazione, la spec e il lavoro fino alla revisione.",
  explore: "Esplora il prodotto",
  workflow: "Flusso di lavoro",
  skip: "Vai al contenuto",
  theme: "Cambia tema",
  menu: "Apri menu",
  learn: "Esplora la guida",
  workflowTitle: "Un percorso chiaro dall’idea all’implementazione.",
  workflowBody:
    "La conversazione orienta. La spec definisce il risultato. I loop rendono ripetibile il processo.",
  steps: [
    {
      title: "Avvia una missione",
      body: "Descrivi il risultato e aggiungi contesto da progetto, file e browser.",
    },
    {
      title: "Crea una spec",
      body: "Definisci ambito, criteri di accettazione e repository in un backlog comune.",
    },
    {
      title: "Esegui sui Rails",
      body: "Usa un loop integrato o creane uno. Segui esecuzione e validazione.",
    },
    {
      title: "Rivedi e consegna",
      body: "Esamina i risultati e scegli come integrare il lavoro nel progetto.",
    },
  ],
  featureTitle: "Il contesto necessario. Il controllo atteso.",
  featureIntro:
    "Anche gli strumenti attorno all’agente contano. Comprendi e orienta il lavoro in un unico spazio.",
  features: [
    {
      title: "Un progetto, molti repository",
      body: "Un backlog per frontend, backend e altro. Assegna i repository alle spec e coordina i job.",
    },
    {
      title: "Una conversazione continua",
      body: "Aggiungi contesto durante l’esecuzione. Modifica o elimina messaggi in attesa e guida gli agenti supportati.",
    },
    {
      title: "Lavoro isolato, consegna consapevole",
      body: "Separa le implementazioni con worktree. Rivedi il diff e scegli il prossimo passo nella missione.",
    },
    {
      title: "Oltre la barra di avanzamento",
      body: "Consulta attività e log persistenti, arresta processi e analizza gli errori.",
    },
    {
      title: "Mostra cosa intendi",
      body: "Naviga nell’app, seleziona una regione e annota la cattura per la missione.",
    },
    {
      title: "Spazio per concentrarti",
      body: "Sposta una missione in una finestra Desktop separata e reintegrala quando vuoi.",
    },
    {
      title: "Esplora il codice dietro il lavoro",
      body: "Sfoglia i file dei repository, cerca codice, esamina cronologia e diff e genera un riepilogo del ruolo di un file.",
    },
    {
      title: "Collega il tuo flusso di lavoro",
      body: "Usa spec locali e integrazioni GitHub o Jira configurate. Il MCP Specrails offre agli agenti strumenti per il contesto e i flussi del progetto.",
    },
  ],
  loopNote:
    "Loop integrati per iniziare. Un costruttore visuale per il tuo processo.",
  companionTitle: "La tua missione a portata di mano.",
  companionBody:
    "Allontanati dalla scrivania senza perdere il filo. Collega Companion a Desktop per seguire missioni e inviare istruzioni dal telefono.",
  companionCta: "Apri Companion",
  companionNote:
    "Desktop esegue il lavoro e deve restare connesso. Le missioni richiedono una versione compatibile e un dispositivo autorizzato per tutti i progetti.",
  docsTitle: "Comprendi il flusso. Fallo tuo.",
  docsBody:
    "Guide per missioni, progetti con più repository, loop, revisione e lavoro dal telefono.",
  closing: "Quale sarà la tua prossima missione?",
  local: "Codice aperto. Spazio locale. I tuoi abbonamenti agli agenti.",
};
const zh: ProductCopy = {
  eyebrow: "与智能体一起构建软件的工作空间",
  title: "从一个任务开始。",
  accent: "有计划地交付。",
  intro:
    "带上你的想法、代码仓库和常用智能体。Specrails 将对话、规格与开发工作连接起来，直到代码审查。",
  explore: "探索产品",
  workflow: "工作流程",
  skip: "跳至内容",
  theme: "切换主题",
  menu: "打开菜单",
  learn: "阅读指南",
  workflowTitle: "从想法到实现，路径清晰。",
  workflowBody: "对话确定方向，规格明确结果，循环让开发流程可以重复执行。",
  steps: [
    { title: "开始任务", body: "描述目标，并添加项目、文件与浏览器上下文。" },
    { title: "形成规格", body: "在共享待办中定义范围、验收标准和涉及的仓库。" },
    {
      title: "在 Rails 上运行",
      body: "使用内置或自定义循环，跟踪执行与验证。",
    },
    { title: "审查并交付", body: "检查修改与结果，选择将实现纳入项目的方式。" },
  ],
  featureTitle: "需要的上下文，期待的控制力。",
  featureIntro: "智能体周边的工具同样重要。在一个空间中理解并指导开发工作。",
  features: [
    {
      title: "一个项目，多个仓库",
      body: "前端、后端共享待办。为规格指定仓库范围并协调作业。",
    },
    {
      title: "持续推进的对话",
      body: "执行时补充上下文，编辑或删除待发消息，在提供商支持时指导正在运行的智能体。",
    },
    {
      title: "隔离开发，审慎交付",
      body: "通过 worktree 隔离实现，在任务中检查差异并选择下一步。",
    },
    {
      title: "不止是进度条",
      body: "检查活动和持久化进程日志，停止进程并分析失败原因。",
    },
    {
      title: "把想法展示给智能体",
      body: "浏览应用、选择区域并标注截图，直接附加到任务。",
    },
    {
      title: "给专注留出空间",
      body: "将任务移至独立 Desktop 窗口，在屏幕间移动，再随时重新集成。",
    },
    {
      title: "\u63A2\u7D22\u5F00\u53D1\u80CC\u540E\u7684\u4EE3\u7801",
      body: "\u6D4F\u89C8\u591A\u4E2A\u4ED3\u5E93\u7684\u6587\u4EF6\u3001\u641C\u7D22\u4EE3\u7801\u3001\u68C0\u67E5\u5386\u53F2\u4E0E\u5DEE\u5F02\uFF0C\u5E76\u751F\u6210\u6587\u4EF6\u6458\u8981\u4EE5\u4E86\u89E3\u5176\u4F5C\u7528\u3002",
    },
    {
      title: "\u8FDE\u63A5\u73B0\u6709\u5DE5\u4F5C\u65B9\u5F0F",
      body: "\u4F7F\u7528\u672C\u5730\u89C4\u683C\u548C\u5DF2\u914D\u7F6E\u7684 GitHub \u6216 Jira \u96C6\u6210\u3002Specrails MCP \u4E3A\u4EFB\u52A1\u667A\u80FD\u4F53\u63D0\u4F9B\u9879\u76EE\u4E0A\u4E0B\u6587\u4E0E\u5DE5\u4F5C\u6D41\u7A0B\u64CD\u4F5C\u5DE5\u5177\u3002",
    },
  ],
  loopNote: "内置循环帮助你起步，可视化构建器让流程适合你。",
  companionTitle: "任务，触手可及。",
  companionBody:
    "离开电脑也能跟上进展。将 Companion 与 Desktop 配对，在手机上跟踪任务、查看工作并发送指令。",
  companionCta: "打开 Companion",
  companionNote:
    "工作由 Desktop 执行，它必须保持在线。任务控制需要兼容的 Desktop 版本和拥有所有项目访问权限的配对设备。",
  docsTitle: "理解流程，让它适合你。",
  docsBody: "查看首个任务、多仓库项目、循环、审查与移动工作的实用指南。",
  closing: "你的下一个任务是什么？",
  local: "开源。本地工作空间。使用你的智能体订阅。",
};
const ja: ProductCopy = {
  eyebrow: "エージェントとソフトウェアを作るワークスペース",
  title: "ミッションから始める。",
  accent: "計画を持って届ける。",
  intro:
    "アイデア、リポジトリ、お気に入りのエージェントを持ち寄りましょう。Specrails が会話、Spec、実装をレビューまでつなぎます。",
  explore: "製品を見る",
  workflow: "ワークフロー",
  skip: "本文へ移動",
  theme: "テーマを変更",
  menu: "メニューを開く",
  learn: "ガイドを読む",
  workflowTitle: "アイデアから実装まで、明確な道筋。",
  workflowBody:
    "会話で方向を決め、Spec で成果を定義し、Loop で開発手順を繰り返せるようにします。",
  steps: [
    {
      title: "ミッションを開始",
      body: "成果を説明し、プロジェクト、ファイル、ブラウザの情報を追加します。",
    },
    {
      title: "Spec にする",
      body: "範囲、受け入れ基準、対象リポジトリを共通バックログで定義します。",
    },
    {
      title: "Rails で実行",
      body: "組み込みまたは独自の Loop で実行と検証を追跡します。",
    },
    {
      title: "確認して届ける",
      body: "変更と結果を確認し、プロジェクトへの取り込み方を選びます。",
    },
  ],
  featureTitle: "必要な情報と、期待する操作性。",
  featureIntro:
    "エージェントを取り巻くツールも重要です。一か所で作業を理解し、方向づけられます。",
  features: [
    {
      title: "一つのプロジェクト、複数のリポジトリ",
      body: "フロントエンドとバックエンドでバックログを共有。Spec の対象を指定し、ジョブを連携させます。",
    },
    {
      title: "続けられる会話",
      body: "実行中に情報を追加。待機中のメッセージを編集・削除し、対応エージェントに追加指示を送れます。",
    },
    {
      title: "分離した作業、選べる統合",
      body: "worktree で実装を分離し、ミッションから差分と次の操作を確認します。",
    },
    {
      title: "進捗表示のその先へ",
      body: "アクティビティと保存済みログを調べ、プロセスを停止し、失敗を分析できます。",
    },
    {
      title: "意図を視覚で伝える",
      body: "アプリを開き、領域を選択して画像に注釈を付け、ミッションに添付します。",
    },
    {
      title: "集中できる作業空間",
      body: "ミッションを独立した Desktop ウィンドウに移し、画面間で動かしてから戻せます。",
    },
    {
      title:
        "\u4F5C\u696D\u306E\u88CF\u306B\u3042\u308B\u30B3\u30FC\u30C9\u3092\u63A2\u7D22",
      body: "\u30EA\u30DD\u30B8\u30C8\u30EA\u306E\u30D5\u30A1\u30A4\u30EB\u3092\u53C2\u7167\u3057\u3001\u30B3\u30FC\u30C9\u691C\u7D22\u3001\u5C65\u6B74\u30FB\u5DEE\u5206\u306E\u78BA\u8A8D\u3001\u30D5\u30A1\u30A4\u30EB\u306E\u5F79\u5272\u306E\u8981\u7D04\u304C\u3067\u304D\u307E\u3059\u3002",
    },
    {
      title:
        "\u65E2\u5B58\u306E\u30EF\u30FC\u30AF\u30D5\u30ED\u30FC\u3068\u63A5\u7D9A",
      body: "\u30ED\u30FC\u30AB\u30EB Spec \u3068\u8A2D\u5B9A\u6E08\u307F\u306E GitHub\u30FBJira \u9023\u643A\u3092\u5229\u7528\u3002Specrails MCP \u304C\u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u306B\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u60C5\u5831\u3068\u64CD\u4F5C\u30C4\u30FC\u30EB\u3092\u63D0\u4F9B\u3057\u307E\u3059\u3002",
    },
  ],
  loopNote: "組み込み Loop ですぐに開始。ビジュアルビルダーで独自の流れに。",
  companionTitle: "ミッションを手の届く場所に。",
  companionBody:
    "デスクを離れても流れを見失いません。Companion と Desktop をペアリングし、スマートフォンで進捗確認や追加指示を行えます。",
  companionCta: "Companion を開く",
  companionNote:
    "作業を実行する Desktop はオンラインである必要があります。ミッション操作には対応版 Desktop と、全プロジェクトへの権限を持つ端末が必要です。",
  docsTitle: "流れを理解し、自分のものに。",
  docsBody:
    "最初のミッション、複数リポジトリ、Loop、レビュー、モバイル操作の実用ガイド。",
  closing: "次のミッションは何ですか？",
  local: "オープンソース。ローカルの作業空間。自分のエージェント契約。",
};
export const PRODUCT_COPY: Record<LanguageId, ProductCopy> = {
  en,
  es,
  fr,
  de,
  pt,
  it,
  zh,
  ja,
};
