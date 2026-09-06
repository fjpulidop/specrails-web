import type { LanguageId } from "@/lib/i18n";

export type RecordingId = "mission" | "board" | "loop";
export const RECORDINGS: ReadonlyArray<{ id: RecordingId; file: string; duration: string }> = [
  { id: "mission", file: "specrails-mission-control-real", duration: "0:15" },
  { id: "board", file: "specrails-board-real", duration: "0:11" },
  { id: "loop", file: "specrails-loop-builder-real", duration: "0:04" },
];
export interface RecordingCopy {
  eyebrow: string; title: string; intro: string; note: string;
  play: string; pause: string; expand: string; close: string; retry: string;
  error: string; openFile: string; transcript: string; fullscreenHint: string;
  clips: Record<RecordingId, { title: string; summary: string; description: string }>;
}

export const RECORDING_COPY: Record<LanguageId, RecordingCopy> = {
  en: {
    eyebrow: "Inside the app", title: "See the workflow for yourself.",
    intro: "Three short recordings of Specrails. Pick a feature, press play, and expand it to inspect the full interface.",
    note: "Sample project · English interface · No audio", play: "Play", pause: "Pause", expand: "Expand recording", close: "Close recording", retry: "Retry",
    error: "The recording could not be loaded.", openFile: "Open video file", transcript: "What this recording shows", fullscreenHint: "Use the video controls to pause, seek, or enter fullscreen.",
    clips: {
      mission: { title: "Mission Control", summary: "From a request to a review card.", description: "A checkout recovery request is entered in the mission composer. The conversation shows MCP activity and a pinned implementation card. The card reaches review and offers Create PR, Integrate locally, and Discard. The recording ends before a delivery action is chosen." },
      board: { title: "Specs and rails", summary: "Create a spec. Place it on a rail.", description: "The Board opens with a spec backlog and execution rails. A checkout recovery spec is created in Raw mode, with a title and description. Its detail view opens, then the spec is moved to Rail 1 with the Implement loop selected. The recording does not show an implementation run." },
      loop: { title: "Loop builder", summary: "See the steps and the stopping rule.", description: "The loop canvas connects planning, implementation, a local verification command, and a decision step. Selecting a node reveals its prompt or stopping criteria in the side panel. This clip shows the loop definition, not an execution result." },
    },
  },
  es: {
    eyebrow: "Dentro de la app", title: "Mira cómo funciona.",
    intro: "Tres grabaciones breves de Specrails. Elige una función, reproduce el vídeo y amplíalo para explorar la interfaz completa.",
    note: "Proyecto de ejemplo · Interfaz en inglés · Sin audio", play: "Reproducir", pause: "Pausar", expand: "Ampliar grabación", close: "Cerrar grabación", retry: "Reintentar",
    error: "No se ha podido cargar la grabación.", openFile: "Abrir archivo de vídeo", transcript: "Qué muestra esta grabación", fullscreenHint: "Usa los controles del vídeo para pausar, avanzar o verlo a pantalla completa.",
    clips: {
      mission: { title: "Control de misiones", summary: "De una petición a una tarjeta de revisión.", description: "Se introduce una petición para recuperar pagos en el compositor de la misión. La conversación muestra actividad MCP y una tarjeta de implementación fijada. La tarjeta pasa a revisión y ofrece crear una PR, integrar en local o descartar. La grabación termina antes de elegir una acción de entrega." },
      board: { title: "Specs y rails", summary: "Crea una spec. Colócala en un rail.", description: "El Board muestra el backlog de specs y los rails de ejecución. Se crea una spec de recuperación de pagos en modo Raw, con título y descripción. Se abre su detalle y se mueve al Rail 1 con el loop Implement seleccionado. La grabación no muestra la ejecución de la implementación." },
      loop: { title: "Constructor de loops", summary: "Los pasos y la condición de parada.", description: "El lienzo conecta planificación, implementación, un comando de verificación local y un paso de decisión. Al seleccionar un nodo, el panel lateral muestra su prompt o condición de parada. El clip muestra la definición del loop, no el resultado de una ejecución." },
    },
  },
  fr: {
    eyebrow: "Dans l’application", title: "Découvrez le fonctionnement.",
    intro: "Trois courtes vidéos de Specrails. Choisissez une fonction, lancez la lecture et agrandissez la vidéo pour voir toute l’interface.",
    note: "Projet d’exemple · Interface en anglais · Sans audio", play: "Lire", pause: "Pause", expand: "Agrandir la vidéo", close: "Fermer la vidéo", retry: "Réessayer",
    error: "Impossible de charger la vidéo.", openFile: "Ouvrir le fichier vidéo", transcript: "Ce que montre cette vidéo", fullscreenHint: "Utilisez les commandes vidéo pour mettre en pause, avancer ou passer en plein écran.",
    clips: {
      mission: { title: "Contrôle des missions", summary: "D’une demande à une carte de revue.", description: "Une demande de récupération de paiement est saisie dans la mission. La conversation montre l’activité MCP et une carte d’implémentation épinglée. La carte passe en revue et propose de créer une PR, d’intégrer localement ou d’abandonner. La vidéo se termine avant le choix d’une action de livraison." },
      board: { title: "Specs et rails", summary: "Créez une spec. Placez-la sur un rail.", description: "Le Board affiche les specs et les rails d’exécution. Une spec de récupération de paiement est créée en mode Raw avec un titre et une description. Son détail s’ouvre, puis elle est déplacée vers Rail 1 avec la boucle Implement sélectionnée. La vidéo ne montre pas l’exécution de l’implémentation." },
      loop: { title: "Éditeur de boucles", summary: "Les étapes et la condition d’arrêt.", description: "Le canevas relie planification, implémentation, commande de vérification locale et décision. Sélectionner un nœud affiche son prompt ou ses critères d’arrêt dans le panneau latéral. Ce clip présente la définition de la boucle, pas un résultat d’exécution." },
    },
  },
  de: {
    eyebrow: "Ein Blick in die App", title: "So läuft die Arbeit ab.",
    intro: "Drei kurze Aufnahmen aus Specrails. Wähle eine Funktion, starte das Video und vergrößere es für die vollständige Oberfläche.",
    note: "Beispielprojekt · Englische Oberfläche · Ohne Ton", play: "Abspielen", pause: "Pausieren", expand: "Aufnahme vergrößern", close: "Aufnahme schließen", retry: "Erneut versuchen",
    error: "Die Aufnahme konnte nicht geladen werden.", openFile: "Videodatei öffnen", transcript: "Was diese Aufnahme zeigt", fullscreenHint: "Mit den Videosteuerungen kannst du pausieren, springen oder den Vollbildmodus öffnen.",
    clips: {
      mission: { title: "Missionssteuerung", summary: "Von der Anfrage zur Prüfkarte.", description: "Im Missionseditor wird eine Anfrage zur Wiederherstellung von Zahlungen eingegeben. Das Gespräch zeigt MCP-Aktivität und eine angeheftete Implementierungskarte. Die Karte erreicht die Prüfung und bietet PR-Erstellung, lokale Integration oder Verwerfen an. Die Aufnahme endet vor der Auswahl einer Übergabeaktion." },
      board: { title: "Specs und Rails", summary: "Eine Spec erstellen und einem Rail zuordnen.", description: "Das Board zeigt den Spec-Backlog und Ausführungs-Rails. Eine Spec zur Zahlungswiederherstellung wird im Raw-Modus mit Titel und Beschreibung erstellt. Ihre Detailansicht öffnet sich, dann wird sie Rail 1 mit dem ausgewählten Implement-Loop zugeordnet. Eine Implementierungsausführung wird nicht gezeigt." },
      loop: { title: "Loop-Editor", summary: "Die Schritte und die Abbruchbedingung.", description: "Die Arbeitsfläche verbindet Planung, Implementierung, einen lokalen Prüfbefehl und einen Entscheidungsschritt. Die Auswahl eines Knotens zeigt dessen Prompt oder Abbruchkriterien in der Seitenleiste. Der Clip zeigt die Loop-Definition, kein Ausführungsergebnis." },
    },
  },
  pt: {
    eyebrow: "Dentro da aplicação", title: "Veja como funciona.",
    intro: "Três gravações curtas do Specrails. Escolha uma função, reproduza o vídeo e amplie-o para explorar a interface completa.",
    note: "Projeto de exemplo · Interface em inglês · Sem áudio", play: "Reproduzir", pause: "Pausar", expand: "Ampliar gravação", close: "Fechar gravação", retry: "Tentar novamente",
    error: "Não foi possível carregar a gravação.", openFile: "Abrir ficheiro de vídeo", transcript: "O que esta gravação mostra", fullscreenHint: "Use os controlos do vídeo para pausar, avançar ou abrir em ecrã inteiro.",
    clips: {
      mission: { title: "Controlo de missões", summary: "De um pedido a um cartão de revisão.", description: "É introduzido um pedido de recuperação de pagamentos no editor da missão. A conversa mostra atividade MCP e um cartão de implementação fixado. O cartão chega à revisão e permite criar uma PR, integrar localmente ou descartar. A gravação termina antes de escolher uma ação de entrega." },
      board: { title: "Specs e rails", summary: "Crie uma spec. Coloque-a num rail.", description: "O Board mostra o backlog de specs e os rails de execução. Uma spec de recuperação de pagamentos é criada em modo Raw, com título e descrição. Abre-se o detalhe e a spec é movida para o Rail 1 com o loop Implement selecionado. A gravação não mostra a execução da implementação." },
      loop: { title: "Editor de loops", summary: "Os passos e a condição de paragem.", description: "O quadro liga planeamento, implementação, um comando de verificação local e uma decisão. Selecionar um nó revela o prompt ou os critérios de paragem no painel lateral. Este clip mostra a definição do loop, não um resultado de execução." },
    },
  },
  it: {
    eyebrow: "Dentro l’app", title: "Guarda come funziona.",
    intro: "Tre brevi registrazioni di Specrails. Scegli una funzione, avvia il video e ingrandiscilo per esplorare l’interfaccia completa.",
    note: "Progetto di esempio · Interfaccia in inglese · Senza audio", play: "Riproduci", pause: "Pausa", expand: "Ingrandisci registrazione", close: "Chiudi registrazione", retry: "Riprova",
    error: "Impossibile caricare la registrazione.", openFile: "Apri file video", transcript: "Cosa mostra questa registrazione", fullscreenHint: "Usa i controlli video per mettere in pausa, spostarti o passare a schermo intero.",
    clips: {
      mission: { title: "Controllo missioni", summary: "Da una richiesta a una scheda di revisione.", description: "Nel compositore della missione viene inserita una richiesta per recuperare pagamenti. La conversazione mostra attività MCP e una scheda di implementazione fissata. La scheda arriva alla revisione e offre la creazione di una PR, l’integrazione locale o l’eliminazione. La registrazione termina prima di scegliere un’azione di consegna." },
      board: { title: "Specs e rails", summary: "Crea una spec. Inseriscila in un rail.", description: "Il Board mostra il backlog di spec e i rail di esecuzione. Una spec per recuperare pagamenti viene creata in modalità Raw con titolo e descrizione. Si apre il dettaglio, poi la spec viene spostata su Rail 1 con il loop Implement selezionato. La registrazione non mostra l’esecuzione dell’implementazione." },
      loop: { title: "Editor di loop", summary: "I passaggi e la condizione di arresto.", description: "L’area di lavoro collega pianificazione, implementazione, verifica locale e decisione. Selezionando un nodo, il pannello laterale mostra il prompt o i criteri di arresto. Il clip presenta la definizione del loop, non il risultato di un’esecuzione." },
    },
  },
  zh: {
    eyebrow: "走进应用", title: "亲眼看看工作流程。",
    intro: "三段简短的 Specrails 录屏。选择一项功能，点击播放，再放大查看完整界面。",
    note: "示例项目 · 英文界面 · 无音频", play: "播放", pause: "暂停", expand: "放大录屏", close: "关闭录屏", retry: "重试",
    error: "无法加载录屏。", openFile: "打开视频文件", transcript: "这段录屏展示了什么", fullscreenHint: "使用视频控件暂停、跳转或进入全屏。",
    clips: {
      mission: { title: "任务控制", summary: "从一条请求到审核卡片。", description: "在任务输入框中输入一条恢复支付的请求。对话展示 MCP 活动和置顶的实施卡片。卡片进入审核状态，并提供创建 PR、本地集成和放弃等选项。录屏在选择交付操作之前结束。" },
      board: { title: "Specs 与 rails", summary: "创建 spec，再放到 rail 上。", description: "Board 展示 spec 待办列表和执行 rail。以 Raw 模式创建一条恢复支付的 spec，填写标题和描述。打开详情后，将 spec 移至已选择 Implement 循环的 Rail 1。录屏没有展示实施执行过程。" },
      loop: { title: "循环编辑器", summary: "查看步骤与停止条件。", description: "画布将规划、实施、本地验证命令和决策步骤连接起来。选择节点后，侧边栏会显示其提示词或停止条件。此片段展示的是循环定义，而非执行结果。" },
    },
  },
  ja: {
    eyebrow: "アプリの中を見る", title: "実際の流れをご覧ください。",
    intro: "Specrails の短い画面録画を3本用意しました。機能を選んで再生し、拡大してインターフェース全体を確認できます。",
    note: "サンプルプロジェクト · 英語の画面 · 音声なし", play: "再生", pause: "一時停止", expand: "録画を拡大", close: "録画を閉じる", retry: "再試行",
    error: "録画を読み込めませんでした。", openFile: "動画ファイルを開く", transcript: "この録画の内容", fullscreenHint: "動画の操作ボタンで、一時停止、シーク、全画面表示ができます。",
    clips: {
      mission: { title: "ミッション管理", summary: "依頼からレビューカードまで。", description: "ミッションの入力欄に決済回復の依頼を入力します。会話には MCP の動作と固定された実装カードが表示されます。カードがレビュー状態になり、PR の作成、ローカル統合、破棄を選べます。録画は納品操作を選ぶ前に終了します。" },
      board: { title: "Specs と rails", summary: "Spec を作成して rail に配置。", description: "Board に spec のバックログと実行用 rail が表示されます。Raw モードでタイトルと説明を入力し、決済回復の spec を作成します。詳細を開いた後、Implement ループを選択した Rail 1 に移動します。実装の実行は録画に含まれていません。" },
      loop: { title: "ループエディター", summary: "手順と停止条件を確認。", description: "キャンバス上で計画、実装、ローカル検証コマンド、判定ステップを接続します。ノードを選ぶと、サイドパネルにプロンプトや停止条件が表示されます。この動画はループの定義を示すもので、実行結果ではありません。" },
    },
  },
};
