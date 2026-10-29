/**
 * Renders a JSON-LD <script> tag for structured data.
 * Pass a single schema object or an array of objects.
 *
 * Usage:
 *   <JsonLd data={organizationSchema} />
 *   <JsonLd data={[productSchema, breadcrumbSchema]} />
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so CMS text containing "</script>" cannot close the tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
