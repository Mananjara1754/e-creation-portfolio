/** Données structurées schema.org, rendues côté serveur (visibles sans JS). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Échappe "<" pour qu'un texte ne puisse pas fermer la balise script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
