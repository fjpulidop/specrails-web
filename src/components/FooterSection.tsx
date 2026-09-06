import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpecrailsLogo from "@/components/SpecrailsLogo";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_COPY } from "@/lib/product-copy";

export default function FooterSection() {
  const { languageId, content } = useI18n();
  const c = PRODUCT_COPY[languageId];
  const links = [
    { label: content.nav.product, to: "/#product" },
    { label: c.workflow, to: "/#specs" },
    { label: "Companion", to: "/companion" },
    { label: content.nav.docs, to: "/docs" },
  ];
  return (
    <footer
      id="footer"
      className="border-t border-border bg-surface-1 px-5 pb-8 pt-16 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              {c.closing}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">{c.local}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="h-12 rounded-full bg-foreground px-6 text-background hover:bg-foreground/90"
            >
              <Link to="/download">
                {content.nav.download}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full px-6"
            >
              <Link to="/docs/getting-started">
                {c.learn}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-7 border-y border-border py-6">
          <Link to="/" aria-label="Specrails">
            <SpecrailsLogo height={36} />
          </Link>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-3"
            aria-label={content.nav.sections}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href="https://github.com/fjpulidop/specrails-desktop"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={content.nav.github}
            className="rounded-lg p-2 text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Specrails</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-foreground">
              {
                {
                  en: "Privacy",
                  es: "Privacidad",
                  fr: "Confidentialité",
                  de: "Datenschutz",
                  pt: "Privacidade",
                  it: "Privacy",
                  zh: "隐私",
                  ja: "プライバシー",
                }[languageId]
              }
            </Link>
            <a
              href="https://github.com/fjpulidop/specrails-desktop/blob/main/LICENSE"
              className="hover:text-foreground"
            >
              MIT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
