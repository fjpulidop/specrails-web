import { Link } from "react-router-dom";
import { BookOpen, Coffee, Download, Github, MessageCircle, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";

const GITHUB_DESKTOP = "https://github.com/fjpulidop/specrails-desktop";
const KOFI = "https://ko-fi.com/D1D81Y002C";

const FooterSection = () => {
  const { content } = useI18n();
  const { footer, nav } = content;

  return (
    <footer
      id="footer"
      className="relative section-darker border-t border-border/40 px-6 pb-10 pt-16 md:pt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-brand opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-brand-soft opacity-40 blur-2xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <div>
              <h2 className="max-w-xl text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                {footer.headline}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {footer.body}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="gradient" className="rounded-pill cta-sheen">
                  <Link to="/download">
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {footer.download}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-pill">
                  <Link to="/docs">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    {footer.docs}
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <nav aria-label="Footer" className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <FooterGroup
                title={nav.product}
                links={[
                  { label: nav.product, href: "/#product" },
                  { label: nav.specs, href: "/#specs" },
                  { label: nav.loops, href: "/#loops" },
                  { label: nav.engineering, href: "/#engineering" },
                ]}
              />
              <FooterGroup
                title={nav.resources}
                links={[
                  { label: nav.docs, to: "/docs" },
                  { label: "Getting started", to: "/docs/getting-started" },
                  { label: "Creating specs", to: "/docs/creating-specs" },
                  { label: "Running pipelines", to: "/docs/running-pipelines" },
                ]}
              />
              <FooterGroup
                title="Community"
                links={[
                  { label: nav.github, href: GITHUB_DESKTOP, external: true },
                  { label: "Issues", href: `${GITHUB_DESKTOP}/issues`, external: true },
                  { label: nav.donate, href: KOFI, external: true },
                  { label: "MIT License", href: `${GITHUB_DESKTOP}/blob/main/LICENSE`, external: true },
                ]}
              />
            </nav>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-border/30 pt-6 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground/70 sm:text-left">
            © {new Date().getFullYear()} specrails · {footer.note}
          </p>

          <div className="flex items-center gap-1">
            <a
              href={KOFI}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={nav.donate}
              title={nav.donate}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-brand-violet"
            >
              <Coffee className="h-5 w-5" />
            </a>
            <a
              href={`${GITHUB_DESKTOP}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Issues"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-brand-cyan"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href={`${GITHUB_DESKTOP}/blob/main/LICENSE`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MIT License"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-brand-cyan"
            >
              <ScrollText className="h-5 w-5" />
            </a>
            <a
              href={GITHUB_DESKTOP}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={nav.github}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href?: string; to?: string; external?: boolean }>;
}): JSX.Element {
  return (
    <div>
      <h3 className="eyebrow mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link
                to={link.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterSection;
