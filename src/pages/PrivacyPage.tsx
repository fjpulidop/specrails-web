import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useSeo } from "@/hooks/useSeo";

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "What our apps do",
    body: (
      <p>
        Specrails runs entirely on your own computer. The Specrails mobile app is a companion
        that connects <strong>directly</strong> to that computer over your local Wi-Fi network.
        There is no Specrails cloud, no relay server, and no account system.
      </p>
    ),
  },
  {
    title: "Data we collect",
    body: (
      <p>
        <strong>None.</strong> Neither Specrails nor the Specrails mobile app collects, stores,
        or transmits any personal data to us or to any third party. There are no analytics,
        tracking, or advertising SDKs in our apps.
      </p>
    ),
  },
  {
    title: "Local network communication",
    body: (
      <p>
        The mobile app talks to your computer exclusively on your local network, encrypted with TLS
        and certificate pinning. Pairing happens by scanning a QR code shown on your own screen.
        Nothing ever leaves your network.
      </p>
    ),
  },
  {
    title: "Local storage",
    body: (
      <p>
        The mobile app stores a single pairing credential in your device&apos;s secure
        keychain/keystore so it can reconnect to your computer. It never leaves the device, and you
        can delete it at any time (Settings → Unpair). The desktop app stores its data in local
        files on your computer, under your control.
      </p>
    ),
  },
  {
    title: "Camera",
    body: (
      <p>
        The mobile app uses the camera only to scan the pairing QR code. No images are captured,
        stored, or transmitted.
      </p>
    ),
  },
  {
    title: "Third-party AI providers",
    body: (
      <p>
        Specrails orchestrates AI CLI tools (such as Claude Code or Codex) that{" "}
        <em>you</em> install and authenticate on your own computer. Any data those tools send to
        their providers is governed by the provider&apos;s own terms and privacy policy — Specrails
        does not add, intercept, or store any of it.
      </p>
    ),
  },
  {
    title: "Changes & contact",
    body: (
      <p>
        If this policy ever changes, the updated version will be published on this page. Questions?
        Open an issue on{" "}
        <a
          href="https://github.com/fjpulidop/specrails-desktop"
          target="_blank"
          rel="noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    ),
  },
];

const PrivacyPage = () => {
  useSeo({
    title: "Privacy Policy — Specrails",
    description:
      "Specrails collects no personal data. Everything runs locally on your own machine and network.",
    canonical: "https://specrails.dev/privacy",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: June 11, 2026</p>
        <p className="mt-6 text-lg text-muted-foreground">
          Specrails does not collect, store, or transmit any personal data. Everything runs locally
          — on your machine, on your network.
        </p>
        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <div className="mt-3 leading-relaxed text-muted-foreground">{s.body}</div>
            </section>
          ))}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default PrivacyPage;
