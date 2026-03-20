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
      'meta[name="description"]'
    );
    if (metaDesc) {
      metaDesc.content = description;
    }

    const canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (canonicalLink) {
      canonicalLink.href = canonical;
    }
  }, [title, description, canonical]);
}
