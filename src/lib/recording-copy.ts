import type { LanguageId } from "@/lib/i18n";

export type RecordingId = "mission" | "board" | "loop";
export const RECORDINGS: ReadonlyArray<{ id: RecordingId; file: string; duration: string }> = [
  { id: "mission", file: "specrails-mission-control-real", duration: "0:15" },
  { id: "board", file: "specrails-board-real", duration: "0:12" },
  { id: "loop", file: "specrails-loop-builder-real", duration: "0:10" },
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
      mission: { title: "Mission Control", summary: "Open a mission. Check local usage.", description: "An existing sample mission opens from the sidebar. Hovering over the footer shows Claude and Codex usage windows, their reset countdowns and when the data was updated. No agent execution or delivery is performed." },
      board: { title: "Specs and rails", summary: "Inspect the backlog and execution rails.", description: "Board shows the spec backlog beside three execution rails and the current loop choices. Opening a spec reveals its details; the view returns to the board. No implementation run is launched." },
      loop: { title: "Loop builder", summary: "Inspect the verification and stopping rule.", description: "The built-in Freestyle graph connects implementation, verification and a decision. Selecting its decision node exposes the stopping criteria and the path back to fix and verify. This is a loop definition with sample project data, not an execution result." },
    },
  },
  es: {
    eyebrow: "Dentro de la app", title: "Mira cómo funciona.",
    intro: "Tres grabaciones breves de Specrails. Elige una función, reproduce el vídeo y amplíalo para explorar la interfaz completa.",
    note: "Proyecto de ejemplo · Interfaz en inglés · Sin audio", play: "Reproducir", pause: "Pausar", expand: "Ampliar grabación", close: "Cerrar grabación", retry: "Reintentar",
    error: "No se ha podido cargar la grabación.", openFile: "Abrir archivo de vídeo", transcript: "Qué muestra esta grabación", fullscreenHint: "Usa los controles del vídeo para pausar, avanzar o verlo a pantalla completa.",
    clips: {
      mission: { title: "Control de misiones", summary: "Abre una misión. Consulta el uso local.", description: "Se abre una misión de ejemplo desde la sidebar. Al pasar el ratón por el pie se muestran las ventanas de uso de Claude y Codex, cuánto falta para reiniciarlas y cuándo se actualizaron. No se ejecuta un agente ni se realiza una entrega." },
      board: { title: "Specs y rails", summary: "Explora el backlog y los rails de ejecución.", description: "El Board muestra el backlog de specs junto a tres rails y los loops disponibles. Se abre una spec para consultar sus detalles y se vuelve al tablero. No se lanza una implementación." },
      loop: { title: "Constructor de loops", summary: "Consulta la verificación y la condición de parada.", description: "El loop integrado Freestyle conecta implementación, verificación y una decisión. Al seleccionar la decisión se muestran los criterios de parada y el camino para corregir y verificar de nuevo. Es una definición con datos de ejemplo, no el resultado de una ejecución." },
    },
  },
  fr: {
    eyebrow: "Dans l’application", title: "Découvrez le fonctionnement.",
    intro: "Trois courtes vidéos de Specrails. Choisissez une fonction, lancez la lecture et agrandissez la vidéo pour voir toute l’interface.",
    note: "Projet d’exemple · Interface en anglais · Sans audio", play: "Lire", pause: "Pause", expand: "Agrandir la vidéo", close: "Fermer la vidéo", retry: "Réessayer",
    error: "Impossible de charger la vidéo.", openFile: "Ouvrir le fichier vidéo", transcript: "Ce que montre cette vidéo", fullscreenHint: "Utilisez les commandes vidéo pour mettre en pause, avancer ou passer en plein écran.",
    clips: {
      mission: { title: "Contrôle des missions", summary: "Ouvrez une mission. Consultez l’usage local.", description: "Une mission d’exemple s’ouvre depuis la barre latérale. Survoler le pied de fenêtre affiche les limites de Claude et Codex, le délai de réinitialisation et la dernière mise à jour. Aucun agent ni aucune livraison n’est lancé." },
      board: { title: "Specs et rails", summary: "Explorez les specs et les rails.", description: "Le Board affiche les specs à côté de trois rails et des boucles disponibles. Une spec s’ouvre pour consulter ses détails, puis la vue revient au Board. Aucune implémentation n’est lancée." },
      loop: { title: "Éditeur de boucles", summary: "Consultez la vérification et la règle d’arrêt.", description: "Le graphe Freestyle intégré relie implémentation, vérification et décision. Sélectionner la décision affiche les critères d’arrêt et le chemin de correction et de vérification. Il s’agit d’une définition avec des données d’exemple, pas d’un résultat d’exécution." },
    },
  },
  de: {
    eyebrow: "Ein Blick in die App", title: "So läuft die Arbeit ab.",
    intro: "Drei kurze Aufnahmen aus Specrails. Wähle eine Funktion, starte das Video und vergrößere es für die vollständige Oberfläche.",
    note: "Beispielprojekt · Englische Oberfläche · Ohne Ton", play: "Abspielen", pause: "Pausieren", expand: "Aufnahme vergrößern", close: "Aufnahme schließen", retry: "Erneut versuchen",
    error: "Die Aufnahme konnte nicht geladen werden.", openFile: "Videodatei öffnen", transcript: "Was diese Aufnahme zeigt", fullscreenHint: "Mit den Videosteuerungen kannst du pausieren, springen oder den Vollbildmodus öffnen.",
    clips: {
      mission: { title: "Missionssteuerung", summary: "Mission öffnen. Lokale Nutzung prüfen.", description: "Eine Beispielmission wird aus der Seitenleiste geöffnet. Beim Bewegen über die Fußleiste erscheinen Claude- und Codex-Limits, die Zeit bis zum Zurücksetzen und die letzte Aktualisierung. Es wird kein Agentenlauf oder Auslieferung gestartet." },
      board: { title: "Specs und Rails", summary: "Backlog und Ausführungsrails ansehen.", description: "Das Board zeigt Specs neben drei Rails und den verfügbaren Loops. Die Details einer Spec werden geöffnet, danach erscheint wieder das Board. Es wird keine Implementierung gestartet." },
      loop: { title: "Loop-Editor", summary: "Prüfung und Abbruchregel ansehen.", description: "Der integrierte Freestyle-Graph verbindet Implementierung, Prüfung und Entscheidung. Die ausgewählte Entscheidung zeigt die Abbruchkriterien und den Rückweg zur Korrektur und erneuten Prüfung. Zu sehen ist eine Definition mit Beispieldaten, kein Ausführungsergebnis." },
    },
  },
  pt: {
    eyebrow: "Dentro da aplicação", title: "Veja como funciona.",
    intro: "Três gravações curtas do Specrails. Escolha uma função, reproduza o vídeo e amplie-o para explorar a interface completa.",
    note: "Projeto de exemplo · Interface em inglês · Sem áudio", play: "Reproduzir", pause: "Pausar", expand: "Ampliar gravação", close: "Fechar gravação", retry: "Tentar novamente",
    error: "Não foi possível carregar a gravação.", openFile: "Abrir ficheiro de vídeo", transcript: "O que esta gravação mostra", fullscreenHint: "Use os controlos do vídeo para pausar, avançar ou abrir em ecrã inteiro.",
    clips: {
      mission: { title: "Controlo de missões", summary: "Abra uma missão. Consulte o uso local.", description: "Uma missão de exemplo abre a partir da barra lateral. Passar o rato pelo rodapé mostra os limites de Claude e Codex, o tempo até à reposição e a última atualização. Não é executado um agente nem uma entrega." },
      board: { title: "Specs e rails", summary: "Explore as specs e os rails.", description: "O Board mostra o backlog junto de três rails e dos loops disponíveis. Abre-se uma spec para consultar os detalhes e regressa-se ao Board. Não é iniciada uma implementação." },
      loop: { title: "Editor de loops", summary: "Consulte a verificação e a regra de paragem.", description: "O grafo Freestyle integrado liga implementação, verificação e decisão. Selecionar a decisão mostra os critérios de paragem e o caminho para corrigir e verificar novamente. É uma definição com dados de exemplo, não um resultado de execução." },
    },
  },
  it: {
    eyebrow: "Dentro l’app", title: "Guarda come funziona.",
    intro: "Tre brevi registrazioni di Specrails. Scegli una funzione, avvia il video e ingrandiscilo per esplorare l’interfaccia completa.",
    note: "Progetto di esempio · Interfaccia in inglese · Senza audio", play: "Riproduci", pause: "Pausa", expand: "Ingrandisci registrazione", close: "Chiudi registrazione", retry: "Riprova",
    error: "Impossibile caricare la registrazione.", openFile: "Apri file video", transcript: "Cosa mostra questa registrazione", fullscreenHint: "Usa i controlli video per mettere in pausa, spostarti o passare a schermo intero.",
    clips: {
      mission: { title: "Controllo missioni", summary: "Apri una missione. Controlla l’utilizzo locale.", description: "Una missione di esempio si apre dalla barra laterale. Passando sul piè di pagina compaiono i limiti di Claude e Codex, il tempo al ripristino e l’ultimo aggiornamento. Non viene eseguito un agente né una consegna." },
      board: { title: "Specs e rails", summary: "Esplora le spec e i rail.", description: "Il Board mostra il backlog accanto a tre rail e ai loop disponibili. Si apre una spec per vedere i dettagli, poi si torna al Board. Non viene avviata un’implementazione." },
      loop: { title: "Editor di loop", summary: "Consulta la verifica e la regola di arresto.", description: "Il grafo Freestyle integrato collega implementazione, verifica e decisione. Selezionando la decisione si vedono i criteri di arresto e il percorso di correzione e nuova verifica. È una definizione con dati di esempio, non un risultato di esecuzione." },
    },
  },
  zh: {
    eyebrow: "走进应用", title: "亲眼看看工作流程。",
    intro: "三段简短的 Specrails 录屏。选择一项功能，点击播放，再放大查看完整界面。",
    note: "示例项目 · 英文界面 · 无音频", play: "播放", pause: "暂停", expand: "放大录屏", close: "关闭录屏", retry: "重试",
    error: "无法加载录屏。", openFile: "打开视频文件", transcript: "这段录屏展示了什么", fullscreenHint: "使用视频控件暂停、跳转或进入全屏。",
    clips: {
      mission: { title: "任务控制", summary: "打开任务，查看本地用量。", description: "从侧栏打开一个示例任务。将鼠标移到页脚，即可查看 Claude 和 Codex 的用量窗口、重置倒计时和上次更新时间。没有启动代理执行或交付。" },
      board: { title: "Specs 与 rails", summary: "查看待办列表和执行轨道。", description: "Board 在规格待办列表旁显示三条执行轨道及可选循环。打开一条规格查看详情，然后返回看板。没有启动实施。" },
      loop: { title: "循环编辑器", summary: "查看验证和停止条件。", description: "内置 Freestyle 图连接实施、验证和决策。选择决策节点后，可查看停止条件以及返回修复和再次验证的路径。展示的是使用示例数据的循环定义，而非执行结果。" },
    },
  },
  ja: {
    eyebrow: "アプリの中を見る", title: "実際の流れをご覧ください。",
    intro: "Specrails の短い画面録画を3本用意しました。機能を選んで再生し、拡大してインターフェース全体を確認できます。",
    note: "サンプルプロジェクト · 英語の画面 · 音声なし", play: "再生", pause: "一時停止", expand: "録画を拡大", close: "録画を閉じる", retry: "再試行",
    error: "録画を読み込めませんでした。", openFile: "動画ファイルを開く", transcript: "この録画の内容", fullscreenHint: "動画の操作ボタンで、一時停止、シーク、全画面表示ができます。",
    clips: {
      mission: { title: "ミッション管理", summary: "ミッションを開き、ローカル使用量を確認。", description: "サイドバーからサンプルのミッションを開きます。フッターにカーソルを合わせると、Claude と Codex の使用枠、リセットまでの時間、最終更新が表示されます。エージェント実行や納品は行いません。" },
      board: { title: "Specs と rails", summary: "バックログと実行用 rail を確認。", description: "Board は spec のバックログ、3本の rail、利用可能な Loop を表示します。spec の詳細を開き、Board に戻ります。実装は開始しません。" },
      loop: { title: "ループエディター", summary: "検証と停止条件を確認。", description: "組み込み Freestyle グラフは実装、検証、判定を接続します。判定ノードを選ぶと、停止条件と修正・再検証への経路が表示されます。サンプルデータを使った定義であり、実行結果ではありません。" },
    },
  },
};
