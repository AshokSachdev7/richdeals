// Renders a JSON-LD structured-data block. Server component (no interactivity).
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, server-built content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
