import { SITE_COPY } from "@/lib/copywriting";

export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const schema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Organization"],
    "@id": `${baseUrl}#organization`,
    name: SITE_COPY.name,
    alternateName: "Zacreative Editorial & Presentation Design",
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    image: `${baseUrl}/og-image.jpg`,
    description: SITE_COPY.schemaDescription,
    email: SITE_COPY.contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressLocality: "Jakarta",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [SITE_COPY.contact.instagramUrl, SITE_COPY.contact.linkedinUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Desain Visual Zacreative",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Layout Buku Editorial",
            description:
              "Penataan tipografi dan grid editorial profesional untuk buku cetak maupun digital berstandar publikasi komersial.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Presentasi & Pitch Deck Eksekutif",
            description:
              "Dek presentasi visual berstandar tinggi untuk pitch investor, keynote speaker, dan laporan strategis manajemen.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Poster & Desain Kampanye Visual",
            description:
              "Desain poster promosi dan materi kampanye visual yang komunikatif, menarik perhatian, dan berdampak luas.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
