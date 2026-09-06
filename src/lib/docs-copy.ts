import type { LanguageId } from '@/lib/i18n';

const en = {
  title: 'Build your first mission', intro: 'A practical guide from project context to a spec, a verified implementation and a reviewed delivery.',
  label: 'Documentation', search: 'Search the guide', empty: 'No guides match your search.', clear: 'Clear search', overview: 'Guide overview',
  contents: 'On this page', menu: 'Browse the guide', close: 'Close guide navigation', read: 'Read guide', previous: 'Previous', next: 'Next',
  loading: 'Loading guide…', failed: 'This guide could not be loaded.', retry: 'Try again', notFound: 'Guide not found', notFoundBody: 'Choose a current guide from the index.',
  fallback: 'This guide is not yet available in your language. You are reading the current English version.', english: 'In English',
  link: 'Link to this section', copy: 'Copy code', note: 'Note', tip: 'Tip', important: 'Important', warning: 'Warning', caution: 'Caution',
};
export type DocsCopy = typeof en;
const fields = Object.keys(en) as Array<keyof DocsCopy>;
function translation(values: string[]): DocsCopy {
  if (values.length !== fields.length) throw new Error('Incomplete documentation interface translation');
  return Object.fromEntries(fields.map((key, i) => [key, values[i]])) as DocsCopy;
}
const copy: Record<LanguageId, DocsCopy> = {
  en,
  es: translation(['Crea tu primera misión','Una guía práctica del contexto del proyecto a una spec, una implementación verificada y una entrega revisada.','Documentación','Buscar en la guía','Ninguna guía coincide con la búsqueda.','Borrar búsqueda','Índice de la guía','En esta página','Explorar la guía','Cerrar navegación de la guía','Leer guía','Anterior','Siguiente','Cargando guía…','No se ha podido cargar esta guía.','Reintentar','Guía no encontrada','Elige una guía actual en el índice.','Esta guía todavía no está disponible en tu idioma. Estás leyendo la versión inglesa actual.','En inglés','Enlace a esta sección','Copiar código','Nota','Consejo','Importante','Advertencia','Precaución']),
  fr: translation(['Créez votre première mission','Un guide pratique du contexte du projet à une spec, une implémentation vérifiée et une livraison examinée.','Documentation','Rechercher dans le guide','Aucun guide ne correspond à votre recherche.','Effacer la recherche','Sommaire du guide','Sur cette page','Parcourir le guide','Fermer la navigation','Lire le guide','Précédent','Suivant','Chargement du guide…','Impossible de charger ce guide.','Réessayer','Guide introuvable','Choisissez un guide actuel dans le sommaire.','Ce guide n’est pas encore disponible dans votre langue. Vous lisez la version anglaise actuelle.','En anglais','Lien vers cette section','Copier le code','Note','Conseil','Important','Avertissement','Prudence']),
  de: translation(['Starten Sie Ihre erste Mission','Eine praktische Anleitung vom Projektkontext zur Spec, zur geprüften Umsetzung und zur überprüften Übernahme.','Dokumentation','Anleitung durchsuchen','Keine passenden Anleitungen gefunden.','Suche löschen','Anleitungsübersicht','Auf dieser Seite','Anleitung durchblättern','Navigation schließen','Anleitung lesen','Zurück','Weiter','Anleitung wird geladen…','Diese Anleitung konnte nicht geladen werden.','Erneut versuchen','Anleitung nicht gefunden','Wählen Sie eine aktuelle Anleitung aus der Übersicht.','Diese Anleitung ist noch nicht in Ihrer Sprache verfügbar. Sie lesen die aktuelle englische Fassung.','Auf Englisch','Link zu diesem Abschnitt','Code kopieren','Hinweis','Tipp','Wichtig','Warnung','Vorsicht']),
  pt: translation(['Crie a primeira missão','Um guia prático do contexto do projeto a uma spec, uma implementação verificada e uma entrega revista.','Documentação','Pesquisar no guia','Nenhum guia corresponde à pesquisa.','Limpar pesquisa','Índice do guia','Nesta página','Explorar o guia','Fechar navegação','Ler guia','Anterior','Seguinte','A carregar o guia…','Não foi possível carregar este guia.','Tentar novamente','Guia não encontrado','Escolha um guia atual no índice.','Este guia ainda não está disponível no seu idioma. Está a ler a versão inglesa atual.','Em inglês','Ligação para esta secção','Copiar código','Nota','Dica','Importante','Aviso','Cuidado']),
  it: translation(['Crea la prima missione','Una guida pratica dal contesto del progetto a una spec, un’implementazione verificata e una consegna esaminata.','Documentazione','Cerca nella guida','Nessuna guida corrisponde alla ricerca.','Cancella ricerca','Indice della guida','In questa pagina','Esplora la guida','Chiudi navigazione','Leggi la guida','Precedente','Successivo','Caricamento della guida…','Impossibile caricare questa guida.','Riprova','Guida non trovata','Scegli una guida attuale dall’indice.','Questa guida non è ancora disponibile nella tua lingua. Stai leggendo la versione inglese attuale.','In inglese','Link a questa sezione','Copia codice','Nota','Suggerimento','Importante','Avvertenza','Attenzione']),
  zh: translation(['开始第一个任务','从项目上下文到规格、经过验证的实现以及审核交付的实用指南。','文档','搜索指南','没有匹配的指南。','清除搜索','指南目录','本页内容','浏览指南','关闭指南导航','阅读指南','上一篇','下一篇','正在加载指南…','无法加载此指南。','重试','未找到指南','请从目录中选择当前指南。','此指南尚无您所选语言的版本。当前显示最新的英语版本。','英语版本','链接到此节','复制代码','注释','提示','重要','警告','注意']),
  ja: translation(['最初のミッションを作る','プロジェクトの情報からスペック、検証済みの実装、成果物のレビューまでを進める実用ガイドです。','ドキュメント','ガイドを検索','一致するガイドがありません。','検索をクリア','ガイド一覧','このページの内容','ガイドを見る','ナビゲーションを閉じる','ガイドを読む','前へ','次へ','ガイドを読み込み中…','ガイドを読み込めませんでした。','再試行','ガイドが見つかりません','一覧から現在のガイドを選んでください。','このガイドはまだ選択した言語に対応していません。最新の英語版を表示しています。','英語版','このセクションへのリンク','コードをコピー','注記','ヒント','重要','警告','注意']),
};
export function getDocsCopy(language: LanguageId) { return copy[language]; }
export const CATEGORY_ORDER = ['getting-started', 'missions', 'specs', 'pipeline', 'agents', 'insights', 'integrations', 'settings'];
const categories: Record<LanguageId, string[]> = {
 en:['Getting started','Missions','Specs','Loops and rails','Agents','Files and processes','Integrations','Settings'],
 es:['Primeros pasos','Misiones','Specs','Loops y rails','Agentes','Archivos y procesos','Integraciones','Ajustes'],
 fr:['Bien démarrer','Missions','Specs','Loops et rails','Agents','Fichiers et processus','Intégrations','Réglages'],
 de:['Erste Schritte','Missionen','Specs','Loops und Rails','Agenten','Dateien und Prozesse','Integrationen','Einstellungen'],
 pt:['Primeiros passos','Missões','Specs','Loops e rails','Agentes','Ficheiros e processos','Integrações','Definições'],
 it:['Primi passi','Missioni','Spec','Loop e rail','Agenti','File e processi','Integrazioni','Impostazioni'],
 zh:['入门','任务','规格','循环与执行通道','代理','文件与进程','集成','设置'],
 ja:['はじめに','ミッション','スペック','ループとレール','エージェント','ファイルとプロセス','連携','設定'],
};
export function categoryLabel(category: string, language: LanguageId) { return categories[language][CATEGORY_ORDER.indexOf(category)] ?? category; }
