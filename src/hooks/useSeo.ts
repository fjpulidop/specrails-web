import { useEffect } from "react";

interface SeoParams {
  title: string;
  description: string;
  canonical: string;
}

export function useSeo({ title, description, canonical }: SeoParams): void {
  useEffect(() => {
    document.title = title;

    const metaDesc = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (metaDesc) {
      metaDesc.content = description;
    }

    const canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonicalLink) {
      canonicalLink.href = canonical;
    }
    for (const [selector, value] of [
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[property="og:url"]', canonical],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
    ]) {
      const meta = document.querySelector<HTMLMetaElement>(selector);
      if (meta) meta.content = value;
    }
  }, [title, description, canonical]);
}
