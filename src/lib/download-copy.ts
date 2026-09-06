import type { LanguageId } from "@/lib/i18n";

export interface DownloadCopy {
  title: string; intro: string; platforms: string; architecture: string;
  macHint: string; x64Hint: string; armHint: string;
  loading: string; error: string; missing: string; download: string;
  viewReleases: string; allReleases: string; version: string; released: string;
  size: string; file: string; checksum: string; checksumHint: string; details: string;
  releaseNotes: string; learnTitle: string; learnBody: string; source: string;
  sourceBody: string; support: string; supportBody: string; back: string;
}

export const DOWNLOAD_COPY: Record<LanguageId, DownloadCopy> = {
  en: {
    title: "Download Specrails", intro: "Your missions, specs and development tools in one desktop workspace. Choose the installer for your computer.",
    platforms: "Choose your platform", architecture: "Check your computer’s processor before downloading. Browser detection cannot reliably distinguish every architecture.",
    macHint: "For Macs with an Apple M-series chip.", x64Hint: "For 64-bit Windows PCs with an Intel or AMD processor.", armHint: "For Windows PCs with an ARM64 processor, such as Snapdragon.",
    loading: "Checking available installers…", error: "We couldn’t load the release details. You can still check the published versions on GitHub.", missing: "This release does not list a valid installer for this platform. Check the published versions for availability.",
    download: "Download", viewReleases: "Check published versions", allReleases: "All releases", version: "Version", released: "Published", size: "Size", file: "File", checksum: "SHA-256 checksum", checksumHint: "Compare this checksum with the downloaded file to check its integrity.", details: "File details", releaseNotes: "Release notes",
    learnTitle: "Get your first project ready", learnBody: "Set up your provider, add a project and start a mission. The guide covers installation and your first workflow.", source: "Explore the source", sourceBody: "Read the code, report an issue or contribute to Specrails on GitHub.", support: "Support on Ko-fi", supportBody: "If Specrails helps your work, you can support its development.", back: "Back to home",
  },
  es: {
    title: "Descarga Specrails", intro: "Tus misiones, specs y herramientas de desarrollo en un mismo espacio de escritorio. Elige el instalador para tu ordenador.",
    platforms: "Elige tu plataforma", architecture: "Comprueba el procesador de tu ordenador antes de descargar. El navegador no puede distinguir todas las arquitecturas con fiabilidad.",
    macHint: "Para Mac con un chip de la serie M de Apple.", x64Hint: "Para PC Windows de 64 bits con procesador Intel o AMD.", armHint: "Para PC Windows con procesador ARM64, como Snapdragon.",
    loading: "Consultando los instaladores disponibles…", error: "No pudimos cargar los detalles de la versión. Puedes consultar las versiones publicadas en GitHub.", missing: "Esta versión no incluye un instalador válido para esta plataforma. Consulta las versiones publicadas para comprobar su disponibilidad.",
    download: "Descargar", viewReleases: "Consultar versiones publicadas", allReleases: "Todas las versiones", version: "Versión", released: "Publicada", size: "Tamaño", file: "Archivo", checksum: "Suma de comprobación SHA-256", checksumHint: "Compara esta suma con la del archivo descargado para comprobar su integridad.", details: "Detalles del archivo", releaseNotes: "Notas de la versión",
    learnTitle: "Prepara tu primer proyecto", learnBody: "Configura tu proveedor, añade un proyecto y empieza una misión. La guía explica la instalación y tu primer flujo de trabajo.", source: "Explorar el código", sourceBody: "Lee el código, comunica un problema o contribuye a Specrails en GitHub.", support: "Apoyar en Ko-fi", supportBody: "Si Specrails te ayuda en tu trabajo, puedes apoyar su desarrollo.", back: "Volver al inicio",
  },
  fr: {
    title: "Télécharger Specrails", intro: "Vos missions, specs et outils de développement dans un même espace de travail. Choisissez l’installateur adapté à votre ordinateur.",
    platforms: "Choisissez votre plateforme", architecture: "Vérifiez le processeur de votre ordinateur avant le téléchargement. Le navigateur ne distingue pas toutes les architectures de façon fiable.",
    macHint: "Pour les Mac équipés d’une puce Apple de série M.", x64Hint: "Pour les PC Windows 64 bits avec processeur Intel ou AMD.", armHint: "Pour les PC Windows avec processeur ARM64, comme Snapdragon.",
    loading: "Recherche des installateurs disponibles…", error: "Impossible de charger les détails de la version. Les versions publiées restent accessibles sur GitHub.", missing: "Cette version ne propose pas d’installateur valide pour cette plateforme. Consultez les versions publiées pour vérifier la disponibilité.",
    download: "Télécharger", viewReleases: "Voir les versions publiées", allReleases: "Toutes les versions", version: "Version", released: "Publication", size: "Taille", file: "Fichier", checksum: "Empreinte SHA-256", checksumHint: "Comparez cette empreinte à celle du fichier téléchargé pour vérifier son intégrité.", details: "Détails du fichier", releaseNotes: "Notes de version",
    learnTitle: "Préparez votre premier projet", learnBody: "Configurez votre fournisseur, ajoutez un projet et lancez une mission. Le guide couvre l’installation et votre premier workflow.", source: "Explorer le code source", sourceBody: "Lisez le code, signalez un problème ou contribuez à Specrails sur GitHub.", support: "Soutenir sur Ko-fi", supportBody: "Si Specrails vous aide dans votre travail, vous pouvez soutenir son développement.", back: "Retour à l’accueil",
  },
  de: {
    title: "Specrails herunterladen", intro: "Missionen, Specs und Entwicklungswerkzeuge in einem Desktop-Arbeitsbereich. Wählen Sie das Installationspaket für Ihren Computer.",
    platforms: "Plattform auswählen", architecture: "Prüfen Sie vor dem Download den Prozessor Ihres Computers. Der Browser kann nicht jede Architektur zuverlässig erkennen.",
    macHint: "Für Macs mit einem Chip der Apple-M-Serie.", x64Hint: "Für 64-Bit-Windows-PCs mit Intel- oder AMD-Prozessor.", armHint: "Für Windows-PCs mit ARM64-Prozessor, etwa Snapdragon.",
    loading: "Verfügbare Installationspakete werden geprüft…", error: "Die Versionsdetails konnten nicht geladen werden. Veröffentlichte Versionen finden Sie weiterhin auf GitHub.", missing: "Für diese Plattform enthält die Version kein gültiges Installationspaket. Prüfen Sie die verfügbaren Veröffentlichungen.",
    download: "Herunterladen", viewReleases: "Veröffentlichte Versionen prüfen", allReleases: "Alle Versionen", version: "Version", released: "Veröffentlicht", size: "Größe", file: "Datei", checksum: "SHA-256-Prüfsumme", checksumHint: "Vergleichen Sie diese Prüfsumme mit der heruntergeladenen Datei, um ihre Integrität zu prüfen.", details: "Dateidetails", releaseNotes: "Versionshinweise",
    learnTitle: "Das erste Projekt vorbereiten", learnBody: "Richten Sie Ihren Anbieter ein, fügen Sie ein Projekt hinzu und starten Sie eine Mission. Der Leitfaden erklärt die Installation und den ersten Workflow.", source: "Quellcode ansehen", sourceBody: "Lesen Sie den Code, melden Sie ein Problem oder tragen Sie auf GitHub zu Specrails bei.", support: "Auf Ko-fi unterstützen", supportBody: "Wenn Specrails Ihre Arbeit erleichtert, können Sie die Entwicklung unterstützen.", back: "Zur Startseite",
  },
  pt: {
    title: "Baixar Specrails", intro: "Suas missões, specs e ferramentas de desenvolvimento em um só espaço de trabalho. Escolha o instalador para seu computador.",
    platforms: "Escolha sua plataforma", architecture: "Confira o processador do computador antes de baixar. O navegador não distingue todas as arquiteturas com segurança.",
    macHint: "Para Macs com chip Apple da série M.", x64Hint: "Para PCs Windows de 64 bits com processador Intel ou AMD.", armHint: "Para PCs Windows com processador ARM64, como Snapdragon.",
    loading: "Consultando os instaladores disponíveis…", error: "Não foi possível carregar os detalhes da versão. Você ainda pode consultar as versões publicadas no GitHub.", missing: "Esta versão não lista um instalador válido para esta plataforma. Consulte as versões publicadas para verificar a disponibilidade.",
    download: "Baixar", viewReleases: "Consultar versões publicadas", allReleases: "Todas as versões", version: "Versão", released: "Publicada", size: "Tamanho", file: "Arquivo", checksum: "Soma de verificação SHA-256", checksumHint: "Compare esta soma com a do arquivo baixado para verificar sua integridade.", details: "Detalhes do arquivo", releaseNotes: "Notas da versão",
    learnTitle: "Prepare seu primeiro projeto", learnBody: "Configure seu provedor, adicione um projeto e inicie uma missão. O guia explica a instalação e seu primeiro fluxo de trabalho.", source: "Explorar o código", sourceBody: "Leia o código, relate um problema ou contribua com o Specrails no GitHub.", support: "Apoiar no Ko-fi", supportBody: "Se o Specrails ajuda no seu trabalho, você pode apoiar seu desenvolvimento.", back: "Voltar ao início",
  },
  it: {
    title: "Scarica Specrails", intro: "Missioni, specs e strumenti di sviluppo in un unico spazio di lavoro desktop. Scegli il programma di installazione per il tuo computer.",
    platforms: "Scegli la piattaforma", architecture: "Controlla il processore del computer prima di scaricare. Il browser non distingue tutte le architetture in modo affidabile.",
    macHint: "Per Mac con chip Apple della serie M.", x64Hint: "Per PC Windows a 64 bit con processore Intel o AMD.", armHint: "Per PC Windows con processore ARM64, come Snapdragon.",
    loading: "Verifica dei programmi di installazione disponibili…", error: "Non è stato possibile caricare i dettagli della versione. Puoi comunque consultare le versioni pubblicate su GitHub.", missing: "Questa versione non include un programma di installazione valido per questa piattaforma. Controlla le versioni pubblicate per verificarne la disponibilità.",
    download: "Scarica", viewReleases: "Consulta le versioni pubblicate", allReleases: "Tutte le versioni", version: "Versione", released: "Pubblicata", size: "Dimensione", file: "File", checksum: "Checksum SHA-256", checksumHint: "Confronta questo checksum con quello del file scaricato per verificarne l’integrità.", details: "Dettagli del file", releaseNotes: "Note di versione",
    learnTitle: "Prepara il tuo primo progetto", learnBody: "Configura il provider, aggiungi un progetto e avvia una missione. La guida spiega l’installazione e il primo flusso di lavoro.", source: "Esplora il codice", sourceBody: "Leggi il codice, segnala un problema o contribuisci a Specrails su GitHub.", support: "Sostieni su Ko-fi", supportBody: "Se Specrails ti aiuta nel lavoro, puoi sostenerne lo sviluppo.", back: "Torna alla home",
  },
  zh: {
    title: "下载 Specrails", intro: "在同一个桌面工作空间中管理任务、specs 和开发工具。请选择适合您电脑的安装程序。",
    platforms: "选择平台", architecture: "下载前请确认电脑的处理器类型。浏览器无法可靠地识别所有架构。",
    macHint: "适用于搭载 Apple M 系列芯片的 Mac。", x64Hint: "适用于搭载 Intel 或 AMD 处理器的 64 位 Windows 电脑。", armHint: "适用于搭载 ARM64 处理器（如 Snapdragon）的 Windows 电脑。",
    loading: "正在查询可用的安装程序…", error: "无法加载版本详情。您仍可在 GitHub 上查看已发布的版本。", missing: "此版本未列出适用于该平台的有效安装程序。请查看已发布的版本，确认是否可用。",
    download: "下载", viewReleases: "查看已发布版本", allReleases: "所有版本", version: "版本", released: "发布日期", size: "大小", file: "文件", checksum: "SHA-256 校验和", checksumHint: "将此校验和与下载文件的校验和进行比较，以检查文件完整性。", details: "文件详情", releaseNotes: "版本说明",
    learnTitle: "准备您的第一个项目", learnBody: "配置提供商、添加项目并开始任务。指南介绍了安装过程和第一个工作流程。", source: "浏览源代码", sourceBody: "在 GitHub 上阅读代码、报告问题或为 Specrails 做贡献。", support: "在 Ko-fi 上支持", supportBody: "如果 Specrails 对您的工作有帮助，欢迎支持它的开发。", back: "返回首页",
  },
  ja: {
    title: "Specrails をダウンロード", intro: "ミッション、specs、開発ツールをひとつのデスクトップワークスペースに。お使いのコンピューターに合うインストーラーを選んでください。",
    platforms: "プラットフォームを選択", architecture: "ダウンロード前にプロセッサーを確認してください。ブラウザーではすべてのアーキテクチャを正確に判別できません。",
    macHint: "Apple Mシリーズのチップを搭載したMac用。", x64Hint: "IntelまたはAMDプロセッサー搭載の64ビットWindows PC用。", armHint: "SnapdragonなどのARM64プロセッサー搭載Windows PC用。",
    loading: "利用可能なインストーラーを確認中…", error: "リリースの詳細を読み込めませんでした。公開済みのバージョンはGitHubで確認できます。", missing: "このリリースには、このプラットフォーム用の有効なインストーラーがありません。公開済みのバージョンで提供状況を確認してください。",
    download: "ダウンロード", viewReleases: "公開済みバージョンを確認", allReleases: "すべてのリリース", version: "バージョン", released: "公開日", size: "サイズ", file: "ファイル", checksum: "SHA-256チェックサム", checksumHint: "ダウンロードしたファイルのチェックサムと比較して、整合性を確認できます。", details: "ファイルの詳細", releaseNotes: "リリースノート",
    learnTitle: "最初のプロジェクトを準備", learnBody: "プロバイダーを設定し、プロジェクトを追加してミッションを始めましょう。ガイドではインストールと最初のワークフローを説明します。", source: "ソースコードを見る", sourceBody: "GitHubでコードを読み、問題を報告し、Specrailsに貢献できます。", support: "Ko-fiで支援", supportBody: "Specrailsが仕事に役立つ場合は、開発をご支援いただけます。", back: "ホームに戻る",
  },
};
