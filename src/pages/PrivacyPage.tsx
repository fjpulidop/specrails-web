import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useSeo } from "@/hooks/useSeo";
import { useI18n } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Privacy Policy",
    intro:
      "Specrails keeps the development workspace on your computer. Some features connect to external services; this page explains the data involved.",
    updated: "Last updated: September 6, 2026",
    sections: [
      [
        "Local workspace and device storage",
        "Desktop stores projects, mission history, specs, job results and process logs on your computer. Companion stores a paired Desktop identity, device credentials and cached read responses locally. Native builds use the platform keychain or keystore for credentials; the web app uses WebCrypto-backed browser storage. Cached project data also uses local preferences or browser storage.",
      ],
      [
        "Companion connections",
        "Companion connects to the paired Desktop using WebRTC. Initial pairing uses a QR code. Reconnection uses a signaling mailbox hosted at specrails.dev to exchange connection descriptions, including network candidates and device identifiers. Mailbox payloads expire after 60 seconds. Mission and project traffic travels over the encrypted peer connection, not through that mailbox. Desktop must remain running and reachable; connecting from every network is not guaranteed.",
      ],
      [
        "AI providers and integrations",
        "The coding providers you configure receive prompts and context needed for their work, subject to their own services and policies. Enabled integrations such as GitHub or Jira make requests to those services. Desktop can retain provider outputs in conversation history and execution logs. Local-first does not mean that model inference or all network activity stays on your computer.",
      ],
      [
        "This website",
        "The public website loads Plausible Analytics and fonts from Google Fonts. Those services receive the requests needed to serve their resources; website hosting also processes HTTP requests. Downloads, release information, updates and Companion signaling require network requests. The website and the installed apps have different data flows.",
      ],
      [
        "Camera and pairing",
        "Companion requests camera access for scanning pairing QR codes. Pairing grants control to a specific device. Review its project permissions in Desktop and revoke the device when it should no longer connect.",
      ],
      [
        "Your controls",
        "You can unpair Companion, revoke paired devices in Desktop and clear the app’s browser storage. Review and remove local workspace history through the relevant app features. Credentials and cached project content are separate categories: clearing only a credential is not a claim that every cached file or browser record has been erased.",
      ],
    ],
    contact:
      "For questions about these data flows or a correction, contact the project on GitHub.",
  },
  es: {
    title: "Política de privacidad",
    intro:
      "Specrails mantiene el espacio de desarrollo en tu ordenador. Algunas funciones se conectan a servicios externos; aquí explicamos los datos que intervienen.",
    updated: "Última actualización: 6 de septiembre de 2026",
    sections: [
      [
        "Espacio local y almacenamiento del dispositivo",
        "Desktop guarda proyectos, historial de misiones, specs, resultados y logs de procesos en tu ordenador. Companion conserva localmente la identidad del Desktop vinculado, credenciales del dispositivo y respuestas de lectura en caché. Las versiones nativas usan el llavero del sistema para credenciales; la web usa almacenamiento del navegador respaldado por WebCrypto. Los datos de proyectos en caché también usan preferencias locales o almacenamiento del navegador.",
      ],
      [
        "Conexiones de Companion",
        "Companion se conecta al Desktop vinculado mediante WebRTC. El primer enlace usa un QR. La reconexión utiliza un buzón de señalización en specrails.dev para intercambiar descripciones de conexión, incluidos candidatos de red e identificadores de dispositivo. Estos mensajes caducan a los 60 segundos. El tráfico de misiones y proyectos viaja por la conexión cifrada entre dispositivos. Desktop debe seguir ejecutándose y ser accesible; no se garantiza la conexión desde cualquier red.",
      ],
      [
        "Proveedores de IA e integraciones",
        "Los proveedores que configures reciben los prompts y el contexto necesarios para trabajar, según sus servicios y políticas. Las integraciones activadas, como GitHub o Jira, realizan peticiones a esos servicios. Desktop puede conservar las respuestas en el historial y los logs. Que el espacio sea local no significa que la inferencia o toda la actividad de red permanezcan en tu ordenador.",
      ],
      [
        "Esta web",
        "La web pública carga Plausible Analytics y tipografías de Google Fonts. Esos servicios reciben las peticiones necesarias para servir sus recursos; el alojamiento también procesa peticiones HTTP. Las descargas, la información de versiones, las actualizaciones y la señalización de Companion requieren red. La web y las aplicaciones instaladas tienen flujos de datos distintos.",
      ],
      [
        "Cámara y vinculación",
        "Companion solicita acceso a la cámara para leer los QR de vinculación. Al vincular se concede acceso a un dispositivo concreto. Revisa sus permisos de proyectos en Desktop y revócalo cuando ya no deba conectarse.",
      ],
      [
        "Tus controles",
        "Puedes desvincular Companion, revocar dispositivos en Desktop y borrar el almacenamiento del navegador. Revisa y elimina el historial local mediante las funciones correspondientes. Las credenciales y el contenido en caché son categorías distintas: eliminar una credencial no significa que se hayan borrado todos los archivos o registros del navegador.",
      ],
    ],
    contact:
      "Para consultar estos flujos de datos o pedir una corrección, contacta con el proyecto en GitHub.",
  },
};
const fallbackNotice = {
  en: "",
  es: "",
  fr: "Cette page est disponible en anglais.",
  de: "Diese Seite ist auf Englisch verfügbar.",
  pt: "Esta página está disponível em inglês.",
  it: "Questa pagina è disponibile in inglese.",
  zh: "本页目前提供英文版本。",
  ja: "このページは現在英語で提供されています。",
};

export default function PrivacyPage() {
  const { languageId } = useI18n();
  const resolvedLanguage = languageId === "es" ? "es" : "en";
  const copy = COPY[resolvedLanguage];
  useSeo({
    title: `${copy.title} — Specrails`,
    description: copy.intro,
    canonical: "https://specrails.dev/privacy",
  });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32">
        {fallbackNotice[languageId] && (
          <p className="mb-6 rounded-lg border border-border bg-surface-1 p-3 text-sm text-muted-foreground">
            {fallbackNotice[languageId]}
          </p>
        )}
        <article lang={resolvedLanguage}>
          <h1 className="text-4xl font-medium tracking-tight">{copy.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{copy.updated}</p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {copy.intro}
          </p>
          <div className="mt-12 space-y-10">
            {copy.sections.map(([title, body]) => (
              <section key={title}>
                <h2 className="text-xl font-medium">{title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </section>
            ))}
          </div>
          <p className="mt-10 leading-relaxed text-muted-foreground">
            {copy.contact}{" "}
            <a
              href="https://github.com/fjpulidop/specrails-desktop"
              className="text-brand-cyan underline underline-offset-4"
            >
              GitHub
            </a>
          </p>
        </article>
      </main>
      <FooterSection />
    </div>
  );
}
